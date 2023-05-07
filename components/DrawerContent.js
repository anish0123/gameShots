import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Icon, Text} from '@rneui/themed';
import {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/Variables';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerContent = (props) => {
  const {user, setIsLoggedIn} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');
  const {getFilesByTag} = useTag();
  const {mediaArray} = useMedia();

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar' + user.user_id);
      if (avatarArray.length > 0) {
        setAvatar(avatarArray.pop().filename);
        console.log('loadAvatarName: ', avatarArray.pop().filename);
      }
    } catch (error) {
      console.log('loadAvatar: ', error.message);
    }
  };

  // Method for logging out user.
  const logout = async () => {
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('clearing asyncstorage failed ', error);
    }
  };

  useEffect(() => {
    loadAvatar();
  }, [mediaArray, user]);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.owner}>
          <Avatar
            source={{uri: uploadsUrl + avatar}}
            size="large"
            rounded
            containerStyle={styles.avatar}
          />
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={styles.ownerText}>{user.username}</Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            >
              <Text style={styles.profile}>View your profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingTop: 20}}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home" color="#ffffff" size={size} />
            )}
            label="Home"
            labelStyle={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#ffffff',
            }}
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="search" color="#ffffff" size={size} />
            )}
            label="Search"
            labelStyle={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#ffffff',
            }}
            onPress={() => {
              props.navigation.navigate('Search');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="cloud-upload" color="#ffffff" size={size} />
            )}
            label="Upload"
            labelStyle={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#ffffff',
            }}
            onPress={() => {
              props.navigation.navigate('Upload');
            }}
          />
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        icon={({color, size}) => (
          <Icon name="logout" color="#ffffff" size={size} />
        )}
        label="Log out"
        labelStyle={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#ffffff',
        }}
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
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
  profile: {
    paddingLeft: 20,
    paddingTop: 5,
    fontSize: 15,
    color: '#ffffff',
  },
});

DrawerContent.propTypes = {
  props: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default DrawerContent;
