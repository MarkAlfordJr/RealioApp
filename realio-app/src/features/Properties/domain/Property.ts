// enum to handle the property types of the property domain in the supabase table
export type PropertyType = 
| "apartment"
| "house"
| "condo"
| "townhouse"; 

// interface to handle the address types of the property domain in the supabse table
export interface Address {
    street_address: string;
    city: string;
    state: string;
    zip: string;
}

// MAIN domain interface for the property domain in the supabase table
export interface Property {
    id: string;

    title: string;
    description: string;
    price: number;
    bedroom_count: number;
    bathroom_count: number;
    square_footage: number;
    // enum for the property type in supabase table
    property_type: PropertyType;
    // class for the address type in supabase table
    address: Address;
    featured: boolean;
    // status of the property in supabase table
    status: "active" | "inactive" | "sold" | "pending";
    property_image: string | null;
    created_at: string;
    updated_at: string;
}
