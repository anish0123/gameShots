import {SearchBar} from '@rneui/themed';
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchList from '../components/SearchList';
import Header from '../components/Header';

// This view is created for users to search for the post
const Search = ({navigation}) => {
  const [value, setValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const {searchMedia} = useMedia();

  const mediaSearch = async () => {
    const params = {};
    params.title = value;
    try {
      const token = await AsyncStorage.getItem('userToken');
      const searchResult = await searchMedia(token, params);
      setSearchList(searchResult);
    } catch (error) {
      console.log('mediaSearch:', error.message);
    }
  };

  useEffect(() => {
    mediaSearch();
  }, [value]);

  useEffect(() => {});
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Header navigation={navigation} />
        <SearchBar
          platform="default"
          inputContainerStyle={{backgroundColor: '#ffff'}}
          inputStyle={{color: '#000000'}}
          leftIconContainerStyle={{}}
          rightIconContainerStyle={{}}
          loadingProps={{}}
          onChangeText={(newVal) => setValue(newVal)}
          placeholder="Search title.."
          placeholderTextColor="#888"
          round
          cancelButtonTitle="Cancel"
          cancelButtonProps={{}}
          autoCapitalize="none"
          value={value}
        />
        <View style={{height: '85%'}}>
          <SearchList navigation={navigation} searchList={searchList} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    marginTop: 0,
    backgroundColor: '#000000',
  },
});

Search.propTypes = {
  navigation: PropTypes.object,
};

export default Search;
