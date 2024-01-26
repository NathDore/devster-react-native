import { View, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import PostCard from '../components/post_card/PostCard';
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useModalContext } from '../../../../context/ModalProvider';
import CreatePost from '../components/create_post/CreatePost';
import Modal from 'react-native-modal';
import { FEED_SCREEN_STYLESHEET } from './style';
import { getRandomUser } from '../../../../data/randomDataGeneration';
import { generateRandomTimestamp } from '../../../../data/randomDataGeneration';
import { convertTimestampToRelativeTime } from '../../../../data/randomDataGeneration';

const FeedScreen = () => {
    const { setIsCreateModalOpen, isCreateModalOpen } = useModalContext();

    const [dumData, setDumData] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadMoreData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const newData = [];

            for (let i = 0; i < 5; i++) {
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

    const renderItem = ({ item }) => (
        <PostCard
            profileImg={item.profilePicture.toString()}
            name={item.username}
            timestamps={convertTimestampToRelativeTime(item.timestamp)}
            post={item.post}
        />
    );

    const renderFooter = () => {
        return loading ? <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="lightgrey" /> : null;
    };


    return (
        <View style={FEED_SCREEN_STYLESHEET.container}>
            {/* Feed */}
            <FlatList
                data={dumData}
                renderItem={renderItem}
                keyExtractor={(item) => item.userId.toString()}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />

            {/* Create post icon */}
            <Pressable
                onPress={() => setIsCreateModalOpen(true)}
                style={FEED_SCREEN_STYLESHEET.create_post_icon}>
                <AwesomeIcon name="pencil" size={25} color={"black"} />
            </Pressable>

            {/* Create Post Modal */}
            <Modal
                isVisible={isCreateModalOpen}
            >
                <CreatePost />
            </Modal>
        </View>
    )
}

export default FeedScreen