import React, { FC } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import CaretIcon from "../../../assets/images/icons/Caret.png"
import { Text, TextField } from "../../components"
import { BurgerHeader } from "../../components/burger-header/burger-header"
import { ICategory, IUnit } from "../../models/interfaces"
import { color, spacing } from "../../theme"
import { HEADER_WRAPPER, ICON_IMAGE, SLIDER_CONTAINER, SLIDER_TEXT } from "./home.screen.styles"

interface ListHeaderProps {
  toggleShowCategories: () => void
  selectedCategory: ICategory
  toggleShowUnits: () => void
  selectedUnit: IUnit
  searchText: string
  setSearchText: (text: string) => void
  searchItems: (text: string) => void
}

export const ListHeader: FC<ListHeaderProps> = ({
  selectedCategory,
  toggleShowCategories,
  selectedUnit,
  toggleShowUnits,
  searchText,
  setSearchText,
  searchItems,
}: ListHeaderProps) => {
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
            <Text preset="fieldLabel" text={"Category"} />
            <TouchableOpacity style={SLIDER_CONTAINER} onPress={toggleShowCategories}>
              <Text style={SLIDER_TEXT} text={selectedCategory.name} />
              <Image style={ICON_IMAGE} source={CaretIcon} />
            </TouchableOpacity>
          </View>
          {/* Picker end */}

          {/* {Picker start} */}
          <View style={{ flex: 1 }}>
            <Text preset="fieldLabel" text={"Unit"} />
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
