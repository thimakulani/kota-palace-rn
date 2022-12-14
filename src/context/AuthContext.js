import {createContext, useEffect, useState} from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from "../data/configs";
//@react-native-async-storage/async-storage
//import {AsyncStorage} from "react-native";


export const AuthContext = createContext();
//const baseUrl = 'https://thima.somee.com/api/';
export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);

    const register = (name, email, password) => {
        setIsLoading(true);

        axios
            .post(`${baseUrl}/account/register`, {
                name,
                email,
                password,
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
                console.log(userInfo);
            })
            .catch(e => {
                console.log(`register error ${e}`);
                setIsLoading(false);
            });
    };

    const login = (email, password) =>
    {
        //console.warn('email pass');
        setIsLoading(true);
        axios
            .post(`${BASE_URL}/account/login`, {
                email:email,
                password:password,
            })
            .then(res => {
                //console.warn(email + password);
                let userInfo = res.data;
                console.log(userInfo);
                setUserInfo(userInfo);
                setUserInfo.access_token = res.data['Id'];
                //console.warn('the user type' + res.data['id']);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo)).then(r => {
                });
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`login error ${e}`);
                setIsLoading(false);
            });
    };

    const logout = () => {
        setIsLoading(true);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);

    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            userInfo.access_token = userInfo['id'];
            if (userInfo) {
                setUserInfo(userInfo);
            }

            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            console.log(`is logged in error ${e}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userInfo,
                splashLoading,
                register,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};