import {SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import List from '../components/List';
import Header from '../components/Header';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <Header navigation={navigation} />
      <List navigation={navigation} />
    </SafeAreaView>
  );
};
Home.propTypes = {
  navigation: PropTypes.object,
};


export default Home;
