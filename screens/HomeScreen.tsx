import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import type { MainTabParamList } from "../navigation/AppNavigator"

import { Ionicons } from '@expo/vector-icons';


type HomeScreenNavigationProp = BottomTabNavigationProp<MainTabParamList>


const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>()

    return (
        <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Image
            source={{
                uri: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            }}
            style={styles.headerImage}
            />
            <Text style={styles.headerTitle}>Bienvenido a AstroInfo</Text>
            <Text style={styles.headerSubtitle}>Explora el universo desde tu dispositivo</Text>
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descubre el Cosmos</Text>
            <Text style={styles.sectionText}>
            AstroInfo te permite explorar el universo a través de imágenes astronómicas impresionantes y datos fascinantes
            sobre nuestro sistema solar.
            </Text>
        </View>

        <View style={styles.featuresContainer}>
            <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate("APOD")}>
            <Ionicons name="planet-outline" size={40} color="#6200ee" />
            <Text style={styles.featureTitle}>Foto Astronómica del Día</Text>
            <Text style={styles.featureText}>
                Explora la imagen astronómica diaria de la NASA con explicaciones detalladas.
            </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate("Planets")}>
            <Ionicons name="planet-outline" size={40} color="#6200ee" />
            <Text style={styles.featureTitle}>Planetas del Sistema Solar</Text>
            <Text style={styles.featureText}>Información detallada sobre los planetas de nuestro sistema solar.</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.footer}>
            <Text style={styles.footerText}>
            Proyecto de Daniel Garzon - AstroInfo 🌌 con React Native y datos de la NASA 🚀
            </Text>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        alignItems: "center",
        padding: 20,
    },
    headerImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        textAlign: "center",
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
    },
    section: {
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#666",
    },
    featuresContainer: {
        flexDirection: "column",
        padding: 10,
    },
    featureCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
        color: "#333",
        textAlign: "center",
    },
    featureText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },
    footer: {
        padding: 20,
        alignItems: "center",
    },
    footerText: {
        fontSize: 12,
        color: "#999",
        textAlign: "center",
    },
})

export default HomeScreen