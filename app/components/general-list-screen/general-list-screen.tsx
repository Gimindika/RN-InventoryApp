import React, { FC } from "react"
import { FlatList, TouchableOpacity, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, GradientBackground, Spinner, Text } from "../../components"
import { BurgerHeader } from "../../components/burger-header/burger-header"
import { ICategory, IUnit } from "../../models/interfaces"
import { FULL, TEXT } from "../../styles"
import { color, spacing } from "../../theme"

const LIST_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  width: "100%",
  flexGrow: 1,
}

const ITEM: ViewStyle = {
  padding: spacing[3],
  marginVertical: spacing[2],
  marginHorizontal: spacing[4],
  borderWidth: 1,
  borderColor: color.palette.primary,
  borderRadius: 10,
  flex: 1,
}

interface GeneralListScreenProps {
  data: ICategory[] | IUnit[]
  testID: string
  title: string
}

export const GeneralListScreen: FC<GeneralListScreenProps> = (props: GeneralListScreenProps) => {
  const { data, testID, title } = props

  return (
    <SafeAreaView testID={testID} style={FULL}>
      <GradientBackground colors={[color.palette.primary, color.palette.primary]} />

      <BurgerHeader title={title} />
      <FlatList
        contentContainerStyle={LIST_CONTAINER}
        scrollEnabled={true}
        data={data}
        renderItem={({ item }) => {
          if (item.id !== "0") {
            return (
              <TouchableOpacity key={item.id} style={ITEM}>
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
}
