import React from 'react'
import PostCard from '../../post_card/PostCard'

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
                isVisit={true}
            />
        </>
    )
}

export default YourPost