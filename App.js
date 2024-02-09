import 'expo-dev-client';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthProvider from './src/context/AuthProvider';
import MainStack from './src/Navigation/MainNavigation';
import Landing from './src/UI/landing/Landing';

export default function App() {
  return (
    /*     <AuthProvider>
          <MainStack />
        </AuthProvider> */
    <Landing />
  );
}