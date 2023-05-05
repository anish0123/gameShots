import {Text} from '@rneui/themed';
import {View} from 'react-native';
import PropTypes from 'prop-types';

const AddComment = ({item}) => {
  return (
    <View>
      <Text>This is add comment tab</Text>
    </View>
  );
};

export default AddComment;

AddComment.propTypes = {
  item: PropTypes.object,
};
