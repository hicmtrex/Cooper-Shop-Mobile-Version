import { LogBox, StyleSheet, Text, View } from 'react-native';
import Navigation from './navigators/navigation';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import ContextProvider from './context/context-provider';
import { Provider } from 'react-redux';
import store from './store/store';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs(true);

function App() {
  return (
    <Provider store={store}>
      <ContextProvider>
        <View style={styles.container}>
          <Navigation />
          <Toast ref={(ref) => Toast.setRef(ref)} />
          <ExpoStatusBar style='auto' />
        </View>
      </ContextProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
