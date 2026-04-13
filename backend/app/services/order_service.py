from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.order_repository import OrderRepository
from app.repositories.cart_repository import CartRepository
from app.repositories.item_repository import ItemRepository
from app.services.payment_service import PaymentService
from app.models.cart import ShoppingCart
from app.models.order import PurchaseOrder, OrderItem


class OrderService:
    """
    Handles checkout and order history business logic.
    Orchestrates cart, inventory, payment, and order persistence.
    """

    def __init__(self, db):
        """
        Instantiate OrderRepository, CartRepository, ItemRepository, and PaymentService.
        Store as self.order_repo, self.cart_repo, self.item_repo, self.payment_service.
        """
        self.order_repo = OrderRepository(db)
        self.cart_repo = CartRepository(ShoppingCart, db)
        self.item_repo = ItemRepository(db)
        self.payment_service = PaymentService()

    def checkout(self, user_id: int, shipping_address, credit_card_number: str):
        """
        Process a checkout and create a PurchaseOrder.

        Steps:
        1. Fetch the user's cart via self.cart_repo.get_by_user_id(user_id)
           — raise HTTP 400 "Cart is empty" if cart is missing or has no items
        2. Validate inventory: for each cart item, check product.quantity >= cart_item.quantity
           — raise HTTP 400 "Insufficient inventory for {product.name}" if not enough stock
        3. Calculate total: sum(product.price * cart_item.quantity) across all cart items
        4. Process payment via self.payment_service.process_payment(credit_card_number, total)
           — raise HTTP 402 "Credit Card Authorization Failed." if payment returns False
        5. Decrement inventory: product.quantity -= cart_item.quantity for each item
        6. Build a PurchaseOrder with nested OrderItem list (snapshot prices)
           — save via self.order_repo.create(order)
        7. Clear the cart via self.cart_repo.clear_cart(cart)
        8. Return the created PurchaseOrder
        """
        cart = self.cart_repo.get_by_user_id(user_id)

        if not cart or not cart.items:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cart is empty")

        for cartItem in cart.items:
            product = self.item_repo.get_by_id(cartItem.item_id)
            if product.quantity < cartItem.quantity:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Insufficient inventory for {product.name}")

        total = 0
        for cartItems in cart.items:
            item  = self.item_repo.get_by_id(cartItems.item_id)
            total += item.price * cartItems.quantity

        if not self.payment_service.process_payment(credit_card_number, total):
            raise HTTPException(status_code=status.HTTP_402_PAYMENT_REQUIRED, detail="Credit Card Authorization Failed.")

        for cartItem in cart.items:#decrement inventory
            product = self.item_repo.get_by_id(cartItem.item_id)
            product.quantity -= cartItem.quantity
            self.item_repo.update(product)

        items = []
        for ci in cart.items:
            item = self.item_repo.get_by_id(ci.item_id)
            items.append(
                OrderItem(
                    item_id=ci.item_id,
                    quantity=ci.quantity,
                    price_at_purchase=item.price,
                )
            )

        order = PurchaseOrder(
            customer_id=user_id,
            total=total,
            shipping_address=shipping_address,
            items=items
        )
        self.order_repo.create(order)
        self.cart_repo.clear_cart(cart)
        return order
        
        


    def get_orders(self, user_id: int):
        """
        Return the purchase history for a single customer.
        Delegates to self.order_repo.get_by_customer_id(user_id).
        """
        return self.order_repo.get_by_customer_id(user_id)


    def get_all_orders(self):
        """
        Return all orders across all customers (admin use only).
        Delegates to self.order_repo.get_all().
        """
        return self.order_repo.get_all()
