import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { blackThemeSecondary } from '../../../../assets/color/color'
import { useFocusEffect } from '@react-navigation/native'

const GoodbyeScreen = ({ navigation }) => {

    useFocusEffect(useCallback(() => {

        const interval = setInterval(() => {
            clearInterval(interval);
            navigation.navigate("Home");
        }, 1000);

    }, [[navigation]]))

    return (
        <View style={{ flex: 1, backgroundColor: blackThemeSecondary, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "lightgrey", fontSize: 30 }}>Goodbye !</Text>
        </View>
    )
}

export default GoodbyeScreen