import {Button, Input} from '@rneui/themed';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Dimensions, View} from 'react-native';
import {useUser} from '../hooks/ApiHooks';

const RegisterationForm = () => {
  const [loading, setLoading] = useState(false);
  const {checkUser, registerUser} = useUser();

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      full_name: '',
    },
    mode: 'onChange',
  });

  const checkUsername = async (username) => {
    try {
      const userAvailability = await checkUser(username);
      return userAvailability || 'Username is already taken';
    } catch (error) {
      console.log('checkUsername:', error.message);
    }
  };

  const register = async (userDetails) => {
    setLoading(true);
    delete userDetails.confirmPassword;
    try {
      const registerResult = await registerUser(userDetails);
      return registerResult;
    } catch (error) {
      console.log('register: ', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        marginTop: 30,
        marginBottom: 30,
        flexDirection: 'column',
        alignContent: 'center',
      }}
    >
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Username is required',
          },
          minLength: {
            value: 3,
            message: 'Username Minimum length is 3 characters',
          },
          validate: checkUsername,
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
          pattern: {
            value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
            message: 'min 5 characters, needs one number, one uppercase letter',
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
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
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
            if (value == getValues('password')) {
              return true;
            } else {
              return 'password does not match';
            }
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
            placeholder="Confirm Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
        )}
        name="confirmPassword"
      />
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Email is required',
          },
          pattern: {
            value: /^[a-z0-9.]{1,64}@[a-z0-9.-]{3,64}/i,
            message: 'Must be a valid email',
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
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          minLength: {
            value: 3,
            message: 'name must be at least 3 characters',
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
            placeholder="Full Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.fullName && errors.fullName.message}
          />
        )}
        name="full_name"
      />
      <Button
        buttonStyle={{
          borderWidth: 1,
          backgroundColor: '#97EF53',
          borderRadius: 5,
        }}
        onPress={handleSubmit(register)}
        type="outline"
        loading={loading}
        titleStyle={{color: 'black', fontSize: 20}}
        containerStyle={{
          padding: 10,
          width: Dimensions.get('screen').width / 2,
          marginHorizontal: Dimensions.get('screen').width / 5,
        }}
      >
        Register
      </Button>
    </View>
  );
};
export default RegisterationForm;
