import {StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import LoginForm from './components/LoginForm';
import { MainProvider } from './contexts/MainContext';

const App = () => {
  return (
    <MainProvider>
      <View style={styles.container}>
        <LoginForm />
      </View>
      <StatusBar style="auto" />
    </MainProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
});

export default App;
