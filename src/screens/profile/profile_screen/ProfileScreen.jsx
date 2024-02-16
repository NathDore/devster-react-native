import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Avatar } from 'react-native-elements';
import { convertTimestampToRelativeTime } from '../../../util/util-function';
import PostCard from '../../../components/post/post_card/PostCard';
import { PROFILE_SCREEN_STYLESHEET } from './style';
import { useAuthContext } from '../../../context/AuthProvider';
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import NotFound from '../../../UI/not_found/NotFound';

const ProfileScreen = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);

    const [isFlatListLoading, setIsFlatListLoading] = useState(false);
    const [isScreenLoading, setIsScreenLoading] = useState(true);

    const { userData, user, signOut } = useAuthContext();
    const navigation = useNavigation();

    const loadInitialData = () => {

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
            .finally(() => setIsScreenLoading(false));
    }

    const loadMoreData = () => {
        if (isFlatListLoading || !lastVisible || isScreenLoading) return;

        setIsFlatListLoading(true);

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
            .finally(() => setIsFlatListLoading(false));
    }

    useFocusEffect(useCallback(() => {
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
        return isFlatListLoading ? <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="lightgrey" /> : null;
    };

    const handleNavigationBack = () => {
        navigation.navigate("Feed");
    }

    const handleNavigationModifyScreen = () => {
        navigation.navigate("Modify");
    }

    const handleSignOut = () => {
        signOut();
        navigation.navigate("Goodbye");
    }

    return (
        <View style={PROFILE_SCREEN_STYLESHEET.container}>
            {
                isScreenLoading ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={80} color="lightgrey" />
                    </View> :
                    <>
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
                                    <View style={{ alignItems: "center", maxWidth: "90%" }}>
                                        <Text style={PROFILE_SCREEN_STYLESHEET.username}>{userData.name}</Text>
                                    </View>

                                    {/* Modify button */}
                                    <TouchableOpacity onPress={handleNavigationModifyScreen} style={PROFILE_SCREEN_STYLESHEET.modify_button}>
                                        <Text style={PROFILE_SCREEN_STYLESHEET.button_text}>Modifiy</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </ImageBackground>

                        <View style={PROFILE_SCREEN_STYLESHEET.bottom_section}>
                            {/* Publications Header */}
                            <View style={PROFILE_SCREEN_STYLESHEET.bottom_header}>
                                <View style={PROFILE_SCREEN_STYLESHEET.publication_title_header_underline}>
                                    <Text style={PROFILE_SCREEN_STYLESHEET.publication_title_header_text}>My Publications</Text>
                                </View>
                            </View>

                            {/* Publications feed */}
                            <View style={{ paddingBottom: "10%", flex: 1 }}>
                                {
                                    userPosts.length == 0 ?
                                        <>
                                            <NotFound subject="publication" />
                                        </>
                                        :
                                        <>
                                            <FlatList
                                                data={userPosts}
                                                renderItem={renderItem}
                                                keyExtractor={(item) => item.id}
                                                onEndReached={loadMoreData}
                                                onEndReachedThreshold={0.1}
                                                ListFooterComponent={renderFooter}
                                            />
                                        </>
                                }
                            </View>

                            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", padding: "3%" }}>
                                <TouchableOpacity onPress={handleSignOut} style={{ padding: "3%", backgroundColor: "red", borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "white", fontSize: 18 }}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </>
            }
        </View>
    )
}

export default ProfileScreen