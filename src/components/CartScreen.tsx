import { addToCart, clearCart, removeFromCart, updateQuantity } from '@/store/cardSlice';
import { useRouter } from 'expo-router'; // <-- Thêm import này
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

const PRODUCTS = [
  { id: 1, name: 'Laptop Dell XPS', price: 1200 },
  { id: 2, name: 'Mouse Logitech', price: 45 },
  { id: 3, name: 'Keyboard Mechanical', price: 120 },
  { id: 4, name: 'Monitor LG 27"', price: 350 },
  { id: 5, name: 'USB Cable', price: 15 },
];

export default function CartScreen() {
  const dispatch = useDispatch();
  const router = useRouter(); // <-- Khởi tạo router
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleAddProduct = () => {
    const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    dispatch(addToCart(randomProduct));
  };

  const handleRemoveProduct = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ Hàng</Text>

      {/* Nút chuyển sang Counter */}
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('/counter')}>
        <Text style={styles.navButtonText}>Chuyển sang Bộ Đếm (Counter)</Text>
      </TouchableOpacity>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.qtyButton} onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity style={styles.qtyButton} onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveProduct(item.id)}>
              <Text style={styles.deleteText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Giỏ hàng đang trống</Text>}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Thêm Sản Phẩm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={() => dispatch(clearCart())}>
          <Text style={styles.buttonText}>Xóa Giỏ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Tổng: ${totalPrice}</Text>
      </View>
    </View>
  );
}

// Giữ nguyên styles cũ, thêm style cho nút chuyển trang
export const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20, backgroundColor: '#FFFFFF' },
  title: { fontSize: 22, fontWeight: '700', color: '#111', marginBottom: 20 },
  navButton: { backgroundColor: '#e0f7fa', padding: 10, borderRadius: 6, marginBottom: 15, alignItems: 'center' },
  navButtonText: { color: '#006064', fontWeight: 'bold' },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  itemInfo: { flex: 2 },
  itemName: { fontSize: 15, fontWeight: '500', color: '#222' },
  itemPrice: { color: '#666', marginTop: 2, fontSize: 13 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', flex: 1.5, justifyContent: 'center' },
  qtyButton: { width: 26, height: 26, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#CCC', borderRadius: 4 },
  qtyText: { fontSize: 14, color: '#333' },
  quantityText: { marginHorizontal: 10, fontSize: 14, fontWeight: '500' },
  deleteButton: { padding: 6 },
  deleteText: { color: '#FF3B30', fontSize: 13, fontWeight: '500' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 15 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  addButton: { backgroundColor: '#f0f0f0', padding: 12, borderRadius: 6, flex: 1, marginRight: 8, alignItems: 'center' },
  clearButton: { backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 6, flex: 1, marginLeft: 8, alignItems: 'center' },
  buttonText: { color: '#000', fontWeight: '600', fontSize: 14 },
  totalBox: { paddingVertical: 15, borderTopWidth: 1, borderTopColor: '#EEEEEE', alignItems: 'flex-end', marginBottom: 30 },
  totalText: { fontSize: 16, fontWeight: '600', color: '#111' },
});