import {Avatar, Text} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTag, useUser} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uploadsUrl} from '../utils/Variables';

const Owner = ({navigation, item}) => {
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
    <View style={styles.owner}>
      <Avatar
        source={{uri: uploadsUrl + avatar}}
        size="large"
        rounded
        containerStyle={styles.avatar}
      />
      <Text style={styles.ownerText}>{owner.username}</Text>
    </View>
  );
};

Owner.propTypes = {
  navigation: PropTypes.object,
  item: PropTypes.object,
};

const styles = StyleSheet.create({
  owner: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#000000',
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
});

export default Owner;
