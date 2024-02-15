import { View, FlatList, ActivityIndicator } from 'react-native'
import { useState } from 'react';
import CommentCard from '../comment_card/CommentCard';

const CommentList = ({ comments }) => {
    const [loading, setLoading] = useState(false);


    const renderItem = ({ item }) => (
        <CommentCard
            content={item.content}
            commentId={item.id}
            postId={item.postId}
            userId={item.userId}
            timestamp={item.timestamp}
        />
    );

    const renderFooter = () => {
        return loading ? <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="lightgrey" /> : null;
    };



    return (
        <View style={{ marginTop: "0%", flex: 1, borderTopWidth: 0.2, borderColor: "lightgrey" }}>
            <FlatList
                data={comments}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                //onEndReached={loadMoreData}
                //onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
        </View>
    )
}

export default CommentList