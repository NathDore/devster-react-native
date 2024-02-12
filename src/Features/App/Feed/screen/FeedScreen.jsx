import { View, FlatList, ActivityIndicator, Pressable, RefreshControl, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useModalContext } from '../../../../context/ModalProvider';
import Modal from 'react-native-modal';
import { FEED_SCREEN_STYLESHEET } from './style';
import { convertTimestampToRelativeTime } from '../../../../data/randomDataGeneration';
import firestore from "@react-native-firebase/firestore";
import PostCard from "../Post/post_card/PostCard";
import CreatePost from '../Post/create_post/CreatePost';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const FeedScreen = () => {
    const { setIsCreateModalOpen, isCreateModalOpen } = useModalContext();

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [posts, setPosts] = useState([]);
    const [lastVisible, setLastVisible] = useState({});
    const [newPostsCount, setNewPostsCount] = useState(0);
    const [lastTimestamp, setLastTimestamp] = useState(null);

    useEffect(() => {
        loadInitialData();
    }, [])

    const loadInitialData = async () => {
        try {
            const querySnapshot = await firestore()
                .collection('posts')
                .orderBy('timestamp', 'desc')
                .limit(8)
                .get();

            const postData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setPosts(postData);

            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLastVisible(lastDoc);

            return postData;
        } catch (error) {
            console.error("Error listening to posts:", error);
        }
    };

    const loadMoreData = async () => {
        if (!lastVisible) return;

        setLoading(true);

        try {
            const querySnapshot = await firestore()
                .collection('posts')
                .orderBy('timestamp', 'desc')
                .startAfter(lastVisible)
                .limit(8)
                .get();

            const newPosts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setPosts(prevPosts => [...prevPosts, ...newPosts]);

            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLastVisible(lastDoc);
        } catch (error) {
            console.error("Error loading more posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);

        try {
            const querySnapshot = await firestore()
                .collection('posts')
                .orderBy('timestamp', 'desc')
                .limit(8)
                .get();

            const refreshedPosts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setPosts(refreshedPosts);

            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLastVisible(lastDoc);
        } catch (error) {
            console.error("Error refreshing posts:", error);
        } finally {
            setRefreshing(false);
        }
    }

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('posts')
            .orderBy('timestamp', 'desc')
            .where('timestamp', '>', lastTimestamp || Date.now())
            .onSnapshot(snapshot => {

                const newPosts = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setNewPostsCount(newPosts.length);
            });

        return unsubscribe;
    }, []);

    const handleNotification = () => {
        onRefresh();
        setNewPostsCount(0);
        setLastTimestamp(Date.now())
    };


    const renderItem = ({ item }) => (
        <PostCard
            postId={item.id}
            postUid={item.userId}
            timestamps={convertTimestampToRelativeTime(item.timestamp)}
            content={item.content}
            isTouchable={true}
        />
    );

    const renderFooter = () => {
        return loading ? <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="lightgrey" /> : null;
    };

    return (
        <View style={FEED_SCREEN_STYLESHEET.container}>
            {/* Feed */}
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onEndReached={posts > 8 && loadMoreData}
                onEndReachedThreshold={0.1}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListFooterComponent={renderFooter}
            />

            {/* Create post icon */}
            <Pressable
                onPress={() => setIsCreateModalOpen(true)}
                style={FEED_SCREEN_STYLESHEET.create_post_icon}>
                <AwesomeIcon name="pencil" size={25} color={"white"} />
            </Pressable>

            {

                newPostsCount != 0 && <TouchableOpacity style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    padding: "3%",
                    position: "absolute",
                }} onPress={handleNotification}>
                    <FontAwesomeIcon name="bell" size={24} color="white" />
                </TouchableOpacity>

            }

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