import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import MyAppStyles from '../../styles/MyAppStyles';
import Icon from 'react-native-vector-icons/Ionicons';


const Header = () => {
    return (
        <View style={MyAppStyles.headerView}>
            <Text style={MyAppStyles.headerTitle}></Text>
            <TouchableOpacity style={MyAppStyles.headerButton}>
                <Icon name="trash-outline"
                    size={20}
                    color="black" />

            </TouchableOpacity>
        </View>

    )

}

export default Header;