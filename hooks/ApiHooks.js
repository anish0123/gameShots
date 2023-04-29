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

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update, user} = useContext(MainContext);

  const loadMedia = async () => {
    try {
      const media = await useTag.getFilesByTag(appId);

      setMediaArray(media.reverse());
    } catch (error) {
      console.log('loadMedia: ', error.message);
    }
  };
  useEffect(() => {
    loadMedia();
  }, [update]);
  return {loadMedia, mediaArray};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + 'tags/' + tag);
    } catch (error) {
      throw new Error('getFilesByTag', error.message);
    }
  };
  return {getFilesByTag};
};

export {useAuthentication, useUser, useMedia, useTag};
