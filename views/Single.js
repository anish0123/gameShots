import {ListItem as RNEListItem, Icon, Text} from '@rneui/themed';
import PropTypes from 'prop-types';
import Owner from '../components/Owner';
import Like from '../components/Like';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import FileDetails from '../components/FileDetails';
import AddComment from '../components/AddComment';
import Comments from '../components/Comments';

const Single = ({navigation, route}) => {
  const item = route.params;
  console.log('single: ', item);
  return (
    <ScrollView style={styles.main}>
      <Owner item={item} />
      <FileDetails item={item} navigation={navigation} />
      <RNEListItem containerStyle={{backgroundColor: '#000000'}}>
        <Like item={item} />
      </RNEListItem>
      <AddComment item={item} />
      <Text style={styles.text}>Comments</Text>
      <Comments item={item} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    marginBottom: 20,
    padding: 0,
    borderWidth: 2,
    borderColor: '#FFEA00',
    flex: 1,
    backgroundColor: '#000000',
  },
  text: {
    paddingLeft: 20,
    paddingTop: 5,
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
