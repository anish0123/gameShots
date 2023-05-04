import {View} from 'react-native';
import PropTypes from 'prop-types';
import List from '../components/List';

const Home = ({navigation}) => {
  return (
    <View style={{backgroundColor: '#ffffff'}}>
      <List navigation={navigation} />
    </View>
  );
};
Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
