import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Screen from '../components/Screen';
import SearchInput from '../components/SearchInput';
import { colors } from '../theme';
import { useUsers } from '../utils/services';

const UserItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.item} onPress={() => navigation.navigate('NEW_ORDER', { user: item })}>
      <View>
        <View style={styles.itemElement}>
          <Text style={styles.itemLabel}>Ime:</Text>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
        <View style={styles.itemElement}>
          <Text style={styles.itemLabel}>Adresa:</Text>
          <Text numberOfLines={1} style={styles.itemText}>
            {item.address}
          </Text>
        </View>
        <View style={styles.itemElement}>
          <Text style={styles.itemLabel}>Phone:</Text>
          <Text style={styles.itemText}>{item.phone}</Text>
        </View>
      </View>
      <Pressable
        style={styles.itemElement}
        onPress={() => {
          Linking.openURL(`https://www.google.com/search?${'q=' + item.address}`);
        }}>
        <Text style={{ color: colors.primary, fontWeight: '500' }}>Vozi</Text>
      </Pressable>
    </Pressable>
  );
};

const UserSelect = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const { data: users } = useUsers();

  console.log(users);

  return (
    <Screen noPadding>
      <View style={{ marginHorizontal: 16 }}>
        <NavigationBar />
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <SearchInput set={setSearch} />
      </View>
      {users?.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.list}
          data={users}
          renderItem={({ item }) => <UserItem item={item} />}
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <ActivityIndicator />
      )}
    </Screen>
  );
};

export default UserSelect;

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
});
