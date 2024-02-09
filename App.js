import 'expo-dev-client';
import AuthProvider from './src/context/AuthProvider';
import MainStack from './src/Navigation/MainNavigation';
import Landing from './src/UI/landing/Landing';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <AuthProvider>
        <MainStack />
      </AuthProvider>
    </>

  );
}