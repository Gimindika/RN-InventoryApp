import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { GeneralListScreen } from "../../components"
import { useCategories } from "../../hooks"
import { NavigatorParamList } from "../../navigators"

export const CategoriesScreen: FC<StackScreenProps<NavigatorParamList, "categories">> = observer(
  ({ navigation }) => {
    const [categories, fetchCategories] = useCategories()

    useEffect(() => {
      fetchCategories()
    }, [])

    return <GeneralListScreen testID="CategoriesScreen" title="Categories" data={categories} />
  },
)
