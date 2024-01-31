import { View, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useModalContext } from '../../../../context/ModalProvider';
import Modal from 'react-native-modal';
import { FEED_SCREEN_STYLESHEET } from './style';
import { convertTimestampToRelativeTime } from '../../../../data/randomDataGeneration';
import firestore from "@react-native-firebase/firestore";
import { getPosts } from '../../firebase/firebase.functions';
import PostCard from "../Post/post_card/PostCard";
import CreatePost from '../Post/create_post/CreatePost';

const FeedScreen = () => {
    const { setIsCreateModalOpen, isCreateModalOpen } = useModalContext();

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const getPublications = () => {
        setPosts(getPosts());
    }

    const loadMoreData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const newData = [];

            for (let i = 0; i < 5; i++) {

                if (posts[i]) {
                    newData.push(posts[i]);
                }
            }

            setPosts((prevData) => [...prevData, ...newData]);
        } catch (error) {
            console.error('Error loading more data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPublications();
    }, [])

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("posts")
            .onSnapshot((snapshot) => {
                const postData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(postData);
            });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const renderItem = ({ item }) => (
        <PostCard
            postId={item.id}
            uid={item.userId}
            timestamps={convertTimestampToRelativeTime(item.timestamp)}
            content={item.content}
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
                //onEndReached={loadMoreData}
                //onEndReachedThreshold={0.1}
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