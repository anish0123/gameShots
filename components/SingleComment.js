import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from '@rneui/base';
import {Card, Icon, ListItem, Text} from '@rneui/themed';
import PropTypes from 'prop-types';
import {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import {useComment, useTag, useUser} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/Variables';

// This component is used to displaying the comment details of a post/file.
const SingleComment = ({singleComment}) => {
  const [owner, setOwner] = useState({});
  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const {user} = useContext(MainContext);
  const {deleteComment} = useComment();
  const {updateComment, setUpdateComment} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');

  // Method for getting user details of comment writer.
  const getUser = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const user = await getUserById(token, singleComment.user_id);
    setOwner(user);
  };

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar' + singleComment.user_id);
      if (avatarArray.length > 0) {
        setAvatar(avatarArray.pop().filename);
        console.log('loadAvatarName: ', avatarArray.pop().filename);
      }
    } catch (error) {
      console.log('loadAvatar: ', error.message);
    }
  };

  // Method for deleting a comment.
  const commentDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      Alert.alert(
        'Do you want to delete this comment?',
        'Comment id: ' + singleComment.comment_id,
        [
          {
            text: 'Delete',
            onPress: async () => {
              const result = await deleteComment(
                token,
                singleComment.comment_id
              );
              Alert.alert(result.message);
              setUpdateComment(!updateComment);
            },
          },
          {
            text: 'Cancel',
          },
        ]
      );
    } catch (error) {
      console.log('commentDelete: ', error.message);
    }
  };

  useEffect(() => {
    getUser();
    loadAvatar();
  }, []);

  return (
    <View style={styles.container}>
      <Avatar source={{uri: uploadsUrl + avatar}} rounded size="medium" />
      <View style={{width: '70%'}}>
        <Text style={styles.ownerText}>{owner.username}</Text>
        <Text style={{marginTop: 0, marginLeft: 30, paddingLeft: 0}}>
          {singleComment.comment}
        </Text>
      </View>
      {user.user_id === singleComment.user_id && (
        <Icon
          name="delete"
          style={{paddingTop: 25, paddingRight: 30}}
          onPress={commentDelete}
        />
      )}
    </View>
  );
};

SingleComment.propTypes = {
  singleComment: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  ownerText: {
    paddingLeft: 15,
    paddingTop: 7,
    fontSize: 15,
    fontWeight: 'bold',
  },
  icon: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default SingleComment;
