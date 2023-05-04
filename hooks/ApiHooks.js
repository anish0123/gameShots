import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {appId, baseUrl} from '../utils/Variables';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message} : ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

const useAuthentication = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      const loginResult = await doFetch(baseUrl + 'login', options);
      console.log('loginResult', loginResult);
      return loginResult;
    } catch (error) {
      throw new Error('postLogin:', error.message);
    }
  };
  return {postLogin};
};

const useUser = () => {
  const checkUser = async (userName) => {
    try {
      const userAvailability = await doFetch(
        baseUrl + 'users/username/' + userName
      );
      return userAvailability.available;
    } catch (error) {
      console.log('checkUser:', error.message);
    }
  };

  const checkUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      const user = await doFetch(baseUrl + 'users/user', options);
      return user;
    } catch (error) {
      console.log('checkUserByToken', error.message);
    }
  };

  const registerUser = async (userDetails) => {
    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };
    try {
      const registerResult = await doFetch(baseUrl + 'users', options);
      return registerResult;
    } catch (error) {
      console.log('registerUser:', error.message);
    }
  };
  return {checkUser, registerUser, checkUserByToken};
};

// Method for fetching, uploading and editing posts from backend
const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);

  const loadMedia = async () => {
    try {
      // const media = await useTag().getFilesByTag(appId);
      const json = await useTag().getFilesByTag(appId);
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      );
      setMediaArray(media.reverse());
    } catch (error) {
      console.log('loadMedia: ', error.message);
    }
  };

  const postMedia = async (token, fileData) => {
    console.log('postMedia:', token);
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: fileData,
    };
    try {
      const uploadResult = await doFetch(baseUrl + 'media', options);
      return uploadResult;
    } catch (error) {
      console.log('postMedia: ', error.message);
    }
  };

  const searchMedia = async (token, searchDetails) => {
    console.log('searchDeails: ', searchDetails);
    const options = {
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchDetails),
    };
    try {
      const json = await doFetch(baseUrl + 'media/search', options);
      const searchResult = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      );
      return searchResult;
    } catch (error) {
      console.log('searchMedia: ', error.message);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [update]);
  return {loadMedia, postMedia, searchMedia, mediaArray};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      console.log('getGilesByTag working');
      return await doFetch(baseUrl + 'tags/' + tag);
    } catch (error) {
      console.log('getFilesByTag', error.message);
    }
  };

  const postTag = async (token, tag) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    };
    try {
      return await doFetch(baseUrl + 'tags', options);
    } catch (error) {
      console.log('postTag: ', error.message);
    }
  };
  return {getFilesByTag, postTag};
};

export {useAuthentication, useUser, useMedia, useTag};
