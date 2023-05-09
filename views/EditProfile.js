import React, {useContext, useState} from 'react';
import {Button, Card, Input} from '@rneui/base';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {uploadsUrl} from '../utils/Variables';

// This view is made for editing profile of the current logged in user.
const EditProfile = ({navigation, route}) => {
  const {fileName} = route.params;
  const {putUser, checkUser} = useUser();
  const [loading, setLoading] = useState(false);
  const {update, setUpdate, user, setUser} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: route.params.userName,
      email: route.params.email,
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  // Method for modifying the profile of the user.
  const modifyProfile = async (data) => {
    setLoading(true);
    delete data.confirmPassword;
    if (!data.password.trim()) {
      delete data.password;
    }
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await putUser(data, token);
      data.user_id = user.user_id;
      setUser(data);
      console.log('Result ' + result);
      Alert.alert('Personal Info Updated', '', [
        {
          text: 'ok',
          onPress: () => {
            setUpdate(!update);
            navigation.navigate('Profile', user);
          },
        },
      ]);
    } catch (error) {
      Alert.alert('User Info could not be updated!', 'Please try again later', [
        {
          text: 'ok',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Method for checking if the username is available.
  const checkUsername = async (username) => {
    try {
      if (username !== user.username) {
        const userAvailable = await checkUser(username);
        console.log('checkusername' + userAvailable);
        return userAvailable || 'Username is already taken';
      }
    } catch (error) {
      console.error('checkusername' + error.message);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#000000',
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={{
            backgroundColor: '#000000',
            marginTop: 20,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Card.Image
            source={{uri: uploadsUrl + fileName}}
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              marginHorizontal: Dimensions.get('screen').width / 2 - 110,
              width: 200,
              height: 200,
              marginBottom: 20,
              borderRadius: 200 / 2,
              borderWidth: 2,
              borderColor: '#FFEA00',
            }}
            onPress={() => {
              navigation.navigate('ChangeUserPicture', 'avatar');
            }}
          ></Card.Image>
          <Controller
            control={control}
            rules={{
              validate: checkUsername,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: '#FFEA00',
                  borderRadius: 7,
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: 20,
                  padding: 5,
                  backgroundColor: 'white',
                }}
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                defaultValue={value}
                autoCapitalize="none"
                errorMessage={errors.username && errors.username.message}
              />
            )}
            name="username"
          />

          <Controller
            control={control}
            rules={{
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/,
                message: 'Provide valid email address',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: '#FFEA00',
                  borderRadius: 7,
                  width: '100%',
                  justifyContent: 'center',
                  padding: 5,
                  backgroundColor: 'white',
                }}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                defaultValue={value}
                autoCapitalize="none"
                errorMessage={errors.email && errors.email.message}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{
              pattern: {
                value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
                message:
                  'min 5 characters, one number and one uppercase letter',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: '#FFEA00',
                  borderRadius: 7,
                  width: '100%',
                  justifyContent: 'center',
                  padding: 5,
                  backgroundColor: 'white',
                }}
                placeholder="Password (Optional)"
                onBlur={onBlur}
                onChangeText={onChange}
                defaultValue={value}
                autoCapitalize="none"
                errorMessage={errors.password && errors.password.message}
              />
            )}
            name="password"
          />

          <Controller
            control={control}
            rules={{
              validate: (value) => {
                if (value === getValues('password')) {
                  return true;
                } else {
                  return 'Password do not match';
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: '#FFEA00',
                  borderRadius: 7,
                  width: '100%',
                  justifyContent: 'center',
                  padding: 5,
                  backgroundColor: 'white',
                }}
                placeholder="Confirm Password (Optional)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                autoCapitalize="none"
                errorMessage={
                  errors.confirmPassword && errors.confirmPassword.message
                }
              />
            )}
            name="confirmPassword"
          />

          <Button
            loading={loading}
            title="Save Changes"
            buttonStyle={{
              backgroundColor: '#6fdc6f',
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 20,
            }}
            type="outline"
            titleStyle={{color: 'black', fontSize: 20}}
            containerStyle={{
              padding: 10,
              width: Dimensions.get('screen').width / 2,
              marginHorizontal: Dimensions.get('screen').width / 5,
            }}
            onPress={handleSubmit(modifyProfile)}
          ></Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

EditProfile.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default EditProfile;
