import { create } from "zustand";
import { propertyRepositoryImpl } from "../data/propertyRepositoryImpl";
import { createPropertyStore, type PropertyStore } from "./PropertyStore";

// connect the propertyStore (ViewModel) to the propertyRepositoryImpl (Repository)
export const usePropertyStore = create<PropertyStore>()(createPropertyStore(propertyRepositoryImpl));