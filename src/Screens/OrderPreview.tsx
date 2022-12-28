import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { useQueryClient } from '@tanstack/react-query';
import NavigationBar from '../components/NavigationBar';
import Screen from '../components/Screen';
import { updateOrdersService } from '../utils/services';

const OrderPreview = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const order = route?.params?.order;

  const queryClient = useQueryClient();

  const changeOrderStatus = async status => {
    try {
      setLoading(true);
      const response = await updateOrdersService({ orderId: order?.id, status });
      console.log(response);
      setLoading(false);
      navigation.navigate('ORDERS_PREVIEW');
      queryClient.invalidateQueries('orders');
    } catch (e) {
      console.log(e);
    }
  };

  const createdAt = new Date(order?.createdAt).toLocaleString();

  return (
    <Screen>
      <NavigationBar title="Narudzba" />
      <View style={styles.container}>
        <View style={styles.element}>
          <Text style={styles.label}>ID Narudzbe: </Text>
          <Text style={styles.value}>{order?.id}</Text>
        </View>
        <View style={styles.element}>
          <Text style={styles.label}>Ime</Text>
          <Text style={styles.value}>{order?.user?.name}</Text>
        </View>
        <View style={styles.element}>
          <Text style={styles.label}>Proizvod</Text>
          <Text style={styles.value}>{order?.product?.name}</Text>
        </View>
        <View style={styles.element}>
          <Text style={styles.label}>Kolicina</Text>
          <Text style={styles.value}>{order?.quantity}</Text>
        </View>
        <View style={styles.element}>
          <Text style={styles.label}>Cijena</Text>
          <Text style={styles.value}>{order?.product?.price * order?.quantity}</Text>
        </View>
        <View style={styles.element}>
          <Text style={styles.label}>Adresa</Text>
          <Text style={styles.value}>{order?.user?.address}</Text>
        </View>
        <View style={styles.element}>
          <Text style={styles.label}>Telefon</Text>
          <Text style={styles.value}>{order?.user?.phone}</Text>
        </View>
        <View style={styles.element}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{order?.status}</Text>
        </View>
        <View style={styles.element}>
          <Text style={styles.label}>Primljena:</Text>
          <Text style={styles.value}>{createdAt}</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Button
            label="Zavrsi"
            onPress={() => {
              changeOrderStatus('CONFIRMED');
            }}
          />
          <View style={{ marginBottom: 10 }} />
          <Button
            label="Odbij"
            variant="secondary"
            onPress={() => {
              changeOrderStatus('CANCELLED');
            }}
          />
        </View>
      </View>
    </Screen>
  );
};

export default OrderPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  value: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  element: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
