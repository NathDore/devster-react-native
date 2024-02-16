import { View, Text } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'
import { BUBBLE_CHAT_STYLESHEET } from './style'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BubbleChat = ({ item, userDoc }) => {
    return (
        item.receiverId == userDoc.id ?
            /* Receiver Container */
            <View style={BUBBLE_CHAT_STYLESHEET.receiver_container}>
                {/* Receiver Message section */}
                <View style={BUBBLE_CHAT_STYLESHEET.receiver_message_section}>
                    {/* Receiver Message content */}
                    <Text style={BUBBLE_CHAT_STYLESHEET.receiver_message_content}>{item.messageContent}</Text>
                </View>

            </View> :
            /* Sender Container */
            <View style={BUBBLE_CHAT_STYLESHEET.sender_container}>
                {/* Sender Profile picture */}
                <Avatar size={hp(4)} rounded source={userDoc.profile_picture ? { uri: userDoc.profile_picture } : require("../../../../assets/anonyme_profile.jpg")} />

                {/* Sender Message section */}
                <View style={BUBBLE_CHAT_STYLESHEET.sender_message_section}>
                    {/* Sender Message content */}
                    <Text style={BUBBLE_CHAT_STYLESHEET.sender_message_content}>{item.messageContent}</Text>
                </View>


            </View>
    )
}

export default BubbleChat