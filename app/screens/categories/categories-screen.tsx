import { DrawerActions } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import HamburgerIcon from "../../../assets/images/icons/Hamburger.png"
import { Button, GradientBackground, Text } from "../../components"
import { useCategories } from "../../hooks"
import { NavigatorParamList } from "../../navigators"
import { FULL, TEXT } from "../../styles"
import { color, spacing } from "../../theme"

export const CATEGORY_LIST_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  width: "100%",
  flexGrow: 1,
}

const CATEGORY_ITEM: ViewStyle = {
  padding: spacing[3],
  marginHorizontal: spacing[4],
  marginVertical: spacing[2],
  borderWidth: 1,
  borderColor: color.palette.primary,
  borderRadius: 10,
}

const ICON_IMAGE: ImageStyle = {
  width: 25,
  height: 25,
}

const HAMBURGER_MENU: ImageStyle = {
  ...ICON_IMAGE,
  marginRight: spacing[3],
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

const TOP_SECTION_CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[4],
}

const Spinner = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" color={color.palette.primary} />
  </View>
)

export const CategoriesScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {
    const [categories, fetchCategories] = useCategories()

    useEffect(() => {
      fetchCategories()
    }, [])

    const openDrawer = () => {
      navigation.dispatch(DrawerActions.openDrawer())
    }

    return (
      <SafeAreaView testID="HomeScreen" style={FULL}>
        <GradientBackground colors={[color.palette.white, color.palette.white]} />
        <View style={TOP_SECTION_CONTAINER}>
          <View style={HEADER_WRAPPER}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={openDrawer}>
                <Image style={HAMBURGER_MENU} source={HamburgerIcon} />
              </TouchableOpacity>
              <Text style={HEADER_TEXT}>Categories</Text>
            </View>
          </View>
        </View>
        <FlatList
          contentContainerStyle={CATEGORY_LIST_CONTAINER}
          scrollEnabled={true}
          data={categories}
          renderItem={({ item }) => (
            <View key={item.id} style={CATEGORY_ITEM}>
              <Text style={TEXT}>{item.name}</Text>
            </View>
          )}
          ListEmptyComponent={Spinner}
        />
        <SafeAreaView
          style={{
            height: 100,
            backgroundColor: color.palette.white,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            text="Tambah"
            style={{
              height: 50,
              width: "50%",
              alignSelf: "center",
              backgroundColor: color.palette.primary,
            }}
            textStyle={{ fontSize: 20 }}
          />
        </SafeAreaView>
      </SafeAreaView>
    )
  },
)
