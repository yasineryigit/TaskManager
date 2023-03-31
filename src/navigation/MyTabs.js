import React, { useRef, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import CompletedTaskScreen from '../screens/CompletedTaskScreen';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { updateBottomSheetModalVisibility, updateTabBarVisibility } from '../redux/appActions';


const Tab = createBottomTabNavigator();


const MyTabs = () => {
    const navigation = useNavigation();
    const myState = useSelector(state => state)
    const dispatch = useDispatch();
    let showDisplay;
    console.log("TAB BAR VISIBILITY: ", myState.app)
    if (myState.app.isTabBarVisible) {
        showDisplay = 'flex';
    } else {
        showDisplay = 'none';
    }


    return (

        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,

                // Floating Tab Bar...
                tabBarStyle: {

                    display: showDisplay,
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 40,
                    marginHorizontal: 20,
                    // Max Height...
                    height: 60,
                    borderRadius: 10,
                    // Shadow...
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: {
                        width: 10,
                        height: 10
                    },
                    paddingHorizontal: 20,
                }
            }}>


            <Tab.Screen name={"Home"} component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        // centring Tab Button...
                        position: 'absolute',
                        top: 20
                    }}>
                        <Icon name="list"
                            size={20}
                            color={focused ? '#5359D1' : 'gray'} />
                    </View>
                )
            }} listeners={({ navigation, route }) => ({
                // Onpress Update....

            })}></Tab.Screen>

            <Tab.Screen
                name={"AddTaskButton"}
                component={HomeScreen}
                options={{

                    tabBarIcon: ({ focused }) => (
                        myState.auth.employeePositionFk == 1 &&//only show addTask option for manager
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Home")
                                dispatch(updateTabBarVisibility({ isTabBarVisible: false }))
                                dispatch(updateBottomSheetModalVisibility({ isBottomSheetModalVisible: true }))
                                console.log("clicked")
                                console.log("APP STATE:", myState.app)
                            }}
                        >
                            <View style={{
                                width: 55,
                                height: 55,
                                backgroundColor: '#5359D1',
                                borderRadius: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: Platform.OS == "android" ? 50 : 30
                            }}>
                                <Icon name="add" color='white' size={26} />
                            </View>
                        </TouchableOpacity>

                    )
                }}
                listeners={({ navigation, route }) => {


                }}
            ></Tab.Screen>




            <Tab.Screen 
            name={"CompletedTaskScreen"} component={CompletedTaskScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        // centring Tab Button...
                        position: 'absolute',
                        top: 20
                    }}>
                        <Icon name="checkmark-done-outline"
                            size={20}
                            color={focused ? '#5359D1' : 'gray'} />
                    </View>
                )
            }} listeners={({ navigation, route }) => ({
                // Onpress Update....

            })}></Tab.Screen>


        </Tab.Navigator>




    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
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
});

export default MyTabs;

