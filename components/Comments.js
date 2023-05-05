import {Text} from '@rneui/themed';
import {FlatList, View} from 'react-native';
import PropTypes from 'prop-types';
import {useComment} from '../hooks/ApiHooks';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import SingleComment from './SingleComment';

const Comments = ({item}) => {
  const {getCommentsById} = useComment();
  const [comments, setComments] = useState([]);
  const {updateComment, update} = useContext(MainContext);

  const getComments = async () => {
    try {
      const result = await getCommentsById(item.file_id);
      setComments(result);
    } catch (error) {
      console.log('getComments: ', error.message);
    }
  };

  useEffect(() => {
    getComments();
  }, [updateComment, update, item]);

  return (
    <>
      {comments.map((comment, index) => (
        <SingleComment key={index} singleComment={comment} />
      ))}
    </>
  );
};

Comments.propTypes = {
  item: PropTypes.object,
};

export default Comments;
