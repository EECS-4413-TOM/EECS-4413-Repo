// TODO: Import apiClient from "./client"
// TODO: Import Item type from "../types"

/**
 * getItems
 *
 * Sends a GET request to /catalog with optional query parameters.
 * Returns the filtered and sorted list of products.
 *
 * @param params - Optional filters: { category?, brand?, search?, sort_by?, order? }
 * @returns Promise<Item[]>
 */
export async function getItems(params?: unknown): Promise<unknown[]> {
  return [
     {
      id: 1, title: "Cyberpunk 2077", price: 59.99, image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg"
    },
    {
      id: 2, title: "Elden Ring", price: 49.99, image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg"
    },
    {
      id: 3, title: "Grand Theft Auto V", price: 19.99, image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg"
    },
    {
      id: 4, title: "Cyberpunk 2078", price: 59.99, image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg"
    },
    {
      id: 5, title: "Elden Ring 2", price: 49.99, image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg"
    },
    {
      id: 6, title: "Grand Theft Auto V: Deluxe", price: 19.99, image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg"
    },
      {
      id: 7, title: "Grand Theft Auto V: Deluxe", price: 19.99, image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg"
    },
      {
      id: 8, title: "Grand Theft Auto V: Deluxe", price: 19.99, image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg"
    }, 
      {
      id: 9, title: "Grand Theft Auto V: Deluxe", price: 19.99, image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg"
    }
  ]
}

/**
 * getItem
 *
 * Sends a GET request to /catalog/:id to fetch a single product's details.
 * Used on the ProductDetailPage.
 *
 * @param id - The product's numeric ID
 * @returns Promise<Item>
 */
export async function getItem(id: number): Promise<unknown> {
  // TODO: return (await apiClient.get(`/catalog/${id}`)).data
  throw new Error("Not implemented");
}
