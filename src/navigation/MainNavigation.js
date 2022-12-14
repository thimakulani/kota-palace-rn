import ProfileScreen from "../screens/ProfileScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import OrdersScreen from "../screens/OrdersScreen";
import {useEffect} from "react";
import NetInfo from "@react-native-community/netinfo";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import CartScreen from "../screens/CartScreen";
const Tab = createMaterialBottomTabNavigator();
function MainNavigation({navigation})
{
    const connection = NetInfo.addEventListener((e)=>{
        if(!e.isConnected)
        {
            console.warn('connection lost');
        }
    });
    useEffect(()=>{
        connection();
    },[]);
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',

            }}

        >

            <Tab.Screen name='HomeScreen'
                        component={HomeScreen}
                        options={{headerShown: false,
                            tabBarLabel: 'HOME',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="home" color={color} size={26} />
                            ),
                        }}

            />
            <Tab.Screen name='CartScreen'
                        component={CartScreen}
                        options={{headerShown: false,
                            tabBarLabel:'CART',
                            tabBarBadge:0,
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="cart" color={color} size={26} />
                            ),
                        }}
            />
            <Tab.Screen name='OrdersScreen'
                        component={OrdersScreen}

                        options={{
                            headerShown: false,
                            tabBarLabel: 'ORDERS',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="store" color={color} size={26} />
                            ),
                        }}
            />

            <Tab.Screen name='ProfileScreen'
                        component={ProfileScreen}
                        options={{headerShown: false,
                        tabBarLabel:'PROFILE',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account" color={color} size={26} />
                        ),

                        }}
            />

        </Tab.Navigator>
    );
}
export default MainNavigation;