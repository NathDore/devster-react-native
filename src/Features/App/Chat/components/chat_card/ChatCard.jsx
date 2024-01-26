import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements';
import { CHAT_CARD_STYLESHEET } from './style';

const ChatCard = ({ profileImg, name, timestamps, message }) => {
    return (
        <TouchableOpacity style={CHAT_CARD_STYLESHEET.container}>

            {/* Profile picture */}
            <Avatar
                size={50}
                rounded
                source={{ uri: profileImg }}
            />
            <View style={CHAT_CARD_STYLESHEET.titleMessageContainer}>

                {/* Username */}
                <Text style={CHAT_CARD_STYLESHEET.userName}>{name}</Text>

                {/* Message */}
                <View style={CHAT_CARD_STYLESHEET.messageContainer}>
                    <View style={{ maxWidth: "80%" }}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={CHAT_CARD_STYLESHEET.messageText}
                        >{message}</Text>
                    </View>

                    {/* Timestamp */}
                    <Text style={CHAT_CARD_STYLESHEET.timestamp}>{timestamps}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatCard