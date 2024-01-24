import { View, FlatList } from 'react-native'
import React from 'react'
import Post from '../../../UI/Feed-Post/Post'
import { dumData } from '../../../data/dummyData'

const FeedScreen = () => {
    const renderItem = ({ item }) => (
        <Post
            profileImg={item.profileImg}
            name={item.username}
            timestamps={item.timeStamps}
            post={item.post}
            likes={item.likes}
            comments={item.comments}
        />
    );


    return (
        <View style={{
            flex: 1,
            backgroundColor: "#202124",
            alignItems: "center",
        }}>
            <FlatList
                data={dumData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} // Assurez-vous d'avoir une propriété unique "id" dans vos données
            />
        </View>
    )
}

export default FeedScreen