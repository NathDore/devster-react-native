import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements';
import { CHAT_CARD_STYLESHEET } from './style';

const ChatCard = () => {
    return (
        <TouchableOpacity style={CHAT_CARD_STYLESHEET.container}>

            {/* Profile picture */}
            <Avatar
                size={50}
                rounded
                source={require("../../../../../../assets/profile-image.jpg")}
            />
            <View style={CHAT_CARD_STYLESHEET.titleMessageContainer}>

                {/* Username */}
                <Text style={CHAT_CARD_STYLESHEET.userName}>Carol</Text>

                {/* Message */}
                <View style={CHAT_CARD_STYLESHEET.messageContainer}>
                    <View style={{ maxWidth: "80%" }}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={CHAT_CARD_STYLESHEET.messageText}
                        >Hi, this carol from the underground dddddddddd !</Text>
                    </View>

                    {/* Timestamp */}
                    <Text style={CHAT_CARD_STYLESHEET.timestamp}>18 h 24</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatCard