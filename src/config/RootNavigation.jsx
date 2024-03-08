import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import StartState from '../screen/StartState';
import Beranda from '../screen/Beranda';
import Rengiat from '../screen/Rengiat';
import CustomHeader from '../component/CustomHeader';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function RootNavigation() {
  function TabNavigator() {
    return (
      <Tab.Navigator
        initialRouteName="startState"
        screenOptions={{
          tabBarActiveTintColor: 'darkblue',
          tabBarInactiveTintColor: 'gray',
        }}>
        <Tab.Screen
          name="Beranda"
          component={Beranda}
          options={{
            tabBarLabelStyle: {fontSize: 14},
            tabBarLabel: 'Beranda',
            tabBarStyle: styles.tabBarStyle,
            tabBarIcon: ({size, color}) => (
              <Icon size={26} name="home" style={{color: 'black'}} />
            ),
          }}
        />
        <Tab.Screen
          name="startState"
          component={StartState}
          options={{
            tabBarLabelStyle: {fontSize: 14},
            tabBarLabel: 'Peta',
            tabBarStyle: styles.tabBarStyle,
            headerShown: false,
            // header: () => <CustomHeader />,
            tabBarIcon: ({size, color}) => (
              <Icon
                size={26}
                key={'map-pin'}
                name="map-pin"
                style={{color: 'black'}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Rengiat"
          component={Rengiat}
          options={{
            tabBarLabelStyle: {fontSize: 14},
            tabBarLabel: 'Rengiat',
            tabBarStyle: styles.tabBarStyle,
            tabBarIcon: ({size, color}) => (
              <Icon
                size={26}
                key={'file'}
                name="file"
                style={{color: 'black'}}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'white',
    height: 70,
    paddingBottom: 10,
    // borderTopWidth: 2,
    // borderTopColor: 'darkblue',
  },
  fontTabBar: {fontSize: 24, color: 'white', fontWeight: '700'},
});
