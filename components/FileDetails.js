import {Text} from '@rneui/themed';
import {Video} from 'expo-av';
import PropTypes from 'prop-types';
import {useRef} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {uploadsUrl} from '../utils/Variables';

const FileDetails = ({navigation, item}) => {
  const video = useRef(null);
  return (
    <>
      {item.media_type === 'image' ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Single', item);
          }}
        >
          <Image
            source={{uri: uploadsUrl + item.thumbnails?.w640}}
            style={styles.image}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      ) : (
        <Video
          ref={video}
          source={{uri: uploadsUrl + item.filename}}
          style={{width: '100%', height: 500}}
          resizeMode="cover"
          useNativeControls
          onError={(error) => {
            console.log(error);
          }}
          isLooping
        />
      )}
      <View>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.description}</Text>
      </View>
    </>
  );
};

FileDetails.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  text: {
    paddingLeft: 20,
    paddingTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default FileDetails;
