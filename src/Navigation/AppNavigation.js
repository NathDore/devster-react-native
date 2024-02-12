import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatListScreen from "../Features/App/Chat/Screens/chat_list_screen/ChatListScreen";
import FeedScreen from "../Features/App/Feed/screen/FeedScreen";
import ProfileScreen from "../Features/App/Profile/screen/profile_screen/ProfileScreen";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ModalProvider from "../context/ModalProvider";
import ModifyScreen from "../Features/App/Profile/screen/modify_screen/ModifyScreen";
import VisitPost from "../Features/App/Feed/Post/visit_post/VisitPost";
import VisitProfile from "../Features/App/Profile/screen/visit_profile/VisitProfile";
import ChatScreen from "../Features/App/Chat/Screens/chat_screen/ChatScreen";
import ContactScreen from "../Features/App/contact/screen/ContactScreen.jsx";

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
                    name="Profile"
                    component={ProfileScreen}
                    options={{ tabBarButton: () => null }}
                />

                <Tab.Screen
                    name="Modify"
                    component={ModifyScreen}
                    options={{ tabBarButton: () => null }}
                />
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