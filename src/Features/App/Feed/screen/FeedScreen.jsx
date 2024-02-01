import { View, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useModalContext } from '../../../../context/ModalProvider';
import Modal from 'react-native-modal';
import { FEED_SCREEN_STYLESHEET } from './style';
import { convertTimestampToRelativeTime } from '../../../../data/randomDataGeneration';
import firestore from "@react-native-firebase/firestore";
import PostCard from "../Post/post_card/PostCard";
import CreatePost from '../Post/create_post/CreatePost';

const FeedScreen = () => {
    const { setIsCreateModalOpen, isCreateModalOpen } = useModalContext();

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [lastVisible, setLastVisible] = useState();

    const loadInitialData = () => {
        setLoading(true);

        firestore()
            .collection('posts')
            .orderBy("timestamp", "desc")
            .limit(8)
            .get()
            .then((querySnapshot) => {
                const postData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))

                setPosts(postData);
                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
            })
            .catch((error) => console.error('Error loading initial data:', error))
            .finally(() => setLoading(false));
    }

    const loadMoreData = async () => {
        if (loading || !lastVisible) return;

        setLoading(true);

        firestore()
            .collection('posts')
            .orderBy('timestamp', 'desc')
            .startAfter(lastVisible)
            .limit(8)
            .get()
            .then((querySnapshot) => {
                const newData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setPosts(prevData => [...prevData, ...newData]);
                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
            })
            .catch((error) => console.error('Error loading more data:', error))
            .finally(() => setLoading(false));
    };


    useEffect(() => {
        const unsubscribe = loadInitialData();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

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