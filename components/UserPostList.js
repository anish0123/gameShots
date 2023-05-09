import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import SingleUserPost from './SingleUserPost';
import Lottie from 'lottie-react-native';

const UserPostList = ({navigation, mediaArray, owner}) => {
  return (
    <>
      {mediaArray.length === 0 ? (
        <Lottie
          source={require('../Lottie/nothing.json')}
          autoPlay
          style={{marginLeft: 5, padding: 0, width: '90%'}}
        />
      ) : (
        <FlatList
          data={mediaArray}
          estimatedItemSize={200}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <SingleUserPost navigation={navigation} item={item} />
          )}
        />
      )}
    </>
  );
};

UserPostList.propTypes = {
  mediaArray: PropTypes.array,
  owner: PropTypes.object,
  navigation: PropTypes.object,
};

export default UserPostList;
