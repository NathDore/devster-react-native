import { View, Text, Pressable } from 'react-native';
import { Avatar } from 'react-native-elements';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import { POST_STYLESHEET } from './style';

const PostCard = React.memo(({ profileImg, timestamps, name, post, likes, comments }) => {
    const [isLike, setIslike] = useState(false);

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

    return (
        <View
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
                <Avatar size={20} rounded source={{ uri: profileImg }} />

                {/* UserName */}
                <Text style={POST_STYLESHEET.username}>{name}</Text>

                {/* Timestamp */}
                <Text style={POST_STYLESHEET.timestamp}>{timestamps}</Text>
            </View>

            {/* Post Container */}
            <View style={POST_STYLESHEET.post_container}>
                {/* Post text */}
                <Text style={POST_STYLESHEET.post_text}>{post}</Text>
            </View>

            {/* Reaction Section */}
            <View style={POST_STYLESHEET.reaction_container}>
                {/* Like button */}
                {renderLikeButton()}

                {/* Comment button */}
                <Pressable>
                    <AwesomeIcon5 name="comment" color={'lightgrey'} size={15} solid={false} />
                </Pressable>
            </View>
        </View>
    );
});

export default PostCard;