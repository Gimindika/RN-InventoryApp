import { IUnit } from "../models/interfaces/"

let dummyUnits: IUnit[] = [
  {
    id: "1",
    name: "zak",
  },
  {
    id: "2",
    name: "dus",
  },
  {
    id: "3",
    name: "galon",
  },
  {
    id: "4",
    name: "karung",
  },
]

export const getAllUnits = () => {
  return dummyUnits
}

export const getUnitById = (id: string) => {
  return dummyUnits.find((c) => c.id === id)
}

export const insertUnit = (unit: IUnit) => {
  dummyUnits.push(unit)
  return unit
}

export const updateUnit = (unit: IUnit) => {
  dummyUnits = dummyUnits.map((u) => {
    if (u.id !== unit.id) {
      return u
    } else {
      return unit
    }
  })
  return unit
}

export const deleteUnit = (id: string) => {
  dummyUnits = dummyUnits.filter((u) => {
    u.id !== id
  })
  return id
}
