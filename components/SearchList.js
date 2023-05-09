import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import SingleSearch from './SingleSearch';

// This component the list of files which matches search description
const SearchList = ({navigation, searchList}) => {
  return (
    <FlatList
      data={searchList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={(item) => (
        <SingleSearch navigation={navigation} singleItem={item} />
      )}
    />
  );
};
SearchList.propTypes = {
  navigation: PropTypes.object,
  searchList: PropTypes.array,
};

export default SearchList;
