import { View, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native'
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
    const [isFlatListLoading, setIsFlatListLoading] = useState(false);
    const [isScreenLoading, setIsScreenLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [conversations, setConversations] = useState([]);

    const { user } = useAuthContext();

    const loadInitialData = async () => {
        try {
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
            setIsScreenLoading(false);
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

        }, [navigation])
    );

    const onRefresh = async () => {
        try {
            setRefreshing(true);

            const getConversations = await loadInitialData();
            setConversations(getConversations);
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false)
        }
    }

    const renderFooter = () => {
        return isFlatListLoading ? <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="lightgrey" /> : null;
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
                isScreenLoading ?

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={80} color={"lightgrey"} />
                    </View>

                    :

                    <>
                        {
                            conversations?.length != 0 ?
                                <>
                                    <FlatList
                                        data={conversations}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => item.id}
                                        ListFooterComponent={renderFooter}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={onRefresh}
                                            />
                                        }
                                    />
                                </>
                                :
                                <>
                                    <NotFound subject="conversation" />
                                </>
                        }
                    </>
            }

        </View>
    )
}

export default ChatListScreen