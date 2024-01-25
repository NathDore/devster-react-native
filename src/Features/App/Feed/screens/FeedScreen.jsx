import { View, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import Post from '../../../../UI/Feed-Post/Post';
import axios from 'axios';
import AwesomeIcon from "react-native-vector-icons/FontAwesome"; import { useModalContext } from '../../../../context/ModalProvider';
import CreatePost from '../../post/components/modal/CreatePost';
import Modal from 'react-native-modal';
import { FEED_SCREEN_STYLESHEET } from './style';

const FeedScreen = () => {
    const { setIsCreateModalOpen, isCreateModalOpen } = useModalContext();

    const [dumData, setDumData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRandomUser = async () => {
        try {
            const response = await axios.get('https://randomuser.me/api/');
            const randomUser = response.data.results[0];

            const resPost = await axios.get('https://jsonplaceholder.typicode.com/posts');
            const randomPost = resPost.data[Math.floor(Math.random() * resPost.data.length)];

            return {
                username: randomUser.name.first,
                email: randomUser.email,
                profilePicture: randomUser.picture.large,
                post: randomPost.body,
            };
        } catch (err) {
            console.error('Error fetching random user:', err);
            return null;
        }
    }

    const generateRandomTimestamp = () => {
        const currentTimestamp = Date.now();
        const randomTimestamp = currentTimestamp - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000);
        return randomTimestamp;
    }

    const convertTimestampToRelativeTime = (timestamp) => {
        const secondsAgo = Math.floor((Date.now() - timestamp) / 1000);

        if (secondsAgo < 60) {
            return `${secondsAgo} ${secondsAgo === 1 ? 'second' : 'seconds'} ago`;
        } else if (secondsAgo < 60 * 60) {
            const minutesAgo = Math.floor(secondsAgo / 60);
            return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
        } else if (secondsAgo < 60 * 60 * 24) {
            const hoursAgo = Math.floor(secondsAgo / (60 * 60));
            return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
        } else {
            const daysAgo = Math.floor(secondsAgo / (60 * 60 * 24));
            return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
        }
    };

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
        <Post
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