import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"

import HomeScreen from "../screens/HomeScreen"
import ApodScreen from "../screens/ApodScreen"
import PlanetsScreen from "../screens/PlanetsScreen"
import PlanetDetailScreen from "../screens/PlanetDetailScreen"

// Define the types for our navigation parameters
export type RootStackParamList = {
    Main: undefined
    PlanetDetail: { planetId: string }
}

export type MainTabParamList = {
    Home: undefined
    APOD: undefined
    Planets: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<MainTabParamList>()

// Main tab navigator
const MainNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home"

            if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline"
            } else if (route.name === "APOD") {
                iconName = focused ? "image" : "image-outline"
            } else if (route.name === "Planets") {
                iconName = focused ? "planet" : "planet-outline"
            }

            return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: "#6200ee",
            tabBarInactiveTintColor: "gray",
            headerStyle: {
            backgroundColor: "#4A0080",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
            fontWeight: "bold",
            },
        })}
        >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: "AstroInfo" }} />
        <Tab.Screen name="APOD" component={ApodScreen} options={{ title: "Foto del Día" }} />
        <Tab.Screen name="Planets" component={PlanetsScreen} options={{ title: "Planetas" }} />
        </Tab.Navigator>
    )
}

// Root stack navigator
const AppNavigator = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
        <Stack.Screen
            name="PlanetDetail"
            component={PlanetDetailScreen}
            options={({ route }) => ({
            title: "Detalles del Planeta",
            headerStyle: {
                backgroundColor: "#6200ee",
            },
            headerTintColor: "#fff",
            })}
        />
        </Stack.Navigator>
    )
}

export default AppNavigator