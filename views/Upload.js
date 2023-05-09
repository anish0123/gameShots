import {Button, Card, Icon, Input} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {useMedia, useTag} from '../hooks/ApiHooks';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext, useRef, useState} from 'react';
import {Video} from 'expo-av';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {appId} from '../utils/Variables';
import Header from '../components/Header';

const Upload = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [mediaFile, setMediaFile] = useState({});
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const {setUpdate, update} = useContext(MainContext);
  const video = useRef(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onChange',
  });

  // Method for asking camera permission from the user
  const getCameraPermission = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera permission');
    }
  };

  // Method for opening the camera and taking the pictures.
  const takePicture = async () => {
    // No permissions request is necessary for launching the image library
    try {
      await getCameraPermission();
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      console.log('Pick camera result', result);

      if (!result.canceled) {
        setMediaFile(result.assets[0]);
      }
    } catch (error) {
      console.log('Error in taking picture', error);
    }
  };

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
        // Validate form
        trigger();
      }
    } catch (error) {
      console.log('selectFile: ', error.message);
    }
  };

  const resetValues = () => {
    setMediaFile({});
    reset();
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
        tag: appId,
      };
      const tagResult = await postTag(token, appTag);
      console.log('uploadResult: ', uploadResult);
      console.log('tagResult: ', tagResult);
      Alert.alert(
        'Upload Confirmation',
        mediaFile.type + ' uploaded successfully',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              // update 'update' state in context
              setUpdate(!update);
              // reset form
              resetValues();
              // TODO: navigated to home;
              navigation.navigate('Home');
            },
          },
        ]
      );
    } catch (error) {
      console.log('uploadFile: ', error.message);
      Alert.alert(
        'Upload Failed!',
        'Please try again with correct credentials',
        [
          {
            text: 'Ok',
          },
        ]
      );
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Header navigation={navigation} />
        <ScrollView
          style={{
            marginTop: 20,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {mediaFile.type == 'video' ? (
            <Video
              ref={video}
              source={{uri: mediaFile.uri}}
              style={{width: '100%', height: 500}}
              resizeMode="contain"
              useNativeControls
              onError={(error) => {
                console.log(error);
              }}
            />
          ) : (
            <Card.Image
              source={{
                uri: mediaFile.uri || 'https://placekitten.com/g/200/300',
              }}
              onPress={selectFile}
              style={{width: '100%', height: 300, borderRadius: 4}}
            />
          )}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}
          >
            <Icon name="photo-camera" onPress={takePicture} size={25} raised />
            <Icon name="collections" onPress={selectFile} size={25} raised />
          </View>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Title is required',
              },
              minLength: {
                value: 3,
                message: 'Title Min length is 3 characters.',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                inputContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 7,
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: 20,
                  backgroundColor: '#ffffff',
                  borderColor: '#FFEA00',
                }}
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                errorMessage={errors.title && errors.title.message}
              />
            )}
            name="title"
          />
          <Controller
            control={control}
            rules={{
              minLength: {
                value: 5,
                message: 'Description Min length is 5 characters.',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                style={{
                  paddingHorizontal: 5,
                }}
                containerStyle={{
                  minHeight: 90,
                }}
                inputContainer={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: '#FFEA00',
                  borderRadius: 7,
                  width: '100%',
                  justifyContent: 'center',
                  minHeight: 100,
                  backgroundColor: '#ffffff',
                }}
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline={true}
                autoCapitalize="none"
                errorMessage={errors.description && errors.description.message}
              />
            )}
            name="description"
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginRight: '15%',
            }}
          >
            <Button
              buttonStyle={{
                backgroundColor: '#62BD69',
                borderColor: 'black',
                borderRadius: 20,
                marginLeft: '25%',
              }}
              type="outline"
              titleStyle={{color: 'black'}}
              containerStyle={{
                width: Dimensions.get('screen').width / 3,
                marginHorizontal: Dimensions.get('screen').width / 4,
              }}
              onPress={resetValues}
            >
              Reset
            </Button>
            <Button
              onPress={handleSubmit(uploadFile)}
              loading={loading}
              disabled={!mediaFile.uri || errors.title || errors.description}
              buttonStyle={{
                backgroundColor: '#62BD69',
                borderColor: 'black',
                borderRadius: 20,
                marginLeft: '25%',
              }}
              type="outline"
              titleStyle={{color: 'black'}}
              containerStyle={{
                width: Dimensions.get('screen').width / 3,
                marginHorizontal: Dimensions.get('screen').width / 4,
              }}
            >
              Upload
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
Upload.propTypes = {
  navigation: PropTypes.object,
};
export default Upload;
