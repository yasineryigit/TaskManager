import React, { useRef, useMemo } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MyTabs from './src/navigation/MyTabs';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StartScreen from './src/screens/StartScreen';
import configureStore from './src/redux/configureStore';
import { Provider as StoreProvider } from 'react-redux'
import Toast from 'react-native-toast-message';
import SplashScreen from './src/screens/SplashScreen';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import AddEmployeeScreen from './src/screens/AddEmployeeScreen';



const Stack = createStackNavigator()

const MyStackNavigator = () => {
  return (

    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen name="MyTabs"
        component={MyTabs} />

      <Stack.Screen name="StartScreen"
        component={StartScreen} />

      <Stack.Screen name="LoginScreen"
        component={LoginScreen} />

      <Stack.Screen name="RegisterScreen"
        component={RegisterScreen} />

      <Stack.Screen name="AddEmployeeScreen"
        component={AddEmployeeScreen} />

      <Stack.Screen name="SplashScreen"
        component={SplashScreen} />

    </Stack.Navigator>
  )
}



export default function App() {
  const store = configureStore()//redux içindeki store'u döndüren metodu verdik

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['50%'], []);

  const openModal = () => {
    bottomSheetModalRef.current?.present();
  }


  return (

    <StoreProvider store={store}>

      <NavigationContainer>

        <MyStackNavigator />

      </NavigationContainer>


      <Toast />
    </StoreProvider>

  );
}


const styles = StyleSheet.create({

  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

})


