import {Card, Image, Text} from '@rneui/themed';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/Variables';

const SingleSearch = ({navigation, singleItem}) => {
  const item = singleItem.item;
  console.log('singleSearch: ', item);
  return (
    <Card containerStyle={{flexDirection: 'row'}}>
      <Card.Image
        source={{uri: uploadsUrl + item.thumbnails?.w640, width: '60%'}}
      />
      <Text>{item.title}</Text>
    </Card>
  );
};

SingleSearch.propTypes = {
  singleItem: PropTypes.object,
  navigation: PropTypes.object,
};

export default SingleSearch;
