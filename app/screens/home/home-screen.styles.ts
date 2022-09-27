import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { TEXT } from "../../styles"
import { color, spacing } from "../../theme"

export const HEADER_TEXT: TextStyle = {
  ...TEXT,
  fontSize: 20,
}

export const HEADER_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
  justifyContent: "space-between",
  width: "100%",
}

export const FILTER_WRAPPER: ViewStyle = {
  ...HEADER_WRAPPER,
  marginTop: spacing[2],
}

export const SLIDER_CONTAINER: ViewStyle = {
  minHeight: 44,
  backgroundColor: color.palette.white,
  paddingHorizontal: spacing[4],
  marginRight: spacing[4],
  flex: 1,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
}

export const SLIDER_TEXT: TextStyle = {
  color: color.palette.black,
  fontSize: 18,
}

export const FILTER_BUTTON: ViewStyle = {
  minHeight: 44,
  backgroundColor: color.palette.white,
  borderRadius: 10,
  paddingHorizontal: spacing[4],

  width: 44,
  justifyContent: "center",
  alignItems: "center",
}

export const PRODUCT_LIST_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  borderRadius: 10,
  width: "100%",
  paddingBottom: spacing[5],
  flexGrow: 1,
}

export const TOP_SECTION_CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[4],
  backgroundColor: color.palette.primary,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
}

export const ICON_IMAGE: ImageStyle = {
  width: 25,
  height: 25,
}
