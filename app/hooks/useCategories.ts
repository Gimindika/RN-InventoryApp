import { useState } from "react"
import { getAllCategories } from "../controllers"

export function useCategories() {
  const [categpries, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getAllCategories()
      if (fetchedCategories)
        setCategories([
          {
            id: "0",
            name: "semua",
          },
          ...fetchedCategories,
        ])
    } catch (error) {
      console.log("Fail to fetch Categories ", error)
    }
  }

  return [categpries, fetchCategories] as const
}
