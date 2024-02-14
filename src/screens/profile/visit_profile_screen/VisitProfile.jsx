import { View, Text, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { VISIT_PROFILE_STYLESHEET } from './style';
import { useAuthContext } from '../../../context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import firestore from "@react-native-firebase/firestore";
import PostCard from '../../../components/post/post_card/PostCard';
import { convertTimestampToRelativeTime } from '../../../util/util-function';
import ProfileScreen from '../profile_screen/ProfileScreen';

const VisitProfile = ({ route, navigation }) => {
    const { userDoc } = route.params;
    const { name, profile_picture } = userDoc;
    const { user } = useAuthContext();

    const [posts, setPosts] = useState();
    const [lastVisible, setLastVisible] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGoBackNavigation = () => {
        navigation.goBack();
    }

    const addContact = () => {

    }

    const sendMessage = () => {
        navigation.navigate("ChatScreen", {
            userDoc
        })
    }

    const loadInitialData = () => {
        setIsLoading(true);

        firestore()
            .collection("posts")
            .where('userId', '==', userDoc.id)
            .orderBy('timestamp', 'desc')
            .limit(5)
            .get()
            .then((querySnapshot) => {
                const postData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))

                setPosts(postData);
                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
            })
            .catch((error) => console.error("Error while loading initial data", error))
            .finally(() => setIsLoading(false));
    }

    const loadMoreData = () => {
        if (isLoading || !lastVisible) return;
        setIsLoading(true);

        firestore()
            .collection("posts")
            .where('userId', '==', userDoc.id)
            .orderBy('timestamp', 'desc')
            .limit(5)
            .startAfter(lastVisible)
            .get()
            .then((querySnapshot) => {
                const postData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setPosts(prev => [...prev, ...postData]);
                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
            })
            .catch(error => console.error("Error while loading more data", error))
            .finally(() => setIsLoading(false));
    };

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribre = loadInitialData();

            return () => {
                if (unsubscribre) {
                    unsubscribre()
                };
            }

        }, [userDoc.id, user.uid, navigation])
    )

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
        return isLoading ? <ActivityIndicator style={{ marginVertical: 10 }} size="large" color="lightgrey" /> : null;
    };

    return (
        userDoc.id == user.uid ? <ProfileScreen /> :
            <View style={VISIT_PROFILE_STYLESHEET.container}>

                <ImageBackground
                    source={profile_picture ? { uri: profile_picture } : require('../../../../assets/anonyme_profile.jpg')}
                    blurRadius={30}
                >
                    {/* Navigation Banner */}
                    <View style={VISIT_PROFILE_STYLESHEET.navigation_banner}>

                        {/* Go back icon */}
                        <TouchableOpacity onPress={handleGoBackNavigation} style={VISIT_PROFILE_STYLESHEET.go_back_icon}>
                            <FontAwesome name="angle-left" size={40} color="lightgrey" />
                        </TouchableOpacity>

                    </View>

                    {/* Header */}
                    <View style={VISIT_PROFILE_STYLESHEET.header}>

                        {/* Info */}
                        <View style={VISIT_PROFILE_STYLESHEET.info_banner}>
                            <View style={VISIT_PROFILE_STYLESHEET.profile_picture}>
                                <Avatar size={70} rounded source={profile_picture ? { uri: profile_picture } : require("../../../../assets/anonyme_profile.jpg")} />
                            </View>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={VISIT_PROFILE_STYLESHEET.name}>{name}</Text>
                        </View>
                    </View>

                    {/* Button container */}
                    <View style={VISIT_PROFILE_STYLESHEET.button_container}>
                        {/* Add contact button */}
                        <TouchableOpacity style={VISIT_PROFILE_STYLESHEET.add_contact_button}>
                            <Text style={VISIT_PROFILE_STYLESHEET.add_contact_button_text}>Add contact</Text>
                        </TouchableOpacity>

                        {/* Send message button */}
                        <TouchableOpacity onPress={sendMessage} style={VISIT_PROFILE_STYLESHEET.send_message_button}>
                            <Text style={VISIT_PROFILE_STYLESHEET.send_message_button_text}>Send Message</Text>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>



                {/* Banner */}
                <View style={VISIT_PROFILE_STYLESHEET.banner}>

                    {/* Flame Icon */}
                    <FontAwesome name="fire" size={20} color="lightgrey" />

                    {/* Section Title */}
                    <View style={VISIT_PROFILE_STYLESHEET.section_title_container}>
                        <Text style={VISIT_PROFILE_STYLESHEET.section_title_text}>POPULAR POST</Text>
                    </View>

                    {/* Chevron Icon */}
                </View>

                {/* Popular post feed */}
                <View style={{
                    flex: 1,
                }}>
                    <FlatList
                        data={posts}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        onEndReached={loadMoreData}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={renderFooter}
                    />
                </View>

            </View>
    )
}

export default VisitProfile