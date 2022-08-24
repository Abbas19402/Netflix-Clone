import { View, Text, FlatList, TouchableHighlight, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Movies = ({navigation}) => {
    const searchedShow = useSelector(state => state.searchMovieReducer)
    useEffect(()=> {
        console.log(searchedShow)
    },[searchedShow])
    return (
        <View style={{backgroundColor: 'black' , flex: 1}}>
            {searchedShow.length !== 0 ? <FlatList
                data={searchedShow}
                showsVerticalScrollIndicator={false}
                style={{marginTop: 80}}
                renderItem={ ({item , index}) => {
                    return (
                        <TouchableHighlight onPress={() => navigation.navigate('watch', { State: item })}>
                            <View style={item.title.length > 50 ? {width: '100%' , height: 70 , backgroundColor: 'black' , marginVertical: 3, justifyContent: 'center' , padding: 10} : {width: '100%' , height: 50 , backgroundColor: 'black' , marginVertical: 3, justifyContent: 'center' , padding: 10}}>
                                <Text style={{fontSize: 18}}>{item.title}</Text>
                            </View>
                        </TouchableHighlight>
                    )
                } }
            /> : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                </View>
            }
        </View>
    )
}

export default Movies