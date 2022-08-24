import { StyleSheet, Text, View , TouchableHighlight} from 'react-native'
import React, { useEffect , useState} from 'react'
import { createDrawerNavigator ,DrawerItemList, DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer'
import About from './More/About';
import DrawerComponent from './More/DrawerComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import * as actionCreator  from '../../../../Redux/Actions/Actions'
import { bindActionCreators } from 'redux'

const More = () => {
  // ****** Redux ******
  const dispatch = useDispatch();
  const {LoggerAction} = bindActionCreators(actionCreator , dispatch)
  const [ user ,setUser ] = useState();
  useEffect(()=> {
    const userData = async() => {
      let sid = await AsyncStorage.getItem('session_id');
      await axios.get(`https://api.themoviedb.org/3/account?api_key=d783b21f4df68f71fbb0a780874f6cfb&session_id=${sid}`)
      .then( res => {
        console.log(res.data.username)
        setUser(res.data.username)
      } )
    }
    userData()
  },[])
  const Logout = async() => {
    const form = new FormData()
    form.append('session_id',await AsyncStorage.getItem('session_id'))
    await axios.delete(`https://api.themoviedb.org/3/authentication/session?api_key=d783b21f4df68f71fbb0a780874f6cfb`, { data: form })
    .then( async res =>{
        await AsyncStorage.removeItem('session_id')
        console.log("Logged Out Successfully !! response = ",res.data)
        LoggerAction(true)
      })
    .catch( async err => {
      console.log(await AsyncStorage.getItem('session-id'))
      console.log("Error Deleting session",err)
    })
  }
  const Drawer = createDrawerNavigator()
  return (
    typeof user !== 'undefined' &&
    <Drawer.Navigator 
    initialRouteName="About"
    useLegacyImplementation
    drawerContent={(props)=> {
      return(
        <DrawerContentScrollView {...props} style={{height: '100%' , flex: 1}}
        contentContainerStyle={{backgroundColor:'#191919',height:'100%',flex:1}}>
          <View style={{height: 80, width: '100%', backgroundColor: '#222'}}>
            <View style={{height: '100%' , width: '100%' ,flex: 1 ,flexDirection: 'row' , justifyContent: 'space-around' , alignItems: 'center'}}>
              <View style={{backgroundColor: '#7a0420' , height: 50 , width: 50 , borderRadius: 100 }}></View>
              <View style={{width: '60%' }}>
                <Text style={{fontSize: 24 , color: '#eee'}}>{user}</Text>
              </View>
            </View>
          </View>
          <DrawerItemList  {...props}/>
          <View style={{paddingHorizontal: 10 , position: 'relative'}}>
          <TouchableHighlight style={{width: '100%' , height: 45 , backgroundColor: 'darkred' , justifyContent: 'center' , alignItems: 'center' , borderRadius: 5 , marginVertical: 14}} onPress={()=> {Logout()}}>
            <Text style={{color: '#fff' , fontSize: 22}}>Logout</Text>
          </TouchableHighlight>
          </View>
        </DrawerContentScrollView>
      )
    }}
    screenOptions={{
      drawerActiveBackgroundColor: '#fff',
      drawerInactiveBackgroundColor: '#191919',
      drawerActiveTintColor: '#000',
      drawerInactiveTintColor: '#fff',
      drawerStyle:{
        paddingTop: 50
      },
      drawerPosition: 'right',
      headerShown: false
    }}
    >
      <Drawer.Screen name="About" component={About} options={{
        headerShown: false
      }}/>
    </Drawer.Navigator>
  )
}

export default More