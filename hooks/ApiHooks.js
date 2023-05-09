import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {appId, baseUrl} from '../utils/Variables';

// Method for fetching the data from the api
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

// Method for using authentication 
const useAuthentication = () => {
  // Method for logging in
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

// Method for using users details.
const useUser = () => {
  // Method for checking if the username is available in registeration form
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

  // Method for getting user details through token
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

  // Method for registering new user
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

  // Method for getting user details by using user id
  const getUserById = async (token, id) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const user = await doFetch(baseUrl + 'users/' + id, options);
      return user;
    } catch (error) {
      console.log('getUserById: ', error.message);
    }
  };

  // Method for editing user details
  const putUser = async (data, token) => {
    const options = {
      method: 'put',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      console.log('Options ' + options);
      return await doFetch(baseUrl + 'users', options);
    } catch (error) {
      throw new Error('put user: ' + error.message);
    }
  };

  return {checkUser, registerUser, checkUserByToken, getUserById, putUser};
};

// Method for fetching, uploading and editing posts from backend
const useMedia = (myFilesOnly) => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update, user} = useContext(MainContext);

  // Method for fetching all medias from api
  const loadMedia = async () => {
    try {
      // const media = await useTag().getFilesByTag(appId);
      let json = await useTag().getFilesByTag(appId);
      if (myFilesOnly) {
        json = json.filter((file) => file.user_id === user.user_id);
      }
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

  // Method for adding new post.
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

  // Method for searching media
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

  // Method for getting the list of post done by a user
  const userMedia = async (userId) => {
    try {
      // const media = await useTag().getFilesByTag(appId);
      let json = await useTag().getFilesByTag(appId);
      json = json.filter((file) => file.user_id === userId);
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      );
      return media.reverse();
    } catch (error) {
      console.log('loadMedia: ', error.message);
    }
  };

  // Method for editing a media/post in the api
  const putMedia = async (id, data, token) => {
    const options = {
      method: 'put',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const uploadResult = await doFetch(baseUrl + 'media/' + id, options);
      return uploadResult;
    } catch (error) {
      console.log('putMedia:', error.message);
    }
  };

  // Method for deleting media/post from the api.
  const deleteMedia = async (id, token) => {
    try {
      return await doFetch(baseUrl + 'media/' + id, {
        headers: {'x-access-token': token},
        method: 'delete',
      });
    } catch (error) {
      console.log('deleteMedia: ', error.message);
    }
  };

  const loadSingleMedia = async (fileId) => {
    try {
      return await doFetch(baseUrl + 'media/' + fileId);
    } catch (error) {
      console.log('loadSingleMedia: ', error.message);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [update]);
  return {
    loadMedia,
    postMedia,
    searchMedia,
    mediaArray,
    userMedia,
    deleteMedia,
    putMedia,
    loadSingleMedia,
  };
};

// Method for using tag features
const useTag = () => {
  // Method for fetching files using tag
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + 'tags/' + tag);
    } catch (error) {
      console.log('getFilesByTag', error.message);
    }
  };

  // Method for posting new tags
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

// Method for using favourites features
const useFavourite = () => {
  // Method for adding new favourites
  const postFavourite = async (token, fileId) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id: fileId}),
    };
    try {
      const favourite = await doFetch(baseUrl + 'favourites', options);
      return favourite;
    } catch (error) {
      console.log('postFavourite: ', error.message);
    }
  };

  // Method for deleting new favourites
  const deleteFavourite = async (token, fileId) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const result = await doFetch(
        baseUrl + 'favourites/file/' + fileId,
        options
      );
      return result;
    } catch (error) {
      console.log('deleteFavourite: ', error.message);
    }
  };

  // Method for getting list of favourites
  const getFavourites = async (fileId) => {
    try {
      const result = await doFetch(baseUrl + 'favourites/file/' + fileId);
      return result;
    } catch (error) {
      console.log('deleteFavourite: ', error.message);
    }
  };

  return {postFavourite, deleteFavourite, getFavourites};
};

// Method for using comment features
const useComment = () => {
  // Method for posting new comment
  const postComment = async (token, data) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const result = await doFetch(baseUrl + 'comments', options);
      return result;
    } catch (error) {
      console.log('postComment: ', error.message);
    }
  };

  // Method for deleting comment
  const deleteComment = async (token, fileId) => {
    const options = {
      method: 'Delete',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const result = await doFetch(baseUrl + 'comments/' + fileId, options);
      return result;
    } catch (error) {
      console.log('deleteComment: ', error.message);
    }
  };

  // Method for getting comments according to id
  const getCommentsById = async (fileId) => {
    try {
      const comments = await doFetch(baseUrl + 'comments/file/' + fileId);
      return comments;
    } catch (error) {
      console.log('getCommentsById: ', error.message);
    }
  };
  return {postComment, deleteComment, getCommentsById};
};

// MEthods for using rating features
const useRating = () => {
  // Method for adding new rating
  const postRating = async (token, data) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const result = await doFetch(baseUrl + 'ratings', options);
      return result;
    } catch (error) {
      console.log('postRating: ', error.message);
    }
  };

  // Method for deleting rating
  const deleteRating = async (token, fileId) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const result = await doFetch(baseUrl + 'ratings/file/' + fileId, options);
      return result;
    } catch (error) {
      console.log('deleteRating: ', error.message);
    }
  };

  // Method for getting ratind by Id
  const getRatingById = async (fileId) => {
    try {
      const result = await doFetch(baseUrl + 'ratings/file/' + fileId);
      return result;
    } catch (error) {
      console.log('getRatingById: ', error.message);
    }
  };

  return {postRating, deleteRating, getRatingById};
};

export {
  useAuthentication,
  useUser,
  useMedia,
  useTag,
  useFavourite,
  useComment,
  useRating,
};
