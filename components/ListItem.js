import {ListItem as RNEListItem, Icon} from '@rneui/themed';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import Like from './Like';
import Owner from './Owner';
import FileDetails from './FileDetails';

// ListItem component created for displaying list of posts
const ListItem = ({navigation, singleItem}) => {
  const item = singleItem;
  return (
    <View style={styles.main}>
      <Owner item={item} />
      <FileDetails item={item} navigation={navigation} />
      <RNEListItem containerStyle={{backgroundColor: '#000000'}}>
        <Like item={item} />
        <Icon name="comment" color="#ffffff" />
      </RNEListItem>
    </View>
  );
};
ListItem.propTypes = {
  navigation: PropTypes.object,
  singleItem: PropTypes.object,
};

const styles = StyleSheet.create({
  main: {
    marginBottom: 20,
    padding: 0,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#FFEA00',
  },
  owner: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
  },
  ownerText: {
    paddingLeft: 20,
    paddingTop: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  avatar: {
    borderRadius: 120 / 2,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#FFEA00',
  },
  image: {
    flex: 1,
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  text: {
    paddingLeft: 20,
    paddingTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default ListItem;
