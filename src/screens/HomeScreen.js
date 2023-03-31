import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, KeyboardAvoidingView, Pressable, Alert, TextInput, TouchableOpacity, Modal } from 'react-native';
import Task from '../components/Task';
import { useSelector, useDispatch, connect } from 'react-redux';
import { deleteTaskByTaskPk, getUncompletedTasksByEmployeeFk, saveTask, updateTaskCompleteStatusByTaskPk } from '../api/apiCalls';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import ModalPicker from '../components/ModalPicker'
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import Button from '../components/Button'
import Icon from 'react-native-vector-icons/Ionicons';
import { updateBottomSheetModalVisibility, updateTabBarVisibility } from '../redux/appActions';

function HomeScreen(props) {
  const [taskTitle, setTaskTitle] = useState()
  const [taskDescription, setTaskDescription] = useState()
  const [taskResponsibleEmployeeEmail, setTaskResponsibleEmployeeEmail] = useState()

  const myState = useSelector(state => state)
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([])
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [longPressMenuOptions, setLongPressMenuOptions] = useState([])
  const [selectedTask, setSelectedTask] = useState({})
  const [notifyEmptyList, setNotifyEmptyList] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['55%'], []);
  const navigation = useNavigation();
  let interval;


  useEffect(() => {

    //set long press menu options 
    if (myState.auth.employeePositionFk == 1) {//manager
      setLongPressMenuOptions(['Complete', 'Delete', "Cancel"])
    } else if (myState.auth.employeePositionFk == 2) {//employee
      setLongPressMenuOptions(['Complete', "Cancel"])
    }

    console.log("HOME SCREEN REDUX STATE:", props)
    interval = setInterval(() => {

      getUncompletedTasksByEmployeeFk(myState.auth.employeeFk).then((response) => {
        response.data.length === 0 ? setNotifyEmptyList(true) : setNotifyEmptyList(false)
        //console.log("gelen uncompleted tasks:", response.data)
        setTasks(response.data)
      })
    }, 1000);

    return () => {
      clearInterval(interval)
    }

  }, [])

  useEffect(() => {
    props.isBottomSheetModalVisible ? changeBottomSheetModalVisibility(true) : changeBottomSheetModalVisibility(false)
  }, [props.isBottomSheetModalVisible])

  const handleSheetChanges = useCallback((index) => {//observe bottomsheet changes
    console.log('handleSheetChanges', index);
    if (index === -1) {
      console.log("sheet closed")
      props.showTabBar()
      props.hideBottomSheet()
    }
  }, []);

  const changeBottomSheetModalVisibility = (status) => {
    status ? bottomSheetModalRef.current?.present() : bottomSheetModalRef.current?.close()
  }

  const addTask = () => {
    if (!taskTitle || !taskDescription || !taskResponsibleEmployeeEmail) {
      showToast("error", "Type something", "Please fill the title & description & employee email")
    } else {
      const body = {
        taskTitle,
        taskDescription,
        employeeEmail: taskResponsibleEmployeeEmail,
        managerFk: myState.auth.employeeFk
      }
      console.log("adding to server!!", body)
      saveTask(body).then((response) => {
        setTaskTitle("")
        setTaskDescription("")
        setTaskResponsibleEmployeeEmail("")
        changeModalVisibility(false)
        changeBottomSheetModalVisibility(false)

      }).catch((error) => {
        console.log(error)
      })
    }
  }

  const changeModalVisibility = (status) => {
    setIsModalVisible(status)
  }

  const updateTaskCompleteStatus = (task, status) => {
    updateTaskCompleteStatusByTaskPk(task.taskFk, status).then((response) => {
      console.log("task completed:", response)
      status ? showToast('success', 'Congratulations', `You have completed : ${selectedTask.taskDescription}`) : null
    })
  }

  const changeMenuVisibility = (bool) => {
    setIsMenuVisible(bool)
  }

  const showToast = (type, text1, text2) => {
    Toast.show({
      type, text1, text2
    });
  }

  const setData = (option, index) => {
    console.log("Seçilen option & index :", option, index)
    console.log("selected task: ", selectedTask)
    switch (option) {
      case 'Complete':
        console.log("Complete option selected")
        //complete task
        updateTaskCompleteStatus(selectedTask, true)
        break;
      case 'Delete':
        console.log("Delete option selected")
        //delete task
        deleteTaskByTaskPk(selectedTask.taskFk).then((response) => {
          showToast('success', 'Task deleted', `Your task deleted successfully`)
        }).catch((error) => {
          console.log("Error while deleting task", error)
          showToast('error', 'Error', `Task could not be deleted: ${error.message}`)
        })
        break;
      case 'Cancel':
        console.log("Cancel option selected")
        //cancel
        break;
      default:
        break;
    }
  }


  return (
    <BottomSheetModalProvider>

      <View style={styles.container}>
        <View style={styles.tasksWrapper}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'black',
              paddingTop: 20
            }}>{myState.auth.companyName} Tasks</Text>
            <TouchableOpacity
              onPress={() => { navigation.navigate("AddEmployeeScreen") }}//navigate to addEmployeeScreen
            >
              {myState.auth.employeePositionFk == 1 && <View style={styles.addWrapper}>

                <Icon name="person-add-outline" color='white' size={20} />

              </View>}

            </TouchableOpacity>

          </View>


          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {
              notifyEmptyList ? <View style={styles.notifyEmptyList}>
                <Text style={styles.notifyEmptyListText}>Your todo list is empty</Text>
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
                  onAnimationFinish={() => {
                    //console.log('Animation Finished!')
                    // this.props.navigation.replace('Home');
                  }}
                />
              </View> :
                <FlatList
                  style={{ marginBottom: 120 }}
                  data={tasks}
                  keyExtractor={item => item.taskFk}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity key={index}
                        onLongPress={() => {
                          changeMenuVisibility(true)
                          setSelectedTask(tasks[index])
                        }}>
                        <Task task={item} />
                      </TouchableOpacity>
                    )
                  }}
                />
            }

            <Modal
              transparent={true}
              animationType='fade'
              visible={isMenuVisible}
              nRequestClose={() => changeMenuVisibility(false)}
            >
              <ModalPicker
                changeModalVisibility={changeMenuVisibility}
                options={longPressMenuOptions}
                setData={setData}

              />

            </Modal>
          </View>
        </View>


        {/*take input*/}

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {

            setIsModalVisible(!isModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <View>
                <TextInput style={styles.input} placeholder={"Title"} onChangeText={setTaskTitle} value={taskTitle} />
                <TextInput style={styles.input} placeholder={"Description"} onChangeText={setTaskDescription} value={taskDescription} />
                <TextInput style={styles.input} placeholder={"Employee Email"} onChangeText={setTaskResponsibleEmployeeEmail} value={taskResponsibleEmployeeEmail} />
              </View>


              <Button
                style={{ marginTop: 20 }}
                mode="contained"
                onPress={() => { addTask() }}>
                Add Task
              </Button>


            </View>
          </View>
        </Modal>

      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
        enablePanDownToClose
        onChange={handleSheetChanges}
      >


        <View style={styles.modalView}>

          <View>
            <TextInput style={styles.input} placeholder={"Title"} onChangeText={setTaskTitle} value={taskTitle} />
            <TextInput style={styles.input} placeholder={"Description"} onChangeText={setTaskDescription} value={taskDescription} />
            <TextInput style={styles.input} placeholder={"Employee Email"} onChangeText={setTaskResponsibleEmployeeEmail} value={taskResponsibleEmployeeEmail} />

          </View>


          <Button
            style={{ marginTop: 20 }}
            mode="contained"
            onPress={() => { addTask() }}>
            Add Task
          </Button>


        </View>

      </BottomSheetModal>

    </BottomSheetModalProvider>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    // dispatching plain actions
    showTabBar: () => dispatch(updateTabBarVisibility({ isTabBarVisible: true })),
    hideBottomSheet: () => dispatch(updateBottomSheetModalVisibility({ isBottomSheetModalVisible: false })),
  }
}


function mapStateToProps(state) {
  return {
    isBottomSheetModalVisible: state.app.isBottomSheetModalVisible,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 120,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 50,
    height: 50,
    marginTop: 17,
    backgroundColor: '#560CCE',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
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
  notifyEmptyList: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  notifyEmptyListText: {
    marginBottom: 15
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",



  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    backgroundColor: "#5359D1"

  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

})
