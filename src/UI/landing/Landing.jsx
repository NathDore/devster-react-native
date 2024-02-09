import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BackgroundVideo from '../../Features/Auth/components/background_video/BackgroundVideo'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { LANDING_STYLESHEET } from './style';

const Landing = () => {
    return (
        <View style={{
            flex: 1,
        }}>
            <BackgroundVideo />

            {/* Top section */}
            <View style={LANDING_STYLESHEET.section}>

                {/* Title */}
                <Text style={LANDING_STYLESHEET.title}>Devster</Text>

                {/* Subtitle */}
                <Text style={LANDING_STYLESHEET.subtitle}>Designed for Juniors Dev.</Text>

                {/* Contact container */}
                <View style={LANDING_STYLESHEET.contact_container}>

                    {/* Contact text */}
                    <Text style={LANDING_STYLESHEET.contact_text}>Contact us: </Text>

                    {/* Contact button container */}
                    <View style={LANDING_STYLESHEET.contact_button_container}>
                        {/* Github button */}
                        <TouchableOpacity style={LANDING_STYLESHEET.contact_button}>
                            <FontAwesomeIcon name="github" size={35} color="white" />
                        </TouchableOpacity>

                        {/* Gmail button */}
                        <TouchableOpacity style={LANDING_STYLESHEET.contact_button}>
                            <MaterialIcon name="email" size={35} color="white" />
                        </TouchableOpacity>

                    </View>
                </View>


            </View>

            {/* Bottom section */}
            <View style={LANDING_STYLESHEET.section}>

                {/* Description container */}
                <View style={LANDING_STYLESHEET.description_container}>

                    {/* Description text */}
                    <Text style={LANDING_STYLESHEET.description_text}>
                        Our application is a dynamic platform that provides a comprehensive experience to users.
                        Users can create and share posts, engage in real-time communication through an integrated chat system, and interact with the community through post comments.
                    </Text>
                </View>

                <TouchableOpacity style={LANDING_STYLESHEET.create_account_button}>
                    <Text style={LANDING_STYLESHEET.create_account_button_text}>Create Account</Text>
                </TouchableOpacity>

                <TouchableOpacity style={LANDING_STYLESHEET.sign_in_button}>
                    <Text style={LANDING_STYLESHEET.sign_in_button_text}>Sign in.</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Landing