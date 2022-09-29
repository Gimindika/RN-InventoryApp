import { useState } from "react"
import { getAllUnits } from "../controllers"

export function useUnits() {
  const [units, setUnits] = useState([])

  const fetchUnits = async () => {
    try {
      const fetchedUnits = await getAllUnits()
      if (fetchedUnits)
        setUnits([
          {
            id: "0",
            name: "semua",
          },
          ...fetchedUnits,
        ])
    } catch (error) {
      console.log("Fail to fetch Units ", error)
    }
  }

  return [units, fetchUnits] as const
}
