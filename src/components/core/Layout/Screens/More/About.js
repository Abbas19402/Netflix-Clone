import { View, Text, Image, TouchableHighlight } from 'react-native'
import React  from 'react'

const About = ({navigation}) => {

  return (
    <View style={{backgroundColor: '#000', flex: 1 , justifyContent: 'center'  ,alignItems: 'center'}}>
      {/* Open Drawer Button */}
      <TouchableHighlight style={{height: 50, width: 50, borderWidth: 3, borderColor: 'darkred' , position: 'absolute',top:10,right:10, justifyContent: 'center', alignItems: 'center'}} onPress={()=>{navigation.openDrawer()}}>
          <Text style={{color: 'white' , fontSize: 20}}>|||</Text>         
      </TouchableHighlight>
      {/* Logo */}
      <Image style = {{width: 250,height: 200}} source={require('../../../../../assets/Netflix-logo.png')}/>
      <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
        <Text style={{textAlign: 'justify' , color:'#999'}}>
        At Netflix, we want to entertain the world. Whatever your taste, and no matter where you live, we give you access to best-in-class TV series, documentaries, feature films and mobile games. Our members control what they want to watch, when they want it, with no ads, in one simple subscription. We’re streaming in more than 30 languages and 190 countries, because great stories can come from anywhere and be loved everywhere. We are the world’s biggest fans of entertainment, and we’re always looking to help you find your next favorite story.
        </Text>
        <View style={{padding: 20 ,marginVertical: 20}}>
          <Text allowFontScaling={true} style={{textAlign: 'center' , color: '#eee' , fontSize: 35 , fontWeight:'100'}}>Abbas Dalal</Text>
        </View>
      </View>
    </View>
  )
}

export default About