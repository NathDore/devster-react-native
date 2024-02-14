import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { blackThemeSecondary } from '../../../../assets/color/color';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthContext } from '../../../context/AuthProvider';
import Header from '../../../UI/header/Header';

const ContactScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1, backgroundColor: blackThemeSecondary }}>
            <Header screenTitle="Contacts" />
            <Text>ContactScreen</Text>
        </View>
    )
}

export default ContactScreen