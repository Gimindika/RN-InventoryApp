import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CaretIcon from "../../../assets/images/icons/Caret.png"
import { GradientBackground, Text, TextField } from "../../components"
import { BurgerHeader } from "../../components/burger-header/burger-header"
import { useCategories, useItems, useUnits } from "../../hooks"
import { ICategory, IUnit } from "../../models/interfaces"
import { NavigatorParamList } from "../../navigators"
import { FULL } from "../../styles"
import { color, spacing } from "../../theme"
import CategoryPicker from "./category-picker"
import {
  HEADER_WRAPPER,
  ICON_IMAGE,
  PRODUCT_LIST_CONTAINER,
  SLIDER_CONTAINER,
  SLIDER_TEXT,
} from "./home-screen.styles"
import { ProductListItem } from "./product-list-item"
import UnitPicker from "./unit-picker"

interface TopSectionProps {
  toggleShowCategories: () => void
  selectedCategory: ICategory
  toggleShowUnits: () => void
  selectedUnit: IUnit
  searchText: string
  setSearchText: (text: string) => void
  searchItems: (text: string) => void
}

const FILTER_ITEM_ALL = {
  id: "0",
  name: "semua",
}

const TopSection: FC<TopSectionProps> = ({
  selectedCategory,
  toggleShowCategories,
  selectedUnit,
  toggleShowUnits,
  searchText,
  setSearchText,
  searchItems,
}: TopSectionProps) => {
  return (
    <View
      style={{
        backgroundColor: color.palette.primary,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
    >
      <BurgerHeader title="Mang Jarwo" />

      <View style={{ paddingHorizontal: spacing[4], paddingBottom: spacing[4] }}>
        {/* search item  */}
        <TextField
          placeholder="Cari..."
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text)
            searchItems(text)
          }}
        />

        <View style={HEADER_WRAPPER}>
          {/* {Picker start} */}
          <View style={{ flex: 1, marginRight: spacing[4] }}>
            <Text preset="fieldLabel" text={"Category"} style={{ marginBottom: spacing[1] }} />
            <TouchableOpacity style={SLIDER_CONTAINER} onPress={toggleShowCategories}>
              <Text style={SLIDER_TEXT} text={selectedCategory.name} />
              <Image style={ICON_IMAGE} source={CaretIcon} />
            </TouchableOpacity>
          </View>
          {/* Picker end */}

          {/* {Picker start} */}
          <View style={{ flex: 1 }}>
            <Text preset="fieldLabel" text={"Unit"} style={{ marginBottom: spacing[1] }} />
            <TouchableOpacity style={SLIDER_CONTAINER} onPress={toggleShowUnits}>
              <Text style={SLIDER_TEXT} text={selectedUnit.name} />
              <Image style={ICON_IMAGE} source={CaretIcon} />
            </TouchableOpacity>
          </View>
          {/* Picker end */}
        </View>
      </View>
    </View>
  )
}

const Spinner = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" color={color.palette.primary} />
  </View>
)

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
            <TopSection
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
        <CategoryPicker
          visible={showCategories}
          categories={categories}
          toggleShowCategories={toggleShowCategories}
          selectCategory={selectCategory}
        />
        <UnitPicker
          visible={showUnits}
          units={units}
          toggleShowUnits={toggleShowUnits}
          selectUnit={selectUnit}
        />
      </SafeAreaView>
    )
  },
)
