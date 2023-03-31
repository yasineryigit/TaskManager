import { StyleSheet } from 'react-native';
import Constants from "expo-constants";

export const colors = {
    primary: "#332424",
    secondary: "#4D3636",
    tertiary: "#E6E6E6",
    alternative: "#999999",
};

const statusBarHeight = Constants.statusBarHeight;

export default StyleSheet.create({
    container: {
        backgroundColor: "#332424",
        padding: 20,
        paddingBottom: 0,
        flex: 1,
        paddingTop: statusBarHeight
    },
    headerView: {
        paddingVertical: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        letterSpacing: 2,
        fontStyle: 'italic'
    },
    headerButton: {
        fontWeight: 'bold',
        color: "#E6E6E6"
    },
    listContainer: {
        marginBottom: 30,
        flex: 1,
        paddingBottom: 40
    },
    listView: {
        backgroundColor: "#4D3636",
        minHeight: 85,
        width: "100%",
        padding: 15,
        justifyContent: "space-around",
        marginBottom: 15,
        borderRadius: 10
    },
    listViewHidden: {
        backgroundColor: "#E6E6E6",
        minHeight: 85,
        width: "100%",
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        borderRadius: 11
    },
    hiddenButton: {
        width: 55,
        alignItems: 'center'
    },
    todoText: {
        fontSize: 16,
        letterSpacing: 1,
        color: "E6E6E6"
    },
    todoDate: {
        fontSize: 16,
        letterSpacing: 1,
        color: "#999999",
        textAlign: "center",
        textTransform: "uppercase",
    },
    swipeTodoText: {
        color: "#999999",
        fontStyle: 'italic',
        textDecoration: "line-through",

    },
    modalButton: {
        width: 60,
        height: 60,
        backgroundColor: "#E6E6E6",
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        position: 'absolute',
        bottom: 15,
    },
    modalContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: "#332424"
    },
    modalView: {
        backgroundColor: "#4D3636",
        borderRadius: 20,
        padding: 35
    },
    styledInput: {
        width: 300,
        height: 50,
        backgroundColor: "#E6E6E6",
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
        colors: "#4D3636",
        letterSpacing: 1
    },
    modalAction: {
        width: 60,
        height: 60,
        backgroundColor: "#ffffff",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    modalActionGroup: {
        flexDirection: "row",
        justifyContent: 'space-around',
        marginTop: 30
    },
    modalIcon: {
        alignItems: "center",
        marginBottom: 30

    }





});