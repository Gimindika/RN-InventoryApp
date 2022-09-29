import { useState } from "react"
import { getAllItems, getItemsByCategory, getItemsByName } from "../controllers"
import { IItem, ICategory } from "../models/interfaces"

export function useItems() {
  const [items, setItems] = useState([])

  const fetchItems = async () => {
    try {
      const fetchedItems = await getAllItems()
      if (fetchedItems) setItems(fetchedItems)
    } catch (error) {
      console.log("Fail to fetch Items ", error)
    }
  }

  const fetchItemsByCategory = async (selectedCategory: ICategory) => {
    try {
      let fetchedItems: IItem[] = []
      if (selectedCategory.id !== "0") {
        fetchedItems = await getItemsByCategory(selectedCategory.id)
      } else {
        fetchedItems = await getAllItems()
      }
      setItems(fetchedItems)
    } catch (error) {
      console.log("Fail to fetch Items ", error)
    }
  }

  const searchItems = async (text: string) => {
    try {
      let fetchedItems: IItem[] = []
      if (text.length > 2) {
        fetchedItems = await getItemsByName(text)
      } else if (text === "") {
        fetchedItems = await getAllItems()
      }
      setItems(fetchedItems)
    } catch (error) {
      console.log("Fail to fetch Items ", error)
    }
  }

  return { items, fetchItems, fetchItemsByCategory, searchItems }
}
