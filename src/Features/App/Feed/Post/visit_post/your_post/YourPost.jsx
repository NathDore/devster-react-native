import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import PostCard from '../../post_card/PostCard'
import { Ionicons } from '@expo/vector-icons';

const YourPost = ({
    postId,
    postUid,
    timestamps,
    content,
    comments
}) => {

    return (
        <>
            <PostCard
                postId={postId}
                postUid={postUid}
                timestamps={timestamps}
                content={content}
                comments={comments}
                isTouchable={false}
            />
        </>
    )
}

export default YourPost