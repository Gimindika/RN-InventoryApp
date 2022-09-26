import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  Image,
  ImageStyle,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { GradientBackground, Text, TextField } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { FULL, TEXT } from "../../styles"
import { color, spacing } from "../../theme"
import { ProductListItem } from "./product-list-item"
import FilterIcon from "../../../assets/images/icons/Filter.png"
import CaretIcon from "../../../assets/images/icons/Caret.png"
import { dummyCategory, dummyItem, dummyUnit } from "../../utils/dummy/dummy"

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

const FILTER_WRAPPER: ViewStyle = {
  ...HEADER_WRAPPER,
  marginTop: spacing[2],
}

const SLIDER_CONTAINER: ViewStyle = {
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

const SLIDER_TEXT: TextStyle = {
  color: color.palette.black,
  fontSize: 18,
}

const FILTER_BUTTON: ViewStyle = {
  minHeight: 44,
  backgroundColor: color.palette.white,
  borderRadius: 10,
  paddingHorizontal: spacing[4],

  width: 44,
  justifyContent: "center",
  alignItems: "center",
}

const PRODUCT_LIST_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  borderRadius: 10,
  width: "100%",
  paddingBottom: spacing[5],
  flexGrow: 1,
}

const TOP_SECTION_CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[4],
  backgroundColor: color.palette.primary,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
}

const ICON_IMAGE: ImageStyle = {
  width: 25,
  height: 25,
}

const TopSection: FC = () => {
  const [showCategory, setShowCategory] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <View style={TOP_SECTION_CONTAINER}>
      <View style={HEADER_WRAPPER}>
        <Text style={HEADER_TEXT}>Mang Jarwo</Text>
        <Text style={HEADER_TEXT}>16/Sep/2022</Text>
      </View>

      <TextField placeholder="Cari..." />

      <View style={FILTER_WRAPPER}>
        {/* {Picker start} */}
        <TouchableOpacity style={SLIDER_CONTAINER}>
          <Text style={SLIDER_TEXT} text={"Semua"} />
          <Image style={ICON_IMAGE} source={CaretIcon} />
        </TouchableOpacity>
        {/* Picker end */}

        {/* Filter button */}
        <TouchableOpacity style={FILTER_BUTTON}>
          <Image style={ICON_IMAGE} source={FilterIcon} />
        </TouchableOpacity>
        {/* end of filter button */}
      </View>
    </View>
  )
}

const Spinner = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" color={color.palette.primary} />
  </View>
)

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    return (
      <SafeAreaView testID="HomeScreen" style={FULL}>
        <GradientBackground colors={[color.palette.primary, color.palette.white]} />
        <FlatList
          contentContainerStyle={PRODUCT_LIST_CONTAINER}
          scrollEnabled={true}
          data={dummyItem}
          renderItem={({ item }) => (
            <ProductListItem
              id={item.id}
              name={item.name}
              category={item.category.name}
              quantity={item.quantity}
              unit={item.unit.name}
            />
          )}
          ListHeaderComponent={TopSection}
          ListEmptyComponent={Spinner}
        />
      </SafeAreaView>
    )
  },
)
