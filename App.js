import 'expo-dev-client';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthProvider from './src/context/AuthProvider';
import MainStack from './src/Navigation/stack/MainNavigation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <MainStack />
    </AuthProvider>

  );
}