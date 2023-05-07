import {SafeAreaView, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <MainProvider>
      <SafeAreaView style={styles.container}>
        <Navigator style={{backgroundColor: '#000'}} />
      </SafeAreaView>
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
