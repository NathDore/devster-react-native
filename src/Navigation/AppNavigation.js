import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatListScreen from "../screens/chat/chat_list_screen/ChatListScreen.jsx";
import FeedScreen from "../screens/feed/feed_screen/FeedScreen.jsx";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import VisitProfile from "../screens/profile/visit_profile_screen/VisitProfile.jsx";
import ContactScreen from "../screens/contact/contact_screen/ContactScreen.jsx";
import PostScreen from "../screens/post/post_screen/PostScreen.jsx";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

export default function AppStack() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: hp(8.5),
                backgroundColor: "black",
                borderTopWidth: hp(0.07),
                borderTopColor: "lightgrey",
            },
            tabBarActiveTintColor: "lightblue"
        }}>
            {/* Main Screens with icon */}
            <Tab.Group>
                <Tab.Screen
                    name="Feed"
                    options={{
                        tabBarIcon: () => (
                            <FontAwesome5Icon name="poll-h" color={"lightgrey"} size={hp(4)} />
                        ),
                    }}
                >
                    {() => (

                        <FeedScreen />
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name="Contact"
                    component={ContactScreen}
                    options={{
                        tabBarIcon: () => (
                            <FontAwesome5Icon name="user-friends" size={hp(4)} color={"lightgrey"} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Chat"
                    component={ChatListScreen}
                    options={
                        {
                            tabBarIcon: () => (
                                <AwesomeIcon name="comment" color={"lightgrey"} size={hp(4)} />
                            ),
                        }
                    }
                />
            </Tab.Group>

            {/* Profile Screens without icon */}
            <Tab.Group>
                <Tab.Screen
                    name="VisitProfile"
                    component={VisitProfile}
                    options={{ tabBarButton: () => null }}
                />
            </Tab.Group>

            {/* Visit Post Screens without icon */}
            <Tab.Group>
                <Tab.Screen
                    name="VisitPost"
                    component={PostScreen}
                    options={{ tabBarButton: () => null }}
                />
            </Tab.Group>

        </Tab.Navigator>
    );
}