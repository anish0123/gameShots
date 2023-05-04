import {Avatar, Text, ListItem as RNEListItem} from '@rneui/themed';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/Variables';
import {Video} from 'expo-av';
import {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useTag, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Like from './Like';

// ListItem component created for displaying list of posts
const ListItem = ({navigation, singleItem}) => {
  const item = singleItem;
  const video = useRef(null);
  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const [owner, setOwner] = useState({});
  const [avatar, setAvatar] = useState('');

  const getOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const user = await getUserById(token, item.user_id);
      setOwner(user);
    } catch (error) {
      console.log('getOwner: ', error.message);
    }
  };

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar' + item.user_id);
      if (avatarArray.length > 0) {
        setAvatar(avatarArray.pop().filename);
      }
    } catch (error) {
      console.log('loadAvatar: ', error.message);
    }
  };

  useEffect(() => {
    getOwner();
    loadAvatar();
  }, [item]);

  return (
    <View style={styles.main}>
      <View style={styles.owner}>
        <Avatar
          source={{uri: uploadsUrl + avatar}}
          size="large"
          rounded
          containerStyle={styles.avatar}
        />
        <Text style={styles.ownerText}>{owner.username}</Text>
      </View>
      {item.media_type === 'image' ? (
        <Image
          source={{uri: uploadsUrl + item.thumbnails?.w640}}
          style={styles.image}
          resizeMode="stretch"
        />
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
      <RNEListItem containerStyle={{backgroundColor: '#000000'}}>
        <Like item={item} />
      </RNEListItem>
    </View>
  );
};
ListItem.propTypes = {
  navigation: PropTypes.object,
  singleItem: PropTypes.object,
};

const styles = StyleSheet.create({
  main: {
    marginBottom: 20,
    padding: 0,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#FFEA00',
  },
  owner: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
  },
  ownerText: {
    paddingLeft: 20,
    paddingTop: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  avatar: {
    borderRadius: 120 / 2,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#FFEA00',
  },
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

export default ListItem;
