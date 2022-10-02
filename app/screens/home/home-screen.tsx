import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AddButton, GradientBackground, Picker, Spinner } from "../../components"
import { useCategories, useItems, useUnits } from "../../hooks"
import { ICategory, IUnit } from "../../models/interfaces"
import { NavigatorParamList } from "../../navigators"
import { FULL } from "../../styles"
import { color } from "../../theme"
import { PRODUCT_LIST_CONTAINER } from "./home-screen.styles"
import { ListHeader } from "./list-header"
import { ProductListItem } from "./product-list-item"

const FILTER_ITEM_ALL = {
  id: "0",
  name: "semua",
}

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {
    const [categories, fetchCategories] = useCategories()
    const [units, fetchUnits] = useUnits()
    const { items, fetchItems, fetchItemsByCategory, fetchItemsByUnit, searchItems } = useItems()

    const [searchText, setSearchText] = useState("")
    const [showCategories, setShowCategories] = useState(false)
    const [showUnits, setShowUnits] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(FILTER_ITEM_ALL)
    const [selectedUnit, setSelectedUnit] = useState(FILTER_ITEM_ALL)

    useEffect(() => {
      fetchCategories()
      fetchItems()
      fetchUnits()
    }, [])

    const toggleShowCategories = () => {
      setShowCategories(!showCategories)
    }

    const selectCategory = (category: ICategory) => {
      setSelectedCategory(category)
      fetchItemsByCategory(category)
      setSelectedUnit(FILTER_ITEM_ALL)
    }

    const toggleShowUnits = () => {
      setShowUnits(!showUnits)
    }

    const selectUnit = (unit: IUnit) => {
      setSelectedUnit(unit)
      fetchItemsByUnit(unit)
      setSelectedCategory(FILTER_ITEM_ALL)
    }

    return (
      <SafeAreaView testID="HomeScreen" style={FULL}>
        <GradientBackground colors={[color.palette.primary, color.palette.white]} />
        <FlatList
          contentContainerStyle={PRODUCT_LIST_CONTAINER}
          scrollEnabled={true}
          data={items}
          renderItem={({ item }) => (
            <ProductListItem
              id={item.id}
              name={item.name}
              category={item.category.name}
              quantity={item.quantity}
              unit={item.unit.name}
            />
          )}
          ListHeaderComponent={
            <ListHeader
              selectedCategory={selectedCategory}
              toggleShowCategories={toggleShowCategories}
              selectedUnit={selectedUnit}
              toggleShowUnits={toggleShowUnits}
              searchText={searchText}
              setSearchText={setSearchText}
              searchItems={searchItems}
            />
          }
          ListEmptyComponent={Spinner}
        />
        <Picker
          visible={showCategories}
          items={categories}
          toggleShowItems={toggleShowCategories}
          selectItem={selectCategory}
        />
        <Picker
          visible={showUnits}
          items={units}
          toggleShowItems={toggleShowUnits}
          selectItem={selectUnit}
        />
        <AddButton />
      </SafeAreaView>
    )
  },
)
