import type { Database } from "@/lib/database.types";
import type { Property, PropertyType } from "../domain/Property";
// get the table data from the supabase table
export type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];
// map the property row to the property domain
export const propertyMapper = (row: PropertyRow): Property => {
    // domain variable = supabase table column name
    return {
        id: row.id,
        title: row.title,
        description: row.description || "", // optional property in the supabase table
        price: row.price_cents, // WILL show up in cents form, so will need to convert to dollars for UI display.
        bedroom_count: row.bedrooms,
        bathroom_count: row.bathrooms,
        square_footage: row.square_feet,
        property_type: row.property_type as PropertyType,
        address: {
            street_address: row.street_address,
            city: row.city,
            state: row.state,
            zip: row.postal_code,
        },
        featured: row.featured,
        status: row.status as "active" | "inactive" | "sold" | "pending",
        property_image: row.cover_image_url,
        created_at: row.created_at,
        updated_at: row.updated_at,
    }
}