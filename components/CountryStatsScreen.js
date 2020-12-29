import React,{useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,FlatList, Button } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from 'react';
import axios from "axios";
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CountryStatsScreen=({navigation,route})=>{
    const country=route.params.country
    const[population,setPopulation]=useState(0)
    const [countryData,setCountryData]=useState([])
  
    //get population
    useEffect(()=>{
      const getPopulation=()=>{
        var options = {
          method: 'GET',
          url: 'https://world-population.p.rapidapi.com/worldpopulation',
          headers: {
            'x-rapidapi-key': 'c371204445msh2162777564a52b5p10bdd7jsn33ea62a58f47',
            'x-rapidapi-host': 'world-population.p.rapidapi.com'
          }
        };
        axios.request(options).then(function (response) {
          setPopulation(response.data.body.world_population)
         //console.log(response.data.body.world_population);
        }).catch(function (error) {
          console.error(error);
        });  
      }
      getPopulation()
      
    },[setPopulation])
    
    //getCountry data
    useEffect(()=>{
      const getCountryData = ()=>{
        var options = {
          method: 'GET',
          url: 'https://covid-19-data.p.rapidapi.com/country',
          params: {name: country},
          headers: {
            'x-rapidapi-key': 'c371204445msh2162777564a52b5p10bdd7jsn33ea62a58f47',
            'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
          }
        };
          axios.request(options).then(function (response) {
            setCountryData(response.data[0])
          }).catch(function (error) {
            console.error(error);
          }); 
      }
      getCountryData()
    },[country])
  
    const lastUpdated=()=>{
      let update=countryData.lastUpdate
      if(update)
      return update.split("T")[0];
      
    }
    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('key'+value, value)
      } catch (e) {
        console.log(e)
      }
    }
    React.useLayoutEffect(() => {
      
      navigation.setOptions({
          headerShown:true,
          headerTintColor:"white",
          headerTitleAlign:'center',
          headerTitleStyle:{
            fontWeight:'bold'
          },
          title:country +" Statistics",
          headerStyle:{
            backgroundColor:'#155644'
          },
          headerRight:()=>{
            return(
              <View>
                <TouchableOpacity style={{marginRight:14}} onPress={()=>storeData(country)}>
                <FontAwesome name="star" size={24} color="white"/>
                </TouchableOpacity>
              </View>
              
            )
          }
            
      });
    })
    return(
      <View style={styles.container}>
          <View style={{marginTop:10}}></View>
          <View style={styles.containersBox}>
            <View style={styles.ResultTextContainer}>
              <View style={styles.cardheader}>
                <Text style={styles.headerBoxHeading}>Confirmed</Text>
              </View>
              <View style={styles.containerTextBox}>
              <Text style={styles.displayResultText}>Total</Text>
              <Text style={styles.resultedNum}>{countryData.confirmed}</Text>
              <Text style={styles.displayResultText}>Population</Text>
              <Text style={styles.resultedNum}>{((countryData.confirmed/population)*100).toFixed(4)} %</Text>
              </View>
            </View>
            
            <View style={styles.ResultTextContainer}>
              <View style={styles.cardheader}>
                <Text style={styles.headerBoxHeading}>Recovered</Text>
              </View>
              <View style={styles.containerTextBox}>
              <Text style={styles.displayResultText}>Total</Text>
              <Text style={styles.resultedNum}>{countryData.recovered}</Text>
              <Text style={styles.displayResultText}>Population</Text>
              <Text style={styles.resultedNum}>{((countryData.recovered/population)*100).toFixed(4)} %</Text>
              </View>
            </View>
          </View>
    
          <View style={styles.containersBox}>
            <View style={styles.ResultTextContainer}>
              <View style={styles.cardheader}>
                <Text style={styles.headerBoxHeading}>Critical</Text>
              </View>
              <View style={styles.containerTextBox}>
              <Text style={styles.displayResultText}>Total</Text>
              <Text style={styles.resultedNum}>{countryData.critical}</Text>
              <Text style={styles.displayResultText}>Population</Text>
              <Text style={styles.resultedNum}>{((countryData.critical/population)*100).toFixed(4)} %</Text>
              </View>
            </View>
            
            <View style={styles.ResultTextContainer}>
              <View style={styles.cardheader}>
                <Text style={styles.headerBoxHeading}>Deaths</Text>
              </View>
              <View style={styles.containerTextBox}>
              <Text style={styles.displayResultText}>Total</Text>
              <Text style={styles.resultedNum}>{countryData.deaths}</Text>
              <Text style={styles.displayResultText}>Population</Text>
              <Text style={styles.resultedNum}>{((countryData.deaths/population)*100).toFixed(6)} %</Text>
              </View>
            </View>
            
          </View>
          <Text style={styles.lastupdate}>Last Updated: {lastUpdated()}</Text>
          
          
          
        </View>
    )
  }
  export default CountryStatsScreen;