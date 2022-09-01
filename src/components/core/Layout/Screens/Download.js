import { View, Text, TouchableNativeFeedback, Platform , Image, TouchableHighlight} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native';

const Download = ({navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
       getList()
    }, [])
  );
  useEffect(()=> {
    getList()
  },[list])
    /* 
        List ID ==> 8213212
    */
    const getList = async()=> {
      const options= {
        headers: {
          "Content-Type" : "application/json;charset=utf-8"
        }
      }
      await axios.get(`https://api.themoviedb.org/4/list/8213230?page=1&api_key=d783b21f4df68f71fbb0a780874f6cfb`,options) .then( res => {
        // console.log(res.data)
        setList(res.data.results)
      } ) .catch( err => {
        console.log("getList error => ", err);
      } )
    }
    const [list , setList] = useState([])
  return (
    <View style={{flex: 1 , backgroundColor: 'black'}}>
      <FlatList
        data={list}
        renderItem={({item})=> (
          Platform.OS !== 'ios' ? <TouchableNativeFeedback onPress={()=> navigation.navigate('watch', {State: item})}>
            <View style={{ padding: 15 , flex: 1 , flexDirection: 'row' , alignItems: 'center' ,justifyContent: 'space-between' , height: 70}}>
              <View style={{ flex: 1 , flexDirection: 'row' , alignItems: 'center' , justifyContent: 'flex-start'}}>
                <Image source={{uri: `https://image.tmdb.org/t/p/original${item.poster_path}`}} style={{width: 50 , height: 50 , marginRight: 20, borderRadius: 7}}/>
                {item.media_type == 'movie' ? <Text style={item.title.length > 40 ? { fontSize: 17, color: '#939393' } : {fontSize: 17, color: '#939393' } }>{item.title}</Text> : <Text style={item.original_name.length > 40 ? { fontSize: 17, color: '#939393' } : {fontSize: 18, color: '#939393' } }>{item.original_name}</Text>}
              </View>
              { Platform.OS !== 'ios' ? <TouchableNativeFeedback>
                <View style={{position: 'relative' , borderWidth: 3, height: 40 , width: 80, justifyContent: 'center', alignItems: 'center' , backgroundColor: "darkred", borderRadius: 8}}>
                  <Text style={{color: '#fff', fontSize: 17}}>Remove</Text>
                </View>
              </TouchableNativeFeedback> : <TouchableHighlight onPress={()=> removeFromList(item)}>
                <View style={{position: 'relative' , borderWidth: 3, height: 40 , width: 80, justifyContent: 'center', alignItems: 'center' , backgroundColor: "darkred", borderRadius: 8}}>
                  <Text style={{color: '#fff', fontSize: 17}}>Remove</Text>
                </View>
              </TouchableHighlight>}
            </View>
          </TouchableNativeFeedback> : <TouchableHighlight onPress={()=> navigation.navigate('watch', {State: item})}>
            <View style={{ padding: 15 , flex: 1 , flexDirection: 'row' , alignItems: 'center' ,justifyContent: 'flex-start' , height: 70}}>
              <Image source={{uri: `https://image.tmdb.org/t/p/original${item.poster_path}`}} style={{width: 50 , height: 50 , marginRight: 20, borderRadius: 7}}/>
              <Text style={item.title.length > 40 ? { fontSize: 17 } : {fontSize: 18 } }>{item.title}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  )
}

export default Download
