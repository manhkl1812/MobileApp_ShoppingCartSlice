import { useRouter } from 'expo-router'; // <-- Thêm import này
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { decrement, increment } from '../store/counterSlice';

export default function CounterScreen() {
  const dispatch = useDispatch();
  const router = useRouter(); // <-- Khởi tạo router
  const counter = useSelector((state: RootState) => state.counter.value);

  return (
    <View style={styles.box}>
      <Text style={styles.text}>{counter}</Text>
      
      <TouchableOpacity style={styles.btn} onPress={() => dispatch(increment())}>
        <Text style={styles.btnText}>Tăng</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.btn} onPress={() => dispatch(decrement())}>
        <Text style={styles.btnText}>Giảm</Text>
      </TouchableOpacity>

      {/* Nút quay lại trang Giỏ Hàng */}
      <TouchableOpacity style={[styles.btn, { marginTop: 40, borderColor: '#FF3B30' }]} onPress={() => router.back()}>
        <Text style={[styles.btnText, { color: '#FF3B30' }]}>Quay lại Giỏ Hàng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 50, fontWeight: 'bold', marginBottom: 30 },
  btn: { paddingVertical: 10, paddingHorizontal: 20, borderWidth: 1, borderColor: '#007AFF', borderRadius: 8, marginBottom: 15 },
  btnText: { fontSize: 18, color: '#007AFF', fontWeight: '600' },
});