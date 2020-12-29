import React,{useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,FlatList, Button } from 'react-native';
import { useEffect } from 'react';
import styles from './styles'
import axios from "axios";

export default function HomeScreen({navigation}) {
    const[data,setData]=useState('')
    const[population,setPopulation]=useState(0)
    
    //set COVID world data
    useEffect(()=>{
      const getData=()=> {
        fetch('https://covid-19-data.p.rapidapi.com/totals', {
         method: 'GET',
         headers: {
           'x-rapidapi-key': 'c371204445msh2162777564a52b5p10bdd7jsn33ea62a58f47',
           'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
         },
       })
         .then((response) => response.json())
         .then((responseJson) => {
           console.log(responseJson[0])
           return setData(responseJson[0])
         })
         .catch((error) => {
           console.error(error);
         });
     }
      getData()
    },[setData])
    //set population of world
    useEffect(()=>{
      const getPopulation = ()=>{
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
    //set last updated
    const lastUpdated=()=>{
      if(data){
      let update=data.lastUpdate
      console.log(update)
      return update.split("T")[0];
      }
    }
    //adding header
    React.useLayoutEffect(() => {
      
      navigation.setOptions({
        
          headerShown:true,
          headerTintColor:"white",
          headerTitleAlign:'center',
          headerTitleStyle:{
            fontWeight:'bold'
          },
          title:"COVID-19 Statistics",
          headerStyle:{
            backgroundColor:'#155644'
          }
            
      });
    })
    if(data){
      return (
        <View style={styles.container}>
          <View style={{marginTop:10}}></View>
          <View style={styles.containersBox}>
            <View style={styles.ResultTextContainer}>
              <View style={styles.cardheader}>
                <Text style={styles.headerBoxHeading}>Confirmed</Text>
              </View>
              <View style={styles.containerTextBox}>
              <Text style={styles.displayResultText}>Total</Text>
              <Text style={styles.resultedNum}>{data.confirmed}</Text>
              <Text style={styles.displayResultText}>Population</Text>
              <Text style={styles.resultedNum}>{((data.confirmed/population)*100).toFixed(4)} %</Text>
              </View>
            </View>
            
            <View style={styles.ResultTextContainer}>
              <View style={styles.cardheader}>
                <Text style={styles.headerBoxHeading}>Recovered</Text>
              </View>
              <View style={styles.containerTextBox}>
              <Text style={styles.displayResultText}>Total</Text>
              <Text style={styles.resultedNum}>{data.recovered}</Text>
              <Text style={styles.displayResultText}>Population</Text>
              <Text style={styles.resultedNum}>{((data.recovered/population)*100).toFixed(4)} %</Text>
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
              <Text style={styles.resultedNum}>{data.critical}</Text>
              <Text style={styles.displayResultText}>Population</Text>
              <Text style={styles.resultedNum}>{((data.critical/population)*100).toFixed(4)} %</Text>
              </View>
            </View>
            
            <View style={styles.ResultTextContainer}>
              <View style={styles.cardheader}>
                <Text style={styles.headerBoxHeading}>Deaths</Text>
              </View>
              <View style={styles.containerTextBox}>
              <Text style={styles.displayResultText}>Total</Text>
              <Text style={styles.resultedNum}>{data.deaths}</Text>
              <Text style={styles.displayResultText}>Population</Text>
              <Text style={styles.resultedNum}>{((data.deaths/population)*100).toFixed(4)} %</Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.lastupdate}>Last Updated: {lastUpdated()}</Text>
          
        </View>
      );
    }
      else{
        return(
          <View style={{alignItems:'center'}}>
          <Text style={{textAlign:'center',fontSize:20,color:'black',marginTop:10}}>Please wait! Loading..
          </Text>
          </View>
        ) 
      }
    
  }