import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Avatar } from 'react-native-elements';
import { convertTimestampToRelativeTime } from '../../../../../data/randomDataGeneration';
import PostCard from '../../../Feed/Post/post_card/PostCard';
import { PROFILE_SCREEN_STYLESHEET } from './style';
import { useAuthContext } from '../../../../../context/AuthProvider';
import firestore from "@react-native-firebase/firestore";
import { getUserPosts } from '../../../../../firebase/commun.functions';

const ProfileScreen = ({ navigation }) => {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { userData, user } = useAuthContext();

    const getPublications = () => {
        setUserPosts(getUserPosts(user?.uid));
    }

    useEffect(() => {
        getPublications();
    }, [])

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("posts")
            .where('userId', '==', user.uid)
            .onSnapshot((snapshot) => {
                const postData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUserPosts(postData);
            });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

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
        navigation.goBack();
    }

    const handleNavigationModifyScreen = () => {
        navigation.navigate("Modify");
    }

    return (
        <View style={PROFILE_SCREEN_STYLESHEET.container}>
            <ImageBackground
                source={userData.profile_picture ? { uri: userData.profile_picture } : require('../../../../../../assets/anonyme_profile.jpg')}
                blurRadius={15}
            >
                {/* Icon */}
                <TouchableOpacity onPress={handleNavigationBack}>
                    <AwesomeIcon name="angle-left" size={30} color="white" style={PROFILE_SCREEN_STYLESHEET.backIcon} />
                </TouchableOpacity>

                <View style={{ alignItems: "center" }}>
                    <View style={PROFILE_SCREEN_STYLESHEET.topSection}>
                        {/* Profile picture */}
                        <View style={PROFILE_SCREEN_STYLESHEET.profile_picture}>
                            <Avatar
                                size={100}
                                rounded
                                source={userData.profile_picture ? { uri: userData.profile_picture } : require('../../../../../../assets/anonyme_profile.jpg')}
                            />
                        </View>

                        {/* Modify button */}
                        <TouchableOpacity onPress={handleNavigationModifyScreen} style={PROFILE_SCREEN_STYLESHEET.modify_button}>
                            <Text style={PROFILE_SCREEN_STYLESHEET.button_text}>Modifiy</Text>
                        </TouchableOpacity>

                        {/* Username */}
                        <Text style={PROFILE_SCREEN_STYLESHEET.username}>{userData.name}</Text>
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
                <View>
                    <FlatList
                        data={userPosts}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        //onEndReached={loadMoreData}
                        //onEndReachedThreshold={0.1}
                        ListFooterComponent={renderFooter}
                    />
                </View>
            </View>

        </View>
    )
}

export default ProfileScreen