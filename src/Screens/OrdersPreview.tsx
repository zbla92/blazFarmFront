import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Screen from '../components/Screen';
import SearchInput from '../components/SearchInput';
import { colors } from '../theme';
import { useOrders } from '../utils/services';

const OrderItem = ({ item }) => {
  const navigation = useNavigation();

  const isConfirmed = item?.status === 'CONFIRMED';
  const isCanceled = item?.status === 'CANCELLED';

  return (
    <Pressable
      style={[styles.item, isConfirmed && styles.confirmed, isCanceled && styles.canceled]}
      onPress={() => navigation.navigate('ORDER_PREVIEW', { order: item })}>
      <View>
        <View style={styles.itemElement}>
          <Text style={styles.itemLabel}>Ime:</Text>
          <Text style={styles.itemText}>{item?.user?.name}</Text>
        </View>
        <View style={styles.itemElement}>
          <Text style={styles.itemLabel}>Proizvod:</Text>
          <Text numberOfLines={1} style={styles.itemText}>
            {item?.quantity} {item?.product?.name} ({Math.round(item?.product?.price * item.quantity)} km)
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.itemElement}
        onPress={() => {
          Linking.openURL(`https://www.google.com/search?${'q=' + item?.user?.address}`);
        }}>
        <Text style={{ color: colors.primary, fontWeight: '500' }}>Vozi</Text>
      </Pressable>
    </Pressable>
  );
};

const OrdersPreview = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const { data: orders } = useOrders();

  if (!orders) {
    return null;
  }

  const calculateTotal = () => {
    let total = 0;
    let collected = 0;
    let remaining = 0;
    orders.forEach(order => {
      if (order?.status === 'CANCELLED') {
        return;
      }
      total += order.quantity * order.product.price;
      if (order.status === 'CONFIRMED') {
        collected += order.quantity * order.product.price;
      } else {
        remaining += order.quantity * order.product.price;
      }
    });
    return { total, collected, remaining };
  };

  const { total, collected, remaining } = calculateTotal();

  const filteredOrders = orders.filter(order => {
    if (search) {
      return order?.user?.name?.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  return (
    <Screen noPadding withKeyboard>
      <View style={{ marginHorizontal: 16 }}>
        <NavigationBar title="Pregled narudzbi" />
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <SearchInput set={setSearch} />
      </View>
      {orders?.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.list}
          data={filteredOrders}
          renderItem={({ item }) => <OrderItem item={item} />}
          keyboardShouldPersistTaps="handled"
          ListFooterComponent={
            <View style={{ height: 100 }}>
              <Text>Total: {`${total} KM`}</Text>
              <Text>Prikupljeno: {`${collected} KM`}</Text>
              <Text>Preostalo: {`${remaining} KM`}</Text>
            </View>
          }
        />
      ) : (
        <ActivityIndicator />
      )}
    </Screen>
  );
};

export default OrdersPreview;

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.background,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
  },
  itemElement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    maxWidth: '84%',
  },
  itemLabel: {
    fontSize: 12,
    color: colors.text,
    width: 56,
  },
  list: {
    marginHorizontal: 16,
    paddingHorizontal: -16,
  },
  confirmed: {
    backgroundColor: colors.successBackground,
  },
  canceled: {
    backgroundColor: colors.errorBackground,
  },
});
