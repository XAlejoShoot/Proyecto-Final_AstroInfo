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
        backgroundColor: "#0b0c1e", // Azul oscuro espacial
    },
    header: {
        alignItems: "center",
        padding: 20,
    },
    headerImage: {
        width: "100%",
        height: 220,
        borderRadius: 12,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10,
        textAlign: "center",
        textShadowColor: "#6200ee",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 10,
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#c0c0c0",
        textAlign: "center",
    },
    section: {
        padding: 20,
        backgroundColor: "#1a1c2c",
        borderRadius: 12,
        margin: 10,
        shadowColor: "#6200ee",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#ffffff",
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#c0c0c0",
    },
    featuresContainer: {
        flexDirection: "column",
        padding: 10,
    },
    featureCard: {
        backgroundColor: "#1f2235",
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        alignItems: "center",
        shadowColor: "#00bcd4",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
        borderWidth: 1,
        borderColor: "#292c44",
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
        color: "#ffffff",
        textAlign: "center",
    },
    featureText: {
        fontSize: 14,
        color: "#a0a0a0",
        textAlign: "center",
    },
    footer: {
        padding: 20,
        alignItems: "center",
    },
    footerText: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
    },
})


export default HomeScreen