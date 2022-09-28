import React, { FC } from "react"
import { Modal, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { ICategory } from "../../models/interfaces"
import { TEXT } from "../../styles"
import { color, spacing } from "../../theme"

interface CategoryPickerProps {
  visible: boolean
  toggleShowCategories: () => void
  selectCategory: (category: ICategory) => void
  categories: ICategory[]
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center",
  height: "50%",
  width: "80%",
  borderColor: color.palette.primary,
  borderRadius: 10,
  borderWidth: 1,
  marginTop: "25%",
}

const OVERLAY: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  height: "100%",
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
      <View style={OVERLAY}>
        <View style={CONTAINER}>
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
      </View>
    </Modal>
  )
}

export default CategoryPicker
