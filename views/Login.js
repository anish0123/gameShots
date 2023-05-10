import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from '@rneui/themed';
import {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import LoginForm from '../components/LoginForm';
import RegisterationForm from '../components/RegisterationForm';
import {MainContext} from '../contexts/MainContext';
import {useUser} from '../hooks/ApiHooks';

// This view is created so that user is able to log in or register in the application
const Login = () => {
  const [toggleForm, setToggleForm] = useState(true);
  const {checkUserByToken} = useUser();
  const {setUser, setIsLoggedIn} = useContext(MainContext);

  // Method for checking the user by the saved token
  const userCheck = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        const user = await checkUserByToken(userToken);
        setUser(user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('userCheck:', error.message);
    }
  };

  useEffect(() => {
    userCheck();
  }, []);
  return (
    <View style={{backgroundColor: 'black'}}>
      {toggleForm ? <LoginForm /> : <RegisterationForm />}
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 10,
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            marginBottom: 30,
            color: 'white',
            justifyContent: 'center',
          }}
        >
          {toggleForm
            ? "Don't have an account? Please "
            : 'Have an account? Please '}
        </Text>
        <Text
          style={{color: 'green', fontSize: 20}}
          onPress={() => setToggleForm(!toggleForm)}
        >
          {toggleForm ? 'register' : 'log in'}
        </Text>
      </View>
    </View>
  );
};

export default Login;
