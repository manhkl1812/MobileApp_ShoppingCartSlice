import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '@/store';
import CartScreen from '@/components/CartScreen';




export default function HomeScreen() {
  return (
    <Provider store={store}>
      <CartScreen />
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  
});
