import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

// npm i native-base
import { Card, CardItem, Container, H1 } from 'native-base';

const UserCard = ({ user }) => (
  <View style={{ flexDirection: 'row' }}>
    <Image
      style={{ width: 90, height: 90, borderRadius: 100 }}
      source={{ uri: user.img }}
    />
    <View style={{ justifyContent: 'center', marginLeft: 10 }}>
      <Text style={styles.nameText}>{user.name}</Text>

      <Text style={styles.phoneText}>
        <Icon name='phone' size={16} /> {user.phone}
      </Text>

      <Text style={styles.emailText}>
        <Icon name='mail' size={16} /> {user.email}
      </Text>
    </View>
  </View>
);

export default function UsersList() {
  const [users] = useState([
    {
      name: 'Morris Flores',
      img: 'https://randomuser.me/api/portraits/men/6.jpg',
      phone: '(814)-659-2120',
      email: 'morris.flores@example.com',
    },
    {
      name: 'Isabella Silva',
      img: 'https://randomuser.me/api/portraits/women/11.jpg',
      phone: '(452)-564-7895',
      email: 'isabella.silva@example.com',
    },
    {
      name: 'Madison Shaw',
      img: 'https://randomuser.me/api/portraits/women/40.jpg',
      phone: '(049)-352-4187',
      email: 'madison.shaw@example.com',
    },
    {
      name: 'Derrick Sims',
      img: 'https://randomuser.me/api/portraits/men/89.jpg',
      phone: '(248)-242-5309',
      email: 'derrick.sims@example.com',
    },
    {
      name: 'Michele Hayes',
      img: 'https://randomuser.me/api/portraits/women/10.jpg',
      phone: '(421)-412-5536',
      email: 'michele.hayes@example.com',
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const category = ['gaming', 'noobs'];
  return (
    <Container style={{ marginTop: 50 }}>
      <ScrollView
        style={{ paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <H1 style={{ textAlign: 'center' }}>Users List</H1>
        {users.map((user) => (
          <TouchableOpacity>
            <Card style={{ marginTop: 10 }}>
              <CardItem>
                <UserCard user={user} />
              </CardItem>
            </Card>
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }}></View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  phoneText: {
    fontSize: 16,
    marginTop: 4,
  },
  emailText: {
    fontSize: 12,
    marginTop: 2,
  },
});
