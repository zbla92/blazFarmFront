import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../components/Button';
import NavigationBar from '../components/NavigationBar';

import Screen from '../components/Screen';
import { addUserService } from '../utils/services';

const AddUser = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName('');
    setAddress('');
    setEmail('');
    setPhone('');
  };

  const addUser = async () => {
    try {
      setLoading(true);
      const response = await addUserService({ name, address, email, phone });
      console.log(response);
      setLoading(false);
      resetForm();
    } catch (e) {
      setError(e);
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <Screen withKeyboard>
      <NavigationBar />
      <Text style={styles.text}>Dodaj korisnika</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.content}>
        <Text style={styles.label}>Ime</Text>
        <TextInput style={styles.input} value={name} onChangeText={v => setName(v)} placeholder="Ime" />
        <Text style={styles.label}>Adresa</Text>
        <TextInput style={styles.input} value={address} onChangeText={v => setAddress(v)} placeholder="Adresa" />
        <Text style={styles.label}>Broj telefona</Text>
        <TextInput style={styles.input} value={phone} onChangeText={v => setPhone(v)} placeholder="Broj telefona" />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={v => setEmail(v)} placeholder="Email" />
        <View style={styles.actionButton}>
          <Button label="Dodaj" onPress={addUser} isLoading={loading} />
        </View>
      </View>
    </Screen>
  );
};

export default AddUser;

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
    width: '90%',
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    width: '90%',
  },
  actionButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
  },
  error: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '90%',
  },
});
