import {ListItem as RNEListItem, Icon} from '@rneui/themed';
import PropTypes from 'prop-types';
import Owner from '../components/Owner';
import Like from '../components/Like';
import {StyleSheet, ScrollView} from 'react-native';
import FileDetails from '../components/FileDetails';

const Single = ({navigation, route}) => {
  const item = route.params;
  console.log('single: ', item);
  return (
    <ScrollView style={styles.main}>
      <Owner item={item} />
      <FileDetails item={item} navigation={navigation} />
      <RNEListItem containerStyle={{backgroundColor: '#000000'}}>
        <Like item={item} />
        <Icon name="comment" color="#ffffff" />
      </RNEListItem>
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

Single.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Single;
