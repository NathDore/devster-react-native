import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatListScreen from "../screens/chat/chat_list_screen/ChatListScreen.jsx";
import FeedScreen from "../screens/feed/feed_screen/FeedScreen.jsx";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ModalProvider from "../context/ModalProvider.jsx";
import VisitPost from "../components/post/visit_post/VisitPost.jsx";
import VisitProfile from "../screens/profile/visit_profile_screen/VisitProfile.jsx";
import ContactScreen from "../screens/contact/contact_screen/ContactScreen.jsx";

const Tab = createBottomTabNavigator();

export default function AppStack() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: 50,
                backgroundColor: "black",
                borderTopWidth: 0.2,
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
                            <FontAwesome5Icon name="poll-h" color={"lightgrey"} size={25} />
                        ),
                    }}
                >
                    {() => (
                        <ModalProvider>
                            <FeedScreen />
                        </ModalProvider>
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name="Contact"
                    component={ContactScreen}
                    options={{
                        tabBarIcon: () => (
                            <FontAwesome5Icon name="user-friends" size={25} color={"lightgrey"} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Chat"
                    component={ChatListScreen}
                    options={
                        {
                            tabBarIcon: () => (
                                <AwesomeIcon name="comment" color={"lightgrey"} size={25} />
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
                    component={VisitPost}
                    options={{ tabBarButton: () => null }}
                />
            </Tab.Group>

        </Tab.Navigator>
    );
}