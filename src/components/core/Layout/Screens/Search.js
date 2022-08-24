import { StyleSheet, Text, TextInput, View , Button} from 'react-native'
import React , { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Movies from './Search/Movies';
import TvSeries from './Search/TvSeries';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../../../Redux/Actions/Actions'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchKeyword , searchedMovie , searchedSeries } = bindActionCreators(actionCreators , dispatch)
  const [ searchItem , setSearchItem ] = useState();

  const searchShows = async(event) => {
    await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=d783b21f4df68f71fbb0a780874f6cfb&language=en-US&query=${event}&page=1&include_adult=true`)
    .then((res)=> {
      let sMovies = res.data.results.filter( item => item.media_type == 'movie' )
      let sTvSeries = res.data.results.filter( item => item.media_type == 'tv' )
      searchedMovie(sMovies)
      searchedSeries(sTvSeries)
    })
    .catch(err => console.log(err))
  }
  return (
    <View style={{flex: 1 , flexDirection: 'row' , width: '100%' , height: 65 , justifyContent:'center' , alignItems:'center' ,paddingTop:15}}>
      <TextInput
        style={{backgroundColor: '#444' , borderRadius: 10 , padding:4 , paddingHorizontal: 8 , color: '#ddd' , marginHorizontal: 10, height: 35 , width: '90%' }}
        placeholder='Search'
        placeholderTextColor={'#eee'}
        onChangeText={(event)=> {
          searchKeyword({'search': event})
          searchShows(event)
        }}
        value={searchItem}
        textAlign='center'
      />
    </View> 
  )
}

const Search = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <View style={{flex: 1 , backgroundColor: 'black'}}>
        <View style={{position: 'relative' , top: 100 , zIndex: 4,  borderColor: '#555' , justifyContent:'center' , alignItems:'center' , backgroundColor: '#111'}}>
          <SearchBar/>
        </View>
        <Tab.Navigator style={{position: 'relative' , backgroundColor: 'black' , zIndex: 3}} screenOptions={{
          tabBarStyle:{
            backgroundColor: 'black',
          },
          tabBarInactiveTintColor: '#fff',
          tabBarActiveTintColor: 'red',
          tabBarIndicatorStyle: {backgroundColor: 'red'},
          tabBarPressColor: 'darkred'
        }}
        transitionStyle='curl'
        initialRouteName='Movies'>
          <Tab.Screen name='Movies' component={Movies}/>
          <Tab.Screen name='tv Series' component={TvSeries}/>
        </Tab.Navigator>
      </View>
    </>
  )
}

export default Search

