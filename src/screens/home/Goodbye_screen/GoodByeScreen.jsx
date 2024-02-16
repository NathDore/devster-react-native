import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { blackThemeSecondary } from '../../../../assets/color/color'
import { useFocusEffect } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GoodbyeScreen = ({ navigation }) => {

    useFocusEffect(useCallback(() => {

        const interval = setInterval(() => {
            clearInterval(interval);
            navigation.navigate("Home");
        }, 1000);

    }, [[navigation]]))

    return (
        <View style={{ flex: 1, backgroundColor: blackThemeSecondary, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "lightgrey", fontSize: hp(5) }}>Goodbye !</Text>
        </View>
    )
}

export default GoodbyeScreen