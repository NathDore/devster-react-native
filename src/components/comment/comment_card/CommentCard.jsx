import { View, Text, Pressable } from 'react-native';
import { Avatar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { COMMENT_STYLESHEET } from './style';
import firestore from "@react-native-firebase/firestore";
import { convertTimestampToRelativeTime } from '../../../util/util-function';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CommentCard = ({ content, userId, timestamp }) => {
    const [userDoc, setuserDoc] = useState({});

    const navigation = useNavigation();

    const fetchuserDoc = () => {
        firestore()
            .collection('users')
            .doc(userId)
            .get()
            .then((doc) => {
                if (doc.exists) setuserDoc({ ...doc.data() });;
            })
    }

    useEffect(() => {
        fetchuserDoc();
    }, [])

    const handleNavigation = () => {
        navigation.navigate("VisitProfile", { userDoc, });
    }

    return (
        <View style={COMMENT_STYLESHEET.container}>
            {/* Info Container */}
            <View style={COMMENT_STYLESHEET.info_container}>
                {/* Profile picture */}
                <Pressable style={{ padding: "1.5%" }} onPress={handleNavigation}>
                    <Avatar size={hp(3)} rounded source={userDoc?.profile_picture ? { uri: userDoc?.profile_picture } : require("../../../../assets/anonyme_profile.jpg")} />
                </Pressable>

                {/* UserName */}
                <Text style={COMMENT_STYLESHEET.username}>{userDoc.name}</Text>

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