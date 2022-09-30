import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { ActivityIndicator, FlatList, TouchableOpacity, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, GradientBackground, Text } from "../../components"
import { BurgerHeader } from "../../components/burger-header/burger-header"
import { useUnits } from "../../hooks"
import { NavigatorParamList } from "../../navigators"
import { FULL, TEXT } from "../../styles"
import { color, spacing } from "../../theme"

const UNITS_LIST_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  width: "100%",
  flexGrow: 1,
}

const UNIT_ITEM: ViewStyle = {
  padding: spacing[3],
  marginVertical: spacing[2],
  marginHorizontal: spacing[4],
  borderWidth: 1,
  borderColor: color.palette.primary,
  borderRadius: 10,
  flex: 1,
}

const Spinner = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" color={color.palette.primary} />
  </View>
)

export const UnitsScreen: FC<StackScreenProps<NavigatorParamList, "units">> = observer(
  ({ navigation }) => {
    const [units, fetchUnits] = useUnits()

    useEffect(() => {
      fetchUnits()
    }, [])

    return (
      <SafeAreaView testID="UnitsScreen" style={FULL}>
        <GradientBackground colors={[color.palette.primary, color.palette.primary]} />

        <BurgerHeader title="Units" />
        <FlatList
          contentContainerStyle={UNITS_LIST_CONTAINER}
          scrollEnabled={true}
          data={units}
          renderItem={({ item }) => {
            if (item.id !== "0") {
              return (
                <TouchableOpacity key={item.id} style={UNIT_ITEM}>
                  <Text style={{ ...TEXT, textAlign: "center" }}>{item.name}</Text>
                </TouchableOpacity>
              )
            } else return null
          }}
          ListEmptyComponent={Spinner}
          numColumns={1}
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
