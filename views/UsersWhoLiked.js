import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import UsersList from '../components/UsersList';
import {useUser} from '../hooks/ApiHooks';

// This view displays the list of users that have liked the post
const UserWhoLiked = ({route, navigation}) => {
  const likes = route.params;
  const {getUserById} = useUser();
  const [userArray, setUserArray] = useState([]);
  const ryArray = [];

  // Method for getting the owner of the post
  const getOwner = async (like) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const ownerDetails = await getUserById(token, like.user_id);
      console.log('newUserArray', ownerDetails);
      ryArray.push(ownerDetails);
    } catch (error) {
      console.error('getOwner', error);
    }
    setUserArray(ryArray);
  };

  // Method for getting the user details who likes the post.
  const addUsersToList = async () => {
    console.log('addUsersToList: ', likes.length);
    likes.forEach((like) => {
      console.log('for loop');
      getOwner(like);
    });
  };

  // useEffect for loading the full list of users who liked the post.
  useEffect(() => {
    addUsersToList();
  }, []);

  return (
    <View>
      <UsersList userArray={userArray} navigation={navigation} />
    </View>
  );
};

UserWhoLiked.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default UserWhoLiked;
