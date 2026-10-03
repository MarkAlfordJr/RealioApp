// handles all the database operations for the property domain
import { supabase } from "@/lib/supabase";
import { Property } from "./Property";

export interface PropertyRepository {
    // get the home properties from the database
    getHomeProperties(): Promise<Property[]>;
    // get the property by id from the database
    // will be used in the property detail screen to display the property details 
    getPropertyById(id: string): Promise<Property | null>;
    // create a new property in the database
    //createProperty(property: Property): Promise<void>;
    // update a property in the database
    //updateProperty(property: Property): Promise<void>;
    // delete a property from the database
    //deleteProperty(id: string): Promise<void>;
}