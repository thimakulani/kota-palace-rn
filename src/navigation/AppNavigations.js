import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthContext} from "../context/AuthContext";
import {useContext} from "react";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/SignupScreen";
import MainNavigation from "./MainNavigation";
import MenuScreen from "../screens/MenuScreen";
const Stack = createNativeStackNavigator();

function AppNavigations(){
    const {userInfo, splashLoading} = useContext(AuthContext);
    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {splashLoading ? (
                    <Stack.Screen
                        name="Splash Screen"
                        component={SplashScreen}
                        options={{headerShown: false}}
                    />
                ) : userInfo.access_token ? (

                    <>
                        <Stack.Screen name="MainNavigation"
                                      options={{
                                          animation:true,
                                          title:'',
                                          headerBackVisible: true,
                                          transitionSpec:
                                              {
                                                  open: config,
                                                  close: config,
                                              },}}
                                      component={MainNavigation} />
                        <Stack.Screen name="SpazaMain"
                                      options={{
                                          animation:true,
                                          title:'',
                                          headerBackVisible: true,
                                          transitionSpec:
                                              {
                                                  open: config,
                                                  close: config,
                                              },}}
                                      component={MenuScreen} />
                    </>




                ) : (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="Register"
                            component={SignupScreen}
                            options={{headerShown: false}}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default AppNavigations;