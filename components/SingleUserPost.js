import {Card} from '@rneui/themed';
import PropTypes from 'prop-types';
import {Dimensions, View} from 'react-native';
import {uploadsUrl} from '../utils/Variables';

const SingleUserPost = ({navigation, item}) => {
  return (
    <View>
      {item.media_type === 'image' ? (
        <Card.Image
          source={{uri: uploadsUrl + item.thumbnails?.w640}}
          style={{
            margin: 2,
            width: Dimensions.get('screen').width / 2 - 2,
            height: Dimensions.get('screen').width / 2 - 2,
          }}
        />
      ) : (
        <Card.Image
          source={{uri: uploadsUrl + item.screenshot}}
          style={{
            margin: 2,
            width: Dimensions.get('screen').width / 2 - 2,
            height: Dimensions.get('screen').width / 2 - 2,
          }}
        />
      )}
    </View>
  );
};

SingleUserPost.propTypes = {
  navigation: PropTypes.object,
  item: PropTypes.object,
};

export default SingleUserPost;
