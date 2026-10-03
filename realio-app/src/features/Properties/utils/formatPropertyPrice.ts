export function formatPropertyPrice(priceCents: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(priceCents / 100); // convert the price from cents to dollars, due to the supabase table storing the price in cents.
}