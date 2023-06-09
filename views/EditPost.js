import EditPostForm from '../components/EditPostForm';
import PropTypes from 'prop-types';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// This view is created for user change the details for the post/media that user has uploaded.
const EditPost = ({route, navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView>
            <EditPostForm item={route.params} navigation={navigation} />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

EditPost.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default EditPost;
