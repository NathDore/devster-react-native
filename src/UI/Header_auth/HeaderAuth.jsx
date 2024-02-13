import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { Header, Icon, Avatar } from 'react-native-elements';
import { HEADER_STYLESHEET } from './Style';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../context/AuthProvider';

const HeaderAuth = () => {
    const navigation = useNavigation();
    const { user, userData, signOut, openLoginForm, openRegisterForm } = useAuthContext();

    const handleNavigationHome = () => {
        navigation.navigate("Home");
    }

    const handleNavigationProfile = () => {
        navigation.navigate("Profile")
    }

    return (
        <Header
            backgroundColor='#000'
            containerStyle={{ height: 80, paddingTop: "10%" }}
            leftComponent={
                <View style={{ maxWidth: 200, }}>
                    <Text style={HEADER_STYLESHEET.title}>DevSter</Text>
                </View>

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
                                    source={userData?.profile_picture ? { uri: userData?.profile_picture } : require("../../../assets/anonyme_profile.jpg")}
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

export default HeaderAuth