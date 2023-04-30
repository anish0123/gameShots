import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';

const List = ({navigation}) => {
  const {mediaArray} = useMedia();
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
};

export default List;
