import {Button, Card} from '@rneui/themed';
import {ScrollView, View} from 'react-native';
import PropTypes from 'prop-types';
import {useContext, useRef, useState} from 'react';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {Video} from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm} from 'react-hook-form';

const UserPictureUpload = ({navigation, imageChangeType}) => {
  console.log('userPictureUpload: ', imageChangeType);
  const [loading, setLoading] = useState(false);
  const [mediaFile, setMediaFile] = useState({});
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const {setUpdate, update, user} = useContext(MainContext);
  const video = useRef(null);

  const {
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: imageChangeType + user.username,
      description: '',
    },
    mode: 'onChange',
  });

  const selectFile = async () => {
    try {
      const file = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      console.log('selectFile:', file);

      if (!file.canceled) {
        setMediaFile(file.assets[0]);
      }
    } catch (error) {
      console.log('selectFile: ', error.message);
    }
  };

  const resetValues = () => {
    setMediaFile({});
  };

  const uploadFile = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    console.log('uploadFile');
    const fileName = mediaFile.uri.split('/').pop();
    let fileExt = fileName.split('.').pop();
    if (fileExt == 'jpg') fileExt = 'jpeg';
    const mimeType = mediaFile.type + '/' + fileExt;
    formData.append('file', {
      type: mimeType,
      name: fileName,
      uri: mediaFile.uri,
    });
    console.log('uploadFile: ', formData);
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('token:', token);
      const uploadResult = await postMedia(token, formData);

      const appTag = {
        file_id: uploadResult.file_id,
        tag: imageChangeType + user.user_id,
      };
      const tagResult = await postTag(token, appTag);
      console.log('uploadResult: ', uploadResult);
      console.log('tagResult: ', tagResult);
      setUpdate(!update);
      navigation.navigate('Profile');
      resetValues();
    } catch (error) {
      console.log('uploadFile: ', error.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={{backgroundColor: '#000000'}}>
      <Card>
        {mediaFile.type == 'video' ? (
          <Video
            ref={video}
            source={{uri: mediaFile.uri}}
            style={{width: '100%', height: 250}}
            resizeMode="contain"
            useNativeControls
            onError={(error) => {
              console.log(error);
            }}
          />
        ) : (
          <Card.Image
            source={{uri: mediaFile.uri || 'https://placekitten.com/g/200/300'}}
            onPress={selectFile}
            style={{width: '100%', height: 250}}
          />
        )}
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button style={{paddingRight: 50}} onPress={resetValues}>
            Reset
          </Button>
          <Button
            onPress={handleSubmit(uploadFile)}
            loading={loading}
            disabled={!mediaFile.uri || errors.title || errors.description}
          >
            Upload
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
};

UserPictureUpload.propTypes = {
  navigation: PropTypes.object,
  imageChangeType: PropTypes.string,
};

export default UserPictureUpload;
