import { TodoProvider } from '@/providers/TodoProvider';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar 
        backgroundColor="#EBEBEB"        
        translucent={true}              
      />
      <TodoProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </TodoProvider>
    </SafeAreaProvider>
  );
}
