import {Avatar, Text} from '@rneui/themed';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/Variables';

const SingleSearch = ({navigation, singleItem}) => {
  const item = singleItem.item;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        borderWidth: 1,
        borderColor: '#FF5733',
        margin: 10,
        backgroundColor: '#ffffff',
      }}
    >
      <Avatar
        source={{uri: uploadsUrl + item.thumbnails?.w160}}
        size="large"
        containerStyle={{
          margin: 0,
          paddingRight: 20,
          paddingTop: 0,
        }}
      />
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.title}</Text>
        <Text numberOfLines={2}>{item.description}</Text>
      </View>
    </View>
  );
};

SingleSearch.propTypes = {
  singleItem: PropTypes.object,
  navigation: PropTypes.object,
};

export default SingleSearch;
