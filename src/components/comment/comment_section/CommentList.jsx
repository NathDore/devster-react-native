import { View } from 'react-native'
import CommentCard from '../comment_card/CommentCard';

const CommentList = ({ comments }) => {
    return (
        <View style={{ flex: 1, borderTopWidth: 0.2, borderColor: "lightgrey" }}>
            {
                comments.map((item) => (
                    <CommentCard
                        key={item.id}
                        content={item.content}
                        commentId={item.id}
                        postId={item.postId}
                        userId={item.userId}
                        timestamp={item.timestamp} />
                ))
            }
        </View>
    )
}

export default CommentList