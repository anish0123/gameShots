import {Icon, Input} from '@rneui/themed';
import PropTypes from 'prop-types';
import {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useComment} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const AddComment = ({item}) => {
  const [value, setValue] = useState('');
  const {postComment} = useComment();
  const {setUpdateComment, updateComment} = useContext(MainContext);

  const addComment = async () => {
    const data = {
      comment: value,
      file_id: item.file_id,
    };
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postComment(token, data);
      console.log('addComment: ', result);
      setValue('');
      setUpdateComment(!updateComment);
    } catch (error) {
      console.log('addComment: ', error.message);
    }
  };

  return (
    <>
      {value === '' ? (
        <Input
          value={value}
          onChangeText={(newValue) => setValue(newValue)}
          containerStyle={{paddingTop: 10, width: '100%'}}
          inputContainerStyle={{backgroundColor: '#ffffff'}}
          label="Add Comment"
          labelStyle={{color: '#ffffff', paddingBottom: 10}}
        />
      ) : (
        <Input
          value={value}
          onChangeText={(newValue) => setValue(newValue)}
          containerStyle={{paddingTop: 10, width: '100%'}}
          inputStyle={{backgroundColor: '#ffffff'}}
          label="Add Comment"
          labelStyle={{color: '#ffffff', paddingBottom: 10}}
          rightIcon={
            <Icon
              name="send"
              color="#ffffff"
              style={{
                paddingLeft: 10,
              }}
              onPress={addComment}
            />
          }
        />
      )}
    </>
  );
};

export default AddComment;

AddComment.propTypes = {
  item: PropTypes.object,
};
