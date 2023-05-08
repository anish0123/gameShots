import {SafeAreaView, View} from 'react-native';
import PropTypes from 'prop-types';
import List from '../components/List';
import Header from '../components/Header';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#000000'}}>
      <Header navigation={navigation} />
      <View
        style={{
          marginBottom: 125,
          backgroundColor: '#939799',
        }}
      >
        <List navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};
Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
