import {
    ActivityIndicator,
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    View,
  } from "react-native";
  
  import {
    useEffect,
    useMemo,
  } from "react";
  
  import { SafeAreaView } from "react-native-safe-area-context";
  
  import type { Property } from "../domain/Property";
  
  import { PropertyCard } from "../components/PropertyCard";
  
  import { usePropertyStore } from "../store/usePropertyStore";
  
  export default function HomeScreen() {
    const properties = usePropertyStore(
      (state) => state.properties,
    );
  
    const status = usePropertyStore(
      (state) => state.status,
    );
  
    const error = usePropertyStore(
      (state) => state.error,
    );
  
    const searchQuery = usePropertyStore(
      (state) => state.searchQuery,
    );
  
    const fetchProperties = usePropertyStore(
      (state) => state.fetchProperties,
    );
  
    const setSearchQuery = usePropertyStore(
      (state) => state.setSearchQuery,
    );
  
    useEffect(() => {
      void fetchProperties();
    }, [fetchProperties]);
  
    const filteredProperties =
      useMemo(() => {
        const search =
          searchQuery
            .trim()
            .toLowerCase();
  
        if (!search) {
          return properties;
        }
  
        return properties.filter(
          (property) => {
            const searchableText = [
              property.title,
              property.address.street_address,
              property.address.city,
              property.address.state,
              property.address.zip,
              property.property_type,
            ]
              .join(" ")
              .toLowerCase();
  
            return searchableText.includes(
              search,
            );
          },
        );
      }, [properties, searchQuery]);
  
    const featuredProperties =
      useMemo(
        () =>
          filteredProperties.filter(
            (property) =>
              property.featured,
          ),
        [filteredProperties],
      );
  
    function handlePropertyPress(
      property: Property,
    ) {
      /*
       * Later:
       *
       * router.push(
       *   `/properties/${property.id}`
       * );
       */
  
      console.log(
        "Property selected:",
        property.id,
      );
    }
  
    const initialLoading =
      status === "loading" &&
      properties.length === 0;
  
    const refreshing =
      status === "loading" &&
      properties.length > 0;
  
    return (
      <SafeAreaView className="flex-1 bg-slate-50">
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                void fetchProperties();
              }}
            />
          }
        >
          {/* Header */}
          <View className="px-5 pt-4">
            <Text className="text-sm font-medium text-slate-500">
              Find your next home
            </Text>
  
            <Text className="mt-1 text-3xl font-bold text-slate-950">
              Discover Properties
            </Text>
          </View>
  
          {/* Search */}
          <View className="px-5 pt-6">
            <TextInput
              value={searchQuery}
              onChangeText={
                setSearchQuery
              }
              placeholder="Search city, state, or address"
              placeholderTextColor="#94a3b8"
              className="h-14 rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900"
            />
          </View>
  
          {/* Initial loading */}
          {initialLoading && (
            <View className="items-center py-20">
              <ActivityIndicator />
  
              <Text className="mt-4 text-slate-500">
                Loading properties...
              </Text>
            </View>
          )}
  
          {/* Error */}
          {status === "error" && (
            <View className="mx-5 mt-6 rounded-2xl bg-red-50 p-4">
              <Text className="font-semibold text-red-700">
                Unable to load properties
              </Text>
  
              <Text className="mt-1 text-sm text-red-600">
                {error}
              </Text>
  
              <Pressable
                onPress={() => {
                  void fetchProperties();
                }}
                className="mt-4 self-start rounded-xl bg-red-600 px-4 py-2"
              >
                <Text className="font-semibold text-white">
                  Try Again
                </Text>
              </Pressable>
            </View>
          )}
  
          {!initialLoading && (
            <>
              {/* Featured */}
              {featuredProperties.length >
                0 && (
                <View className="pt-8">
                  <View className="mb-4 flex-row items-center justify-between px-5">
                    <Text className="text-xl font-bold text-slate-900">
                      Featured
                    </Text>
                  </View>
  
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={
                      false
                    }
                    contentContainerStyle={{
                      paddingHorizontal: 20,
                      gap: 16,
                    }}
                  >
                    {featuredProperties.map(
                      (property) => (
                        <View
                          key={
                            property.id
                          }
                          className="w-80"
                        >
                          <PropertyCard
                            property={
                              property
                            }
                            onPress={
                              handlePropertyPress
                            }
                          />
                        </View>
                      ),
                    )}
                  </ScrollView>
                </View>
              )}
  
              {/* New Listings */}
              <View className="px-5 pb-12 pt-8">
                <Text className="mb-4 text-xl font-bold text-slate-900">
                  New Listings
                </Text>
  
                {filteredProperties.length ===
                0 ? (
                  <View className="items-center rounded-3xl bg-white px-6 py-14">
                    <Text className="text-lg font-semibold text-slate-900">
                      No properties found
                    </Text>
  
                    <Text className="mt-2 text-center text-slate-500">
                      Try another city,
                      address, or property
                      type.
                    </Text>
                  </View>
                ) : (
                  <View className="gap-5">
                    {filteredProperties.map(
                      (property) => (
                        <PropertyCard
                          key={
                            property.id
                          }
                          property={
                            property
                          }
                          onPress={
                            handlePropertyPress
                          }
                        />
                      ),
                    )}
                  </View>
                )}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }