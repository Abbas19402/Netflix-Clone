import React, { useEffect, useState } from 'react';
import { StyleSheet, View , StatusBar, Linking } from 'react-native';
import SplashScreen from './src/components/SplashScreen/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/components/core/Layout/Login/Login';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store/Store';

export default function App() {
  useEffect(()=> {
    setTimeout(()=> {
      setLoading(false)
    },3000)
  },[])

  // ****** States ******
  const [loading , setLoading ] = useState(true);

  return (
    <Provider store={Store}>
      <NavigationContainer>
          <View style={styles.container}>
            <StatusBar style={styles.StatusBar}/>
            {loading ? (
              <SplashScreen/>
            ) : (
              <>
                <Login/>
              </>
            )}
          </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  AfterSplash: {
    flex: 1,
    paddingVertical: 10
  },
  StatusBar : {
    color:"#fff"
  }
});