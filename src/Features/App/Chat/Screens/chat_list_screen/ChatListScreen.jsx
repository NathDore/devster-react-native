import { View, FlatList, ActivityIndicator, Text } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import ChatCard from '../../components/chat_card/ChatCard'
import { getRandomUser } from '../../../../../data/randomDataGeneration'
import { generateRandomTimestamp } from '../../../../../data/randomDataGeneration'
import { convertTimestampToRelativeTime } from '../../../../../data/randomDataGeneration'
import { CHAT_LIST_SCREEN } from './style';
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from '../../../../../context/AuthProvider'
import { useFocusEffect } from '@react-navigation/core'

const ChatListScreen = ({ navigation }) => {
    const [dumData, setDumData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useAuthContext();

    const [conversations, setConversations] = useState([]);
    const [lastVisible, setLastVisible] = useState();
    const [pageIsLoading, setPageIsLoading] = useState(false);

    const loadInitialData = async () => {
        try {
            setPageIsLoading(true)

            const allConversations = [];
            const fetchConversations = await firestore()
                .collection("conversations")
                .orderBy("timestamp", "desc")
                .limit(8)
                .where("participants", "array-contains", user.uid)
                .get()

            fetchConversations.docs.forEach(conv => allConversations.push(conv.data()))
            setLastVisible(fetchConversations.docs[fetchConversations.docs.length - 1])

            return allConversations;
        } catch (error) {
            console.error('Error while loading initial conversation.', error);
        } finally {
            setPageIsLoading(false);
        }
    }

    const loadMoreData = async () => {
        if (loading) return;
        if (dumData.length > 10) return;

        setLoading(true);

        try {
            const newData = [];

            for (let i = 0; i < 15; i++) {
                const randomUser = await getRandomUser();
                const randomTimestamp = generateRandomTimestamp();

                if (randomUser) {
                    newData.push({ userId: dumData.length + i + 1, timestamp: randomTimestamp, ...randomUser });
                }
            }

            setDumData((prevData) => [...prevData, ...newData]);
        } catch (error) {
            console.error('Error loading more data:', error);
        } finally {
            setLoading(false);
        }
    };

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
            {
                conversations?.length != 0 ?
                    <FlatList
                        data={conversations}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        onEndReached={loadMoreData}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={renderFooter}
                    /> : <View>
                        <Text>No conversation yet :(.</Text>
                    </View>
            }
        </View>
    )
}

export default ChatListScreen