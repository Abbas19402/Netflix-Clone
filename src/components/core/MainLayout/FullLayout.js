import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../Layout/Screens/Home"
import Search from "../Layout/Screens/Search"
import Download from "../Layout/Screens/Download"
import More from "../Layout/Screens/More"
import Icon from 'react-native-vector-icons/Ionicons';

const FullLayout = () => {
  const Tab = createBottomTabNavigator();
  return (
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={
          {
            headerShown: false,
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "gray",
            tabBarActiveBackgroundColor: '#000',
            tabBarInactiveBackgroundColor: '#000',
          }
        }
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0, // space from bottombar
                    height: 68,
                    width: 68,
                    borderRadius: 68,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
                <Icon name="home-outline" size={25} color={color}/>
              </>
            ),
            tabBarInactiveTintColor: "gray",
            tabBarActiveTintColor: "#fff",
            tabBarActiveBackgroundColor: "#171717",
            tabBarHideOnKeyboard: true
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color }) => (
              <>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0, // space from bottombar
                    height: 68,
                    width: 68,
                    borderRadius: 68,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
                <Icon name="search-outline" size={25} color={color} />
              </>
            ),
            tabBarInactiveTintColor: "gray",
            tabBarActiveTintColor: "#fff",
            tabBarActiveBackgroundColor: "#171717",
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tab.Screen
          name="Download"
          component={Download}
          options={{
            tabBarIcon: ({ color }) => (
              <>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0, // space from bottombar
                    height: 68,
                    width: 68,
                    borderRadius: 68,
                    justifyContent: 'center',
                    alignItems: 'center',
                    tabBarHideOnKeyboard: true
                  }}
                />
                <Icon name="download-outline" size={25} color={color} />
              </>
            ),
            tabBarInactiveTintColor: "gray",
            tabBarActiveTintColor: "#fff",
            tabBarActiveBackgroundColor: "#171717"
          }}
        />
        <Tab.Screen
          name="More"
          component={More}
          options={{
            tabBarIcon: ({ color }) => (
              <>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0, // space from bottombar
                    height: 30,
                    width: 30,
                    borderRadius: 68,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
                <Icon name="menu-outline" size={28} color={color} />
              </>
            ),
            tabBarInactiveTintColor: "gray",
            tabBarActiveTintColor: "#fff",
            tabBarActiveBackgroundColor: "#171717",
            tabBarHideOnKeyboard: true
          }}
        />
      </Tab.Navigator>
  )
}

export default FullLayout