import {Card, Icon, Text} from '@rneui/themed';
import {useContext, useEffect, useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/Variables';
import PropTypes from 'prop-types';
import UserPostList from '../components/UserPostList';
import Header from '../components/Header';

const Profile = ({navigation, myFilesOnly = false, route}) => {
  const clickedUser = route.params;
  console.log('profile', clickedUser);
  const {mediaArray, userMedia} = useMedia(myFilesOnly);
  const {user} = useContext(MainContext);
  const {getFilesByTag} = useTag();
  const [background, setBackground] = useState('');
  const [avatar, setAvatar] = useState('');
  const [media, setMedia] = useState([]);

  const getBackgroundImage = async () => {
    try {
      const backgroundImageArray = await getFilesByTag(
        'backGround' + clickedUser.user_id
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
      const avatarArray = await getFilesByTag('avatar' + clickedUser.user_id);
      if (avatarArray.length > 0) {
        setAvatar(avatarArray.pop().filename);
      }
    } catch (error) {
      console.log('loadAvatar: ', error.message);
    }
  };

  const getMediaByUser = async () => {
    try {
      const fetchMedia = await userMedia(clickedUser.user_id);
      console.log('getMediaByUser: ', fetchMedia);
      setMedia(fetchMedia);
    } catch (error) {
      console.log('getMediaByUser: ', error.message);
    }
  };

  useEffect(() => {
    getBackgroundImage();
    loadAvatar();
    getMediaByUser();
  }, [mediaArray, clickedUser]);

  return (
    <SafeAreaView style={{backgroundColor: '#000000'}}>
      <Header navigation={navigation} />
      <TouchableOpacity
        onPress={() => {
          if (clickedUser.user_id === user.user_id) {
            navigation.navigate('ChangeUserPicture', 'backGround');
          }
        }}
      >
        <Card.Image
          source={{uri: uploadsUrl + background}}
          style={{height: 220}}
        />
      </TouchableOpacity>

      <Card.Divider />

      <Card.Image
        source={{uri: uploadsUrl + avatar}}
        containerStyle={{
          position: 'absolute',
          top: 180,
          marginLeft: 15,
          width: 120,
          height: 120,
          borderRadius: 120 / 2,
          backgroundColor: '#000000',
          borderWidth: 2,
          borderColor: '#FFEA00',
        }}
        onPress={() => {
          if (clickedUser.user_id === user.user_id) {
            navigation.navigate('ChangeUserPicture', 'avatar');
          }
        }}
      />

      <View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              marginLeft: 145,
              fontSize: 20,
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          >
            {clickedUser.username}
          </Text>
          {clickedUser.user_id === user.user_id && (
            <Icon
              name="edit"
              color="#ffffff"
              containerStyle={{
                marginLeft: 15,
              }}
              onPress={() => {
                navigation.navigate('EditProfile', {
                  userName: user.username,
                  email: user.email,
                  fileName: avatar,
                });
              }}
            />
          )}
        </View>
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
          {clickedUser.email}
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
              {media.length}
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
      <View style={{height: 340}}>
        <UserPostList
          navigation={navigation}
          mediaArray={media}
          owner={clickedUser}
        />
      </View>
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
  route: PropTypes.object,
};

export default Profile;
