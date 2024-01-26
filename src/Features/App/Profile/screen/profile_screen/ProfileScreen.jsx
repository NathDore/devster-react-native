import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Avatar } from 'react-native-elements';
import { getRandomUser } from '../../../../../data/randomDataGeneration';
import { generateRandomTimestamp } from '../../../../../data/randomDataGeneration';
import { convertTimestampToRelativeTime } from '../../../../../data/randomDataGeneration';
import PostCard from '../../../Feed/components/post_card/PostCard';

const ProfileScreen = () => {
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


    return (
        <View style={{
            flex: 1,
            backgroundColor: "#202124",
        }}>
            <ImageBackground
                source={require('../../../../../../assets/profile-image.jpg')}
                style={{}}
                blurRadius={15}
            >
                {/* Icon */}
                <TouchableOpacity>
                    <AwesomeIcon name="angle-left" size={30} color="white" style={{ marginVertical: "2%", marginHorizontal: "5%" }} />
                </TouchableOpacity>

                <View style={{ alignItems: "center" }}>
                    <View style={{ justifyContent: "flex-start", width: "30%", alignItems: "center" }}>
                        {/* Profile picture */}
                        <View style={{ marginTop: "5%", marginBottom: "2%" }}>
                            <Avatar
                                size={100}
                                rounded
                                source={require("../../../../../../assets/profile-image.jpg")}
                            />
                        </View>

                        {/* Modify button */}
                        <TouchableOpacity style={{ borderWidth: 1, elevation: 1, backgroundColor: "black", width: 90, borderColor: "white", borderRadius: 20, justifyContent: "center", alignItems: "center", padding: "5%", marginTop: "5%" }}>
                            <Text style={{ color: "white" }}>Modifiy</Text>
                        </TouchableOpacity>

                        {/* Username */}
                        <Text style={{ marginVertical: "5%", fontSize: 25, fontWeight: "bold", color: "white" }}>Mickey05</Text>
                    </View>
                </View>
            </ImageBackground>

            <View style={{ flex: 1, backgroundColor: "#00000080", borderTopWidth: 0.5, borderColor: "lightgrey" }}>
                {/* Publications sections */}
                <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", height: 40, backgroundColor: "rgba(8, 8, 8, 0.91)", paddingStart: "5%" }}>
                    <View style={{ borderBottomWidth: 1, borderColor: "lightblue" }}>
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "400" }}>Publications</Text>
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