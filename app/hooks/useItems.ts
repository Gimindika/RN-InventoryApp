import { useState } from "react"
import { async } from "validate.js"
import {
  getAllItems,
  getItemsLength,
  getItemsByCategory,
  getItemsByName,
  getItemsByUnit,
  insertItem,
} from "../controllers"
import { IItem, ICategory, IUnit } from "../models/interfaces"

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

  const fetchItemsByUnit = async (selectedUnit: IUnit) => {
    try {
      let fetchedItems: IItem[] = []
      if (selectedUnit.id !== "0") {
        fetchedItems = await getItemsByUnit(selectedUnit.id)
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

  const addItem = async (item: IItem) => {
    try {
      item = { ...item, id: (getItemsLength() + 1).toString() }
      insertItem(item)
    } catch (error) {
      console.log("Fail to add Item ", error)
    }
  }

  return { items, fetchItems, addItem, fetchItemsByCategory, fetchItemsByUnit, searchItems }
}
