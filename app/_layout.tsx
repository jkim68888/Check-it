import { TodoProvider } from '@/providers/TodoProvider';
import { Stack } from 'expo-router';
import 'react-native-reanimated';


export default function RootLayout() {
  return (
    <TodoProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TodoProvider>
  );
}
