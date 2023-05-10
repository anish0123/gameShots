import {Card, Divider} from '@rneui/themed';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Owner from './Owner';

// This component displays the details of the user that is in the likeduser list
const SingleUser = ({SingleUser, navigation}) => {
  console.log('singleUser: ', SingleUser.item);
  const item = SingleUser.item;
  return (
    <View>
      <Owner item={item} navigation={navigation} />
      <Divider
        style={{
          margin: 0,
          padding: 0,
          width: '100%',
          backgroundColor: '#ffffff',
        }}
      />
    </View>
  );
};

SingleUser.propTypes = {
  SingleUser: PropTypes.object,
  navigation: PropTypes.object,
};

export default SingleUser;
