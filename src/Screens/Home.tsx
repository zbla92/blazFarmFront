import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';

import { Screen } from '../components/Screen';

export const Home = ({ navigation }) => {
  console.log(navigation);

  return (
    <Screen>
      <Text style={styles.text}>Glavni meni</Text>
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('ORDERS_PREVIEW')}>
          <Text style={styles.buttonText}>Pregled</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('NEW_ORDER')}>
          <Text style={styles.buttonText}>Nova Narudzba</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Izmjeni Narudzbu</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('ADD_USER')}>
          <Text style={styles.buttonText}>Dodaj Musteriju</Text>
        </Pressable>
      </View>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#1E91FF',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
