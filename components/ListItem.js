import {Card, Text} from '@rneui/themed';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/Variables';
import {Video} from 'expo-av';
import {useRef} from 'react';
import {Image, StyleSheet} from 'react-native';

// ListItem component created for displaying list of posts
const ListItem = ({navigation, singleItem}) => {
  const video = useRef(null);
  console.log('description:', singleItem.description.review);
  return (
    <Card>
      <Text>{singleItem.title}</Text>
      <Text>{singleItem.description}</Text>
      {singleItem.media_type === 'image' ? (
        <Image
          source={{uri: uploadsUrl + singleItem.thumbnails?.w640}}
          style={styles.image}
        />
      ) : (
        <Video
          ref={video}
          source={{uri: uploadsUrl + singleItem.filename}}
          style={{width: '100%', height: 500}}
          resizeMode="cover"
          useNativeControls
          onError={(error) => {
            console.log(error);
          }}
          isLooping
        />
      )}
    </Card>
  );
};
ListItem.propTypes = {
  navigation: PropTypes.object,
  singleItem: PropTypes.object,
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});

export default ListItem;
