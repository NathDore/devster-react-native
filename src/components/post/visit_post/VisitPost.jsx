import { View } from 'react-native'
import React, { useState } from 'react'
import firestore from "@react-native-firebase/firestore";
import MyPost from './my_post/MyPost';
import YourPost from './your_post/YourPost';
import CommentList from '../../comment/comment_section/CommentList';
import AddComment from '../../comment/add_comment/AddComment';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthContext } from '../../../context/AuthProvider';

const VisitPost = ({ route }) => {
    const {
        postId,
        postUid,
        timestamps,
        content,
        uid,
    } = route.params;

    const [isYourPost, setIsYourPost] = useState(false);
    const [comments, setComments] = useState([]);

    const checkIfThisIsYourPost = () => {

        firestore()
            .collection("posts")
            .doc(postId)  // Use the doc method with postId as the document ID
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
            });

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

    return (
        <View style={{
            backgroundColor: "black",
            flex: 1,
        }}>
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
        </View>
    )
}

export default VisitPost