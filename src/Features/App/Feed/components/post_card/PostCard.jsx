import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import React, { useState, useEffect } from 'react';
import { POST_STYLESHEET } from './style';
import firestore from "@react-native-firebase/firestore";

const PostCard = React.memo(({ postId, uid, timestamps, content, likes, comments }) => {
    const [isLike, setIslike] = useState(false);
    const [userDoc, setUserDoc] = useState({});

    const handleLike = () => {
        setIslike((prev) => !prev);
    };

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

    const getUserDoc = () => {
        firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then((doc) => {
                if (doc.exists) setUserDoc(doc.data());
            })
    }

    useEffect(() => {
        getUserDoc();
    }, [])

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
                    <Text style={{ color: "white", marginHorizontal: "5%" }}>{likes}</Text>
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