import React from "react"
import { ActivityIndicator, View } from "react-native"
import { color } from "../../theme"

export const Spinner = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" color={color.palette.primary} />
  </View>
)
