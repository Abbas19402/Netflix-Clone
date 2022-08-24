import { View, Text, TouchableNativeFeedback, Platform , Image, TouchableHighlight} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native-gesture-handler'

const List = ({navigation}) => {

  useEffect(()=> {
    getList()
  },[])
    /* 
        List ID ==> 8213212
    */
    const getList = async()=> {
      const options= {
        headers: {
          "Content-Type" : "application/json;charset=utf-8"
        }
      }
      await axios.get(`https://api.themoviedb.org/4/list/8213212?page=1&api_key=d783b21f4df68f71fbb0a780874f6cfb`,options) .then( res => {
        setList(res.data.results)
      } ) .catch( err => {
        console.log("getList error => ", err);
      } )
    }

    const removeFromList = async(item)=> {
      /*
        List Access Token
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NjAxMTc0ODQsImF1ZCI6ImQ3ODNiMjFmNGRmNjhmNzFmYmIwYTc4MDg3NGY2Y2ZiIiwianRpIjoiNDc0MjgyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCIsImFwaV93cml0ZSJdLCJ2ZXJzaW9uIjoxLCJzdWIiOiI2MmNmZjg4NzIzODUxMzAwNGQ4ZTU2YzAifQ.dYC4OUI5aV2eH2eaarn_pj56kD0y_wW-zOb0tx7Tv1s
      */
     console.log("RemoveFromList item = ",item)
        const options = {
          headers: {
              "Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzgzYjIxZjRkZjY4ZjcxZmJiMGE3ODA4NzRmNmNmYiIsImp0aSI6IjQ3NDMxMzciLCJzdWIiOiI2MmNmZjg4NzIzODUxMzAwNGQ4ZTU2YzAiLCJ2ZXJzaW9uIjoxLCJzY29wZXMiOlsiYXBpX3JlYWQiLCJhcGlfd3JpdGUiXSwibmJmIjoxNjYwMTIyMTk0fQ.qnhCUHFd1cT7-SX0vIkcEW4fKIXreEnpaLk_T5jdS_o",
              "Content-Type" : "application/json;charset=utf-8"
          }
        }
      await axios.delete(`https://api.themoviedb.org/4/list/8213212/items`,{
        "items": [
          {
            "media_type": `${item.media_type}`,
            "media_id": `${item.id}`
          }
        ]
      },options) .then( res => {
        console.log("RemovefromList Response => ", res.data)
      } ) .catch( err => {
        console.log(err)
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
                {item.media_type == 'movie' ? <Text style={item.title.length > 40 ? { fontSize: 17 } : {fontSize: 18 } }>{item.title}</Text> : <Text style={item.original_name.length > 40 ? { fontSize: 17 } : {fontSize: 18 } }>{item.original_name}</Text>}
              </View>
              { Platform.OS !== 'ios' ? <TouchableNativeFeedback onPress={()=> removeFromList(item)}>
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

export default List