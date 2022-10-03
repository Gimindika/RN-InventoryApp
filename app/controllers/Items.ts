import { IItem } from "../models/interfaces"

let dummyItem = [
  {
    id: "1",
    name: "Beras Selancar",
    category: {
      id: "1",
      name: "beras",
    },
    quantity: 20,
    unit: {
      id: "1",
      name: "zak",
    },
  },
  {
    id: "2",
    name: "Indomie Goreng",
    category: {
      id: "3",
      name: "mie instan",
    },
    quantity: 200,
    unit: {
      id: "2",
      name: "dus",
    },
  },
  {
    id: "3",
    name: "Minyak Fortune 1L",
    category: {
      id: "2",
      name: "minyak",
    },
    quantity: 50,
    unit: {
      id: "2",
      name: "dus",
    },
  },
  {
    id: "4",
    name: "Beras Burung",
    category: {
      id: "1",
      name: "beras",
    },
    quantity: 250,
    unit: {
      id: "1",
      name: "zak",
    },
  },
  {
    id: "5",
    name: "Aqua Galon",
    category: {
      id: "4",
      name: "air mineral",
    },
    quantity: 80,
    unit: {
      id: "3",
      name: "galon",
    },
  },
]

export const getAllItems = () => {
  return dummyItem
}

export const getItemsLength = () => {
  return dummyItem.length
}

export const getItemsById = (id: string) => {
  return dummyItem.find((i) => i.id === id)
}

export const getItemsByCategory = (id: string) => {
  return dummyItem.filter((i) => i.category.id === id)
}

export const getItemsByUnit = (id: string) => {
  return dummyItem.filter((i) => i.unit.id === id)
}

export const getItemsByName = (searchText: string): IItem[] => {
  const filteredItems = dummyItem.filter(
    (item) => item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
  )
  return filteredItems
}

export const insertItem = (item: IItem) => {
  
  dummyItem.push(item)
  return item
}

export const updateItem = (item: IItem) => {
  dummyItem = dummyItem.map((i) => {
    if (i.id !== item.id) {
      return i
    } else {
      return item
    }
  })
  return item
}

export const deleteItem = (id: string) => {
  dummyItem = dummyItem.filter((i) => {
    i.id !== id
  })
  return id
}
