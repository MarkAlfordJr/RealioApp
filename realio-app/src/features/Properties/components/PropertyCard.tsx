import { Image, Pressable, Text, View } from "react-native";

import type { Property } from "../domain/Property";

import { formatPropertyPrice } from "../utils/formatPropertyPrice";

interface PropertyCardProps {
  property: Property;

  onPress?: (property: Property) => void;
}

export function PropertyCard({ property, onPress }: PropertyCardProps) {
  return (
    <Pressable
      testID={`property-card-${property.id}`}
      onPress={() => onPress?.(property)}
      className="overflow-hidden rounded-3xl bg-white shadow-sm"
    >
      <Image
        source={{
          uri: property.property_image ?? undefined,
        }}
        className="h-52 w-full bg-slate-200"
        resizeMode="cover"
      />

      <View className="p-4">
        <Text className="text-xl font-bold text-slate-900">
          {formatPropertyPrice(property.price)} 
        </Text>

        <Text
          numberOfLines={1}
          className="mt-1 text-base font-semibold text-slate-800"
        >
          {property.title}
        </Text>

        <Text numberOfLines={1} className="mt-1 text-sm text-slate-500">
          {property.address.street_address}, {property.address.city},{" "}
          {property.address.state}
        </Text>

        <View className="mt-4 flex-row items-center">
          <Text className="text-sm font-medium text-slate-700">
            {property.bedroom_count} beds
          </Text>

          <Text className="mx-2 text-slate-300">•</Text>

          <Text className="text-sm font-medium text-slate-700">
            {property.bathroom_count} baths
          </Text>

          <Text className="mx-2 text-slate-300">•</Text>

          <Text className="text-sm font-medium text-slate-700">
            {property.square_footage.toLocaleString()} sqft
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
