import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from 'react-native-elements';
import { CHAT_CARD_STYLESHEET } from './style';
import { useAuthContext } from '../../../../../context/AuthProvider';
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from '@react-navigation/core';

const ChatCard = ({ participants, lastMessage, timestamp }) => {
    const { user } = useAuthContext();
    const navigation = useNavigation();

    const filteredParticipants = participants.filter(participant => participant !== user.uid);
    const otherParticipantId = filteredParticipants[0];

    const [userDoc, setUserDoc] = useState({});

    const getUserData = async () => {
        try {
            const data = firestore()
                .collection("users")
                .doc(otherParticipantId)
                .get()

            return (await data).data();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const unsubscribe = async () => {
            const fetchUserData = await getUserData();

            setUserDoc(fetchUserData);
        }

        unsubscribe();
    }, [])

    const handleNavigationToChatScreen = () => {
        navigation.navigate("ChatScreen", { userDoc });
    }

    return (
        <TouchableOpacity onPress={handleNavigationToChatScreen} style={CHAT_CARD_STYLESHEET.container}>

            {/* Profile picture */}
            <Avatar
                size={50}
                rounded
                source={userDoc?.profile_picture ? { uri: userDoc?.profile_picture } : require("../../../../../../assets/anonyme_profile.jpg")}
            />
            <View style={CHAT_CARD_STYLESHEET.titleMessageContainer}>

                {/* Username */}
                <Text style={CHAT_CARD_STYLESHEET.userName}>{userDoc?.name}</Text>

                {/* Message */}
                <View style={CHAT_CARD_STYLESHEET.messageContainer}>
                    <View style={{ maxWidth: "80%", flexDirection: "row", alignItems: "center" }}>

                        {
                            lastMessage.senderId == user.uid && <Text style={{ color: "grey", marginEnd: "1%" }}>You: </Text>
                        }
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={CHAT_CARD_STYLESHEET.messageText}
                        >{lastMessage.content}</Text>
                    </View>

                    {/* Timestamp */}
                    <Text style={CHAT_CARD_STYLESHEET.timestamp}>{timestamp}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatCard