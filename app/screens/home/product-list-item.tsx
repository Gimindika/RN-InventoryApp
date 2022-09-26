import React from "react"
import { View, ViewStyle, TouchableOpacity } from "react-native"
import { Text } from "../../components"
import { TEXT } from "../../styles"
import { color, spacing } from "../../theme"

interface ProductListItemProps {
  id: number
  name: string
  category: string
  quantity: number
  unit: string
}

const ITEM_CONTAINER: ViewStyle = {
  borderColor: color.palette.primary,
  borderWidth: 1,
  borderRadius: 10,
  marginTop: spacing[4],
  marginHorizontal: spacing[4],
  padding: spacing[2],
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

export const ProductListItem: React.FC<ProductListItemProps> = (item: ProductListItemProps) => {
  const { id, name, quantity, category, unit } = item

  return (
    <TouchableOpacity style={ITEM_CONTAINER} key={id}>
      <View style={{ width: "75%" }}>
        <Text style={TEXT} text={name} />
        <Text style={{ ...TEXT, fontSize: 12 }} text={category} />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={TEXT} text={quantity ? quantity.toString() : "0"} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={TEXT} text={unit} />
        </View>
      </View>
    </TouchableOpacity>
  )
}
