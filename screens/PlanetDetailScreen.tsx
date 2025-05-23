import { useContext } from "react"
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, TouchableOpacity } from "react-native"
import { type RouteProp, useRoute } from "@react-navigation/native"
import type { RootStackParamList } from "../navigation/AppNavigator"
import { PlanetContext } from "../contexts/PlanetContext"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, type NavigationProp } from "@react-navigation/native"


type PlanetDetailScreenRouteProp = RouteProp<RootStackParamList, "PlanetDetail">

const getPlanetColor = (planetId: string) => {
  const colors: { [key: string]: string } = {
    mercury: "#757575",
    venus: "#FFA726",
    earth: "#29B6F6",
    mars: "#EF5350",
    jupiter: "#FFD54F",
    saturn: "#FFCA28",
    uranus: "#26A69A",
    neptune: "#5C6BC0"
  }
  return colors[planetId] || "#FFFFFF"
}

const PlanetDetailScreen = () => {
  const route = useRoute<PlanetDetailScreenRouteProp>()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const { planetId } = route.params
  const { getPlanetById } = useContext(PlanetContext)

  const planet = getPlanetById(planetId)
  const planetColor = getPlanetColor(planetId)

  if (!planet) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Planeta no encontrado</Text>
      </View>
    )
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
        
        <View style={styles.planetImageContainer}>
          <Image source={{ uri: planet.image }} style={styles.planetImage} resizeMode="contain" />
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.planetName, { color: planetColor }]}>{planet.name}</Text>
          <Text style={styles.planetType}>{planet.type}</Text>

          <View style={styles.divider} />

          <View style={styles.statsContainer}>
            <View style={[styles.statItem, { borderColor: planetColor }]}>
              <Ionicons name="planet-outline" size={24} color={planetColor} />
              <Text style={styles.statLabel}>Diámetro</Text>
              <Text style={[styles.statValue, { color: planetColor }]}>{planet.diameter}</Text>
            </View>

            <View style={[styles.statItem, { borderColor: planetColor }]}>
              <Ionicons name="sunny-outline" size={24} color={planetColor} />
              <Text style={styles.statLabel}>Dist. del Sol</Text>
              <Text style={[styles.statValue, { color: planetColor }]}>{planet.distanceFromSun}</Text>
            </View>

            <View style={[styles.statItem, { borderColor: planetColor }]}>
              <Ionicons name="time-outline" size={24} color={planetColor} />
              <Text style={styles.statLabel}>Día</Text>
              <Text style={[styles.statValue, { color: planetColor }]}>{planet.dayLength}</Text>
            </View>

            <View style={[styles.statItem, { borderColor: planetColor }]}>
              <Ionicons name="calendar-outline" size={24} color={planetColor} />
              <Text style={styles.statLabel}>Año</Text>
              <Text style={[styles.statValue, { color: planetColor }]}>{planet.yearLength}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{planet.description}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Características</Text>
          {planet.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color={planetColor} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}

          {planet.moons && planet.moons.length > 0 && (
            <>
              <View style={styles.divider} />
              <Text style={styles.sectionTitle}>Lunas Principales</Text>
              <View style={styles.moonsContainer}>
                {planet.moons.map((moon, index) => (
                  <View key={index} style={[styles.moonItem, { borderColor: planetColor }]}>
                    <Ionicons name="ellipse-outline" size={16} color={planetColor} />
                    <Text style={styles.moonText}>{moon}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(13, 13, 35, 0.85)', // Fondo semi-transparente
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: 'rgba(13, 13, 35, 0.9)',
  },
  errorText: {
    fontSize: 18,
    color: "#d32f2f",
  },
  planetImageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planetImage: {
    width: '80%',
    height: '80%',
  },
  infoContainer: {
    padding: 20,
  },
  planetName: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },
  planetType: {
    fontSize: 18,
    color: "#BBBBBB",
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    backgroundColor: 'rgba(25, 25, 55, 0.8)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    borderLeftWidth: 3,
  },
  statLabel: {
    fontSize: 14,
    color: "#AAAAAA",
    marginTop: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#DDDDDD",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: "#DDDDDD",
    marginLeft: 10,
  },
  moonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  moonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(25, 25, 55, 0.8)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderLeftWidth: 2,
  },
  moonText: {
    fontSize: 14,
    color: "#DDDDDD",
    marginLeft: 6,
  },
})

export default PlanetDetailScreen