import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { blackThemeSecondary } from '../../../../assets/color/color';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthContext } from '../../../context/AuthProvider';

const ContactScreen = ({ navigation }) => {
    const { setScreenState } = useAuthContext();

    useFocusEffect(useCallback(() => {
        setScreenState("Contacts");
    }, [navigation]))

    return (
        <View style={{ flex: 1, backgroundColor: blackThemeSecondary }}>
            <Text>ContactScreen</Text>
        </View>
    )
}

export default ContactScreen