import React,{useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,FlatList, Button } from 'react-native';
import { useEffect } from 'react';
import styles from './styles'
import axios from "axios";

const CountriesListScreen=({navigation})=>{

    const [countryList,setCountryList]=useState([])
    const [country,setCountry]=useState('')
    const [errorMsg,setErrorMsg]=useState('')
  
    //get List of countries
    useEffect(()=>{
      const getCountriesList = ()=>{
        var options = {
          method: 'GET',
          url: 'https://world-population.p.rapidapi.com/allcountriesname',
          headers: {
            'x-rapidapi-key': 'c371204445msh2162777564a52b5p10bdd7jsn33ea62a58f47',
            'x-rapidapi-host': 'world-population.p.rapidapi.com'
          }
        };
        
        axios.request(options).then(function (response) {
          //console.log(response.data.body.countries);
          let list=response.data.body.countries
          return setCountryList([...list])
        }).catch(function (error) {
          console.error(error);
        });
      }
      getCountriesList()
    },[setCountryList])
    
    const showListOfCountries=()=>{
      if(countryList.length>0){
        return(
          <View>
          <Text style={{color:'red',marginLeft:'15%'}}>{errorMsg}</Text>
          <FlatList
            keyExtractor={(item, index) => 'key'+index}
            data={countryList}
            renderItem = {({item})=>(
              <View>
                <TouchableOpacity onPress={()=>navigation.navigate('CountryStats',{country:item})}>
                <View style={styles.modalTextContainer}>
                  <Text style={styles.listText}>{item}</Text>
                </View>
                </TouchableOpacity>
              </View>
            )}>
          </FlatList>
          </View>
        )
      }
      else{
        return(
          <View style={{alignItems:'center'}}>
          <Text style={{textAlign:'center',fontSize:20,color:'black'}}>Please wait! Loading..
          </Text>
          </View>
        )
      }
    }
    const navigateToCountryifPresent=()=>{
      
      if(countryList.includes(country)){
        navigation.navigate('CountryStats',{country:country})
      }
       
      else{
        setErrorMsg('Please enter a valid country name!')
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
          title:"Countries",
          headerStyle:{
            backgroundColor:'#155644'
          }
            
      });
    })
    return(
      <View >
        <View style={{flexDirection:'row',marginBottom:27}}>
        <TextInput style={styles.textInpBox}
          onChangeText={text => {
            setCountry(text)
            setErrorMsg('')
          }}
         placeholder='Search country'>
        </TextInput>
        <TouchableOpacity style={styles.searchBtn} onPress={()=>navigateToCountryifPresent()}>
              <Text style={{color:'white',textAlign:'center',
              marginTop:9,fontSize:12}}>SEARCH</Text>
        </TouchableOpacity>
        </View>
        
        {showListOfCountries()}
      </View>
    );
  }
  export default CountriesListScreen;