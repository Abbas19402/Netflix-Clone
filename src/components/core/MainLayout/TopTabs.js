import { View, Text , TouchableHighlight , Image} from 'react-native'
import React , { useState , useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FullLayout from './FullLayout';
import MoviesOnly from '../Layout/Routes/MoviesOnly'
import SeriesOnly from '../Layout/Routes/SeriesOnly'
import List from '../Layout/Screens/Home/List'
import Navbar from '../Layout/NavComponent/Navbar';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import * as actionCreator  from '../../../Redux/Actions/Actions'
import { bindActionCreators } from 'redux'
import Snackbar from 'react-native-snackbar';

const TopTabs = () => {
  const dispatch = useDispatch()
  const snackRenderStatus = useSelector( state => state.popSnackBarReducer )
  const snackText = useSelector( state => state.popSnackBarReducerText )
  const { popSnackBar } = bindActionCreators(actionCreator)
  const Stack = createNativeStackNavigator();
  const [ snackbar , setSnackbar ] = useState(false)

  useEffect(()=> {
    console.log("Snackbar status = ", snackRenderStatus, snackText)
    if(snackRenderStatus) {
      console.log("snack")
      setSnackbar(true)
    }
    if(snackbar) {
      setTimeout(()=> {
        setSnackbar(false)
        popSnackBar(false , "")
      },3000)
    }
  },[snackText ,snackRenderStatus])
  if(snackRenderStatus) {
    console.log("Hyubfbwefwefwefwef");
    Snackbar.show({
      text: 'Hello world',
      duration: Snackbar.LENGTH_LONG,
    })
  }
  return (
    <>
        <View style={{ position: 'absolute', top: 0, zIndex: 5, width: '100%' }}>
          <Navbar/>
        </View>
      <Stack.Navigator initialRouteName='Netflix' screenOptions={{
        // headerShown: false 
      }}>
          <Stack.Screen name='Netflix' component={FullLayout}/>
          <Stack.Screen name='TV Series' component={SeriesOnly}/>
          <Stack.Screen name='Films' component={MoviesOnly}/>
          <Stack.Screen name='My List' component={List}/>
      </Stack.Navigator>
    </>
  )
}

export default TopTabs