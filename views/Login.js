import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from '@rneui/themed';
import { useContext, useEffect, useState } from 'react';
import {View} from 'react-native';
import LoginForm from '../components/LoginForm';
import RegisterationForm from '../components/RegisterationForm';
import { MainContext } from '../contexts/MainContext';
import { useUser } from '../hooks/ApiHooks';

const Login = () => {
  const [toggleForm, setToggleForm] = useState(true);
  const {checkUserByToken} = useUser();
  const {user,setUser, setIsLoggedIn} = useContext(MainContext);

  const userCheck = async() => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if(userToken !== null){
        const user = await checkUserByToken(userToken);
      setUser(user);
      setIsLoggedIn(true);
      }

    } catch (error) {
      console.log("userCheck:", error.message);
    }
  }

  useEffect(() => {
    userCheck();
  }, [])
  return (
    <View>
      {toggleForm ? <LoginForm /> : <RegisterationForm /> }
      <View
      style={{
        flexDirection: "row",
        paddingLeft: 10,
      }}
      >
      <Text style={{fontSize: 20, marginBottom: 30, color: "white"}}>
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
