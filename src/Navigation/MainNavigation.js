import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './AppNavigation';
import { useAuthContext } from '../context/AuthProvider';
import LandingScreen from '../screens/home/landing_screen/LandingScreen';
import LoginScreen from '../screens/home/login_screen/LoginScreen';
import RegisterScreen from '../screens/home/register_screen/RegisterScreen';
import ChatScreen from '../screens/chat/chat_screen/ChatScreen';
import ProfileScreen from '../screens/profile/profile_screen/ProfileScreen';
import ModifyScreen from '../screens/profile/modify_screen/ModifyScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    const { user } = useAuthContext();

    return (
        <NavigationContainer initialRouteName="Home">
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                {/* Landing */}
                <Stack.Screen name="Home" component={user ? AppStack : LandingScreen} />

                {/* Authentification */}
                <Stack.Group>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Group>

                {/* Chat Screen */}
                <Stack.Group>
                    <Stack.Screen name="ChatScreen" component={ChatScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Modify" component={ModifyScreen} />
                </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    );
}