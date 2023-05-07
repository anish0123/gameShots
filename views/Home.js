import {View} from 'react-native';
import PropTypes from 'prop-types';
import List from '../components/List';
import Lottie from 'lottie-react-native';
import {Text} from '@rneui/themed';

const Home = ({navigation}) => {
  return (
    <View style={{backgroundColor: '#ffffff'}}>
      <View style={{backgroundColor: '#000000', flexDirection: 'row'}}>
        <Lottie
          source={require('../Lottie/gameAnimation.json')}
          autoPlay
          style={{
            marginLeft: '5%',
            padding: 0,
            width: '20%',
            backgroundColor: 'black',
          }}
        />
        <Text
          style={{
            paddingLeft: '10%',
            paddingTop: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#ffffff',
          }}
        >
          Game Shots
        </Text>
      </View>
      <List navigation={navigation} />
    </View>
  );
};
Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
