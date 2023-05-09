import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';

// This component lists out the posts in the home page
const List = ({navigation, myFilesOnly = false}) => {
  const {mediaArray} = useMedia(myFilesOnly);
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem navigation={navigation} singleItem={item} />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default List;
