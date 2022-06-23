 import React from 'react'
 import {View, Text, StyleSheet, Button, Image, Dimensions, ScrollView} from 'react-native'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'
import TitleText from '../components/TitleText'
import colors from '../constants/colors'
 
 const GameOverScreen = (props) => {
   return (
        <ScrollView>
            <View style={styles.screen}>
                <Text>The Game is Over!</Text>
                <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/success.png')} 
                    // source={{uri:'https://cdn.pixabay.com/photo/2017/06/05/07/58/butterfly-2373175__340.png'}}
                    style={styles.image} 
                    resizeMode="cover"/>
                </View>
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>Your phone needed{' '}
                        <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number{' '}
                        <Text style={styles.highlight}>{props.userNumber}</Text>
                    </Text>
                </View>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton> 
            </View>
        </ScrollView>
   )
 }


 const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    imageContainer:{
        width:Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width  * 0.7,
        borderRadius:Dimensions.get('window').width * 0.7 / 2,
        borderWidth:3,
        borderColor:'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30 // This will set the vertical margin to 5% of the device height /40 will set it to 2.5% etc
    },
    image:{
        width:'100%',
        height: '100%',
    }, 
    resultContainer:{
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText:{
        textAlign:'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    highlight:{
        color:colors.primary,
        fontWeight:'bold',
    }
 })
 
 export default GameOverScreen