import { View, Text } from 'react-native'
import React from 'react'
import { blackTheme, blackThemeSecondary } from '../../../assets/color/color'

const Header = ({ screenTitle }) => {
    return (
        <View style={{
            flexDirection: "row",
            width: "100%",
            padding: "5%",
            alignItems: "center",
            paddingStart: "5%",
            backgroundColor: blackThemeSecondary,
        }}>
            <Text style={{
                fontSize: 25,
                color: "lightgrey",
                fontWeight: "500",
                letterSpacing: 0.5
            }}>{screenTitle}</Text>
        </View>
    )
}

export default Header