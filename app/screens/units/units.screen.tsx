import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { GeneralListScreen } from "../../components/general-list-screen/general-list-screen"
import { useUnits } from "../../hooks"
import { NavigatorParamList } from "../../navigators"

export const UnitsScreen: FC<StackScreenProps<NavigatorParamList, "units">> = observer(
  ({ navigation }) => {
    const [units, fetchUnits] = useUnits()

    useEffect(() => {
      fetchUnits()
    }, [])

    return <GeneralListScreen testID="UnitsScreen" title="Units" data={units} />
  },
)
