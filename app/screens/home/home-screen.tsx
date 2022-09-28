import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CaretIcon from "../../../assets/images/icons/Caret.png"
import FilterIcon from "../../../assets/images/icons/Filter.png"
import { GradientBackground, Text, TextField } from "../../components"
import { getAllItems, getItemsByCategory, getItemsByName } from "../../controllers"
import { useCategories } from "../../hooks"
import { ICategory, IItem } from "../../models/interfaces"
import { NavigatorParamList } from "../../navigators"
import { FULL } from "../../styles"
import { color } from "../../theme"
import CategoryPicker from "./category-picker"
import {
  FILTER_BUTTON,
  FILTER_WRAPPER,
  HEADER_TEXT,
  HEADER_WRAPPER,
  ICON_IMAGE,
  PRODUCT_LIST_CONTAINER,
  SLIDER_CONTAINER,
  SLIDER_TEXT,
  TOP_SECTION_CONTAINER,
} from "./home-screen.styles"
import { ProductListItem } from "./product-list-item"

interface TopSectionProps {
  toggleShowCategories: () => void
  selectedCategory: ICategory
  searchText: string
  setSearchText: (text: string) => void
  setItems: (items: IItem[]) => void
}

const TopSection: FC<TopSectionProps> = ({
  selectedCategory,
  toggleShowCategories,
  searchText,
  setSearchText,
  setItems,
}: TopSectionProps) => {
  // Search function, REFACTOR LATER
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

  return (
    <View style={TOP_SECTION_CONTAINER}>
      <View style={HEADER_WRAPPER}>
        <Text style={HEADER_TEXT}>Mang Jarwo</Text>
        <Text style={HEADER_TEXT}>16/Sep/2022</Text>
      </View>

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
  )
}

const Spinner = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" color={color.palette.primary} />
  </View>
)

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const [categories, fetchCategories] = useCategories()

    const [searchText, setSearchText] = useState("")
    const [items, setItems] = useState([])
    const [showCategories, setShowCategories] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState({
      id: "0",
      name: "semua",
    })

    useEffect(() => {
      const fetchItems = async () => {
        try {
          const fetchedItems = await getAllItems()
          if (fetchedItems) setItems(fetchedItems)
        } catch (error) {
          console.log("Fail to fetch Items ", error)
        }
      }

      fetchCategories()
      fetchItems()
    }, [])

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
              setItems={setItems}
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
