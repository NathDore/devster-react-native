import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../Features/Auth/screen/LandingScreen';
import HeaderUI from '../UI/Header/HeaderUI';
import AppStack from './AppNavigation';
import { useAuthContext } from '../context/AuthProvider';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    const { isUserLoggedIn } = useAuthContext();

    return (
        <NavigationContainer initialRouteName="Home">
            {/* Header */}
            <HeaderUI />

            <Stack.Navigator screenOptions={{ headerShown: false }}>

                {/* Landing */}
                <Stack.Screen name="Home" component={isUserLoggedIn ? AppStack : LandingScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}