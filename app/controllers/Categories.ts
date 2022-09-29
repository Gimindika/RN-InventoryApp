import { ICategory } from "../models/interfaces/"

let dummyCategories: ICategory[] = [
  {
    id: "1",
    name: "beras",
  },
  {
    id: "2",
    name: "minyak",
  },
  {
    id: "3",
    name: "mie instan",
  },
  {
    id: "4",
    name: "air mineral",
  },
  {
    id: "5",
    name: "beras2",
  },
  {
    id: "6",
    name: "minyak2",
  },
  {
    id: "7",
    name: "mie instan2",
  },
  {
    id: "8",
    name: "air mineral2",
  },
  {
    id: "9",
    name: "beras22",
  },
  {
    id: "10",
    name: "minyak22",
  },
  {
    id: "11",
    name: "mie instan22",
  },
  {
    id: "12",
    name: "air mineral22",
  },
]

export const getAllCategories = () => {
  return dummyCategories
}

export const getCategoryById = (id: string) => {
  return dummyCategories.find((c) => c.id === id)
}

export const insertCategory = (category: ICategory) => {
  dummyCategories.push(category)
  return category
}

export const updateCategory = (category: ICategory) => {
  dummyCategories = dummyCategories.map((c) => {
    if (c.id !== category.id) {
      return c
    } else {
      return category
    }
  })
  return category
}

export const deleteCategory = (id: string) => {
  dummyCategories = dummyCategories.filter((c) => {
    c.id !== id
  })
  return id
}
