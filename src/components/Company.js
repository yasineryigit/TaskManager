    import React, { useState, useEffect } from 'react';
    import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
    import { useSelector } from 'react-redux'
    import { getAllEmployeesByCompanyFk } from '../api/apiCalls';

    export default function Company(props) {

        const myState = useSelector(state => state)
        const [employees, setEmployees] = useState([])

        useEffect(() => {
            getAllEmployeesByCompanyFk(myState.auth.companyFk).then((response) => {
                setEmployees(response.data)
            })
        }, [])


        return (

            <View>
                <FlatList
                    style={{ marginTop: 25 }}
                    data={employees}
                    keyExtractor={item => item.employeePk}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (

                            <View style={styles.item}>
                                <View style={styles.itemLeft}>

                                    
                                    <View style={styles.textWrapper}>
                                        <Text>Person: {item.user.userFirstName} {item.user.userLastName}</Text>
                                        <Text>Title: {item.employeeTitle}</Text>
                                    </View>

                                </View>
                                <View style={styles.circular}></View>
                            </View>
                        )
                    }}
                />
            </View>
        );
    }


    const styles = StyleSheet.create({
        item: {
            backgroundColor: '#FFF',
            padding: 15,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
        },
        itemLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'
        },
        square: {
            width: 24,
            height: 24,
            backgroundColor: '#5359D1',
            opacity: 0.4,
            borderRadius: 5,
            marginRight: 15,
        },
        textWrapper: {
            flex: 1,
            flexDirection: 'column',
        },


    })