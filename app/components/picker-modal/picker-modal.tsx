import React, { FC } from "react"
import { Modal, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from ".."
import { ICategory, IUnit } from "../../models/interfaces"
import { TEXT } from "../../styles"
import { color, spacing } from "../../theme"

interface PickerModal {
  visible: boolean
  toggleShowItems: () => void
  selectItem: (item: IUnit | ICategory) => void
  items: IUnit[] | ICategory[]
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

export const PickerModal: FC<PickerModal> = ({ visible, toggleShowItems, selectItem, items }: PickerModal) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={toggleShowItems}
    >
      <View style={OVERLAY}>
        <View style={CONTAINER}>
          {items.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={{ marginVertical: spacing[2] }}
                onPress={() => {
                  selectItem(item)
                  toggleShowItems()
                }}
              >
                <Text style={TEXT}> {item.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </Modal>
  )
}
