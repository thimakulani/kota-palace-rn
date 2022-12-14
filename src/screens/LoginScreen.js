import {StatusBar, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Button, TextInput, useTheme} from "react-native-paper";
import login_styles from "../stylesheet/login_styles";
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import {useContext, useState} from "react";
import axios from 'axios';
import {AuthContext} from "../context/AuthContext";
const baseUrl = 'https://thima.somee.com/api/';

function LoginScreen ({navigation}){

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const {isLoading, login} = useContext(AuthContext);
    const { colors } = useTheme();

    function loginHandle(username, password)
    {
        axios.post(baseUrl+'account/login', {
            email: username,
            password: password
        }).then(function (response)
        {
            console.warn(response);
            //navigation.navigate('Home');
        }).catch(function (error) {
            console.log('something went wrong');
        })

    }
    const onPress=()=>{
        Keyboard.dismiss;
    }

    return(
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={login_styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content"/>

                <View style={login_styles.header}>
                    <Text style={login_styles.text_header}>Welcome!</Text>
                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={[login_styles.footer, {
                        backgroundColor: colors.background
                    }]}
                >
                    <View>
                        <TextInput
                            placeholder={'Email'}
                            theme={{colors: { primary: '#009387',underlineColor:'transparent'}}}
                            keyboardType={'email-address'}
                            left={<TextInput.Icon name={'email'} color={'#009387'} />}
                            autoCapitalize={'none'}
                            mode={'outlined'}
                            value = {email}

                            onChangeText={text=>setEmail(text)}
                        />

                        <TextInput
                            placeholder={'Username'}

                            keyboardType={'email-address'}
                            left={<TextInput.Icon name={'lock'} color={'#009387'}/>}
                            autoCapitalize={'none'}
                            mode={'outlined'}
                            theme={{ colors: { primary: '#009387',underlineColor:'transparent',}}}
                            value = {password}
                            onChangeText={text=>setPassword(text)}
                        />

                        <TouchableOpacity>
                            <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
                        </TouchableOpacity>
                        <View style={login_styles.button}>
                            <TouchableOpacity
                                style={login_styles.signIn}
                                onPress={() => {login(email, password);}}
                            >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={login_styles.signIn}
                                >
                                    <Text style={[login_styles.textSign, {
                                        color:'#fff'
                                    }]}>Sign In</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={login_styles.button}>
                            <TouchableOpacity
                                style={login_styles.signIn}
                                onPress={() => {navigation.navigate('Register')}}
                            >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={login_styles.sign_up}
                                >
                                    <Text style={[login_styles.textSign, {
                                        color:'#fff'
                                    }]}>Sign Up</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    );
}
export default LoginScreen;