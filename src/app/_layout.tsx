import { store } from '@/store';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{ title: 'Giỏ Hàng' }} />
        <Stack.Screen name="counter" options={{ title: 'Bộ Đếm' }} />
      </Stack>
    </Provider>
  );
}