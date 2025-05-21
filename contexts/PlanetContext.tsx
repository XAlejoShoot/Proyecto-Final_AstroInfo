import type React from "react"
import { createContext, type ReactNode } from "react"
import planetsData from "../data/planets.json"

// Define the Planet type
export interface Planet {
  id: string
  name: string
  type: string
  diameter: string
  distanceFromSun: string
  dayLength: string
  yearLength: string
  description: string
  features: string[]
  moons?: string[]
  image: string
}

// Define the context type
interface PlanetContextType {
  planets: Planet[]
  getPlanetById: (id: string) => Planet | undefined
}

// Create the context
export const PlanetContext = createContext<PlanetContextType>({
  planets: [],
  getPlanetById: () => undefined,
})

// Create the provider component
interface PlanetProviderProps {
  children: ReactNode
}

export const PlanetProvider: React.FC<PlanetProviderProps> = ({ children }) => {
  const planets: Planet[] = planetsData

  const getPlanetById = (id: string): Planet | undefined => {
    return planets.find((planet) => planet.id === id)
  }

  return <PlanetContext.Provider value={{ planets, getPlanetById }}>{children}</PlanetContext.Provider>
}