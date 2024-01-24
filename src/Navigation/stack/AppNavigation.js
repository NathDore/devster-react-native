import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../../Features/App/Screens/ProfileScreen";
import ChatScreen from "../../Features/App/Screens/ChatScreen";
import FeedScreen from "../../Features/App/Screens/FeedScreen";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';


const Tab = createBottomTabNavigator();

export default function AppStack() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "lightgray",
            tabBarStyle: {
                height: 55,
            }
        }}>
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={
                    {
                        tabBarIcon: () => (
                            <FontAwesome5Icon name="poll-h" color={"black"} size={35} />
                        ),
                    }
                }
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={
                    {
                        tabBarIcon: () => (
                            <AwesomeIcon name="user" color={"black"} size={35} />
                        ),
                    }
                }
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={
                    {
                        tabBarIcon: () => (
                            <AwesomeIcon name="comment" color={"black"} size={35} />
                        ),
                    }
                }
            />
        </Tab.Navigator>
    );
}