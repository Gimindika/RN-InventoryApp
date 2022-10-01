import React, { FC } from "react"
import { Modal, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { IUnit } from "../../models/interfaces"
import { TEXT } from "../../styles"
import { color, spacing } from "../../theme"

interface UnitPickerProps {
  visible: boolean
  toggleShowUnits: () => void
  selectUnit: (unit: IUnit) => void
  units: IUnit[]
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

const UnitPicker: FC<UnitPickerProps> = ({
  visible,
  toggleShowUnits,
  selectUnit,
  units,
}: UnitPickerProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={toggleShowUnits}
    >
      <View style={OVERLAY}>
        <View style={CONTAINER}>
          {units.map((unit) => {
            return (
              <TouchableOpacity
                key={unit.id}
                style={{ marginVertical: spacing[2] }}
                onPress={() => {
                  selectUnit(unit)
                  toggleShowUnits()
                }}
              >
                <Text style={TEXT}> {unit.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </Modal>
  )
}

export default UnitPicker
