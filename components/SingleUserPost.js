import {Card} from '@rneui/themed';
import PropTypes from 'prop-types';
import {Dimensions, View} from 'react-native';
import {uploadsUrl} from '../utils/Variables';

// THis component displays the file uploaded by the user
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
          onPress={() => navigation.navigate('Single', item)}
        />
      ) : (
        <Card.Image
          source={{uri: uploadsUrl + item.screenshot}}
          style={{
            margin: 2,
            width: Dimensions.get('screen').width / 2 - 2,
            height: Dimensions.get('screen').width / 2 - 2,
          }}
          onPress={() => navigation.navigate('Single', item)}
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
