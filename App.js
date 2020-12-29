import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CountryStatsScreen from './components/CountryStatsScreen'
import FavouriteCountriesScreen from './components/FavouriteCountriesScreen'
import HomeScreen from './components/HomeScreen'
import CountriesListScreen from './components/CountriesListScreen'

const Drawer = createDrawerNavigator();
const DrawerNav=()=>{
  return (
    <NavigationContainer>
      
      <Drawer.Navigator initialRouteName={"Home"} drawerStyle={{
    backgroundColor: '#E5E5E5',
    width: 240,
  }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Countries" component={CountriesListScreen} />
        <Drawer.Screen name="Favourite Countries" component={FavouriteCountriesScreen} />
        <Drawer.Screen name="CountryStats" component={CountryStatsScreen} 
        options={{drawerLabel:()=>null}}/>       
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
export default function App() {
      return (
      DrawerNav()
    ); 
}