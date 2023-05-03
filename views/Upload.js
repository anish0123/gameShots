import {Button, Card, Input} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {Image, ScrollView, View} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext, useRef, useState} from 'react';
import {Video} from 'expo-av';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [mediaFile, setMediaFile] = useState({});
  const {postMedia} = useMedia();
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
      console.log('uploadResult: ', uploadResult);
      setUpdate(!update);
      navigation.navigate('Home');
    } catch (error) {
      console.log('uploadFile: ', error.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView>
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
                borderColor: 'green',
                borderRadius: 7,
                width: '100%',
                justifyContent: 'center',
                marginTop: 20,
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
                borderColor: 'green',
                borderRadius: 7,
                width: '100%',
                justifyContent: 'center',
                minHeight: 100,
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
Upload.propTypes = {
  navigation: PropTypes.object,
};
export default Upload;
