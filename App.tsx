import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import AppNavigator from "./navigation/AppNavigator"
import { PlanetProvider } from "./contexts/PlanetContext"

export default function App() {
  return (
    <SafeAreaProvider>
      <PlanetProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
        </NavigationContainer>
      </PlanetProvider>
    </SafeAreaProvider>
  )
}