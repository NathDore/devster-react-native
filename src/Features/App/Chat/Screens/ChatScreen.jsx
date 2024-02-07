import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, TextInput, Keyboard } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect } from '@react-navigation/core';
import { useAuthContext } from '../../../../context/AuthProvider';
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

const ChatScreen = ({ route, navigation }) => {
    const { userDoc } = route.params;
    const { user, userData } = useAuthContext();

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

        setScreenLoading(true);

        try {
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
        setScreenLoading(true);
        try {
            const task = await firestore().collection("conversations").doc(`${user.uid}_${userDoc.id}`).set({
                lastMessage: "",
                messages: [],
                timestamp: new Date().getTime(),
            });

            console.log("conversation created.");

            return `${user.uid}_${userDoc.id}`;
        } catch (error) {
            console.error('Error while creating the conversation.', error)
        } finally {
            setScreenLoading(false);
        }
    }

    const subscribeToMessages = async () => {
        setScreenLoading(true);
        try {
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
        item.receiverId == userDoc.id ?
            <View style={{
                width: "100%",
                marginVertical: "5%",
                paddingHorizontal: "5%",
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
            }}>
                <Avatar size={40} rounded source={userData.profile_picture ? { uri: userData.profile_picture } : require("../../../../../assets/anonyme_profile.jpg")} />
                <View style={{
                    justifyContent: "center",
                    backgroundColor: "lightgrey",
                    borderRadius: 20,
                    marginHorizontal: "2%",
                    padding: "3%",
                }}>
                    <Text style={{
                        marginHorizontal: "2%"
                    }}>{item.messageContent}</Text>
                </View>

            </View> :
            <View style={{
                width: "100%",
                marginVertical: "5%",
                justifyContent: "flex-end",
                flexDirection: "row",
                paddingHorizontal: "5%",
                alignItems: "center",
            }}>
                <View style={{
                    justifyContent: "center",
                    backgroundColor: "lightgrey",
                    borderRadius: 20,
                    marginHorizontal: "2%",
                    padding: "3%",
                }}>
                    <Text style={{
                        marginHorizontal: "2%"
                    }}>{item.messageContent}</Text>
                </View>

                <Avatar size={40} rounded source={userDoc.profile_picture ? { uri: userDoc.profile_picture } : require("../../../../../assets/anonyme_profile.jpg")} />
            </View>
    );

    const renderFooter = () => {
        return loading ? <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="lightgrey" /> : null;
    };

    const renderIcon = () => {
        return userInput ? <TouchableOpacity onPress={handleSendMessage}>
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
        const messageId = firestore().collection("messages").doc().id;

        try {
            const addingMessage = await firestore().collection("conversations").doc(conversationId).update({
                lastMessage: userInput,
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


    return (
        <View style={{
            display: "flex",
            flex: 1,
            flexDirection: "column"
        }}>

            {/* Header */}
            <View style={{
                width: "100%",
                backgroundColor: "black",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: "3%",
                paddingBottom: "3%",
                paddingTop: "1%",
            }}>

                {/* Back Icon */}
                <TouchableOpacity>
                    <FontAwesome name="chevron-left" size={20} color={"white"} />
                </TouchableOpacity>

                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <Avatar size={40} rounded source={userDoc.profile_picture ? { uri: userDoc.profile_picture } : require("../../../../../assets/anonyme_profile.jpg")} />

                    {/* Name */}
                    <Text style={{
                        color: "white",
                        fontSize: 25,
                        fontWeight: "bold",
                        marginHorizontal: "3%",
                    }}>{userDoc.name}</Text>
                </View>


                {/* info Icon */}
                <TouchableOpacity>
                    <FontAwesome name="info" size={20} color={"white"} />
                </TouchableOpacity>
            </View>

            {/* Conversation Feed */}
            <View style={{
                flex: 1,
                display: "flex",
            }}>
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
            <View style={chatFocus ? {
                backgroundColor: "black",
                width: "100%",
                height: "15%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: "3%",
                justifyContent: "space-evenly"
            } : {
                backgroundColor: "black",
                width: "100%",
                height: "10%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: "3%",
                justifyContent: "space-evenly"
            }}>
                <View style={chatFocus ? {
                    height: "75%",
                    width: "80%",
                    backgroundColor: "lightgrey",
                    borderRadius: 20,
                } : {
                    width: "80%",
                    backgroundColor: "lightgrey",
                    borderRadius: 20,
                    height: "70%",
                }}>
                    <TextInput
                        style={{
                            flex: 1,
                            paddingLeft: 20,
                            fontSize: 20,
                        }}
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