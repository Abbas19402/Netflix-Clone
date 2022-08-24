import { View, Text } from 'react-native'
import React from 'react'

const Snackbar = () => {
  return (
    <View style={{width: '100%' ,height: 100, position: 'absolute', bottom: -780, borderWidth: 3 , borderColor: '#fff', zIndex: 1000 }}>
      <Text>Snackbar</Text>
    </View>
  )
}

export default Snackbar