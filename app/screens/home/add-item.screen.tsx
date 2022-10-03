import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { default as React, FC, useEffect, useState } from "react"
import { Image, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CaretIcon from "../../../assets/images/icons/Caret.png"
import { Button, GradientBackground, PickerModal, Text, TextField } from "../../components"
import { useCategories, useItems, useUnits } from "../../hooks"
import { ICategory, IItem, IUnit } from "../../models/interfaces"
import { NavigatorParamList } from "../../navigators"
import { FULL, TEXT } from "../../styles"
import { color, spacing } from "../../theme"
import { FILTER_ITEM_ALL } from "./constants"
import { HEADER_WRAPPER, ICON_IMAGE, SLIDER_CONTAINER, SLIDER_TEXT } from "./home.screen.styles"

const CONTAINER: ViewStyle = {
  width: "100%",
  height: "30%",
  alignItems: "center",
  alignSelf: "center",
}

const BUTTON_CONTAINER: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  justifyContent: "space-around",
}

const BUTTON: ViewStyle = {
  height: 50,
  width: "50%",
  alignSelf: "center",
  backgroundColor: color.palette.white,
}

const BUTTON_TEXT: TextStyle = { fontSize: 20, color: color.palette.primary }

export const AddItemScreen: FC<StackScreenProps<NavigatorParamList, "addItem">> = observer(
  ({ navigation }) => {
    const [categories, fetchCategories] = useCategories()
    const [units, fetchUnits] = useUnits()

    const [itemName, setItemName] = useState("")
    const [itemQuantity, setItemQuantity] = useState("")

    const [showCategories, setShowCategories] = useState(false)
    const [showUnits, setShowUnits] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(FILTER_ITEM_ALL)
    const [selectedUnit, setSelectedUnit] = useState(FILTER_ITEM_ALL)

    const { addItem: addItemHook } = useItems()

    useEffect(() => {
      fetchCategories()
      fetchUnits()
    }, [])

    const toggleShowCategories = () => {
      setShowCategories(!showCategories)
    }

    const selectCategory = (category: ICategory) => {
      setSelectedCategory(category)
    }

    const toggleShowUnits = () => {
      setShowUnits(!showUnits)
    }

    const selectUnit = (unit: IUnit) => {
      setSelectedUnit(unit)
    }

    const addItem = () => {
      if (itemName === "") {
        console.log("ALERT USER ")
        return
      }
      if (itemQuantity === "") {
        console.log("ALERT USER ")
        return
      }
      if (selectedCategory.id === "0") {
        console.log("ALERT USER ")
        return
      }

      if (selectedUnit.id === "0") {
        console.log("ALERT USER ")
        return
      }

      let item: IItem = {
        id: "0",
        name: itemName,
        quantity: parseInt(itemQuantity),
        category: selectedCategory,
        unit: selectedUnit,
      }

      addItemHook(item)
      navigation.pop()
    }

    return (
      <SafeAreaView
        testID="AddItemScreen"
        style={{ ...FULL, padding: spacing[4], alignItems: "center", justifyContent: "center" }}
      >
        <GradientBackground colors={[color.palette.primary, color.palette.white]} />

        <View style={CONTAINER}>
          <View
            style={{
              marginBottom: spacing[5],
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={TEXT}>Tambah Item</Text>

            <View style={{ flexDirection: "row" }}>
              <TextField
                placeholder="Beras Selancar"
                label="Nama Item"
                style={{ width: "75%", marginRight: spacing[4] }}
                value={itemName}
                onChangeText={(text) => {
                  setItemName(text)
                }}
              />
              <TextField
                placeholder="200"
                style={{ width: "20%" }}
                label="Quantity"
                value={itemQuantity}
                onChangeText={(text) => {
                  setItemQuantity(text)
                }}
                keyboardType="numeric"
              />
            </View>
          </View>
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
        <View style={BUTTON_CONTAINER}>
          <Button
            style={{
              ...BUTTON,
              marginRight: spacing[6],
            }}
            textStyle={BUTTON_TEXT}
            text="Tambah"
            onPress={() => addItem()}
          />
          <Button
            style={BUTTON}
            textStyle={BUTTON_TEXT}
            text="Batal"
            onPress={() => navigation.pop()}
          />
        </View>

        <PickerModal
          visible={showCategories}
          items={categories}
          toggleShowItems={toggleShowCategories}
          selectItem={selectCategory}
        />
        <PickerModal
          visible={showUnits}
          items={units}
          toggleShowItems={toggleShowUnits}
          selectItem={selectUnit}
        />
      </SafeAreaView>
    )
  },
)
