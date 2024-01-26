import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Avatar } from 'react-native-elements';
import { getRandomUser } from '../../../../../data/randomDataGeneration';
import { generateRandomTimestamp } from '../../../../../data/randomDataGeneration';
import { convertTimestampToRelativeTime } from '../../../../../data/randomDataGeneration';
import PostCard from '../../../Feed/components/post_card/PostCard';
import { PROFILE_SCREEN_STYLESHEET } from './style';

const ProfileScreen = ({ navigation }) => {
    const [dumData, setDumData] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadMoreData = async () => {
        if (loading) return;
        if (dumData.length > 4) return;

        setLoading(true);

        try {
            const newData = [];

            for (let i = 0; i < 5; i++) {
                const randomUser = await getRandomUser();
                const randomTimestamp = generateRandomTimestamp();

                if (randomUser) {
                    newData.push({ userId: dumData.length + i + 1, timestamp: randomTimestamp, ...randomUser });
                }
            }

            setDumData((prevData) => [...prevData, ...newData]);
        } catch (error) {
            console.error('Error loading more data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMoreData();
    }, [])

    const renderItem = ({ item }) => (
        <PostCard
            profileImg={item.profilePicture.toString()}
            name={item.username}
            timestamps={convertTimestampToRelativeTime(item.timestamp)}
            post={item.post}
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
                source={require('../../../../../../assets/profile-image.jpg')}
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
                                source={require("../../../../../../assets/profile-image.jpg")}
                            />
                        </View>

                        {/* Modify button */}
                        <TouchableOpacity onPress={handleNavigationModifyScreen} style={PROFILE_SCREEN_STYLESHEET.modify_button}>
                            <Text style={PROFILE_SCREEN_STYLESHEET.button_text}>Modifiy</Text>
                        </TouchableOpacity>

                        {/* Username */}
                        <Text style={PROFILE_SCREEN_STYLESHEET.username}>Mickey05</Text>
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
                        data={dumData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.userId.toString()}
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