import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import Home from "../views/Home";
import Login from "../views/Login";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Tab = createBottomTabNavigator
const Stack = createNativeStackNavigator();


const TabScreen = () => {

}

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {
        isLoggedIn ? (
          <Stack.Screen
          name = "Home"
          component={Home}
          />
        ) :
        (
          <Stack.Screen
          name= "Login"
          component={Login}
          />
        )
      }
    </Stack.Navigator>
  )
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  )
}

export default Navigator
