import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, Modal, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CaretIcon from "../../../assets/images/icons/Caret.png"
import FilterIcon from "../../../assets/images/icons/Filter.png"
import { GradientBackground, Text, TextField } from "../../components"
import { getAllCategories, getAllItems } from "../../controllers"
import { ICategory } from "../../models/interfaces"
import { NavigatorParamList } from "../../navigators"
import { FULL, TEXT } from "../../styles"
import { color, spacing } from "../../theme"
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
  justifyContent: "space-between",

interface CategoryPickerProps {
  visible: boolean
  toggleShowCategories: () => void
  selectCategory: (category: ICategory) => void
  categories: ICategory[]
}

const CategoryPicker: FC<CategoryPickerProps> = ({
  visible,
  toggleShowCategories,
  selectCategory,
  categories,
}: CategoryPickerProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={toggleShowCategories}
    >
      <View
        style={{
          backgroundColor: color.palette.white,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          height: "50%",
          width: "80%",
          borderColor: color.palette.primary,
          borderRadius: 10,
          borderWidth: 1,
        }}
      >
        {categories.map((category) => {
          return (
            <TouchableOpacity
              key={category.id}
              style={{ marginVertical: spacing[2] }}
              onPress={() => {
                selectCategory(category)
                toggleShowCategories()
              }}
            >
              <Text style={TEXT}> {category.name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </Modal>
  )
}

interface TopSectionProps {
  toggleShowCategories: () => void
  selectedCategory: ICategory
}

const TopSection: FC<TopSectionProps> = ({
  selectedCategory,
  toggleShowCategories,
}: TopSectionProps) => {
  return (
    <View style={TOP_SECTION_CONTAINER}>
      <View style={HEADER_WRAPPER}>
        <Text style={HEADER_TEXT}>Mang Jarwo</Text>
        <Text style={HEADER_TEXT}>16/Sep/2022</Text>
      </View>

      <TextField placeholder="Cari..." />

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
    // custom hooks for fetch
    // call fetchCategories() inside CDM useEffect
    // const [categories, fetchCategories] = useCategories()

    const [categories, setCategories] = useState([])
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

      const fetchCategories = async () => {
        try {
          const fetchedCategories = await getAllCategories()
          if (fetchedCategories)
            setCategories([
              {
                id: "0",
                name: "semua",
              },
              ...fetchedCategories,
            ])
        } catch (error) {
          console.log("Fail to fetch Categories ", error)
        }
      }

      fetchCategories()
      fetchItems()
    }, [])

    const toggleShowCategories = () => {
      setShowCategories(!showCategories)
    }

    const selectCategory = (category: ICategory) => {
      setSelectedCategory(category)
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
