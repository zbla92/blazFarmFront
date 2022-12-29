import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import Button from '../components/Button';
import { ButtonSelect } from '../components/ButtonSelect';
import NavigationBar from '../components/NavigationBar';

import Screen from '../components/Screen';
import { colors } from '../theme';
import { newOrderService, updateOrdersService } from '../utils/services';

const NewOrder = ({ navigation, route }) => {
  const queryClient = useQueryClient();

  const order = route?.params?.order;
  const user = route?.params?.user || order?.user;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [productId, setProductId] = useState('1');
  const [quantity, setQuantity] = useState(null);

  const resetForm = () => {};

  console.log(quantity, 'order');

  const makeOrder = async () => {
    if (!user?.id || !productId || !quantity) {
      setError('Morate popuniti sva polja');
      return;
    }
    try {
      setLoading(true);
      const response = await newOrderService({ userId: `${user?.id}`, productId, quantity });
      console.log(response);
      setLoading(false);
      resetForm();
      queryClient.invalidateQueries('orders');
      navigation.navigate('ORDERS_PREVIEW');
    } catch (e) {
      setError(e);
      setLoading(false);
      console.log(e);
    }
  };

  const editOrder = async () => {
    if (!user?.id || !productId || !quantity) {
      setError('Morate popuniti sva polja');
      return;
    }
    try {
      setLoading(true);
      const response = await updateOrdersService({ userId: `${user?.id}`, productId, quantity, orderId: order?.id });
      console.log(response);
      setLoading(false);
      resetForm();
      queryClient.invalidateQueries('orders');
      navigation.navigate('ORDERS_PREVIEW');
    } catch (e) {
      setError(e);
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    if (order) {
      setProductId(order?.product?.id);
      setQuantity(`${order?.quantity}`);
    }
  }, [order]);

  return (
    <Screen withKeyboard>
      <NavigationBar />
      <Text style={styles.text}>Dodaj Narudzbu</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.content}>
        <Text style={styles.label}>Ime</Text>
        <ButtonSelect label="Ime Musterije" value={user?.name} onPress={() => navigation.navigate('USER_SELECT')} />
        <Text style={styles.label}>Proizvod</Text>
        <View style={styles.productButtonSelections}>
          <Pressable
            style={[styles.productSelector, productId == '1' && styles.active]}
            onPress={() => setProductId('1')}
            disabled={productId === '1'}>
            <Text style={[styles.productSelectorText, productId == '1' && styles.activeText]}>Jaja</Text>
          </Pressable>
          <Pressable
            style={[styles.productSelector, productId == '2' && styles.active]}
            onPress={() => setProductId('2')}
            disabled={productId === '2'}>
            <Text style={[styles.productSelectorText, productId == '2' && styles.activeText]}>Pilici</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Kolicina {productId == '2' && '(kg)'}</Text>
        <TextInput
          style={styles.input}
          onChangeText={v => setQuantity(v)}
          value={quantity}
          defaultValue={quantity}
          placeholder="Kolicina"
          keyboardType="numeric"
        />
        <View style={styles.actionButton}>
          <Button label={order ? 'Edituj' : 'Dodaj'} onPress={order ? editOrder : makeOrder} isLoading={loading} />
        </View>
      </View>
    </Screen>
  );
};

export default NewOrder;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 20,
  },
  input: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '100%',
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    width: '100%',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
  },
  error: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '90%',
  },
  productButtonSelections: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  productSelector: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '45%',
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: colors.primary,
  },
  productSelectorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  activeText: {
    color: 'white',
  },
});
