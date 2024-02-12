import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import React, { useState, useEffect } from 'react';
import { POST_STYLESHEET } from './style';
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from '../../../../../context/AuthProvider';
import { useNavigation } from '@react-navigation/core';
import { getPostComments } from '../../../../../firebase/commun.functions';

const PostCard = React.memo(({ postId, postUid, timestamps, content, isTouchable }) => {
    const [isLike, setIsLike] = useState(false);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [userDoc, setUserDoc] = useState({});

    const { user } = useAuthContext();
    const navigation = useNavigation();

    const handleLike = () => {
        setIsLike(prev => !prev);
        sendLikeToFirestore();
    };

    const sendLikeToFirestore = () => {
        const likedDoc = likes.find((like) => like.userId === user.uid);

        if (likedDoc) {
            removeLike(likedDoc.id);
        } else {
            addLike();
        }
    };

    const addLike = () => {
        firestore()
            .collection("likes")
            .add({
                postId: postId,
                userId: user.uid,
            })
            .then(() => console.log("like added."))
            .catch(error => console.log("error while adding the like."))
    };

    const removeLike = (likeId) => {
        firestore()
            .collection("likes")
            .doc(likeId)
            .delete()
            .then(() => {
                console.log("Like removed");
            })
            .catch(error => console.log("error while removing the like."))
    }

    const onLikesSnapshot = (snapshot) => {
        const likesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setLikes(likesData);

        const userLiked = likesData.some((like) => like.userId === user.uid);
        setIsLike(userLiked);
    };

    const onCommentsSnapshot = (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setComments(commentsData);
    };


    const subscribeToLikes = () => {
        const unsubscribe = firestore()
            .collection('likes')
            .where('postId', '==', postId)
            .onSnapshot(onLikesSnapshot);

        return unsubscribe;
    };

    const subscribeToComments = () => {
        const unsubscribe = firestore()
            .collection('comments')
            .where('postId', '==', postId)
            .onSnapshot(onCommentsSnapshot);

        return unsubscribe;
    }

    const onUserWhoDidThePostSnapshot = (snapshot) => {
        if (snapshot.exists) {
            setUserDoc({
                id: snapshot.id,
                ...snapshot.data(),
            });
        } else {
            console.error("Document does not exist");
        }
    };


    const subscribeToUserWhoDidThePost = () => {
        const unsubscribe = firestore()
            .collection('users')
            .doc(postUid)
            .onSnapshot(onUserWhoDidThePostSnapshot);

        return unsubscribe;
    }

    useEffect(() => {
        const unsubscribeLikes = subscribeToLikes();
        const unsubscribeComments = subscribeToComments();
        const unsubscribeToUserWhoDidThePost = subscribeToUserWhoDidThePost();

        return () => {
            unsubscribeLikes();
            unsubscribeComments();
            unsubscribeToUserWhoDidThePost();
        };
    }, [postUid]);


    const renderLikeButton = () => {
        if (isLike) {
            return (
                <Pressable onPress={handleLike}>
                    <AwesomeIcon name="heart" color={'red'} size={18} style={POST_STYLESHEET.like_icon} />
                </Pressable>
            );
        } else {
            return (
                <Pressable onPress={handleLike}>
                    <AwesomeIcon5 name="heart" color={'lightgrey'} size={18} solid={false} style={POST_STYLESHEET.like_icon} />
                </Pressable>
            );
        }
    };

    const handleNavigationVisitPost = () => {
        const { uid } = user;

        navigation.navigate("VisitPost", {
            postId,
            postUid,
            timestamps,
            content,
            userDoc,
            uid
        });
    }

    const handleNavigationVisitProfile = () => {
        navigation.navigate("VisitProfile", {
            userDoc,
        })
    }

    const TouchableView = isTouchable ? TouchableOpacity : View;

    return (
        <TouchableView
            style={POST_STYLESHEET.card_container}
            onPress={handleNavigationVisitPost}
        >
            {/* Info Container */}
            <View style={POST_STYLESHEET.info_container}>
                {/* Profile picture */}
                <TouchableOpacity onPress={handleNavigationVisitProfile}>
                    <Avatar size={30} rounded source={userDoc.profile_picture ? { uri: userDoc.profile_picture } : require("../../../../../../assets/anonyme_profile.jpg")} />
                </TouchableOpacity>


                {/* UserName */}
                <Text style={POST_STYLESHEET.username}>{userDoc.name}</Text>

                {/* Timestamp */}
                <Text style={POST_STYLESHEET.timestamp}>{timestamps}</Text>
            </View>

            {/* Post Container */}
            <View style={POST_STYLESHEET.post_container}>
                {/* Post text */}
                <Text style={POST_STYLESHEET.post_text}>{content}</Text>
            </View>

            {/* Reaction Section */}
            <View style={POST_STYLESHEET.reaction_container}>
                {/* Like button */}
                <View style={POST_STYLESHEET.like_button_container}>
                    <Text style={POST_STYLESHEET.like_button_text}>{likes.length}</Text>
                    {renderLikeButton()}
                </View>

                {/* Comment button */}
                <View style={POST_STYLESHEET.comment_button_container}>
                    <Text style={POST_STYLESHEET.comment_button_text}>{comments.length}</Text>
                    <View>
                        <AwesomeIcon5 name="comment" color={'lightgrey'} size={18} solid={false} />
                    </View>
                </View>

            </View>
        </TouchableView>
    );
});

export default PostCard;