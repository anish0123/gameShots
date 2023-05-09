import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from '@rneui/themed';
import PropTypes from 'prop-types';
import {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import {useFavourite, useUser} from '../hooks/ApiHooks';

// This component displays the number and the latest like done by user
const LikedBy = ({item, navigation}) => {
  const {getFavourites} = useFavourite();
  const {getUserById} = useUser();
  const [likes, setLikes] = useState([]);
  const [lastUser, setLastUser] = useState({});
  const {updateLike} = useContext(MainContext);

  const receiveFavourites = async () => {
    console.log('fetchFavourites: is it even working');

    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await getFavourites(item.file_id);
      setLikes(result);
      const user = await getUserById(token, result[0].user_id);
      setLastUser(user);
    } catch (error) {
      console.log('receiveFavourites: ', error.message);
    }
  };

  useEffect(() => {
    receiveFavourites();
  }, [updateLike, item]);

  if (likes.length === 0) {
    return <Text style={styles.noLikes}>No Likes Yet!</Text>;
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('UserWhoLiked', likes);
        }}
      >
        {likes.length > 1 ? (
          <Text style={styles.text}>
            Liked By: {lastUser.username} and {likes.length - 1} others
          </Text>
        ) : (
          <Text style={styles.text}>Liked By: {lastUser.username}</Text>
        )}
      </TouchableOpacity>
    );
  }
};

LikedBy.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  noLikes: {
    paddingLeft: 30,
    fontSize: 15,
    color: '#ffffff',
    marginBottom: 10,
  },

  text: {
    paddingLeft: 30,
    fontSize: 15,
    color: '#ffffff',
    marginBottom: 10,
  },
});

export default LikedBy;
