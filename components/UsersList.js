import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import SingleUser from './SingleUser';

const UsersList = ({userArray, navigation}) => {
  console.log('usersList: ', userArray);
  return (
    <FlatList
      data={userArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={(item) => (
        <SingleUser SingleUser={item} navigation={navigation} />
      )}
    />
  );
};

UsersList.propTypes = {
  userArray: PropTypes.array,
  navigation: PropTypes.object,
};
export default UsersList;
