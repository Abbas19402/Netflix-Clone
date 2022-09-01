import { View, Text, FlatList, Image, TouchableNativeFeedback, Platform, TouchableHighlight } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const SeriesOnly = ({navigation}) => {
  const scroll = useRef();
  useEffect(() => {
    if(page == 0 ) {
      setPage(page+1)
    }
    getMovies()
    console.log('-------------------UE--------------------------------');
  }, [])
  const getMovies = (pageNo) => { 
    axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=d783b21f4df68f71fbb0a780874f6cfb&language=en-US&page=${pageNo}`)
      .then(res => {
        console.log("Movies Only Response = ", res.data.results)
        setData(res.data.results)
      })
      .catch(err => console.log(err.message))
  }
  const scrolltoTop = () => {
    scroll.current.scrollToIndex({index: 0})
  }
  const [page, setPage] = useState(0)
  const [data, setData] = useState([])
  return (
    // Use pagination
    // https://api.themoviedb.org/3/tv/on_the_air?api_key=d783b21f4df68f71fbb0a780874f6cfb&language=en-US&page=1
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
      <Text>Page Number: {page}</Text>
      <FlatList
        ref={scroll}
        data={data}
        style={{ width: '100%' , marginBottom: 50 }}
        renderItem={({ item }) => {
          return (
            Platform.OS !== 'ios' ? 
            <TouchableNativeFeedback onPress={()=> navigation.navigate('watch' , {State: item, Type: 'tv'})}>
              <View style={{ padding: 15 , flex: 1 , flexDirection: 'row' , alignItems: 'center' ,justifyContent: 'flex-start' , height: 70}}>
                <Image source={{uri: `https://image.tmdb.org/t/p/original${item.poster_path}`}} style={{width: 50 , height: 50 , marginRight: 20, borderRadius: 7}}/>
                <Text style={item.original_name.length > 40 ? { fontSize: 17, color: '#939393' } : {fontSize: 18, color: '#939393' } }>{item.original_name}</Text>
              </View>
            </TouchableNativeFeedback> : <TouchableHighlight onPress={()=> navigation.navigate('watch' , {State: item})}>
              <View style={{ padding: 15 , flex: 1 , flexDirection: 'row' , alignItems: 'center' ,justifyContent: 'flex-start' , height: 70}}>
                <Image source={{uri: `https://image.tmdb.org/t/p/original${item.poster_path}`}} style={{width: 50 , height: 50 , marginRight: 20, borderRadius: 7}}/>
                <Text style={item.original_name.length > 40 ? { fontSize: 17, color: '#939393' } : {fontSize: 18, color: '#939393' } }>{item.original_name}</Text>
              </View>
            </TouchableHighlight>
          )
        }}
      />
      <View style={{ position: 'relative', flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 4, top: -50, width: '100%' }}>
        {Platform.OS !== 'ios' ? <>
          {page === 1 ? <>
            <TouchableNativeFeedback disabled>
              <View style={{ height: 40, width: 60, borderRadius: 5, backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Previous</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => {
                setPage(page + 1)
                getMovies(page+1)
                scrolltoTop() 
              }}>
              <View style={{ height: 40, width: 60, borderRadius: 5, backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Next</Text>
              </View>
            </TouchableNativeFeedback>
          </> : page === data.total_pages ? <>
            <TouchableNativeFeedback onPress={() => {
                setPage(page - 1)
                getMovies(page-1)  
                scrolltoTop()
              }}>
              <View style={{ height: 40, width: 60, borderRadius: 5, backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Previous</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback disabled>
              <View style={{ height: 40, width: 60, borderRadius: 5, backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Next</Text>
              </View>
            </TouchableNativeFeedback>
          </> : <>
            <TouchableNativeFeedback onPress={() => {
                setPage(page - 1)
                getMovies(page-1)
                scrolltoTop()
              }}>
              <View style={{ height: 40, width: 60, borderRadius: 5, backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Previous</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => {
                setPage(page + 1)
                getMovies(page+1)
                scrolltoTop()
              }}>
              <View style={{ height: 40, width: 60, borderRadius: 5, backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Next</Text>
              </View>
            </TouchableNativeFeedback>
          </>}
        </> : Platform.OS == 'ios' ? <>
        {page === 1 ? <>
            <TouchableHighlight disabled>
              <View style={{ height: 40, width: 60, borderRadius: 5, backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Previous</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
                setPage(page + 1)
                getMovies(page+1)
                scrolltoTop() 
              }}>
              <View style={{ height: 40, width: 60, borderRadius: 5, backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Next</Text>
              </View>
            </TouchableHighlight>
          </> : page === data.total_pages ? <>
            <TouchableHighlight onPress={() => {
                setPage(page - 1)
                getMovies(page-1)  
                scrolltoTop()
              }}>
              <View style={{ height: 40, width: 60, borderRadius: 5, backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Previous</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight disabled>
              <View style={{ height: 40, width: 60, borderRadius: 5, backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Next</Text>
              </View>
            </TouchableHighlight>
          </> : <>
            <TouchableHighlight onPress={() => {
                setPage(page - 1)
                getMovies(page-1)
                scrolltoTop()
              }}>
              <View style={{ height: 40, width: 60, borderRadius: 5, backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Previous</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
                setPage(page + 1)
                getMovies(page+1)
                scrolltoTop()
              }}>
              <View style={{ height: 40, width: 60, borderRadius: 5, backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Next</Text>
              </View>
            </TouchableHighlight>
          </>}
        </> : ""}
      </View>
    </View>
  )
}

export default SeriesOnly