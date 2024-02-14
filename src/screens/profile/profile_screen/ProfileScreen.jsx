import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Avatar } from 'react-native-elements';
import { convertTimestampToRelativeTime } from '../../../util/util-function';
import PostCard from '../../../components/post/post_card/PostCard';
import { PROFILE_SCREEN_STYLESHEET } from './style';
import { useAuthContext } from '../../../context/AuthProvider';
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect, useNavigation } from '@react-navigation/core';

const ProfileScreen = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastVisible, setLastVisible] = useState(null);

    const { userData, user, setScreenState } = useAuthContext();
    const navigation = useNavigation();

    const loadInitialData = () => {
        setLoading(true);

        firestore()
            .collection('posts')
            .where('userId', '==', user?.uid)
            .orderBy('timestamp', 'desc')
            .limit(5)
            .get()
            .then((querySnapshot) => {
                const postData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))

                setUserPosts(postData);
                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
            })
            .catch((error) => console.error('Error loading initial data:', error))
            .finally(() => setLoading(false));
    }

    const loadMoreData = () => {
        if (loading || !lastVisible) return;

        setLoading(true);

        firestore()
            .collection('posts')
            .where('userId', '==', user?.uid)
            .orderBy('timestamp', 'desc')
            .limit(5)
            .startAfter(lastVisible)
            .get()
            .then((querySnapshot) => {
                const newData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))

                setUserPosts((prev) => [...prev, ...newData])
                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1])
            })
            .catch((error) => console.error('Error loading data:', error))
            .finally(() => setLoading(false));
    }

    useFocusEffect(useCallback(() => {
        setScreenState("Profile");

        const unsubscribe = loadInitialData();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, [navigation]))

    const renderItem = ({ item }) => (
        <PostCard
            postId={item.id}
            postUid={item.userId}
            timestamps={convertTimestampToRelativeTime(item.timestamp)}
            content={item.content}
            isTouchable={true}
        />
    );
    const renderFooter = () => {
        return loading ? <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="lightgrey" /> : null;
    };

    const handleNavigationBack = () => {
        navigation.navigate("Feed");
    }

    const handleNavigationModifyScreen = () => {
        navigation.navigate("Modify");
    }

    return (
        <View style={PROFILE_SCREEN_STYLESHEET.container}>
            <ImageBackground
                source={userData.profile_picture ? { uri: userData.profile_picture } : require('../../../../assets/anonyme_profile.jpg')}
                blurRadius={15}
            >
                {/* Icon */}
                <TouchableOpacity onPress={handleNavigationBack}>
                    <AwesomeIcon name="angle-left" size={40} color="white" style={PROFILE_SCREEN_STYLESHEET.backIcon} />
                </TouchableOpacity>

                <View style={{ alignItems: "center" }}>
                    <View style={PROFILE_SCREEN_STYLESHEET.topSection}>
                        {/* Profile picture */}
                        <View style={PROFILE_SCREEN_STYLESHEET.profile_picture}>
                            <Avatar
                                size={100}
                                rounded
                                source={userData.profile_picture ? { uri: userData.profile_picture } : require('../../../../assets/anonyme_profile.jpg')}
                            />
                        </View>

                        {/* Username */}
                        <Text style={PROFILE_SCREEN_STYLESHEET.username}>{userData.name}</Text>

                        {/* Modify button */}
                        <TouchableOpacity onPress={handleNavigationModifyScreen} style={PROFILE_SCREEN_STYLESHEET.modify_button}>
                            <Text style={PROFILE_SCREEN_STYLESHEET.button_text}>Modifiy</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ImageBackground>

            <View style={PROFILE_SCREEN_STYLESHEET.bottom_section}>
                {/* Publications sections */}
                <View style={PROFILE_SCREEN_STYLESHEET.bottom_header}>
                    <View style={PROFILE_SCREEN_STYLESHEET.publication_title_header_underline}>
                        <Text style={PROFILE_SCREEN_STYLESHEET.publication_title_header_text}>Publications</Text>
                    </View>
                </View>

                {/* Publications feed */}
                <View style={{ paddingBottom: "10%" }}>
                    <FlatList
                        data={userPosts}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        onEndReached={loadMoreData}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={renderFooter}
                    />
                </View>
            </View>

        </View>
    )
}

export default ProfileScreen