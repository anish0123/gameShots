import {StyleSheet, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <MainProvider>
      <View style={styles.container}>
        <Navigator style={{backgroundColor: '#000'}} />
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
