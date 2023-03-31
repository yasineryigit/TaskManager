import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import * as ACTIONS from '../redux/Constants'
import { useNavigation } from '@react-navigation/native';
import { retrieveUserCreds } from '../db/EncryptedStorage';
import { LogBox } from "react-native";
import { updateTabBarVisibility } from '../redux/appActions';

export default function SplashScreen() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const myState = useSelector(state => state.auth)
    
    useEffect(() => {

        LogBox.ignoreLogs([
            "ViewPropTypes will be removed",
            "ColorPropType will be removed",
            "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
        ])

        retrieveUserCreds().then((userCreds) => {//giriş yapmış ise içeri al, verilerini redux'a at
            const obj = JSON.parse(userCreds)

            console.log("kayıtlı creds:", obj)
            if (obj != null && obj.isLoggedIn) {
                dispatch(updateTabBarVisibility({ isTabBarVisible: true }))
                dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: obj })//store'a verileri at
                navigation.replace('MyTabs')
            } else {
                navigation.replace('StartScreen')
                console.log("there is no logged ın user")
            }
        })
    }, [])

    return (

        <View
            style={{
                flex: 1,
                backgroundColor: '#ffffff'
            }}
        >
            <LottieView
                source={require('../assets/todo.json')}
                autoPlay
                loop={true}
                speed={1}
                onAnimationFinish={() => {
                    console.log('Animation Finished!')
                    // this.props.navigation.replace('Home');
                }}
            />

        </View>
    );
}