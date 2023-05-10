import {Icon, Text} from '@rneui/themed';
import PropTypes from 'prop-types';
import {useFavourite} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';

// THis component displays the likes and add function to like and dislike the post
const Like = ({item}) => {
  const {postFavourite, deleteFavourite, getFavourites} = useFavourite();
  const {update, user, updateLike, setUpdateLike} = useContext(MainContext);
  const [userLikesIt, setUserLikesIt] = useState(false);
  const [likes, setLikes] = useState([]);

  // Method for fetching all the likes according to the file
  const fetchFavourites = async () => {
    try {
      const likes = await getFavourites(item.file_id);
      setLikes(likes);
      if (likes.length > 0) {
        const userLike = likes.filter((like) => like.user_id === user.user_id);
        if (userLike.length !== 0) {
          setUserLikesIt(true);
        } else {
          setUserLikesIt(false);
        }
      } else {
        setUserLikesIt(false);
      }
    } catch (error) {
      console.log('fetchFavourites: ', error.message);
    }
  };

  // Method for adding favourites
  const addFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postFavourite(token, item.file_id);
      console.log('addFavourite: ', result);
      setUserLikesIt(true);
      setUpdateLike(!updateLike);
    } catch (error) {
      console.log('addFavourite: ', error.message);
    }
  };

  // Method for removing favourites
  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await deleteFavourite(token, item.file_id);
      console.log('addFavourite: ', result);
      setUserLikesIt(false);
      setUpdateLike(!updateLike);
    } catch (error) {
      console.log('addFavourite: ', error.message);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, [updateLike, update, item]);

  return (
    <>
      {userLikesIt ? (
        <Icon name="favorite" color="red" onPress={removeFavourite} />
      ) : (
        <Icon name="favorite" onPress={addFavourite} color="#ffffff" />
      )}
      <Text
        style={{
          fontSize: 20,
          marginLeft: 5,
          color: '#ffffff',
        }}
      >
        {likes.length}
      </Text>
    </>
  );
};

Like.propTypes = {
  item: PropTypes.object,
};

export default Like;
