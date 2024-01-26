import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Header, Icon, Avatar } from 'react-native-elements';
import { HEADER_STYLESHEET } from './Style';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../context/AuthProvider';

const HeaderUI = () => {
    const navigation = useNavigation();
    const { user, signOut, openLoginForm, openRegisterForm } = useAuthContext();

    const handleNavigationHome = () => {
        navigation.navigate("Home");
    }

    const handleNavigationProfile = () => {
        navigation.navigate("Profile")
    }

    return (
        <Header
            backgroundColor='#000'
            leftComponent={
                <Text style={HEADER_STYLESHEET.title}>DevSter</Text>
            }
            rightComponent={
                <View style={{ flexDirection: "row", marginRight: '10%', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        user ? <>
                            <TouchableOpacity
                                onPress={signOut}
                                style={{ ...HEADER_STYLESHEET.marginHorizontal, ...HEADER_STYLESHEET.buttonSignUp }}>
                                <Text style={HEADER_STYLESHEET.text}>Sign out</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleNavigationProfile}>
                                <Avatar
                                    size={32}
                                    rounded
                                    source={require("../../../assets/profile-image.jpg")}
                                />
                            </TouchableOpacity>

                        </> : <>
                            <TouchableOpacity
                                onPress={openLoginForm}
                                style={HEADER_STYLESHEET.marginHorizontal}>
                                <Text style={{ ...HEADER_STYLESHEET.text, color: 'white' }}>Log in</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={openRegisterForm}
                                style={{ ...HEADER_STYLESHEET.marginHorizontal, ...HEADER_STYLESHEET.buttonSignUp }}>
                                <Text style={HEADER_STYLESHEET.text}>Sign up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleNavigationHome}
                            >
                                <Icon name="user" type="font-awesome" color={"white"} />
                            </TouchableOpacity>
                        </>
                    }
                </View>
            }
        />
    )
}

export default HeaderUI