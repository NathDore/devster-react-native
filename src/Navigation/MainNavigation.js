import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './AppNavigation';
import { useAuthContext } from '../context/AuthProvider';
import Landing from '../UI/landing/Landing';
import LoginScreen from '../UI/login/LoginScreen';
import RegisterScreen from "../UI/register/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
    const { user } = useAuthContext();

    return (
        <NavigationContainer initialRouteName="Home">
            {/* Header */}

            <Stack.Navigator screenOptions={{ headerShown: false }}>

                {/* Landing */}
                <Stack.Screen name="Home" component={user ? AppStack : Landing} />

                {/* Authentification */}
                <Stack.Group>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    );
}