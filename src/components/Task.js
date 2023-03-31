import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux';


const Task = (props) => {

   

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>

                <TouchableOpacity style={styles.square}>
                </TouchableOpacity>
                <View style={styles.textWrapper}>
                    <Text style={{ fontWeight: 'bold' }}>{props.task.taskTitle}</Text>
                    <Text >{props.task.taskDescription}</Text>
                    <Text>{prepareText(props.task)}</Text>
                </View>

            </View>
            <View style={styles.circular}></View>
        </View>
    )

}

const prepareText = (task) => {
    const myState = useSelector(state => state)
    if (myState.auth.employeeFk == task.managerFk) {//if we are manager
        return `Assigned to: ${task.employeeFirstName} ${task.employeeLastName}`
    } else if (myState.auth.employeeFk == task.employeeFk){//if we are employee
        return `Manager: ${task.managerFirstName} ${task.managerLastName}`    
    }
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

export default Task;