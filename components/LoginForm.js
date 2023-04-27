import {Dimensions, ScrollView, TextInput, View} from 'react-native';
import {Text} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Button, Input} from '@rneui/themed';
import { useContext, useState } from 'react';
import { MainContext } from '../contexts/MainContext';
import {useAuthentication} from "../hooks/ApiHooks";
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const {postLogin} = useAuthentication();
  const {setIsLoggedIn, setUser} = useContext(MainContext)
   const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const logIn = async(logInData) => {
    setLoading(true);
    console.log("Login Button pressed");
    console.log(logInData)
    try {
      const loginResult = await postLogin(logInData);
      console.log("loginResult: ", loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={{
        marginTop: 30,
        marginBottom: 30,
        flexDirection: 'column',
        alignContent: "center",
      }}
    >
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Username is required',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#97EF53',
              borderRadius: 5,
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Password is required',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#97EF53',
              borderRadius: 5,
              backgroundColor: '#fff',
            }}
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="password"
      />
      <Button
        buttonStyle={{
          borderWidth: 1,
         backgroundColor: "#97EF53",
          borderRadius: 5,

        }}
        onPress={handleSubmit(logIn) }
        type="outline"
        titleStyle={{color: 'black', fontSize: 20}}
        containerStyle={{
          padding: 10,
          width: Dimensions.get('screen').width / 2,
          marginHorizontal: Dimensions.get('screen').width / 5,
        }}
      >
        Log in!
      </Button>
    </ScrollView>
  );
};

export default LoginForm;
