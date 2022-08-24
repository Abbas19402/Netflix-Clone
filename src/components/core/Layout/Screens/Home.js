// import { Text, View, FlatList, Image, StyleSheet ,ScrollView , ImageBackground , TouchableHighlight  } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Icon from 'react-native-vector-icons/Ionicons';

// const Item = () => {
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// }

// const Header = () => {
//   return (
//     <View style={styles.container} scrollEnabled contentContainerStyle={{flex:1}}>
//        <ScrollView style={{flex: 1, backgroundColor: 'black' }} scrollEnabled={true}>
//          <ImageBackground source={require('../../../../assets/ST4.png')} style={{height: 600 , width:'100%', overflow: 'hidden'}}>
//             <View style={{position: 'relative' , bottom: -500, height: 100 , width: '100%'}}>
//              <View style={{height:10,flex:1 , flexDirection: 'row' , justifyContent: "space-evenly" ,alignItems: 'center' ,overflow: 'hidden'}}>
//                <TouchableHighlight>
//                  <View style={{backgroundColor: 'transparent' , height: 40 , width: 80 , paddingTop: 2.5 , borderRadius: 2.5}}>
//                    <View style={{flex:1 , flexDirection: 'column', justifyContent: 'center' , alignItems: 'center'}}>
//                      <Icon name="add-outline" size={19} color="#fff"/>
//                      <Text style={{textAlign: 'center' , marginHorizontal:3 , fontSize: 10 , color: '#fff'}}>Add To List</Text>
//                    </View>
//                  </View>
//                </TouchableHighlight>
//                <TouchableHighlight>
//                  <View style={{backgroundColor: '#fff' , height: 40 , width: 100 , paddingTop: 2.5 , borderRadius: 2.5}}>
//                    <View style={{flex:1 , flexDirection: 'row', justifyContent: 'center' , alignItems: 'center'}}>
//                     <Icon name="play" size={20} color="black"/>
//                      <Text style={{textAlign: 'center' , marginHorizontal:5 , fontSize: 15 , color: 'black'}}>Play</Text>
//                    </View>
//                 </View>
//                </TouchableHighlight>
//                <TouchableHighlight>
//                  <View style={{backgroundColor: 'transparent' , height: 40 , width: 80 , paddingTop: 10 , borderRadius: 2.5}}>
//                    <View style={{flex:1 , flexDirection: 'column', justifyContent: 'center' , alignItems: 'center'}}>
//                      <Icon name="information-circle-outline" size={19} color="#fff"/>
//                      <Text style={{textAlign: 'center' , marginHorizontal:3 , fontSize: 10 , color: '#fff'}}>Info</Text>
//                    </View>
//                 </View>
//                </TouchableHighlight>
//             </View>
//            </View>
//          </ImageBackground>
//        </ScrollView>
//      </View>
//   )
// }

// const Home = () => {
//   useEffect(() => {
//     let timer = setTimeout(getMoviesSeries, 1000, [])
//     return () => clearTimeout(timer)
//   }, [getMoviesSeries])

//   // Fetch Netflix Data
//   const apiKey = 'd783b21f4df68f71fbb0a780874f6cfb'
//   var MoviesAndSeries = [
//     {
//       key: 0,
//       name: 'NetflixOrginals',
//       API: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_network=213`
//     },
//     {
//       key: 1,
//       name: 'TrendingData',
//       API: `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&langauge=en-US`
//     },
//     {
//       key: 2,
//       name: 'TopRated',
//       API: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&langauge=en-US`
//     },
//     {
//       key: 3,
//       name: 'ActionMovies',
//       API: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`
//     },
//     {
//       key: 4,
//       name: 'ComedyMovies',
//       API: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`
//     },
//     {
//       key: 5,
//       name: 'HorrorMovies',
//       API: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27`
//     },
//     {
//       key: 6,
//       name: 'RomanceMovies',
//       API: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749`
//     },
//     {
//       key: 7,
//       name: 'Documentaries',
//       API: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=99`
//     }
//   ];
//   const [netflix, setNetflix] = useState([]);
//   const getMoviesSeries = ()=> {
//     var MSarray=[];
//     MoviesAndSeries.map(async(item , key)=> {
//       await axios.get(`${item.API}`)
//       .then((res)=> {
//         MSarray.push(res)
//       })
//       .catch((err)=> {
//         console.log("Error :- ", err );
//       })
//     })
//     setNetflix(MSarray);
//   }

//   return (
//     <View style={{ width: '100%' , backgroundColor: 'black' }}>
//       {/* Series FlatList */}
//       <View style={{margin: 8 , backgroundColor: 'black' }}>
//         <FlatList
//           data={netflix}
//           vertical
//           ListHeaderComponent={Header}
//           renderItem={ ({item , index})=> (
//             <View style={{ width: '100%', height: 185,  marginVertical: 5, padding:7, backgroundColor: 'black'  }}>
//               {MoviesAndSeries.map((value , key) => (
//                 key == index ? (
//                   <View key={value.key} style={{ paddingLeft:2, backgroundColor: 'black'  }}>
//                     <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold' }}>{value.name}</Text>
//                   </View>
//                 ) : null
//               ))}
//               <FlatList 
//                 data={item.data.results}
//                 horizontal
//                 renderItem={ ({item}) => (
//                   <View style={{ width: 120, height: 185,  marginHorizontal: 5, backgroundColor: 'black' }}>
//                     <Image source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path}` }} style={{ width: 110, height: 175}} />
//                   </View>
//                 )}
//               />
//             </View>
//           )}
//         />
//       </View>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black"
//   },
//   Text: {
//     color: "#fff"
//   }
// })
// export default Home


import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './Home/HomePage';
import Watch from './Home/Watch';

const Home = () => {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name = 'home' component={HomePage}/>
        <Stack.Screen name = 'watch' component={Watch}/>
      </Stack.Navigator>
  )
}

export default Home