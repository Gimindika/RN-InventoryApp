import { createDrawerNavigator } from "@react-navigation/drawer"
import React from "react"
import { HomeScreen, CategoriesScreen, UnitsScreen } from "../screens"

const Drawer = createDrawerNavigator()

export function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen
        name="categories"
        component={CategoriesScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="units" component={UnitsScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  )
}
