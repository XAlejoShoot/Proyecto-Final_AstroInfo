import { useContext } from "react"
import { StyleSheet, Text, View, Image, ScrollView } from "react-native"
import { type RouteProp, useRoute } from "@react-navigation/native"
import type { RootStackParamList } from "../navigation/AppNavigator"
import { PlanetContext } from "../contexts/PlanetContext"
import { Ionicons } from "@expo/vector-icons"

type PlanetDetailScreenRouteProp = RouteProp<RootStackParamList, "PlanetDetail">

const PlanetDetailScreen = () => {
  const route = useRoute<PlanetDetailScreenRouteProp>()
  const { planetId } = route.params
  const { getPlanetById } = useContext(PlanetContext)

  const planet = getPlanetById(planetId)

  if (!planet) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Planeta no encontrado</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: planet.image }} style={styles.planetImage} />

      <View style={styles.infoContainer}>
        <Text style={styles.planetName}>{planet.name}</Text>
        <Text style={styles.planetType}>{planet.type}</Text>

        <View style={styles.divider} />

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="planet-outline" size={24} color="#6200ee" />
            <Text style={styles.statLabel}>Diámetro</Text>
            <Text style={styles.statValue}>{planet.diameter}</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="sunny-outline" size={24} color="#6200ee" />
            <Text style={styles.statLabel}>Dist. del Sol</Text>
            <Text style={styles.statValue}>{planet.distanceFromSun}</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={24} color="#6200ee" />
            <Text style={styles.statLabel}>Día</Text>
            <Text style={styles.statValue}>{planet.dayLength}</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="calendar-outline" size={24} color="#6200ee" />
            <Text style={styles.statLabel}>Año</Text>
            <Text style={styles.statValue}>{planet.yearLength}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{planet.description}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Características</Text>
        {planet.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#6200ee" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}

        {planet.moons && planet.moons.length > 0 && (
          <>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Lunas Principales</Text>
            {planet.moons.map((moon, index) => (
              <View key={index} style={styles.moonItem}>
                <Ionicons name="ellipse-outline" size={16} color="#6200ee" />
                <Text style={styles.moonText}>{moon}</Text>
              </View>
            ))}
          </>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#d32f2f",
  },
  planetImage: {
    width: "100%",
    height: 250,
  },
  infoContainer: {
    padding: 20,
  },
  planetName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  planetType: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  moonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  moonText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
})

export default PlanetDetailScreen