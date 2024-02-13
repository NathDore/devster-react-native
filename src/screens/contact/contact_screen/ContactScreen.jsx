import { View, Text } from 'react-native'
import React from 'react'
import { blackThemeSecondary } from '../../../../assets/color/color';
import Header from "../../../UI/header/Header";

const ContactScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: blackThemeSecondary }}>
            <Header screenTitle="Contacts" />
            <Text>ContactScreen</Text>
        </View>
    )
}

export default ContactScreen