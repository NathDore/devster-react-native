import { Pressable, View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import firestore from "@react-native-firebase/firestore";
import MyPost from '../../../components/post/visit_post/my_post/MyPost';
import YourPost from '../../../components/post/visit_post/your_post/YourPost';
import CommentList from '../../../components/comment/comment_section/CommentList';
import AddComment from '../../../components/comment/add_comment/AddComment';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PostScreen = ({ route }) => {
    const {
        postId,
        postUid,
        timestamps,
        content,
        uid,
    } = route.params;

    const [isScreenLoading, setIsScreenLoading] = useState(true);

    const [isYourPost, setIsYourPost] = useState(false);
    const [comments, setComments] = useState([]);

    const navigation = useNavigation();

    const checkIfThisIsYourPost = () => {

        firestore()
            .collection("posts")
            .doc(postId)
            .get()
            .then((docSnapshot) => {
                if (docSnapshot.data().userId == uid) {
                    setIsYourPost(true);
                } else {
                    setIsYourPost(false);
                }
            })
            .catch((error) => {
                console.error("Error getting document: ", error);
            })
            .finally(() => {
                setIsScreenLoading(false);
            })

    };

    const onCommentsSnapshot = (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const sortedComments = [...commentsData].sort((a, b) => {
            const timestampA = parseInt(a.timestamp);
            const timestampB = parseInt(b.timestamp);

            if (!isNaN(timestampA) && !isNaN(timestampB)) {
                return timestampA - timestampB;
            }

            console.error("Échec de la conversion en nombre pour certains commentaires.");
            return 0;
        });

        setComments(sortedComments);
    };

    const subscribeToComments = () => {
        const unsubscribe = firestore()
            .collection('comments')
            .where('postId', '==', postId)
            .onSnapshot(onCommentsSnapshot);

        return unsubscribe;
    }

    useFocusEffect(
        React.useCallback(() => {

            const unsubscribeComments = subscribeToComments();
            checkIfThisIsYourPost();

            return () => {
                unsubscribeComments();
            };
        }, [uid, postId])
    )

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <View style={{
            backgroundColor: "black",
            flex: 1,
        }}>

            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }} >
                <Pressable onPress={handleGoBack} style={{ padding: "3%" }}>
                    <FontAwesome name="angle-left" size={40} color="lightgrey" />
                </Pressable>

                <View />
            </View>

            {
                isScreenLoading ?
                    <>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator size={80} color={"lightgrey"} />
                        </View>
                    </>
                    :
                    <>
                        {
                            isYourPost ?
                                <MyPost
                                    postId={postId}
                                    postUid={postUid}
                                    timestamps={timestamps}
                                    content={content}
                                />
                                :
                                <YourPost
                                    postId={postId}
                                    postUid={postUid}
                                    timestamps={timestamps}
                                    content={content}
                                />
                        }
                        <CommentList
                            postId={postId}
                            postUid={postUid}
                            comments={comments}
                        />

                        <AddComment postId={postId} />
                    </>
            }
        </View >
    )
}

export default PostScreen