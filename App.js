import 'expo-dev-client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './src/Features/Auth/Screens/LandingScreen/LandingScreen';
import HeaderUI from './src/UI/Header/HeaderUI';
import AuthProvider from './src/context/AuthProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer initialRouteName="Home">
        {/* Header */}
        <HeaderUI />

        <Stack.Navigator screenOptions={{ headerShown: false }}>

          {/* Landing */}
          <Stack.Screen name="Home" component={LandingScreen} />

          {/* App Group */}
          <Stack.Group>

          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>

  );
}