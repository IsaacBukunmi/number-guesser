import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button, Keyboard, Alert, Dimensions, ScrollView,  KeyboardAvoidingView  } from 'react-native';
import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';

const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4) 

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }
    
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })
    
    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99) {
            Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99.', [{text: 'Okay', style:'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput;

    if (confirmed){
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text> 
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        )
    }

    return (
        <ScrollView>
            {/* To prevent the keyboard from overlapping the input */}
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}> 
                <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a new Game!</Text>
                        <Card style={styles.inputContainer}>
                            <Text>Select a Number</Text>
                            <Input 
                                style={styles.input} 
                                blurOnSubmit 
                                autoCapitalize='none' 
                                autoCorrect={false} 
                                keyboardType="number-pad" 
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}><Button title="Reset" onPress={() => resetInputHandler()} color={Colors.accent}/></View>
                                <View style={styles.button}><Button title="Confirm" onPress={() => confirmInputHandler()} color={Colors.primary}/></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View> 
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex:1, //to take all space ver and hor
        padding:10,
        alignItems: 'center' // align center horizontally
    },
    title:{
        fontSize:20,
        marginVertical:10,
        // fontFamily:'open-sans-bold'
    },
    inputContainer:{
        minWidth: 300, // bigger screens
        width:'80%',
        maxWidth: '90%',
        // maxWidth:'80%',
        alignItems:'center',
    },
    buttonContainer:{
        flexDirection: 'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:15,
    },
    input:{
        width:50,
        textAlign: 'center'
    },
    summaryContainer:{
        marginTop:20,
        alignItems: 'center',
    },
})

export default StartGameScreen
