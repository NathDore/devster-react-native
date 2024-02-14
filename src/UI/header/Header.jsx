import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { HEADER_STYLESHEET } from './style'
import { Avatar } from 'react-native-elements'
import { useAuthContext } from '../../context/AuthProvider'

const Header = ({ screenTitle }) => {

    const { userData } = useAuthContext();

    return (
        <View style={HEADER_STYLESHEET.container}>
            <Text style={HEADER_STYLESHEET.title}>{screenTitle}</Text>

            <Pressable>
                <Avatar rounded size={35} source={userData?.profile_picture ? { uri: userData.profile_picture } : require("../../../assets/anonyme_profile.jpg")} />
            </Pressable>
        </View>
    )
}

export default Header