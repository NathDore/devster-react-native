import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { COMMENT_STYLESHEET } from './style';
import firestore from "@react-native-firebase/firestore";
import { convertTimestampToRelativeTime } from '../../../util/util-function';

const CommentCard = ({ content, userId, timestamp }) => {
    const [userData, setUserData] = useState({});

    const fetchUserData = () => {
        firestore()
            .collection('users')
            .doc(userId)
            .get()
            .then((doc) => {
                if (doc.exists) setUserData({ ...doc.data() });;
            })
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <View style={{
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: 'lightblue',
            width: '100%',
            paddingHorizontal: '2%',
            paddingVertical: '1%',
            backgroundColor: "#202124",
            display: "flex",
            flexDirection: "column",
            marginBottom: "3%",
        }}>
            {/* Info Container */}
            <View style={COMMENT_STYLESHEET.info_container}>
                {/* Profile picture */}
                <Avatar size={20} rounded source={userData?.profile_picture ? { uri: userData?.profile_picture } : require("../../../../assets/anonyme_profile.jpg")} />

                {/* UserName */}
                <Text style={COMMENT_STYLESHEET.username}>{userData.name}</Text>

                {/* Timestamp */}
                <Text style={COMMENT_STYLESHEET.timestamp}>{convertTimestampToRelativeTime(timestamp)}</Text>
            </View>

            {/* Post Container */}
            <View style={COMMENT_STYLESHEET.post_container}>
                {/* Post text */}
                <Text style={COMMENT_STYLESHEET.post_text}>{content}</Text>
            </View>
        </View>
    )
}

export default CommentCard