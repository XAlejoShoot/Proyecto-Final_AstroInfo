import { useContext } from "react"
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../navigation/AppNavigator"
import { PlanetContext } from "../contexts/PlanetContext"

type PlanetsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const getPlanetBorderColor = (planetId: string) => {
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

const PlanetsScreen = () => {
  const navigation = useNavigation<PlanetsScreenNavigationProp>()
  const { planets } = useContext(PlanetContext)

  const renderPlanetItem = ({ item }: { item: any }) => {
    const borderColor = getPlanetBorderColor(item.id)
    
    return (
      <TouchableOpacity
        style={[styles.planetCard, { borderColor }]}
        onPress={() => navigation.navigate("PlanetDetail", { planetId: item.id })}
      >
        <View style={[styles.planetImageContainer, { borderColor }]}>
          <Image source={{ uri: item.image }} style={styles.planetImage} resizeMode="cover" />
        </View>
        <View style={styles.planetInfo}>
          <Text style={styles.planetName}>{item.name}</Text>
          <Text style={styles.planetDescription} numberOfLines={2}>
            {item.description.substring(0, 100)}...
          </Text>
          
          <View style={styles.planetFooter}>
            <View style={styles.moonsInfo}>
              <Text style={styles.moonsCount}>
                {item.moons ? item.moons.length : 0} {item.moons && item.moons.length === 1 ? 'luna' : 'lunas'}
              </Text>
            </View>
            <Text style={[styles.distanceValue, { color: borderColor }]}>
              {item.distanceFromSun}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Explorador del Sistema Solar</Text>
          <Text style={styles.subheader}>
            Explora los ocho planetas de nuestro sistema solar. Toca un planeta para conocer más sobre sus características, composición y datos interesantes.
          </Text>
        </View>
        
        <FlatList
          data={planets}
          renderItem={renderPlanetItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={4}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
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
    backgroundColor: 'rgba(13, 13, 35, 0.85)', // Fondo semi-transparente para mejorar la legibilidad
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 15,
    textAlign: "center",
  },
  subheader: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  planetCard: {
    flex: 1,
    backgroundColor: 'rgba(25, 25, 55, 0.8)',
    borderRadius: 12,
    margin: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderLeftWidth: 4,
    maxWidth: '25%',
  },
  planetImageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#000',
    borderBottomWidth: 1,
  },
  planetImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  planetInfo: {
    padding: 12,
  },
  planetName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  planetDescription: {
    fontSize: 12,
    color: "#BBBBBB",
    marginBottom: 10,
    lineHeight: 16,
  },
  planetFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  moonsInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  moonsCount: {
    fontSize: 12,
    color: "#AAAAAA",
  },
  distanceValue: {
    fontSize: 12,
    fontWeight: "bold",
  },
})

export default PlanetsScreen