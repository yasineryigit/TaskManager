import React, { useRef, useState, useEffect } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Linking, Modal } from 'react-native';
import menu from '../assets/menu.png';
import close from '../assets/close.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { removeUserCreds } from '../db/EncryptedStorage';
import { deleteTaskByTaskPk, getCompletedTasksByEmployeeFk, logout, updateTaskCompleteStatusByTaskPk } from '../api/apiCalls';
import Task from '../components/Task';
import { logoutSuccess } from '../redux/authActions';
import ModalPicker from '../components/ModalPicker'
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import Company from '../components/Company';


export default function App() {
  const [currentTab, setCurrentTab] = useState("Home");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);
  const [tasks, setTasks] = useState([])
  const myState = useSelector(state => state.auth)
  const [longPressMenuOptions, setLongPressMenuOptions] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notifyEmptyList, setNotifyEmptyList] = useState(false);
  const [selectedTask, setSelectedTask] = useState({})
  const navigation = useNavigation();
  const dispatch = useDispatch();


  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  let interval;


  useEffect(() => {

    //set long press menu options 
    if (myState.employeePositionFk == 1) {//manager
      setLongPressMenuOptions(['Uncomplete', 'Delete', "Cancel"])
    } else if (myState.employeePositionFk == 2) {//employee
      setLongPressMenuOptions(['Uncomplete', "Cancel"])
    }

    interval = setInterval(() => {
      // console.log("completedtask interval triggering")
      getCompletedTasksByEmployeeFk(myState.employeeFk).then((response) => {
        response.data.length === 0 ? setNotifyEmptyList(true) : setNotifyEmptyList(false)
        setTasks(response.data)
      })

    }, 1000);

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    switch (currentTab) {
      case "Home":
        console.log("Home tab clicked")
        setShowMenu(false);
        break;
      case "Feedback":
        makeAnimation()
        setShowMenu(false);
        openWebUrl("https://play.google.com/store/apps/developer?id=ossovita")
        setCurrentTab("Home")
        break;

      case "Privacy Policy":

        makeAnimation()
        setShowMenu(false);
        openWebUrl("https://ossovita.blogspot.com/2022/03/crypto-tracker-privacy-policy.html")
        setCurrentTab("Home")
        break;

      case "Terms & Conditions":
        makeAnimation()
        setShowMenu(false);
        openWebUrl("https://ossovita.blogspot.com/2022/03/crypto-tracker-terms-conditions.html")
        setCurrentTab("Home")
        break;

      case "Company":
        setCurrentTab("Company")
        break;
    }

  }, [currentTab])

  const openWebUrl = async (url) => {

    await Linking.openURL(url);

  }

  const updateTaskCompleteStatus = (task, status) => {
    updateTaskCompleteStatusByTaskPk(task.taskFk, status).then((response) => {
      console.log("task uncompleted:", response)
      status ? null : showToast('success', 'Successful', `This task added to Todo List`)
    })
  }


  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool)
  }

  const showToast = (type, text1, text2) => {
    Toast.show({
      type, text1, text2
    });
  }

  const setData = (option, index) => {

    switch (index) {
      case 0:
        //complete task
        updateTaskCompleteStatus(selectedTask, false)
        break;
      case 1:
        //delete task
        deleteTaskByTaskPk(selectedTask.taskFk).then((response) => {
          showToast('success', 'Task deleted', `Your task deleted successfully`)
        }).catch((error) => {
          showToast('error', 'Error', `Task could not be deleted: ${error.message}`)
        })
        break;
      case 2:
        //cancel
        break;
      default:
        break;
    }
  }


  const makeAnimation = () => {
    // Do Actions Here....
    // Scaling the view...
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.88,
      duration: 300,
      useNativeDriver: true
    })
      .start()

    Animated.timing(offsetValue, {
      // YOur Random Value...
      toValue: showMenu ? 0 : 230,
      duration: 300,
      useNativeDriver: true
    })
      .start()

    Animated.timing(closeButtonOffset, {
      // YOur Random Value...
      toValue: !showMenu ? -30 : 0,
      duration: 300,
      useNativeDriver: true
    })
      .start()
  }



  return (
    <SafeAreaView style={styles.container}>

      <View style={{ justifyContent: 'flex-start', padding: 15 }}>


        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>Hi {myState.userFirstName} {myState.userLastName} 👋</Text>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, "Home", "home", navigation, dispatch)}
          {TabButton(currentTab, setCurrentTab, "Company", "business-outline", navigation, dispatch)}
          {TabButton(currentTab, setCurrentTab, "Feedback", "mail-outline", navigation, dispatch)}
          {TabButton(currentTab, setCurrentTab, "Privacy Policy", "newspaper-outline", navigation, dispatch)}
          {TabButton(currentTab, setCurrentTab, "Terms & Conditions", "settings-outline", navigation, dispatch)}


        </View>

        <TouchableOpacity style={{ marginBottom: 100 }}>
          {TabButton(currentTab, setCurrentTab, "Logout", "log-out-outline", navigation, dispatch)}
        </TouchableOpacity>

      </View>

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: '#E8EAED',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        {
          // Menu Button...
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {

            makeAnimation()

            setShowMenu(!showMenu);
          }}>

            <Image source={showMenu ? close : menu} style={{
              width: 20,
              height: 20,
              tintColor: 'black',
              marginTop: 40,

            }}></Image>

          </TouchableOpacity>


          {currentTab == 'Home' &&
            <View>
              <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 20
              }}>Completed Tasks</Text>


              {/*Flat list for completed tasks*/}
              <View style={styles.items}>
                {/* This is where the tasks will go! */}
                {
                  notifyEmptyList ? <View style={styles.notifyEmptyList}>
                    <Text style={styles.notifyEmptyListText}>You have not any completed task</Text>
                    <LottieView
                      source={require('../assets/empty.json')}
                      autoPlay
                      loop={true}
                      style={{
                        width: 80,
                        height: 80,
                        marginBottom: 8,
                      }}
                      speed={0.5}

                    />
                  </View> :

                    <FlatList
                      style={{ marginBottom: 300 }}
                      data={tasks}
                      keyExtractor={item => item.taskFk}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onLongPress={() => {
                              changeModalVisibility(true)
                              setSelectedTask(tasks[index])
                            }}>
                            <Task task={item} />
                          </TouchableOpacity>
                        )
                      }}
                    />
                }
              </View>
            </View>}


          {
            currentTab == 'Company' &&
            <Company />
          }



          <Modal
            transparent={true}
            animationType='fade'
            visible={isModalVisible}
            nRequestClose={() => changeModalVisibility(false)}
          >
            <ModalPicker
              changeModalVisibility={changeModalVisibility}
              options={longPressMenuOptions}
              setData={setData}

            />

          </Modal>

        </Animated.View>

      </Animated.View>

    </SafeAreaView>
  );
}




// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, iconName, navigation, dispatch) => {


  return (

    <TouchableOpacity onPress={() => {
      if (title == "Logout") {
        removeUserCreds()
        logout().then(() => {
          dispatch(logoutSuccess())//store'daki verileri temizle
          navigation.replace('StartScreen')
        });
      } else {
        setCurrentTab(title)
      }
    }}>


      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>


        <View style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#5359D1" : "white"
        }}>
          <Icon name={iconName}
            size={20}
            color={currentTab == title ? "#5359D1" : "white"} />

        </View>


        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#5359D1" : "white"
        }}>{title}</Text>

      </View>


    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5359D1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  items: {
    marginTop: 30,
  },
  notifyEmptyList: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  notifyEmptyListText: {
    marginBottom: 15
  }
});