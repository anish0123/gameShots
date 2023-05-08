import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import Home from '../views/Home';
import Login from '../views/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Icon} from '@rneui/themed';
import Profile from '../views/Profile';
import Upload from '../views/Upload';
import Search from '../views/Search';
import Single from '../views/Single';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent';
import ChangeUserPicture from '../views/ChangeUserPicture';
import EditProfile from '../views/EditProfile';
import EditPost from '../views/EditPost';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          paddingTop: 10,
          backgroundColor: '#000000',
        },

        drawerItemStyle: {
          paddingTop: 10,
          height: 60,
        },
        drawerLabelStyle: {
          fontSize: 20,
          color: '#ffffff',
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: () => <Icon name="home" color="#ffffff" />,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: () => <Icon name="person" color="#ffffff" />,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          drawerIcon: () => <Icon name="search" color="#ffffff" />,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Upload"
        component={Upload}
        options={{
          drawerIcon: () => <Icon name="cloud-upload" color="#ffffff" />,
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={DrawerScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Single" component={Single} />
          <Stack.Screen
            name="ChangeUserPicture"
            component={ChangeUserPicture}
          />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="EditPost" component={EditPost} />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
