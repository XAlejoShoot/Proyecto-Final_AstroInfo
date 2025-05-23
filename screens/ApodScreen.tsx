import { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Ionicons } from "@expo/vector-icons"

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
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${formattedDate}`
      )
      if (!response.ok) throw new Error("No se pudo obtener la imagen astronómica del día")
      const data = await response.json()
      setApodData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error desconocido")
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

  const handleWebDateChange = (e: any) => {
    try {
      const selectedDate = new Date(e.target.value)
      if (isNaN(selectedDate.getTime())) throw new Error("Fecha inválida")
      setDate(selectedDate)
      fetchApodData(selectedDate)
    } catch (error) {
      setError("Error al seleccionar la fecha. Intenta de nuevo.")
    }
  }

  const showDatepicker = () => setShowDatePicker(true)

  const renderDatePicker = () => {
    const today = new Date()
    const minDate = "1995-06-16"
    const maxDate = format(today, "yyyy-MM-dd")

    return (
      <View style={styles.datePickerContainer}>
        <Text style={styles.dateLabel}>Selecciona una fecha:</Text>
        {Platform.OS === "web" ? (
          <input
            type="date"
            value={format(date, "yyyy-MM-dd")}
            onChange={handleWebDateChange}
            min={minDate}
            max={maxDate}
            style={styles.webInput as any}
          />
        ) : (
          <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
            <Text style={styles.dateButtonText}>
              {format(date, "dd MMMM yyyy", { locale: es })}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={today}
            minimumDate={new Date(1995, 5, 16)}
          />
        )}
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NASA - Imagen del Día</Text>
        {renderDatePicker()}
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#00bcd4" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={48} color="#e53935" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : apodData ? (
        <View style={styles.content}>
          <Text style={styles.title}>{apodData.title}</Text>
          <Text style={styles.date}>{format(new Date(apodData.date), "dd MMMM yyyy", { locale: es })}</Text>

          {apodData.media_type === "image" ? (
            <Image source={{ uri: apodData.url }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.videoBox}>
              <Text style={styles.videoText}>Este contenido es un video. Puedes verlo en:</Text>
              <Text style={styles.videoUrl}>{apodData.url}</Text>
            </View>
          )}

          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>Explicación</Text>
            <Text style={styles.explanation}>{apodData.explanation}</Text>
          </View>

          {apodData.copyright && (
            <Text style={styles.copyright}>Créditos: {apodData.copyright}</Text>
          )}
        </View>
      ) : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
  },
  header: {
    padding: 20,
    backgroundColor: "#1b263b",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00bcd4",
    textAlign: "center",
  },
  datePickerContainer: {
    marginTop: 15,
  },
  dateLabel: {
    color: "#fff",
    marginBottom: 5,
    fontSize: 16,
  },
  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00bcd4",
    padding: 10,
    borderRadius: 6,
  },
  dateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  webInput: {
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: "#fff",
    width: "100%",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#ccc",
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: "#e53935",
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: "#90caf9",
    textAlign: "center",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  videoBox: {
    backgroundColor: "#1b263b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  videoText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  videoUrl: {
    color: "#00bcd4",
    textDecorationLine: "underline",
  },
  explanationBox: {
    backgroundColor: "#1b263b",
    padding: 15,
    borderRadius: 10,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00bcd4",
    marginBottom: 10,
  },
  explanation: {
    color: "#e0e0e0",
    fontSize: 16,
    lineHeight: 24,
  },
  copyright: {
    fontSize: 14,
    color: "#90caf9",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
})

export default ApodScreen