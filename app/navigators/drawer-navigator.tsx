import { createDrawerNavigator } from "@react-navigation/drawer"
import React from "react"
import { HomeScreen } from "../screens"

const Drawer = createDrawerNavigator()

export function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
      {/* <Drawer.Screen name="category" component={CategoryScreen} /> */}
    </Drawer.Navigator>
  )
}
