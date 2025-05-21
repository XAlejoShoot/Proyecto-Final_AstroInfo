import { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Ionicons } from "@expo/vector-icons"

// Define the APOD data type
interface ApodData {
  date: string
  explanation: string
  media_type: string
  title: string
  url: string
  hdurl?: string
  copyright?: string
}

const ApodScreen = () => {
  const [apodData, setApodData] = useState<ApodData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [date, setDate] = useState<Date>(new Date())
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

  const API_KEY = "dLY28Imof2YGrdUuIbAp1Z9N52og5oopsa4nT3Ig"

  const fetchApodData = async (selectedDate: Date) => {
    setLoading(true)
    setError(null)

    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${formattedDate}`)

      if (!response.ok) {
        throw new Error("No se pudo obtener la imagen astronómica del día")
      }

      const data = await response.json()
      setApodData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error desconocido")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApodData(date)
  }, [])

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setDate(selectedDate)
      fetchApodData(selectedDate)
    }
  }

  const showDatepicker = () => {
    setShowDatePicker(true)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.datePickerContainer}>
        <Text style={styles.dateLabel}>Selecciona una fecha:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
          <Text style={styles.dateButtonText}>{format(date, "dd MMMM yyyy", { locale: es })}</Text>
          <Ionicons name="calendar-outline" size={20} color="#6200ee" />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
            minimumDate={new Date(1995, 5, 16)} // APOD started on June 16, 1995
          />
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ee" />
          <Text style={styles.loadingText}>Cargando imagen...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={50} color="#d32f2f" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => fetchApodData(date)}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : apodData ? (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{apodData.title}</Text>
          <Text style={styles.date}>{format(new Date(apodData.date), "dd MMMM yyyy", { locale: es })}</Text>

          {apodData.media_type === "image" ? (
            <Image source={{ uri: apodData.url }} style={styles.image} resizeMode="contain" />
          ) : apodData.media_type === "video" ? (
            <View style={styles.videoContainer}>
              <Text style={styles.videoText}>Este contenido es un video. Visita el siguiente enlace para verlo:</Text>
              <TouchableOpacity>
                <Text style={styles.videoLink}>{apodData.url}</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>Explicación:</Text>
            <Text style={styles.explanation}>{apodData.explanation}</Text>
          </View>

          {apodData.copyright && <Text style={styles.copyright}>© {apodData.copyright}</Text>}
        </View>
      ) : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  datePickerContainer: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#6200ee",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#6200ee",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  date: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  videoContainer: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  videoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  videoLink: {
    fontSize: 14,
    color: "#6200ee",
    textDecorationLine: "underline",
  },
  explanationContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  explanation: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  copyright: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
})

export default ApodScreen