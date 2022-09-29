import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CaretIcon from "../../../assets/images/icons/Caret.png"
import FilterIcon from "../../../assets/images/icons/Filter.png"
import { GradientBackground, Text, TextField } from "../../components"
import { BurgerHeader } from "../../components/burger-header/burger-header"
import { useCategories, useItems } from "../../hooks"
import { ICategory } from "../../models/interfaces"
import { NavigatorParamList } from "../../navigators"
import { FULL } from "../../styles"
import { color, spacing } from "../../theme"
import CategoryPicker from "./category-picker"
import {
  FILTER_BUTTON,
  FILTER_WRAPPER,
  ICON_IMAGE,
  PRODUCT_LIST_CONTAINER,
  SLIDER_CONTAINER,
  SLIDER_TEXT,
} from "./home-screen.styles"
import { ProductListItem } from "./product-list-item"

interface TopSectionProps {
  toggleShowCategories: () => void
  selectedCategory: ICategory
  searchText: string
  setSearchText: (text: string) => void
  searchItems: (text: string) => void
}

const TopSection: FC<TopSectionProps> = ({
  selectedCategory,
  toggleShowCategories,
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

        <View style={FILTER_WRAPPER}>
          {/* {Picker start} */}
          <TouchableOpacity style={SLIDER_CONTAINER} onPress={toggleShowCategories}>
            <Text style={SLIDER_TEXT} text={selectedCategory.name} />
            <Image style={ICON_IMAGE} source={CaretIcon} />
          </TouchableOpacity>
          {/* Picker end */}

          {/* Filter button */}
          <TouchableOpacity style={FILTER_BUTTON}>
            <Image style={ICON_IMAGE} source={FilterIcon} />
          </TouchableOpacity>
          {/* end of filter button */}
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
    const { items, fetchItems, fetchItemsByCategory, searchItems } = useItems()

    const [searchText, setSearchText] = useState("")
    const [showCategories, setShowCategories] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState({
      id: "0",
      name: "semua",
    })

    useEffect(() => {
      fetchCategories()
      fetchItems()
    }, [])

    const toggleShowCategories = () => {
      setShowCategories(!showCategories)
    }

    const selectCategory = (category: ICategory) => {
      setSelectedCategory(category)
      fetchItemsByCategory(category)
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
      </SafeAreaView>
    )
  },
)
