import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { ActivityIndicator, FlatList, TouchableOpacity, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, GradientBackground, Text } from "../../components"
import { BurgerHeader } from "../../components/burger-header/burger-header"
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

const Spinner = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" color={color.palette.primary} />
  </View>
)

export const CategoriesScreen: FC<StackScreenProps<NavigatorParamList, "categories">> = observer(
  ({ navigation }) => {
    const [categories, fetchCategories] = useCategories()

    useEffect(() => {
      fetchCategories()
    }, [])

    return (
      <SafeAreaView testID="HomeScreen" style={FULL}>
        <GradientBackground colors={[color.palette.primary, color.palette.primary]} />

        <BurgerHeader title="Categories" />
        <FlatList
          contentContainerStyle={CATEGORY_LIST_CONTAINER}
          scrollEnabled={true}
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} style={CATEGORY_ITEM}>
              <Text style={TEXT}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={Spinner}
        />
        <View
          style={{
            height: 100,
            backgroundColor: color.palette.primary,
            justifyContent: "center",
          }}
        >
          <Button
            text="Tambah"
            style={{
              height: 50,
              width: "50%",
              alignSelf: "center",
              backgroundColor: color.palette.white,
            }}
            textStyle={{ fontSize: 20, color: color.palette.primary }}
          />
        </View>
      </SafeAreaView>
    )
  },
)
