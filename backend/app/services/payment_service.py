class PaymentService:
    """
    Mock payment processor simulating a real payment gateway.

    Per project spec: "deny every 3rd request of payment, or other dummy algorithms."
    Uses a class-level counter so the count persists across service instances
    within the same server process.
    """

    _request_count: int = 0  # TODO: Class-level counter shared across all instances

    def process_payment(self, credit_card_number: str, amount: float) -> bool:
        """
        Simulate payment processing.

        Steps:
        1. Increment PaymentService._request_count by 1
        2. If _request_count is divisible by 3, return False (payment denied)
        3. Otherwise return True (payment approved)

        Note: credit_card_number and amount are accepted as parameters to
        mimic the interface of a real payment API, but are not used in
        this mock implementation.
        """
        pass
