import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./StackNavigator";
import StoryScreen from "../screens/StoryScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Tela Inicial" component={TabNavigator} />
      <Stack.Screen name="História" component={StoryScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;