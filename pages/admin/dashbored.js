import { H1, Card, CardItem } from 'native-base';
import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Text,
} from 'react-native';

const Dashbored = ({ navigation }) => {
  return (
    <View style={{ marginTop: 50 }}>
      <H1 style={{ textAlign: 'center', marginBottom: 50 }}>Admin Dashbored</H1>
      <TouchableOpacity onPress={() => navigation.navigate('ProductsList')}>
        <Card style={styles.card}>
          <CardItem>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                <Text style={styles.nameText}>Products List</Text>
              </View>
            </View>
          </CardItem>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UsersList')}>
        <Card style={styles.card}>
          <CardItem>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                <Text style={styles.nameText}>Users List</Text>
              </View>
            </View>
          </CardItem>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity>
        <Card style={styles.card}>
          <CardItem>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                <Text style={styles.nameText}>Users List</Text>
              </View>
            </View>
          </CardItem>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity>
        <Card style={styles.card}>
          <CardItem>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center' }}>
                <Text style={styles.nameText}>Add Products</Text>
              </View>
            </View>
          </CardItem>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: 30,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  phoneText: {
    fontSize: 16,
    marginTop: 4,
  },
  emailText: {
    fontSize: 16,
    marginTop: 2,
  },
});

export default Dashbored;
