import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
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
import { createManager } from '../api/apiCalls'
import Toast from 'react-native-toast-message';

export default function RegisterScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyDescription, setCompanyDescription] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [employeeTitle, setEmployeeTitle] = useState('')
  const [employeePhoneNumber, setEmployeePhoneNumber] = useState('')
  const [employeeGender, setEmployeeGender] = useState('')
  const [errors, setErrors] = useState({ userFirstName: '', userLastName: '', userEmail: '', userPassword: '', companyName: '', companyDescription: '', companyAddress: '', employeeTitle: '', employeePhoneNumber: '', employeeGender: '' })

  const dispatch = useDispatch();

  const onSignUpPressed = () => {


    setErrors({ userFirstName: '', userLastName: '', userEmail: '', userPassword: '' })


    //4 veriyi kullanarak signup isteği at.
    const body = {
      userEmail,
      userFirstName,
      userLastName,
      userPassword,
      companyName,
      companyAddress,
      companyDescription,
      employeeTitle,
      employeePhoneNumber,
      employeeGender
    }


    console.log("signup giden body: ", body)
    createManager(body).then((response) => {
      if (response.status === 200) {
        console.log("register successful: ", response)
        showToast('success', 'Başarılı', 'Üyelik talebiniz alınmıştır! Hesabınız onaylandığında email alacaksınız.')
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      }

    }).catch((error) => {

      if (error.response.data.validationErrors) {
        console.log("register screen validationErrors: " + error.response.data.validationErrors)
        const errors = error.response.data.validationErrors
        setErrors({
          userFirstName: errors.userFirstName,
          userLastName: errors.userLastName,
          userEmail: errors.userEmail,
          userPassword: errors.userPassword,
          companyName: errors.companyName,
          companyDescription: errors.companyDescription,
          companyAddress: errors.companyAddress,
          employeeTitle: errors.employeeTitle,
          employeePhoneNumber: errors.employeePhoneNumber,
          employeeGender: errors.employeeGender,
        })
      } else {
        alert("Error: ", error)
      }
    })


  }

  const showToast = (type, text1, text2) => {
    Toast.show({
      type, text1, text2
    });
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >

      <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Create Account</Header>

        <TextInput
          label="Email"
          returnKeyType="next"
          value={userEmail}
          onChangeText={(text) => setUserEmail(text)}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          error={!!errors.userEmail}
          errorText={errors.userEmail}
        />


        <TextInput
          label="Password"
          returnKeyType="done"
          value={userPassword}
          onChangeText={(text) => setUserPassword(text)}
          secureTextEntry
          error={!!errors.userPassword}
          errorText={errors.userPassword}

        />


        <TextInput
          label="First Name"
          returnKeyType="next"
          value={userFirstName}
          onChangeText={(text) => setUserFirstName(text)}
          error={!!errors.userFirstName}
          errorText={errors.userFirstName}
        />

        <TextInput
          label="Last Name"
          returnKeyType="next"
          value={userLastName}
          onChangeText={(text) => setUserLastName(text)}
          error={!!errors.userLastName}
          errorText={errors.userLastName}

        />

        <TextInput
          label="Company Name"
          returnKeyType="next"
          value={companyName}
          onChangeText={(text) => setCompanyName(text)}
          error={!!errors.companyName}
          errorText={errors.companyName}
        />

        <TextInput
          label="Company Description"
          returnKeyType="next"
          value={companyDescription}
          onChangeText={(text) => setCompanyDescription(text)}
          error={!!errors.companyDescription}
          errorText={errors.companyDescription}

        />

        <TextInput
          label="Company Address"
          returnKeyType="next"
          value={companyAddress}
          onChangeText={(text) => setCompanyAddress(text)}
          error={!!errors.companyAddress}
          errorText={errors.companyAddress}
        />

        <TextInput
          label="Employee Title"
          returnKeyType="next"
          value={employeeTitle}
          onChangeText={(text) => setEmployeeTitle(text)}
          error={!!errors.employeeTitle}
          errorText={errors.employeeTitle}
        />

        <TextInput
          label="Employee Phone Number"
          returnKeyType="next"
          value={employeePhoneNumber}
          onChangeText={(text) => setEmployeePhoneNumber(text)}
          error={!!errors.employeePhoneNumber}
          errorText={errors.employeePhoneNumber}
        />

        <TextInput
          label="Company Address"
          returnKeyType="next"
          value={employeeGender}
          onChangeText={(text) => setEmployeeGender(text)}
          error={!!errors.employeeGender}
          errorText={errors.employeeGender}
        />



        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{ marginTop: 24 }}
        >
          Sign Up
        </Button>


        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>

      </Background>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
