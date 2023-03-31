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
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../redux/authActions'
import { createEmployee, createManager } from '../api/apiCalls'
import Toast from 'react-native-toast-message';

export default function AddEmployeeScreen({ navigation }) {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [companyFk, setCompanyFk] = useState('')
    const [employeeTitle, setEmployeeTitle] = useState('')
    const [employeeGender, setEmployeeGender] = useState('')
    const [employeePhoneNumber, setEmployeePhoneNumber] = useState('')
    const myState = useSelector(state => state.auth)
    const [errors, setErrors] = useState({ userFirstName: '', userLastName: '', userEmail: '', userPassword: '', companyName: '', companyDescription: '', companyAddress: '', employeeTitle: '', employeePhoneNumber: '', employeeGender: '' })

    const dispatch = useDispatch();

    const onAddEmployeePressed = () => {


        setErrors({ userFirstName: '', userLastName: '', userEmail: '', userPassword: '', employeeTitle: '', employeePhoneNumber: '', employeeGender: '', companyFk: '' })


        //4 veriyi kullanarak signup isteği at.
        const body = {
            userEmail,
            userFirstName,
            userLastName,
            userPassword,
            companyFk: myState.companyFk,//receive companyFk from redux state
            employeeTitle,
            employeeGender,
            employeePhoneNumber
        }


        console.log("signup giden body: ", body)
        createEmployee(body).then((response) => {
            if (response.status === 200) {
                console.log("register successful: ", response)
                showToast('success', 'Başarılı', `${userFirstName} ${userLastName} added to ${myState.companyName}`)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MyTabs' }],
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
                    companyFk: errors.companyFk,
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
                <Header>Add Employee</Header>

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
                    label="Employee Gender"
                    returnKeyType="next"
                    value={employeeGender}
                    onChangeText={(text) => setEmployeeGender(text)}
                    error={!!errors.employeeGender}
                    errorText={errors.employeeGender}
                />

                <Button
                    mode="contained"
                    onPress={onAddEmployeePressed}
                    style={{ marginTop: 24 }}
                >
                    Add Employee
                </Button>

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
