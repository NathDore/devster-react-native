import { View, Text, Touchable, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from 'react-native-elements';
import { blackTheme, blackThemeSecondary } from '../../../../../../assets/color/color';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { VISIT_PROFILE_STYLESHEET } from './style';

const VisitProfile = ({ route }) => {
    const { userDoc } = route.params;
    const { name, profile_picture, createdAt } = userDoc;

    const handleGoBackNavigation = () => {

    }

    const addContact = () => {

    }

    const sendMessage = () => {

    }




    return (
        <View style={VISIT_PROFILE_STYLESHEET.container}>

            <ImageBackground
                source={profile_picture ? { uri: profile_picture } : require('../../../../../../assets/anonyme_profile.jpg')}
                blurRadius={30}
            >

                {/* Navigation Banner */}
                <View style={VISIT_PROFILE_STYLESHEET.navigation_banner}>

                    {/* Go back icon */}
                    <TouchableOpacity style={VISIT_PROFILE_STYLESHEET.go_back_icon}>
                        <FontAwesome name="arrow-left" size={18} color="lightgrey" />
                    </TouchableOpacity>

                    {/* More option Icon */}
                    <TouchableOpacity style={VISIT_PROFILE_STYLESHEET.more_option_icon}>
                        <MaterialIcons name="more-vert" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Header */}
                <View style={VISIT_PROFILE_STYLESHEET.header}>

                    {/* Info */}
                    <View style={VISIT_PROFILE_STYLESHEET.info_banner}>
                        <View style={VISIT_PROFILE_STYLESHEET.profile_picture}>
                            <Avatar size={70} rounded source={profile_picture ? { uri: profile_picture } : require("../../../../../../assets/anonyme_profile.jpg")} />
                        </View>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={VISIT_PROFILE_STYLESHEET.name}>{name}</Text>
                    </View>
                </View>

                {/* Button container */}
                <View style={VISIT_PROFILE_STYLESHEET.button_container}>
                    {/* Add contact button */}
                    <TouchableOpacity style={VISIT_PROFILE_STYLESHEET.add_contact_button}>
                        <Text style={VISIT_PROFILE_STYLESHEET.add_contact_button_text}>Add contact</Text>
                    </TouchableOpacity>

                    {/* Send message button */}
                    <TouchableOpacity style={VISIT_PROFILE_STYLESHEET.send_message_button}>
                        <Text style={VISIT_PROFILE_STYLESHEET.send_message_button_text}>Send Message</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>



            {/* Banner */}
            <View style={VISIT_PROFILE_STYLESHEET.banner}>

                {/* Flame Icon */}
                <FontAwesome name="fire" size={12} color="lightgrey" />

                {/* Section Title */}
                <View style={VISIT_PROFILE_STYLESHEET.section_title_container}>
                    <Text style={VISIT_PROFILE_STYLESHEET.section_title_text}>POPULAR POST</Text>
                </View>

                {/* Chevron Icon */}
                <FontAwesome name="chevron-down" size={12} color="lightgrey" />
            </View>

            {/* Popular post */}
            <View style={{
                flex: 1,
            }}>

            </View>

        </View>
    )
}

export default VisitProfile