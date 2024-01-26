import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatListScreen from "../Features/App/Chat/Screens/ChatListScreen";
import FeedScreen from "../Features/App/Feed/screen/FeedScreen";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ModalProvider from "../context/ModalProvider";

const Tab = createBottomTabNavigator();

export default function AppStack() {
    return (
        <ModalProvider>
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
                    name="Chat"
                    component={ChatListScreen}
                    options={
                        {
                            tabBarIcon: () => (
                                <AwesomeIcon name="comment" color={"black"} size={35} />
                            ),
                        }
                    }
                />
            </Tab.Navigator>
        </ModalProvider>

    );
}