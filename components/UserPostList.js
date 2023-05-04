import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import SingleUserPost from './SingleUserPost';

const UserPostList = ({navigation, mediaArray, owner}) => {
  return (
    <FlatList
      data={mediaArray}
      estimatedItemSize={200}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <SingleUserPost navigation={navigation} item={item} />
      )}
    />
  );
};

UserPostList.propTypes = {
  mediaArray: PropTypes.array,
  owner: PropTypes.object,
  navigation: PropTypes.object,
};

export default UserPostList;
