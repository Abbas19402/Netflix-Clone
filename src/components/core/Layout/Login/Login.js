import { View, Text, Image, TextInput, TouchableHighlight, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Linking } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Navbar from '../NavComponent/Navbar'
import FullLayout from '../../MainLayout/FullLayout'
import WebView from 'react-native-webview'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import * as actionCreator  from '../../../../Redux/Actions/Actions'
import { bindActionCreators } from 'redux'
import { setLogger } from '../../../../Redux/Reducers/Reducers'
import TopTabs from '../../MainLayout/TopTabs'
import Snackbar from '../../../Other/Snackbar'

const Login = () => {
  // ****** Redux ******
  const dispatch = useDispatch();
  const {LoggerAction , storeSessionID, popSnackBar} = bindActionCreators(actionCreator , dispatch)
  const logger = useSelector(state => state.setLogger)
  const session_id = useSelector( state => state.sessionId )


  useEffect(() => {
    console.log('<----- UseEffect ----->')
    function logCurrentStorage() {
      AsyncStorage.getAllKeys().then((keyArray) => {
        AsyncStorage.multiGet(keyArray).then((keyValArray) => {
          let myStorage = {};
          for (let keyVal of keyValArray) {
            myStorage[keyVal[0]] = keyVal[1]
          }
          console.log('CURRENT STORAGE: ', myStorage);
        })
      });
    }
    logCurrentStorage()
    const checkLog= async() => {
      if(await AsyncStorage.getItem('session_id') == null) {
        LoggerAction(true)
      }
    }
    checkLog()
  }, [logger])

  // ****** Form ******
  const [userDetails, setUserDetails] = useState({})
  const handleOnChange = (event, name) => {
    setUserDetails({ ...userDetails, [name]: event });
  }
  // ****** Authentication ******
  const apiKey = 'd783b21f4df68f71fbb0a780874f6cfb'

  // Request Token
  const createRequestToken = async () => {
    await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey} `)
      .then(async (res) => {
        console.log(res.data.request_token)
        // writing permission
        validateRT(res.data.request_token)
        generateSession(res.data.request_token)
        generateSessionID(res.data.request_token)
        generateAccessToken(res.data.request_token)
      })
      .catch(err => console.log(err))
  }
  const validateRT = (rt) => {
    return <WebView source={{uri: `https://www.themoviedb.org/authenticate/${rt}/allow`}} />
  }
  // Generating a sessionId
  const generateSessionID = async (rt) => {
    await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`, {
      request_token: rt
    })
      .then(async(response) => {
        await AsyncStorage.setItem('session_id', response.data.session_id)
        .then(() => {
          console.log('SESSION_ID stored successfully', response.data.session_id)
          storeSessionID(response.data.session_id)
          LoggerAction(false)
        })
        .catch(err => console.log(err))
        let SID = await AsyncStorage.getItem('session_id')
        console.log("Session-id genrated!! , ",SID)
        
      })
      .catch(err => {
        console.log("Error Generating session_ID", err)
        popSnackBar({renderStaus: true , text: 'Logged out last time? Try Again!!'})
      })
  }

  // generating session using RT 
  const generateSession = async (rt) => {
    let body = {
      username: userDetails.username,
      password: userDetails.password,
      request_token: rt
    }
    console.log("username:", userDetails.username,
      "password:", userDetails.password)
    axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`, body)
  }

  const generateAccessToken = async(reqt)=> {
    console.log('rt in at = ',reqt)
    const options = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzgzYjIxZjRkZjY4ZjcxZmJiMGE3ODA4NzRmNmNmYiIsInN1YiI6IjYyY2ZmODg3MjM4NTEzMDA0ZDhlNTZjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yvb0lV8pgo2zfyPTiKIEvCyYi3OR88RKe4MNjxrlE5Q'
      }
    };
    await axios.post(`https://api.themoviedb.org/4/auth/access_token`,{
      request_token : `${reqt}`
    },options) .then( res => {
      console.log("AccessToken ===> ", res)
    }) .catch( err => {
      console.log("AccessToken Error ===> ", err)
    }) 
  }
  return (
    logger === true ?
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        {console.log(logger)}
        <Image style={{ width: 250, height: 200 }} source={require('../../../../assets/Netflix-logo.png')} />
        {/* Username Password */}
        <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
          {/* Form */}
          <TextInput
            placeholder='Username'
            style={{ borderColor: '#333', borderWidth: 3, width: '100%', borderRadius: 8, paddingHorizontal: 12, marginVertical: 6}}
            onChangeText={(event) => { handleOnChange(event, 'username') }}
            value={userDetails.username}
          />
          <TextInput
            secureTextEntry
            placeholder='Password'
            style={{ borderColor: '#333', borderWidth: 3, width: '100%', borderRadius: 8, paddingHorizontal: 12, marginVertical: 6 }}
            onChangeText={(event) => { handleOnChange(event, 'password') }}
            value={userDetails.password}
          />
          <TouchableHighlight style={{ width: '100%', height: 50, backgroundColor: 'darkred', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginVertical: 14 }} onPress={() => {
            createRequestToken()
          }}>
            <Text style={{ color: '#fff', fontSize: 26 }}>Login</Text>
          </TouchableHighlight>
        </View>
      </View> : <>
        <View style={styles.AfterSplash}>
          <TopTabs/>
          <Snackbar/>
        </View>
      </>
  )
}

export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  AfterSplash: {
    flex: 1,
    paddingVertical: 10
  },
  StatusBar: {
    color: "#fff"
  }
});