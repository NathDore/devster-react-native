import { View, FlatList, ActivityIndicator, Pressable, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Modal from 'react-native-modal';
import { FEED_SCREEN_STYLESHEET } from './style';
import { convertTimestampToRelativeTime } from '../../../util/util-function';
import firestore from "@react-native-firebase/firestore";
import PostCard from "../../../components/post/post_card/PostCard";
import CreatePost from '../../../components/post/create_post/CreatePost';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../UI/header/Header';
import NotFound from '../../../UI/not_found/NotFound';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FeedScreen = ({ navigation }) => {
    const [isScreenLoading, setIsScreenLoading] = useState(true);
    const [isFlatListLoading, setIsFlatListLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [lastVisible, setLastVisible] = useState({});
    const [newPostsCount, setNewPostsCount] = useState(0);
    const [lastTimestamp, setLastTimestamp] = useState(null);


    useFocusEffect(useCallback(() => {
        loadInitialData();
    }, [navigation]))

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const unsubscribreToPosts = firestore()
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

                return () => unsubscribreToPosts();

            } catch (error) {
                console.error("Error while fetching the posts.", error);
            }
        }

        fetchPosts();
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
        } catch (error) {
            console.error("Error listening to posts:", error);
        } finally {
            setIsScreenLoading(false);
            setNewPostsCount(0);
        }
    };

    const loadMoreData = async () => {
        if (!lastVisible) return;

        setIsFlatListLoading(true)

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
            setIsFlatListLoading(false);
        }
    };

    const onRefresh = async () => {
        try {
            setRefreshing(true);
            setNewPostsCount(0);
            loadInitialData();
        } catch (error) {
            console.error("Error refreshing posts:", error);
        } finally {
            setRefreshing(false);
        }
    }

    const handleNotification = () => {
        onRefresh();
        setNewPostsCount(0);
        setLastTimestamp(Date.now())
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };


    const renderItem = ({ item }) => (
        <PostCard
            postId={item.id}
            postUid={item.userId}
            timestamps={convertTimestampToRelativeTime(item.timestamp)}
            content={item.content}
            isTouchable={true}
            isVisit={false}
        />
    );

    const renderFooter = () => {
        return isFlatListLoading ? <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="lightgrey" /> : null;
    };

    return (
        <View style={FEED_SCREEN_STYLESHEET.container}>
            <Header screenTitle="Publications" />

            {isScreenLoading ?

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={hp(5)} color={"lightgrey"} />
                </View>

                : (<>{posts.length == 0 ?

                    <>
                        {/* Not found */}
                        <NotFound subject={"publication"} />
                    </>

                    :

                    <>
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

                        {
                            /* Icon notification */
                            newPostsCount != 0 &&
                            <TouchableOpacity style={FEED_SCREEN_STYLESHEET.notification_bell} onPress={handleNotification}>
                                <FontAwesomeIcon name="bell" size={wp(5)} color="white" />
                            </TouchableOpacity>
                        }

                        {/* Create post icon */}
                        <Pressable
                            onPress={handleModalOpen}
                            style={FEED_SCREEN_STYLESHEET.create_post_icon}>
                            <AwesomeIcon name="pencil" size={wp(5)} color={"white"} />
                        </Pressable>

                        {/* Create Post Modal */}
                        <Modal
                            isVisible={isModalOpen}
                        >
                            <CreatePost setIsModalOpen={setIsModalOpen} />
                        </Modal>

                    </>
                }</>)}
        </View>
    )
}

export default FeedScreen