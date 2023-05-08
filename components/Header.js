import {Icon} from '@rneui/themed';
import {View, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';
import PropTypes from 'prop-types';

const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Icon
        name="menu"
        onPress={() => navigation.openDrawer()}
        size={32}
        color="#ffffff"
        containerStyle={{marginLeft: 5, marginTop: 15}}
      />
      <Lottie
        source={require('../Lottie/gameAnimation.json')}
        autoPlay
        style={styles.animation}
      />
    </View>
  );
};

Header.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flexDirection: 'row',
  },
  animation: {
    marginLeft: '17%',
    padding: 0,
    width: '25%',
    backgroundColor: 'black',
  },
});

export default Header;
