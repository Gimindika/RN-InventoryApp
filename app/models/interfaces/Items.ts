import { ICategory } from "./Category"
import { IUnit } from "./Units"

export interface IItem {
  id: string
  name: string
  category: ICategory
  quantity: number
  unit: IUnit
}
