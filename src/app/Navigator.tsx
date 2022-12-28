import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import AddUser from '../Screens/AddUser';
import NewOrder from '../Screens/NewOrder';
import UserSelect from '../Screens/UserSeect';
import OrdersPreview from '../Screens/OrdersPreview';
import OrderPreview from '../Screens/OrderPreview';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="HOME" component={Home} />
        <Stack.Screen name="ADD_USER" component={AddUser} />
        <Stack.Screen name="ORDERS_PREVIEW" component={OrdersPreview} />
        <Stack.Screen name="NEW_ORDER" component={NewOrder} />
        <Stack.Screen name="USER_SELECT" component={UserSelect} />
        <Stack.Screen name="ORDER_PREVIEW" component={OrderPreview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
