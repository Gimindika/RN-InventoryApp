import React, { FC } from "react"
import { View } from "react-native"
import { Button } from "../../components"
import { color } from "../../theme"

export const AddButton: FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <View
      style={{
        height: 100,
        backgroundColor: color.palette.primary,
        justifyContent: "center",
      }}
    >
      <Button
        text="Tambah"
        onPress={onPress}
        style={{
          height: 50,
          width: "50%",
          alignSelf: "center",
          backgroundColor: color.palette.white,
        }}
        textStyle={{ fontSize: 20, color: color.palette.primary }}
      />
    </View>
  )
}
