import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { HEADER_STYLESHEET } from './style'
import { Avatar } from 'react-native-elements'
import { useAuthContext } from '../../context/AuthProvider'
import { useNavigation } from '@react-navigation/native'

const Header = ({ screenTitle }) => {

    const { userData } = useAuthContext();
    const navigation = useNavigation();

    const handleNavigation = () => {
        navigation.navigate("Profile");
    }

    return (
        <View style={HEADER_STYLESHEET.container}>
            <Text style={HEADER_STYLESHEET.title}>{screenTitle}</Text>

            <Pressable onPress={handleNavigation}>
                <Avatar rounded size={35} source={userData?.profile_picture ? { uri: userData.profile_picture } : require("../../../assets/anonyme_profile.jpg")} />
            </Pressable>
        </View>
    )
}

export default Header