import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { userRegister } from '../../store/actions/usersAction';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.register);
  const { userInfo } = useSelector((state) => state.login);
  const [passError, setPassError] = useState(null);

  useEffect(() => {
    if (userInfo) {
      navigation.navigate('Profile');
    }
  }, [userInfo]);

  const registerHandler = () => {
    if (
      username.trim().length === '' ||
      !email.includes('@') ||
      password.trim().length === ''
    ) {
      setPassError('Invalid input.');
      return;
    }

    if (password !== confirmPassword) {
      setPassError('password not match');
      return;
    }
    dispatch(userRegister(username, email, password));
    if (error) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: error ? error : 'Something went wrong',
      });
    }
    navigation.navigate('Login');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.bigCircle}></View>
          <View style={styles.smallCircle}></View>
          <View style={styles.centerizedView}>
            <View style={styles.authBox}>
              <View style={styles.logoBox}>
                {/* <Icon
                  color='#fff'
                  name='comments'
                  type='font-awesome'
                  size={50}
                /> */}
              </View>
              <Text style={styles.loginTitleText}>Sign up</Text>
              {error && <Text style={styles.error}>{error}</Text>}
              {!error && passError && (
                <Text style={styles.error}>{passError}</Text>
              )}
              <View style={styles.hr}></View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  onChangeText={(text) => setUsername(text)}
                  value={username}
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  placeholder='example'
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  placeholder='example@me.com'
                  textContentType='emailAddress'
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  style={styles.input}
                  autoCapitalize='none'
                  secureTextEntry={true}
                  textContentType='password'
                  placeholder='************'
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  onChangeText={(text) => setConfirmPassword(text)}
                  value={confirmPassword}
                  placeholder='************'
                  style={styles.input}
                  autoCapitalize='none'
                  secureTextEntry={true}
                  textContentType='password'
                />
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={registerHandler}
              >
                <Text style={styles.loginButtonText}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registerText}>
                  Don't have an account?{' '}
                  <Text style={{ color: '#FF6347' }}>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 60, marginTop: 50 }}></View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#FF6347',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#FF6347',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    top: '15%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 100,
    height: 100,
    marginBottom: 10,
    padding: 20,
    backgroundColor: '#FF6347',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#FF6347',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
  error: {
    borderRadius: 10,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
  },
});

export default RegisterScreen;
