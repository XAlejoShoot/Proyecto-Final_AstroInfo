import { useContext } from "react"
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../navigation/AppNavigator"
import { PlanetContext } from "../contexts/PlanetContext"

type PlanetsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const PlanetsScreen = () => {
  const navigation = useNavigation<PlanetsScreenNavigationProp>()
  const { planets } = useContext(PlanetContext)

  const renderPlanetItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.planetCard}
      onPress={() => navigation.navigate("PlanetDetail", { planetId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.planetImage} />
      <View style={styles.planetInfo}>
        <Text style={styles.planetName}>{item.name}</Text>
        <Text style={styles.planetType}>{item.type}</Text>
        <View style={styles.planetStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{item.distanceFromSun}</Text>
            <Text style={styles.statLabel}>Dist. del Sol</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{item.diameter}</Text>
            <Text style={styles.statLabel}>Diámetro</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Planetas del Sistema Solar</Text>
      <FlatList
        data={planets}
        renderItem={renderPlanetItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 15,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  planetCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planetImage: {
    width: "100%",
    height: 150,
  },
  planetInfo: {
    padding: 15,
  },
  planetName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  planetType: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  planetStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6200ee",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
})

export default PlanetsScreen