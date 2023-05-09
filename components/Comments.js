import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {useComment} from '../hooks/ApiHooks';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import SingleComment from './SingleComment';
import Lottie from 'lottie-react-native';

// This component is created to list out all the comments in the post
const Comments = ({item}) => {
  const {getCommentsById} = useComment();
  const [comments, setComments] = useState([]);
  const {updateComment, update} = useContext(MainContext);

  // Method to fetch comments from the api
  const getComments = async () => {
    try {
      const result = await getCommentsById(item.file_id);
      setComments(result);
    } catch (error) {
      console.log('getComments: ', error.message);
    }
  };

  // use effect for fetching the comments when the state changes
  useEffect(() => {
    getComments();
  }, [updateComment, update, item]);

  return (
    <>
      {comments.length === 0 ? (
        <Lottie
          source={require('../Lottie/empty.json')}
          autoPlay
          style={{marginLeft: 10, padding: 0, width: '80%'}}
        />
      ) : (
        <>
          {comments.map((comment, index) => (
            <SingleComment key={index} singleComment={comment} />
          ))}
        </>
      )}
    </>
  );
};

Comments.propTypes = {
  item: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#ffffff',
  },
});

export default Comments;
