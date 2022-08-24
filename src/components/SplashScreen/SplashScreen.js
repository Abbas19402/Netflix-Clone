import React from 'react'
import { View , StyleSheet , Image , ActivityIndicator } from 'react-native'

const SplashScreen = () => {
  return (
    <View style = {styles.container}> 
        <Image style = {styles.splashLogo} source={require('../../assets/Netflix-logo.png')}/>
        <ActivityIndicator size="large" color="red" />
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    splashLogo: {
        width: 250,
        height: 200
    }
})

export default SplashScreen