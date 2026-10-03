import { PropertyRepository } from "../domain/PropertyRepository";
import { propertyMapper } from "./propertyMapper";
import { supabase } from "@/lib/supabase";
// DO NOT USE the domain interface in this file, only the data mapper.

export const propertyRepositoryImpl: PropertyRepository = {
    // get the home properties from the database
    async getHomeProperties() {
        const { data, error } = await supabase
        .from("properties") // from the properties table
        .select("*") // select all columns from the properties table
        .eq("status", "active") // only get active properties
        .order("created_at", { ascending: false }) // order by created_at in descending order
        .limit(30); // limit the results to 30
        if (error) {
            throw new Error(`Failed to get home properties: ${error.message}`);
        }

        return (data ?? []).map(propertyMapper);
    },

    // get the property by id from the database
    async getPropertyById(id: string) {
        const { data, error } = await supabase
        .from("properties") // from the properties table
        .select("*")
        .eq("id", id) // only get the property with the given id
        .single(); // only get one result
        if (error) {
            throw new Error(`Failed to get property by id: ${error.message}`);
        }
        return propertyMapper(data);
    }
}