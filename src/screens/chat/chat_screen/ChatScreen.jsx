import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, TextInput, Keyboard, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect } from '@react-navigation/core';
import { useAuthContext } from '../../../context/AuthProvider';
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import BubbleChat from '../../../components/chat/bubble_chat/BubbleChat';
import { CHAT_SCREEN_STYLESHEET } from './style';

const ChatScreen = ({ route, navigation }) => {
    const { userDoc } = route.params;
    const { user, userData } = useAuthContext();

    const [conversationId, setConversationId] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState();
    const [screenLoading, setScreenLoading] = useState(false);
    const [chatFocus, setChatFocus] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [isConversationYet, setIsConversationYet] = useState(false);

    const flatListRef = useRef();

    const getUserConversationId = async () => {
        const conversationPossibility1 = `${user.uid}_${userDoc.id}`;
        const conversationPossibility2 = `${userDoc.id}_${user.uid}`;

        try {
            setScreenLoading(true);
            const doc1 = await firestore().collection("conversations").doc(conversationPossibility1).get();
            if (doc1.exists) {

                setIsConversationYet(true);
                return conversationPossibility1;
            } else {
                const doc2 = await firestore().collection("conversations").doc(conversationPossibility2).get();
                if (doc2.exists) {

                    setIsConversationYet(true);
                    return conversationPossibility2;
                } else {
                    setIsConversationYet(false);
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            setScreenLoading(false);
        }
    };

    const createConversation = async () => {
        try {
            setScreenLoading(true);
            const participants = [user.uid, userDoc.id];

            const generatedConversationId = firestore().collection("conversations").doc().id;

            const task = await firestore().collection("conversations").doc(`${user.uid}_${userDoc.id}`).set({
                lastMessage: "",
                messages: [],
                timestamp: new Date().getTime(),
                participants: participants,
                id: generatedConversationId
            });

            console.log(`Conversation with the users ${user.uid}_${userDoc.id} created.`);
            setConversationId(`${user.uid}_${userDoc.id}`);

            return;
        } catch (error) {
            console.error('Error while creating the conversation.', error)
        } finally {
            setScreenLoading(false);
        }
    }

    useEffect(() => {
        const fetchUserConversation = async () => {
            try {
                const conversationIdFromFireStore = await getUserConversationId();
                setConversationId(conversationIdFromFireStore);

                const unsubscribteToMessages = firestore().collection("conversations").doc(conversationId)
                    .onSnapshot(snapshot => {
                        if (snapshot.exists) {
                            const messagesData = snapshot.data().messages || [];
                            setMessages(messagesData);
                        }
                    });

                return () => unsubscribteToMessages();
            } catch (error) {
                console.error(error);
            } finally {
                setScreenLoading(false);
            }
        }

        fetchUserConversation();
    }, [conversationId])

    const handleFocus = () => {
        setChatFocus(prev => !prev);
    }

    const handleUserInput = (text) => {
        setUserInput(text);
    }

    const handleSendMessage = async () => {
        try {

            let currentConversationId = conversationId;

            if (!isConversationYet) {
                await createConversation();
                setIsConversationYet(true);

                currentConversationId = await getUserConversationId();
            };

            const messageId = firestore().collection("messages").doc().id;

            if (!currentConversationId) {
                console.log("conversationId is null");
                return;
            }

            const addingMessage = await firestore().collection("conversations").doc(currentConversationId).update({
                lastMessage: {
                    content: userInput,
                    senderId: user.uid,
                    timestamp: new Date().getTime(),
                },
                messages: firestore.FieldValue.arrayUnion({
                    id: messageId,
                    messageContent: userInput,
                    receiverId: userDoc.id,
                    senderId: user.uid,
                    timestamp: new Date().getTime(),
                })
            })

            setUserInput("");
            Keyboard.dismiss();
        } catch (error) {
            console.error('Error while sending the message.', error);
        }
    }

    const handleFlatListLayout = () => {
        if (flatListRef.current && messages && messages.length > 0) {
            flatListRef.current.scrollToEnd({ animated: false });
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleNavigationToProfile = () => {
        navigation.navigate("VisitProfile", { userDoc });
    }

    const renderItem = ({ item }) => (
        <BubbleChat item={item} userData={userData} userDoc={userDoc} />
    );

    const renderFooter = () => {
        return loading ? <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="lightgrey" /> : null;
    };

    const renderIcon = () => {
        return userInput ? <TouchableOpacity style={{ padding: "2%" }} onPress={handleSendMessage}>
            <FontAwesome name="paper-plane" size={24} color="lightblue" />
        </TouchableOpacity> : <TouchableOpacity>
            <FontAwesome name="thumbs-up" size={24} color="lightblue" />
        </TouchableOpacity>
    }

    return (
        /* Container */
        <View style={CHAT_SCREEN_STYLESHEET.container}>

            {/* Header */}
            <View style={CHAT_SCREEN_STYLESHEET.header}>

                {/* Back Icon */}
                <TouchableOpacity onPress={handleGoBack} style={{ padding: "3%", }}>
                    <FontAwesome name="angle-left" size={40} color={"white"} />
                </TouchableOpacity>

                <View style={CHAT_SCREEN_STYLESHEET.profile_photo_name_row}>

                    {/* Profile picture */}
                    <Pressable onPress={handleNavigationToProfile}>
                        <Avatar size={40} rounded source={userDoc.profile_picture ? { uri: userDoc.profile_picture } : require("../../../../assets/anonyme_profile.jpg")} />
                    </Pressable>

                    {/* Name */}
                    <Text style={CHAT_SCREEN_STYLESHEET.name}>{userDoc.name}</Text>
                </View>


                {/* info Icon */}
                <TouchableOpacity>
                    {/* <FontAwesome name="info" size={20} color={"white"} /> */}
                </TouchableOpacity>
            </View>

            {/* Conversation Feed */}
            <View style={CHAT_SCREEN_STYLESHEET.conversation_feed}>
                {
                    screenLoading ? <ActivityIndicator style={{
                        alignSelf: "center",
                    }} size={50} color={"lightblue"} /> :

                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            ListFooterComponent={renderFooter}
                            onLayout={handleFlatListLayout}
                        />}
            </View>

            {/* Send message Section */}
            <View style={chatFocus ? CHAT_SCREEN_STYLESHEET.send_message_section_focus : CHAT_SCREEN_STYLESHEET.send_message_section_not_focus}>
                <View style={CHAT_SCREEN_STYLESHEET.textInput_container}>
                    <TextInput
                        style={CHAT_SCREEN_STYLESHEET.textInput}
                        onFocus={handleFocus}
                        onBlur={handleFocus}
                        multiline
                        placeholder='Enter your message.'
                        onChangeText={handleUserInput}
                        value={userInput}
                    />
                </View>

                {
                    renderIcon()
                }
            </View>
        </View>
    )
}

export default ChatScreen