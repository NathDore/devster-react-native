import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, TextInput, Keyboard } from 'react-native'
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
    const { user, userData, setIsHeaderShowing } = useAuthContext();

    const [conversationId, setConversationId] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState();
    const [screenLoading, setScreenLoading] = useState(false);
    const [chatFocus, setChatFocus] = useState(false);
    const [userInput, setUserInput] = useState("");

    const flatListRef = useRef();


    const getUserConversationId = async () => {
        const conversationPossibility1 = `${user.uid}_${userDoc.id}`;
        const conversationPossibility2 = `${userDoc.id}_${user.uid}`;

        try {
            setScreenLoading(true);
            const doc1 = await firestore().collection("conversations").doc(conversationPossibility1).get();
            if (doc1.exists) {
                return conversationPossibility1;
            } else {
                const doc2 = await firestore().collection("conversations").doc(conversationPossibility2).get();
                if (doc2.exists) {
                    return conversationPossibility2;
                } else {
                    createConversation();
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

            console.log("conversation created.");
            setConversationId(`${user.uid}_${userDoc.id}`);

            return;
        } catch (error) {
            console.error('Error while creating the conversation.', error)
        } finally {
            setScreenLoading(false);
        }
    }

    const subscribeToMessages = async () => {

        try {
            setScreenLoading(true);

            return firestore().collection("conversations").doc(conversationId)
                .onSnapshot(snapshot => {
                    if (snapshot.exists) {
                        const messagesData = snapshot.data().messages || [];
                        setMessages(messagesData);
                    }
                });
        } catch (error) {
            console.error('Error while subscribing to messages.', error);
        } finally {
            setScreenLoading(false);
        }
    }

    useEffect(() => {
        setIsHeaderShowing(false);
    }, [])

    useEffect(() => {
        if (flatListRef.current && messages && messages.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages])

    useFocusEffect(
        React.useCallback(() => {

            const unsubscribe = async () => {
                try {
                    const conversationIdFromFireStore = await getUserConversationId();
                    setConversationId(conversationIdFromFireStore);

                } catch (error) {
                    console.error(error);
                }
            }



            unsubscribe();
        }, [user, userDoc, navigation])
    )

    useEffect(() => {
        const unsubscribe = async () => {
            try {
                const unsubscribeMessages = await subscribeToMessages();

                return () => {
                    unsubscribeMessages();
                };
            } catch (error) {
                console.error(error);
            }
        }

        unsubscribe();
    }, [conversationId, user, userDoc, navigation])

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

    const handleFocus = () => {
        setChatFocus(prev => !prev);
    }

    const handleUserInput = (text) => {
        setUserInput(text);
    }

    const handleSendMessage = async () => {
        try {
            const messageId = firestore().collection("messages").doc().id;

            if (!conversationId) {
                console.log("conversationId is null");
                return;
            }

            const addingMessage = await firestore().collection("conversations").doc(conversationId).update({
                lastMessage: {
                    content: userInput,
                    senderId: user.uid,
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
        setIsHeaderShowing(true);
        navigation.goBack();
    }

    return (
        /* Container */
        <View style={CHAT_SCREEN_STYLESHEET.container}>

            {/* Header */}
            <View style={CHAT_SCREEN_STYLESHEET.header}>

                {/* Back Icon */}
                <TouchableOpacity onPress={handleGoBack} style={{ padding: "3%", }}>
                    <FontAwesome name="chevron-left" size={20} color={"white"} />
                </TouchableOpacity>

                <View style={CHAT_SCREEN_STYLESHEET.profile_photo_name_row}>

                    <Avatar size={40} rounded source={userDoc.profile_picture ? { uri: userDoc.profile_picture } : require("../../../../assets/anonyme_profile.jpg")} />

                    {/* Name */}
                    <Text style={CHAT_SCREEN_STYLESHEET.name}>{userDoc.name}</Text>
                </View>


                {/* info Icon */}
                <TouchableOpacity>
                    <FontAwesome name="info" size={20} color={"white"} />
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