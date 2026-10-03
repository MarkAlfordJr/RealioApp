import { StateCreator } from "zustand";
import { Property } from "../domain/Property";
import { PropertyRepository } from "../domain/PropertyRepository";

// the various states of the property home screen
export type PropertyLoadStatus = "idle" | "loading" | "success" | "error";

// gives all the values, behaviors, and state management for the property home screen
export interface PropertyStore {
    properties: Property[]; // the properties to display on the home screen
    searchQuery: string; // the search query to filter the properties
    status: PropertyLoadStatus; // the status of the property home screen
    error: string | null; // the error message if the properties fail to load
    fetchProperties: () => Promise<void>; // fetch the properties from the database using the repository
    fetchPropertyById: (id: string) => Promise<void>; // fetch the property by id from the database using the repository, will be used in the property detail screen
    setSearchQuery: (query: string) => void; // set the search query
    clearSearchQuery: () => void; // clear the search query
}

export const createPropertyStore = (repository: PropertyRepository): StateCreator<PropertyStore> => (set) => ({
   properties: [],
   searchQuery: "",
   status: "idle",
   error: null,
   fetchProperties: async () => {
    set({ status: "loading" }); // set the status to loading
    try {
        const properties = await repository.getHomeProperties(); // get the properties from the database
        set({ properties, status: "success" }); // set the properties and status to success
    } catch (error) {
        set({ error: error as string, status: "error" }); // set the error and status to error
    }
   },
   fetchPropertyById: async (id: string) => {
    set({ status: "loading" }); // set the status to loading
    try {
        const property = await repository.getPropertyById(id); // get the property by id from the database
        if (!property) {
            set({ properties: [], error: "Property not found", status: "error" });
            return;
        }
        set({ properties: [property], error: null, status: "success" }); // set the property and status to success
    } catch (error) {
        set({ error: error as string, status: "error" }); // set the error and status to error
    }
   },
   setSearchQuery: (query: string) => {
    set({ searchQuery: query }); // set the search query
   },
   clearSearchQuery: () => {
    set({ searchQuery: "" }); // clear the search query
   }
});