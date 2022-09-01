import { ScrollView , View, Text , Button , Image , ImageBackground , TouchableHighlight , FlatList} from 'react-native'
import React , { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import YoutubePlayer  from "react-native-youtube-iframe";
import { useFocusEffect } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as actionCreators from '../../../../../Redux/Actions/Actions'

const Watch = ({route , navigation}) => {
  const dispatch =  useDispatch()
  const vKey = useSelector( state => state.getVideoKey );
  const { VideoKey , popSnackBar , popSnackBarText} = bindActionCreators(actionCreators,dispatch)

  const { State } = route.params
  useFocusEffect(
    React.useCallback(() => {
      if(State.media_type == 'tv') {
        getVideo(State, 'tv')
      } else if(State.media_type == 'movie') {
        getVideo(State, 'movie')
      } else {
        getVideo(State,'movie')
      }
    getDownloadList()
    getList()
    return (()=> {
      setPlay(false) 
      VideoKey("")
    })
  }, [downloads, list]));

  useEffect(()=>{
    if(State.media_type == 'tv') {
      getSimilar('tv')
    } else if(State.media_type == 'movie') {
      getSimilar('movie')
    } else {
      displaySimilar()
      getSimilar('tv')
    }
  },[downloads , list])
  const [ Similar , setSimilar ] = useState([]);
  const [ play , setPlay ] = useState(false)
  const [ playing , setPlaying ] = useState(false)
  const [ downloaded , setDownloaded ] = useState(false)
  const [ addedToList , setAddedToList ] = useState(false)
  const [ list, setList ] = useState([])
  const [ downloads, setDownloads ] = useState([])

  const getSimilar = async( type ) => {
    console.log('function called!!')
      await axios.get(`https://api.themoviedb.org/3/${type}/${State.id}/similar?api_key=d783b21f4df68f71fbb0a780874f6cfb&language=en-US&page=1`)
      .then( res => setSimilar(res.data.results) )
      .catch( err => console.log(err)) 
  }

  const displaySimilar = async() => {
    console.log('normal function called!!')
    await axios.get(`https://api.themoviedb.org/3/movie/${State.id}/similar?api_key=d783b21f4df68f71fbb0a780874f6cfb&language=en-US&page=1`)
    .then( res => setSimilar(res.data.results) )
    .catch( err => console.log(err) ) 
  }

  const getVideo = async(id, type)=> {
    console.log("getting video for ",id.title, id.original_name)
    await axios.get(`https://api.themoviedb.org/3/${type}/${id.id}/videos?api_key=d783b21f4df68f71fbb0a780874f6cfb&language=en-US`)
    .then(res => {
      let trailer = res.data.results.filter( item => item.type == 'Trailer' ? item.name == 'Official Trailer' : "" )
      console.log(trailer) 
      VideoKey(trailer[0])
    })
    .catch( err => console.log(err))
    .finally( async() => {
      console.log("getting video for ",id.original_name)
      await axios.get(`https://api.themoviedb.org/3/tv/${id.id}/videos?api_key=d783b21f4df68f71fbb0a780874f6cfb&language=en-US`)
      .then(res => {
        let trailer = res.data.results.filter( item => item.type == 'Trailer')
        console.log(trailer[0])
        VideoKey(trailer[0])
      })
      .catch( err  => console.log(err))
    } )
  }
  const getDownloadList= async()=> {
    const options= {
      headers: {
        "Content-Type" : "application/json;charset=utf-8"
      }
    }
    await axios.get(`https://api.themoviedb.org/4/list/8213230?page=1&api_key=d783b21f4df68f71fbb0a780874f6cfb`,options) .then( res => {
      const checkShow = res.data.results.filter( item => (item.title || item.original_name) == (State.title || State.original_name))
      setList(res.data.results)
      if(checkShow.length == 1) {
        setDownloaded(true)
      } else {
        setDownloaded(false)
      }
    } ) .catch( err => {
      console.log("getList error => ", err);
    } )
  }
  const getList= async()=> {
    const options= {
      headers: {
        "Content-Type" : "application/json;charset=utf-8"
      }
    }
    await axios.get(`https://api.themoviedb.org/4/list/8213212?page=1&api_key=d783b21f4df68f71fbb0a780874f6cfb`,options) .then( res => {
      
      const checkShow = res.data.results.filter( item => (item.title || item.original_name) == (State.title || State.original_name))
      setList(res.data.results)
      console.log(" Checking the Show is in download = ",checkShow)
      if(checkShow.length == 1) {
        setAddedToList(true)
      } else {
        setAddedToList(false)
      }
    } ) .catch( err => {
      console.log("getList error => ", err);
    } )
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
      popSnackBar(true)
      popSnackBarText('Added to List!!')
      if(res.data.results[0].success == 'false') {
        popSnackBar(true)
        popSnackBarText('Already in the List!!')
      }
    } ) .catch( err => {
      console.log(err)
    } )
  }

  const addToDownloads = async(item)=> {
   console.log("AddToList item = ",item)
      const options = {
        headers: {
            "Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE2NjAxMjI4NDUsImF1ZCI6ImQ3ODNiMjFmNGRmNjhmNzFmYmIwYTc4MDg3NGY2Y2ZiIiwianRpIjoiNDc0MzE3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCIsImFwaV93cml0ZSJdLCJzdWIiOiI2MmNmZjg4NzIzODUxMzAwNGQ4ZTU2YzAiLCJ2ZXJzaW9uIjoxfQ.8FO1o4w4QUNa6Ci_rmqrZ5_r6F3B0EnKoUBBDhRVZP0",
            "Content-Type" : "application/json;charset=utf-8"
        }
      }
    await axios.post(`https://api.themoviedb.org/4/list/8213230/items`,{
      "items": [
        {
          "media_type": `${item.media_type}`,
          "media_id": `${item.id}`
        }
      ]
    },options) .then( res => {
      console.log("AddToDownloads Response => ", res.data)
      setDownloads(res.data.results)
    } ) .catch( err => {
      console.log(err)
    } )
  }

  const onVideoChange = ((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    (typeof Similar !== 'undefined'  && typeof downloaded !== 'undefined' && typeof addedToList !== 'undefined') &&
    <ScrollView style={{flex: 1 , backgroundColor: 'black' , borderBottomColor: '#fff', paddingTop: 20}} contentContainerStyle={{alignItems: 'center'}}>
      {play ? <View style={{width: '100%' , flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <YoutubePlayer
        width='100%'
        height={250}
        play={playing}
        videoId={`${vKey.key}`}
        onChangeState={onVideoChange}
      />
      {/* <Circle /> */}
      </View> : <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/original${State.backdrop_path}`}} style={{height: 350 , width:'100%'}}>
        <LinearGradient 
        colors={['rgba(0, 0, 0, 0)', 'rgba(1, 1, 1, 1)']}
        start={{ x: 0, y: 0.0 }}
        end={{ x: 0, y: 1.4 }}
        style={{position: 'relative' , bottom: -250 ,height: 100 , width: '100%' }} >
          {/* {console.log(State)} */}
          <View style={{ height: '50%' , marginVertical: 3, flex: 1 , justifyContent: 'center' , alignItems: 'flex-start' , borderRadius: 10 , paddingHorizontal: 6, paddingHorizontal: 15}}>
            <Text style={{position: 'relative',fontSize:22 , color: '#fff'}}>{State.title}</Text>
            <Text style={{position: 'relative',fontSize:22 , color: '#fff'}}>{State.original_name}</Text>
          </View>
          <View style={{flex:1 ,flexDirection: 'row', marginVertical: 3 , justifyContent: 'flex-start' , alignItems: 'center' }}>
            <View style={{ width: '25%' , justifyContent: 'center' , alignItems: 'center' }}>
              <Text style={{color: '#999'}}>{State.release_date}</Text>
            </View>
            <Text style={{color: '#999'}}>|</Text>
            <View style={{ width: '15%' , marginHorizontal: 3 , justifyContent: 'center' , alignItems: 'center'}}>
              <Text style={{color: 'dodgerblue' , fontSize:18}}>HD</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>}
      <View style={{padding: 16 , backgroundColor: '#111' , width: '100%'}}>
        <Text style={{fontSize: 16 , color: '#888'}}>{State.overview}</Text>
      </View>
      <View style={{height: 50 ,  justifyContent: 'flex-start' , flex: 1 , flexDirection: 'row' , paddingHorizontal: 10 , alignItems: 'center' , backgroundColor: '#111'}}>
        <TouchableHighlight style={{width: '60%'}} onPress={()=> {
          setPlay(!play)
          setPlaying(true)
        }}>
          <View style={{height: '80%' ,backgroundColor: '#fff' , marginVertical: 3, flex: 1 , justifyContent: 'center' , alignItems: 'center' , borderRadius: 10 ,marginHorizontal: 5}}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              {play ? (
                <>
                  <Icon name="pause" size={20} color="black" />
                  <Text style={{ textAlign: 'center', marginHorizontal: 15, fontSize: 15, color: 'black' }}>Pause</Text>
                </>
              ) : (
                <>
                  <Icon name="play" size={20} color="black" />
                  <Text style={{ textAlign: 'center', marginHorizontal: 15, fontSize: 15, color: 'black' }}>Play</Text>
                </>
              )}
            </View>
          </View>
        </TouchableHighlight>
        {downloaded ? <TouchableHighlight style={{width: '40%'}}>
        <View style={{height: '80%' ,backgroundColor: '#333' , marginVertical: 3, flex: 1 , justifyContent: 'center' , alignItems: 'center' , borderRadius: 10 ,marginHorizontal: 5}}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="checkmark-outline" size={20} color="dodgerblue" />
            <Text style={{ textAlign: 'center', marginHorizontal: 15, fontSize: 15, color: 'dodgerblue' }}>Downloaded</Text>
          </View>
        </View>
        </TouchableHighlight> : <TouchableHighlight style={{width: '40%'}} onPress={()=>addToDownloads(State)}>
        <View style={{height: '80%' ,backgroundColor: '#333' , marginVertical: 3, flex: 1 , justifyContent: 'center' , alignItems: 'center' , borderRadius: 10 ,marginHorizontal: 5}}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="download-outline" size={20} color="#fff" />
            <Text style={{ textAlign: 'center', marginHorizontal: 15, fontSize: 15, color: '#fff' }}>Download</Text>
          </View>
        </View>
        </TouchableHighlight>}
      </View>
      <View style={{ height: 60, width: '100%' , flex: 1, flexDirection: 'row', justifyContent: "space-evenly", alignItems: 'center', overflow: 'hidden',backgroundColor: '#111',paddingHorizontal: 40 }}>
        {addedToList ? <TouchableHighlight onPress={()=> addToList(State)}>
          <View style={{ backgroundColor: 'transparent', height: 40, width: 80, paddingTop: 2.5, borderRadius: 2.5 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', marginHorizontal: 3, fontSize: 15, color: 'dodgerblue' }}>Added To List</Text>
              <Icon name="checkmark-outline" size={19} color="dodgerblue" />
            </View>
          </View>
        </TouchableHighlight> : <TouchableHighlight onPress={()=> addToList(State)}>
          <View style={{ backgroundColor: 'transparent', height: 40, width: 80, paddingTop: 2.5, borderRadius: 2.5 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', marginHorizontal: 3, fontSize: 15, color: '#999' }}>Add To List</Text>
              <Icon name="add-outline" size={19} color="#fff" />
            </View>
          </View>
        </TouchableHighlight>}
        <Text>|</Text>
        <TouchableHighlight>
          <View style={{height: 40, width: 100, paddingTop: 2.5, borderRadius: 2.5 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', marginHorizontal: 5, fontSize: 15, color: '#999' }}>Rate</Text>
              <Icon name="thumbs-up-sharp" size={20} color="#fff" style={{marginHorizontal:4}}/>
              <Icon name="thumbs-down-sharp" size={20} color="#fff" style={{marginHorizontal:4}}/>
            </View>
          </View>
        </TouchableHighlight>
        <Text>|</Text>
        <TouchableHighlight>
          <View style={{ backgroundColor: 'transparent', height: 40, width: 80, paddingTop: 2.5, borderRadius: 2.5 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', marginHorizontal: 3, fontSize: 15 ,color: '#999'}}>Info</Text>
              <Icon name="information-circle-outline" size={19} color="#fff" />
            </View>
          </View>
        </TouchableHighlight>
      </View>
      <View style={{backgroundColor: '#111' , padding: 7, height: 305, marginBottom: 10}}>
      <View style={{ padding: 7 }}>
        <Text style={{color:'#fff' , fontSize: 18}}>Similar Shows</Text>
      </View>
      <FlatList
        data={Similar}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => navigation.navigate('watch', { State: item })}>
            <View style={{  width: 140, height: '100%', borderRadius: 7 , borderBottomLeftRadius: 7 , borderBottomRightRadius: 7  , marginHorizontal: 3, marginVertical: 10}}>
              <Image 
                source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path}` }} 
                style={{ width: 135, height: 205,borderRadius: 7 , borderBottomLeftRadius: 7 , borderBottomRightRadius: 7  , marginHorizontal: 3, marginVertical: 10}} 
              />
            </View>
          </TouchableHighlight>
        )}
      />
      </View>
    </ScrollView>
  )
}

export default Watch