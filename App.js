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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchBtn:{
    backgroundColor:'#155644',
    width:59,
    height:35,
    color:'white',
    borderRadius:7,marginTop:'17.5%'
  },
  modalTextContainer:{
    margin:0,
    marginHorizontal:5,
    backgroundColor:'#e9e9e9',
    borderRadius:2,
    borderColor:'#155644',
    borderBottomWidth:1.3,
    borderBottomColor:'#155644',
    color:'black',
    padding:10,
    marginLeft:8,
    marginRight:8
  },
  listText:{
    color:'black',
    textTransform:'uppercase',
    fontSize:18,
    
  },
  textInpBox:{
    marginLeft:'17%',
    borderColor:'#155644',
    borderBottomWidth:2,
    width:'48%',
    marginRight:10,
    padding:5,
    fontSize:18,
    color:'#155644',
    marginTop:'15%'
  },
  button:{
    borderRadius:8,
    paddingVertical:10,
    paddingHorizontal:5,
    backgroundColor:'#155644',
    margin:5,
    marginLeft:80,
    marginRight:80,
    marginTop:30
  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    textTransform:'uppercase',
    fontSize:16,
    textAlign:'center'
  },
  ResultTextContainer:{
    
    margin:10,
    backgroundColor:'#e9e9e9',
    borderRadius:10,
    borderColor:'grey',
    width:'40%'
  },
  lastupdate:{
    marginLeft:47,
    fontSize:14,
    marginTop:10,
    color:'grey'
  },
  resultedNum:{
    fontSize:18,
    fontWeight:'bold',
    color:'black',marginLeft:4
  },
  containerTextBox:{
    padding:14
  },
  displayResultText:{
    fontSize:15,
    margin:5,
    color:'grey'
  },
  cardheader:{
    height:'20%',
    backgroundColor:'#155644',
    borderTopEndRadius:10,
    borderTopLeftRadius:10,
    padding:5
  },
  containersBox:{
    flexDirection:'row',
    marginLeft:30,height:'30%',
    
  },
  headerBoxHeading:{
    fontSize:17,
    fontWeight:'bold',
    color:'white',
    marginLeft:5
  }
});
