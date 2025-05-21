import { Ionicons as ExpoIonicons } from "@expo/vector-icons"

// This is a wrapper component to make Ionicons work in the code
export const Ionicons = ({ name, size, color }: { name: any; size: number; color: string }) => {
    return <ExpoIonicons name={name} size={size} color={color} />
}

export default Ionicons