import { Text, View, FlatList, Image, StyleSheet, ScrollView, ImageBackground, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { MoviesAndSeries } from './MoviesAndSeries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import * as actionCreator  from '../../../../../Redux/Actions/Actions'
import { bindActionCreators } from 'redux'
import Lottie from 'lottie-react-native';

const Header = ({ netflix, navigation }) => {
  useEffect(() => {
    getBanner()
  }, [netflix])
  const [banner, setBanner] = useState({})
  const getBanner = async () => {
    await axios.get(`${netflix.API}`)
      .then(res => {
        const random = Math.floor(Math.random() * 19)
        setBanner(res.data.results[random])
      })
      .catch(err => console.log("Following Error Occured", err))
  }

  const addToList = async(item)=> {
   console.log("AddToList item = ",item)
      const options = {
        headers: {
            "Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzgzYjIxZjRkZjY4ZjcxZmJiMGE3ODA4NzRmNmNmYiIsImp0aSI6IjQ3NDMxMzciLCJzdWIiOiI2MmNmZjg4NzIzODUxMzAwNGQ4ZTU2YzAiLCJ2ZXJzaW9uIjoxLCJzY29wZXMiOlsiYXBpX3JlYWQiLCJhcGlfd3JpdGUiXSwibmJmIjoxNjYwMTIyMTk0fQ.qnhCUHFd1cT7-SX0vIkcEW4fKIXreEnpaLk_T5jdS_o",
            "Content-Type" : "application/json;charset=utf-8"
        }
      }
    await axios.post(`https://api.themoviedb.org/4/list/8213212/items`,{
      "items": [
        {
          "media_type": `${item.media_type}`,
          "media_id": `${item.id}`
        }
      ]
    },options) .then( res => {
      console.log("AddToList Response => ", res.data)
    } ) .catch( err => {
      console.log(err)
    } )
  }
  return (
    typeof banner !== 'undefined' &&
    <View style={styles.container} scrollEnabled contentContainerStyle={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'black' }} scrollEnabled={true}>
        <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/original${banner.poster_path}` }} style={{ height: 700, width: '100%', overflow: 'hidden' }}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.87 }}
            style={{position: 'relative', bottom: -500, height: 200, width: '100%' }}
          >
              <View style={{ height: 10, flex: 1, flexDirection: 'row', justifyContent: "space-evenly", alignItems: 'center', overflow: 'hidden', position: 'relative' ,bottom: -31 }}>
                <TouchableHighlight onPress={()=>addToList(banner)}>
                  <View style={{ backgroundColor: 'transparent', height: 40, width: 80, paddingTop: 2.5, borderRadius: 2.5 }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="add-outline" size={19} color="#fff" />
                      <Text style={{ textAlign: 'center', marginHorizontal: 3, fontSize: 10, color: '#fff' }}>Add To List</Text>
                    </View>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.navigate('watch', { State: banner })}>
                  <View style={{ backgroundColor: '#fff', height: 40, width: 100, paddingTop: 2.5, borderRadius: 2.5 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="play" size={20} color="black" />
                      <Text style={{ textAlign: 'center', marginHorizontal: 5, fontSize: 15, color: 'black' }}>Play</Text>
                    </View>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight>
                  <View style={{ backgroundColor: 'transparent', height: 40, width: 80, paddingTop: 10, borderRadius: 2.5 }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="information-circle-outline" size={19} color="#fff" />
                      <Text style={{ textAlign: 'center', marginHorizontal: 3, fontSize: 10, color: '#fff' }}>Info</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
          </LinearGradient>
        </ImageBackground>
      </ScrollView>
    </View>
  )
}

const HomePage = ({ navigation }) => {
  // ****** Redux ******
  const dispatch = useDispatch();
  const {LoggerAction,storeSessionID} = bindActionCreators(actionCreator , dispatch)
  const logger = useSelector(state => state.setLogger)
  const session_id = useSelector( (state) => state.sessionId )

  useEffect(() => {
    let timer = setTimeout(getMoviesSeries, 1000, [])
    const checkLog = async() => {
      if(await AsyncStorage.getItem('session_id') !== 'loggedOut') {
        storeSessionID(await AsyncStorage.getItem('session_id'))
      }
    }
    checkLog()
    setSessionId(session_id)
    return () => clearTimeout(timer)
  }, [getMoviesSeries, netflix])

  // Fetch Netflix Data
  const [sessionId,setSessionId] = useState();
  const [netflix, setNetflix] = useState([]);
  const [type, setType] = useState();
  const [BannnerEndpoint, setBannerEndpoint] = useState();
  var MSarray = [];

  const getMoviesSeries = () => {
    MoviesAndSeries.map(async item => {
      await axios.get(`${item.API}`)
        .then((res) => {
          let filteredArray = res.data.results.filter( item => item.original_language == 'en' )
          MSarray.push(res.data)
        })
        .catch((err) => {
          console.log("Error :- ", err);
        })
    })
    setNetflix(MSarray);
    typeof netflix !== 'undefined' && Banner()
  }

  const Banner = () => {
    const random = Math.floor(Math.random() * 8)
    const BannerEndpoint = MoviesAndSeries[random]
    setBannerEndpoint(BannerEndpoint);
  }
  return (
    (typeof BannnerEndpoint !== `undefined` && type !== 'undefined') &&
    <View style={{ width: '100%', padding: 8, backgroundColor: 'black' , paddingTop: 15}}>
      {/* Series FlatList */}
      <FlatList
        data={netflix}
        showsVerticalScrollIndicator={false}
        vertical
        ListHeaderComponent={< Header netflix={BannnerEndpoint} navigation={navigation} />}
        renderItem={({ item, index }) => (
          index == netflix.length-1 ? <View style={{ width: '100%', height: 205, marginTop: 5, marginBottom: 60 ,padding: 7 }}>
          {MoviesAndSeries.map((value, key) => (
            key == index ? (
              <View key={value.key} style={{ paddingLeft: 2, backgroundColor: 'black' }}>
                <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold' }}>{value.name}</Text>
              </View>
            ) : null
          ))}
          <FlatList
            data={item.results.filter( item => item.original_language == 'en' )}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item , indexx}) => (
              <TouchableHighlight onPress={() => navigation.navigate('watch', { State: item, Type: type })}>
                <View 
                style={{ 
                  width: 130, 
                  marginHorizontal: 3
                  }}>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path}` }} style={{ width: 130, height: '100%', borderRadius: 7 , borderBottomLeftRadius: 7 , borderBottomRightRadius: 7 }} />
                </View>
              </TouchableHighlight>
            )}
          />
        </View> : index == 1 ? <View style={{ width: '100%', height: 205, marginVertical: 5, padding: 7 }}>
            {MoviesAndSeries.map((value, key) => (
              key == index ? (
                <View key={value.key} style={{ paddingLeft: 2, backgroundColor: 'black' }}>
                  <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold' }}>{value.name}</Text>
                </View>
              ) : null
            ))}
            <FlatList
              data={item.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item , indexx}) => (
                <TouchableHighlight onPress={() => navigation.navigate('watch', { State: item })}>
                  <View 
                  style={{ 
                    width: 300, 
                    marginHorizontal: 3
                    }}>
                    <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}` }} style={{ width: 300, height: '100%', borderRadius: 16 , borderBottomLeftRadius: 7 , borderBottomRightRadius: 7, justifyContent: 'flex-end' , alignItems: 'center'}} resizeMethod={'auto'}>
                    </ImageBackground>
                  </View>
                </TouchableHighlight>
              )}
            />
          </View> :
          <View style={{ width: '100%', height: 205, marginVertical: 5, padding: 7 }}>
            {MoviesAndSeries.map((value, key) => (
              key == index ? (
                <View key={value.key} style={{ paddingLeft: 2, backgroundColor: 'black' }}>
                  <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold' }}>{value.name}</Text>
                </View>
              ) : null
            ))}
            <FlatList
              data={item.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item , indexx}) => (
                <TouchableHighlight onPress={() => navigation.navigate('watch', { State: item })}>
                  <View 
                  style={{ 
                    width: 130, 
                    marginHorizontal: 3
                    }}>
                      <Image source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path}` }} style={{ width: 130, height: '100%', borderRadius: 7 , borderBottomLeftRadius: 7 , borderBottomRightRadius: 7 }} />
                  </View>
                </TouchableHighlight>
              )}
            />
          </View>
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  Text: {
    color: "#fff"
  }
})
export default HomePage