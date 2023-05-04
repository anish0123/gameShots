import {View} from 'react-native';
import PropTypes from 'prop-types';
import List from '../components/List';

const Home = ({navigation}) => {
  return (
    <View style={{backgroundColor: '#000000'}}>
      <List navigation={navigation} />
    </View>
  );
};
Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
