import { TextStyle, ViewStyle } from "react-native"
import { color, typography } from "../theme"

export const FULL: ViewStyle = { flex: 1 }

export const TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
}
export const BOLD: TextStyle = { fontWeight: "bold" }

export const DROP_SHADOW: ViewStyle = {
  shadowColor: color.palette.black,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.5,

  elevation: 4,
}
