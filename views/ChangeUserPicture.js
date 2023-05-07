import UserPictureUpload from '../components/UserPictureUpload';
import PropTypes from 'prop-types';

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
