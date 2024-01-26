import { View, Text, ImageBackground, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from 'react-native-elements';
import { MODIFY_SCREEN_STYLESHEET } from './style';

const ModifyScreen = () => {
    const [usernameInput, setUsernameInput] = useState("");

    return (
        <View style={MODIFY_SCREEN_STYLESHEET.container}>
            {/* Image background Header */}
            <ImageBackground
                source={require('../../../../../../assets/profile-image.jpg')}
                blurRadius={15}
                style={MODIFY_SCREEN_STYLESHEET.image_background}
            >
                <View style={MODIFY_SCREEN_STYLESHEET.profile_picture}>

                    {/* Profile picture */}
                    <Avatar
                        size={90}
                        rounded
                        source={require('../../../../../../assets/profile-image.jpg')}
                    />

                    {/* Modify button */}
                    <TouchableOpacity style={MODIFY_SCREEN_STYLESHEET.modify_button}>
                        <Text style={MODIFY_SCREEN_STYLESHEET.modify_button_text}>Modifiy picture</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={MODIFY_SCREEN_STYLESHEET.bottom_section}>

                {/* Modifify username section */}
                <View style={MODIFY_SCREEN_STYLESHEET.username_section}>
                    <TextInput style={MODIFY_SCREEN_STYLESHEET.username_text_input} placeholder='Modify your username here.' />
                </View>
            </View>
        </View>
    )
}

export default ModifyScreen