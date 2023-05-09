import {Button, Card} from '@rneui/themed';
import {Alert, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {useContext, useRef, useState} from 'react';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {Video} from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm} from 'react-hook-form';

// This component is used to change the avatar and background of the picture.
const UserPictureUpload = ({navigation, imageChangeType}) => {
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
  let info = '';

  if (imageChangeType === 'avatar') {
    info = 'Profile Picture Updated';
  } else {
    info = 'Background Picture Updated';
  }

  // Method for selecting file to upload
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

  // Method for uploading the file
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

      Alert.alert(info, 'File id : ' + uploadResult.file_id, [
        {
          text: 'ok',
          onPress: () => {
            console.log('Ok Pressed');
            setUpdate(!update);
            navigation.navigate('Profile', user);
            resetValues();
          },
        },
      ]);
    } catch (error) {
      console.error('File upload error', error);
    } finally {
      setLoading(false);
      setUpdate(!update);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
      <ScrollView style={styles.scrollView}>
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
        <View style={styles.buttonView}>
          <Button buttonStyle={styles.button} onPress={resetValues}>
            Reset
          </Button>
          <Button
            onPress={handleSubmit(uploadFile)}
            loading={loading}
            disabled={!mediaFile.uri || errors.title || errors.description}
            buttonStyle={styles.button}
          >
            Upload
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: '20%',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: '15%',
    marginTop: '10%',
  },
  button: {
    backgroundColor: '#62BD69',
    borderColor: 'black',
    borderRadius: 20,
    marginLeft: '25%',
  },
});

UserPictureUpload.propTypes = {
  navigation: PropTypes.object,
  imageChangeType: PropTypes.string,
};

export default UserPictureUpload;
