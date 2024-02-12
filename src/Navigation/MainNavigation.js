import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './AppNavigation';
import { useAuthContext } from '../context/AuthProvider';
import Landing from '../UI/landing/Landing';
import LoginScreen from '../UI/login/LoginScreen';
import RegisterScreen from "../UI/register/RegisterScreen";
import HeaderUI from '../UI/Header/HeaderUI';
import ChatScreen from '../Features/App/Chat/Screens/chat_screen/ChatScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    const { user, isHeaderShowing } = useAuthContext();

    return (
        <NavigationContainer initialRouteName="Home">
            {/* Header */}
            {
                user && isHeaderShowing && <HeaderUI />
            }

            <Stack.Navigator screenOptions={{ headerShown: false }}>

                {/* Landing */}
                <Stack.Screen name="Home" component={user ? AppStack : Landing} />

                {/* Authentification */}
                <Stack.Group>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Group>

                {/* Chat Screen */}
                <Stack.Group>
                    <Stack.Screen name="ChatScreen" component={ChatScreen} />
                </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    );
}