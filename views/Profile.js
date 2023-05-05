import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Text} from '@rneui/themed';
import {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import {useMedia, useTag, useUser} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/Variables';
import PropTypes from 'prop-types';
import UserPostList from '../components/UserPostList';

const Profile = ({navigation, myFilesOnly = true}) => {
  const {checkUserByToken} = useUser();
  const {mediaArray} = useMedia(myFilesOnly);
  const [currentUser, setCurrentUser] = useState({});
  const {user} = useContext(MainContext);
  const {getFilesByTag} = useTag();
  const [background, setBackground] = useState('');
  const [avatar, setAvatar] = useState('');

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const user = await checkUserByToken(token);
      setCurrentUser(user);
    } catch (error) {
      console.log('getUser: ', error.message);
    }
  };

  const getBackgroundImage = async () => {
    try {
      const backgroundImageArray = await getFilesByTag(
        'backGround' + user.user_id
      );
      if (backgroundImageArray.length > 0) {
        setBackground(backgroundImageArray.pop().filename);
        console.log(
          'getBackgroundImageName: ',
          backgroundImageArray.pop().filename
        );
      }
    } catch (error) {
      console.log('getBackgroundImage: ', error.message);
    }
  };

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

  useEffect(() => {
    getUser();
    getBackgroundImage();
    loadAvatar();
  }, [mediaArray]);

  return (
    <SafeAreaView style={{backgroundColor: '#000000'}}>
      <Card.Image
        source={{uri: uploadsUrl + background}}
        style={{height: 220}}
      />
      <Card.Divider />

      <Card.Image
        source={{uri: uploadsUrl + avatar}}
        containerStyle={{
          marginLeft: 15,
          position: 'absolute',
          top: 180,
          width: 120,
          height: 120,
          borderRadius: 120 / 2,
          backgroundColor: '#000000',
          borderWidth: 2,
          borderColor: '#FFEA00',
        }}
      />
      <View>
        <Text
          style={{
            marginLeft: 145,
            fontSize: 20,
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: '#ffffff',
          }}
        >
          {currentUser.username}
        </Text>
        <Text
          style={{
            marginLeft: 145,
            marginTop: 0,
            paddingTop: 0,
            fontSize: 15,
            fontWeight: 'bold',
            color: '#939799',
          }}
        >
          {currentUser.email}
        </Text>
      </View>
      <Card
        containerStyle={{
          width: '100%',
          height: 75,
          marginTop: 30,
          marginLeft: 0,
          backgroundColor: '#000000',
          borderColor: '#000000',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <View>
            <Text
              style={{
                padding: 0,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 20,
                color: '#939799',
              }}
            >
              Posts
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: '#ffffff',
              }}
            >
              {mediaArray.length}
            </Text>
          </View>
          <View
            style={{
              height: '100%',
              backgroundColor: '#939799',
              width: 1.5,
            }}
          ></View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 20,
                color: '#939799',
              }}
            >
              Likes
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: '#ffffff',
              }}
            >
              1
            </Text>
          </View>
        </View>
      </Card>
      <View style={{height: 330}}>
        <UserPostList
          navigation={navigation}
          mediaArray={mediaArray}
          owner={currentUser}
        />
      </View>
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default Profile;
