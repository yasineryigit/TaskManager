import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/authActions'
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import { login } from '../api/apiCalls'

export default function LoginScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState()
  const [userPassword, setUserPassword] = useState()
  const [visible, setVisible] = useState(false);


  const dispatch = useDispatch();

  const onLoginPressed = () => {

    const body = {
      userEmail,
      userPassword
    }

    login(body).then((response) => {
      if (response.status === 200) {

        const authState = {//handle auth response
          //token
          token: response.data.token,
          //user
          userPk: response.data.user.userPk,
          userEmail: response.data.user.userEmail,
          userFirstName: response.data.user.userFirstName,
          userLastName: response.data.user.userLastName,
          //additional data
          employeeFk: response.data.additionalData.employeeFk,
          employeeTitle: response.data.additionalData.employeeTitle,
          employeePositionFk: response.data.additionalData.employeePositionFk,
          companyFk: response.data.additionalData.companyFk,
          companyName: response.data.additionalData.companyName,
          companyAddress: response.data.additionalData.companyAddress,
          companyDescription: response.data.additionalData.companyDescription
        }

        console.log("authState saved:", authState)
        dispatch(loginSuccess(authState))//mevcut verileri reduxa at.

        //login success ise tab navigator'e aktar, geçmişi temizle

        if (authState.employeePositionFk == 1 || authState.employeePositionFk == 2) {//navigate to manager screen
          navigation.reset({
            index: 0,
            routes: [{ name: 'MyTabs' }],
          })
        }

      }
    }).catch((error) => {
      console.log("logging in error:", error)
      showToast("error", "Error", `Please check your credentials and try again: ${error}`)
    })


  }

  const showToast = (type, text1, text2) => {
    Toast.show({
      type, text1, text2
    });
  }

  return (
    <Background>

      <LottieView
        source={require('../assets/todo.json')}
        autoPlay
        loop={true}
        speed={1}
        style={{ marginBottom: 250 }}
        onAnimationFinish={() => {
          console.log('Animation Finished!')
          // this.props.navigation.replace('Home');
        }}
      />
      <Header>Welcome back.</Header>


      <TextInput
        label="Email"
        returnKeyType="next"
        value={userEmail}
        onChangeText={(text) => setUserEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={userPassword}
        onChangeText={(text) => setUserPassword(text)}
        secureTextEntry
      />


      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Try Task Management App for your company! </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>


    </Background>
  )



}




const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
