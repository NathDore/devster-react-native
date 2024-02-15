import { View, FlatList, ActivityIndicator, Text } from 'react-native'
import React, { useState, useCallback } from 'react'
import ChatCard from '../../../components/chat/chat_card/ChatCard'
import { convertTimestampToRelativeTime } from '../../../util/util-function'
import { CHAT_LIST_SCREEN } from './style';
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from '../../../context/AuthProvider'
import { useFocusEffect } from '@react-navigation/core'
import Header from '../../../UI/header/Header';
import NotFound from '../../../UI/not_found/NotFound';

const ChatListScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const { user, userData } = useAuthContext();

    const [conversations, setConversations] = useState([]);

    const loadInitialData = async () => {
        try {
            setLoading(true)

            const allConversations = [];
            const fetchConversations = await firestore()
                .collection("conversations")
                .orderBy("timestamp", "desc")
                .limit(8)
                .where("participants", "array-contains", user.uid)
                .get()

            fetchConversations.docs.forEach(conv => allConversations.push(conv.data()))

            return allConversations;
        } catch (error) {
            console.error('Error while loading initial conversation.', error);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = async () => {
                try {
                    const getConversations = await loadInitialData();
                    setConversations(getConversations);
                } catch (error) {

                }
            }
            unsubscribe();

        }, [user, navigation])
    );

    const renderFooter = () => {
        return loading ? <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="lightgrey" /> : null;
    };

    const renderItem = ({ item }) => (
        <ChatCard
            participants={item.participants}
            lastMessage={item.lastMessage}
            timestamp={convertTimestampToRelativeTime(item.timestamp)}
        />
    );

    return (
        <View style={CHAT_LIST_SCREEN.container}>
            <Header screenTitle="Conversations" />
            {
                conversations?.length != 0 ?
                    <>
                        <FlatList
                            data={conversations}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            ListFooterComponent={renderFooter}
                        />
                    </>
                    :
                    <>
                        <NotFound subject="conversation" />
                    </>
            }
        </View>
    )
}

export default ChatListScreen