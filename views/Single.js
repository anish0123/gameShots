import {Icon, ListItem as RNEListItem, Text} from '@rneui/themed';
import PropTypes from 'prop-types';
import Owner from '../components/Owner';
import Like from '../components/Like';
import {StyleSheet, ScrollView} from 'react-native';
import FileDetails from '../components/FileDetails';
import AddComment from '../components/AddComment';
import Comments from '../components/Comments';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useMedia} from '../hooks/ApiHooks';
import moment from 'moment';

const Single = ({navigation, route}) => {
  const item = route.params;
  const {user, update} = useContext(MainContext);
  const [post, setPost] = useState({});
  const {loadSingleMedia} = useMedia();
  console.log('single: ', item);

  const singleMedia = async () => {
    try {
      const result = await loadSingleMedia(item.file_id);
      setPost(result);
      console.log('singleMedia item: ', result);
    } catch (error) {
      console.log('singleMedia: ', error.message);
    }
  };

  useEffect(() => {
    singleMedia();
  }, [update]);

  return (
    <ScrollView style={styles.main}>
      <Owner item={item} navigation={navigation} />
      <FileDetails item={post} navigation={navigation} />
      <Text style={styles.text}>
        Added: {moment(item.time_added).fromNow()}
      </Text>
      <RNEListItem containerStyle={{backgroundColor: '#000000'}}>
        <Like item={item} />
        {item.user_id === user.user_id && (
          <Icon
            name="edit"
            color="#ffffff"
            onPress={() => navigation.navigate('EditPost', item)}
          />
        )}
      </RNEListItem>
      <AddComment item={post} />
      <Text style={styles.title}>Comments</Text>
      <Comments item={post} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingTop: 10,
    borderWidth: 2,
    borderColor: '#5A5A5A',
    flex: 1,
    backgroundColor: '#000000',
  },
  text: {
    paddingLeft: 30,
    paddingTop: 10,
    fontSize: 15,
    color: '#ffffff',
    marginBottom: 10,
  },
  title: {
    paddingLeft: 30,
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Single;
