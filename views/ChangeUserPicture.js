import UserPictureUpload from '../components/UserPictureUpload';
import PropTypes from 'prop-types';

const ChangeUserPicture = ({navigation}) => {
  return (
    <>
      <UserPictureUpload navigation={navigation} />
    </>
  );
};

ChangeUserPicture.propTypes = {
  navigation: PropTypes.object,
};

export default ChangeUserPicture;
