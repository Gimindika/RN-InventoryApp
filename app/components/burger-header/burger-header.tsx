import { DrawerActions } from "@react-navigation/native"
import React from "react"
import { Image, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import HamburgerIcon from "../../../assets/images/icons/Hamburger.png"
import { Text } from "../../components"
import { navigationRef } from "../../navigators/navigation-utilities"
import { TEXT } from "../../styles"
import { color, spacing } from "../../theme"

interface BurgerHeaderProps {
  title: string
}

const TOP_SECTION_CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[4],
  backgroundColor: color.palette.primary,
}

const ICON_IMAGE: ImageStyle = {
  width: 25,
  height: 25,
}

const HEADER_TEXT: TextStyle = {
  ...TEXT,
  fontSize: 20,
}

const HEADER_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
  justifyContent: "space-between",
  width: "100%",
}

const HAMBURGER_MENU: ImageStyle = {
  ...ICON_IMAGE,
  marginRight: spacing[3],
}

export function BurgerHeader(props: BurgerHeaderProps) {
  const { title } = props

  const openDrawer = () => {
    navigationRef.current.dispatch(DrawerActions.openDrawer())
  }

  return (
    <View style={TOP_SECTION_CONTAINER}>
      <View style={HEADER_WRAPPER}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={openDrawer}>
            <Image style={HAMBURGER_MENU} source={HamburgerIcon} />
          </TouchableOpacity>
          <Text style={HEADER_TEXT}>{title}</Text>
        </View>
      </View>
    </View>
  )
}
