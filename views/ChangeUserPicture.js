import UserPictureUpload from '../components/UserPictureUpload';
import PropTypes from 'prop-types';

// This view is created for user to change their avatar / background picture
const ChangeUserPicture = ({navigation, route}) => {
  const imageChangeType = route.params;
  return (
    <>
      <UserPictureUpload
        navigation={navigation}
        imageChangeType={imageChangeType}
      />
    </>
  );
};

ChangeUserPicture.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default ChangeUserPicture;
