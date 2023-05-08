import {ListItem as RNEListItem, Icon} from '@rneui/themed';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import Like from './Like';
import Owner from './Owner';
import FileDetails from './FileDetails';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

// ListItem component created for displaying list of posts
const ListItem = ({navigation, singleItem}) => {
  const {user} = useContext(MainContext);
  const item = singleItem;
  return (
    <View style={styles.main}>
      <Owner item={item} navigation={navigation} />
      <FileDetails item={item} navigation={navigation} />
      <RNEListItem containerStyle={{backgroundColor: '#000000'}}>
        <Like item={item} />
        <Icon name="comment" color="#ffffff" />
        {item.user_id === user.user_id && (
          <Icon
            name="edit"
            color="#ffffff"
            onPress={() => navigation.navigate('EditPost', item)}
          />
        )}
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
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 0,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#5A5A5A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
});

export default ListItem;
