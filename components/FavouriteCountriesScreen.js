import React,{useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,FlatList, Button } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const FavouriteCountriesScreen=({navigation,route})=>{
    const [list,setList]=useState([]) 
    const [keys,setKeys]=useState([])
    const [active,setActive]=useState(true)
    useFocusEffect(
      React.useCallback(() => {
        const fetch = async () => {
          try {
            if(active){
            let value=""
            setKeys(await AsyncStorage.getAllKeys())
            console.log(keys)
            keys.map(async (key)=>{
               value = await AsyncStorage.getItem(key)
               if(value !== null && active) {
                setList(list=>([...list,value]))
                //console.log('value '+value)
               }
               
            })
          }
          } catch(e) {
            console.log(e)
          }
          }
        fetch()
        return ()=>{
          setActive(false)
          console.log('false active')
        }
      })
      ,[setKeys])
  
    
        React.useLayoutEffect(() => {
      
          navigation.setOptions({
            
              headerShown:true,
              headerTintColor:"white",
              headerTitleAlign:'center',
              headerTitleStyle:{
                fontWeight:'bold'
              },
              headerStyle:{
                backgroundColor:'#155644'
              }
                
          });
        })
        const showFavList=()=>{
            if(list.length>0){
                return(
                    <View>
                    <FlatList
                        keyExtractor={(item, index) => 'key'+index}
                        data={list}
                        renderItem = {({item})=>(
                        <View>
                            <TouchableOpacity onPress={()=>navigation.navigate('CountryStats',{country:item})}>
                            <View style={styles.modalTextContainer}>
                            <View style={{flexDirection:'row'}}>
                            <Text style={styles.listText}>{item}</Text>
                            <FontAwesome style={{position:'absolute',marginLeft:'90%'}} name="star" size={24} color="#187bcd"/>
                            </View>  
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
                    <Text style={{textAlign:'center',fontSize:20,color:'black',marginTop:10}}>Please wait! Loading..
                    </Text>
                    </View>
                  ) 
            }
            
        }
    return (
      showFavList()
    )
  }
  export default FavouriteCountriesScreen;