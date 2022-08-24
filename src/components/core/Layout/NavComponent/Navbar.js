import { StyleSheet, Text, View , Image , FlatList, TouchableHighlight } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

const NavTabs = [
    {
        key: 1,
        tabName: "TV Programmes",
        tabPath: 'TV Series'
    },
    {
        key: 2,
        tabName: "Films",
        tabPath: 'Films'
    },
    {
        key: 3,
        tabName: "My List",
        tabPath: 'My List'
    }
]
const Item = ({ tabName }) => (
        <View style={{backgroundColor:'transparent' , marginHorizontal: 14}}>
            <Text style={{color: '#fff' , fontWeight: 'bold' ,fontSize: 16}}>{tabName}</Text>
        </View>
)

const Navbar = () => {
    const navigation = useNavigation()
    // const navigate = useNavigate();
    const renderNavItem = ({item}) => (
        <TouchableHighlight onPress={()=>navigation.navigate(`${item.tabPath}`)}>
            <View style={{flex:1, flexDirection: 'row',justifyContent: 'space-between', alignItems: "center" , width: "100%" }}>
                <Item tabName={item.tabName}/>
            </View>
        </TouchableHighlight>
    )
    
    return (
        <View style={styles.container}>
        <View style={{flex: 1 , flexDirection: 'row' , justifyContent:'space-between' , width: '100%'}}>
            
            {/* NetflixIcon */}
            <TouchableHighlight style={{position: 'relative' , left: 20, top:-5 , justifyContent: 'center' ,alignItems: 'center' }} onPress={()=> navigation.navigate('Netflix')}>
                <Image source={require('../../../../assets/NetflixNav.png')} style={{width: 30 , height: 30}}/>
            </TouchableHighlight>
            
            {/* Flatlist */}
            <View style={{position: 'relative' , right: 20, justifyContent: 'center' ,alignItems: 'center' , width: 320}}>
                <FlatList 
                data={NavTabs} 
                horizontal
                renderItem={renderNavItem}
                keyExtractor={Item => Item.key}
                contentContainerstyle={{justifyContent:'space-between' , alignItems: 'center'}}
                />
            </View>

        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 1.0)'
    }
})

export default Navbar

