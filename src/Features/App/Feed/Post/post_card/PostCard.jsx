import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import React, { useState, useEffect } from 'react';
import { POST_STYLESHEET } from './style';
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from '../../../../../context/AuthProvider';

const PostCard = React.memo(({ postId, uid, timestamps, content, comments }) => {
    const [isLike, setIsLike] = useState(false);
    const [likes, setLikes] = useState([]);
    const [userDoc, setUserDoc] = useState({});

    const { user } = useAuthContext();

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

    const getUserWhoDidThePost = () => {
        firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then((doc) => {
                if (doc.exists) setUserDoc(doc.data());
            })
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


    const subscribeToLikes = () => {
        const unsubscribe = firestore()
            .collection('likes')
            .where('postId', '==', postId)
            .onSnapshot(onLikesSnapshot);

        return unsubscribe;
    };

    useEffect(() => {
        getUserWhoDidThePost();

        const unsubscribe = subscribeToLikes();

        return () => {
            unsubscribe();
        };
    }, []);


    const renderLikeButton = () => {
        if (isLike) {
            return (
                <Pressable onPress={handleLike}>
                    <AwesomeIcon name="heart" color={'red'} size={15} style={POST_STYLESHEET.like_icon} />
                </Pressable>
            );
        } else {
            return (
                <Pressable onPress={handleLike}>
                    <AwesomeIcon5 name="heart" color={'lightgrey'} size={15} solid={false} style={POST_STYLESHEET.like_icon} />
                </Pressable>
            );
        }
    };

    return (
        <TouchableOpacity
            style={{
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderColor: '#d1d0d059',
                width: '100%',
                paddingHorizontal: '2%',
                paddingVertical: '1%',
            }}>
            {/* Info Container */}
            <View style={POST_STYLESHEET.info_container}>
                {/* Profile picture */}
                <Avatar size={20} rounded source={userDoc.profile_picture ? { uri: userDoc.profile_picture } : require("../../../../../../assets/anonyme_profile.jpg")} />

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
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "white", marginHorizontal: "5%" }}>{likes.length}</Text>
                    {renderLikeButton()}
                </View>

                {/* Comment button */}
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "white", marginHorizontal: "5%" }}>{comments}</Text>
                    <Pressable>
                        <AwesomeIcon5 name="comment" color={'lightgrey'} size={15} solid={false} />
                    </Pressable>
                </View>

            </View>
        </TouchableOpacity>
    );
});

export default PostCard;