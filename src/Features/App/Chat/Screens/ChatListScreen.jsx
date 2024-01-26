import { View, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import ChatCard from '../components/chat_card/ChatCard'
import { getRandomUser } from '../../../../data/randomDataGeneration'
import { generateRandomTimestamp } from '../../../../data/randomDataGeneration'
import { convertTimestampToRelativeTime } from '../../../../data/randomDataGeneration'

const ChatListScreen = () => {
    const [dumData, setDumData] = useState([]);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        loadMoreData();
    }, [])

    const renderFooter = () => {
        return loading ? <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="lightgrey" /> : null;
    };



    const renderItem = ({ item }) => (
        <ChatCard
            profileImg={item.profilePicture.toString()}
            name={item.username}
            timestamps={convertTimestampToRelativeTime(item.timestamp)}
            message={item.post}
        />
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#202124" }}>
            <FlatList
                data={dumData}
                renderItem={renderItem}
                keyExtractor={(item) => item.userId.toString()}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
        </View>
    )
}

export default ChatListScreen