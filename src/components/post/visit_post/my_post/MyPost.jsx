import React from 'react'
import PostCard from '../../post_card/PostCard'

const MyPost = ({
    postId,
    postUid,
    timestamps,
    content,
    comments
}) => {

    const handleDelete = () => {
        // Delete logic here
    };

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
            {/*  <TouchableOpacity onPress={handleDelete} style={{ position: 'absolute', alignSelf: "flex-end", margin: "2%" }}>
                <FontAwesome name="times-circle" size={20} color="red" />
            </TouchableOpacity> */}
        </>
    )
}

export default MyPost