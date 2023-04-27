import { baseUrl } from "../utils/Variables";

const doFetch = async(url, options) => {
  const response = await fetch(url,options);
  const json = await response.json();
  if(!response.ok)  {
    const message = json.error
    ? `${json.message} : ${json.error}`
    :json.message
    throw new Error(message || response.statusText);
  }
  return json;
};

const useAuthentication = () => {
  const postLogin = async(userCredentials) => {
    console.log("working,", userCredentials);
    const options = {
      method:"post",
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      const loginResult = await doFetch(baseUrl + 'login', options);
      console.log("loginResult", loginResult);
      return loginResult;
    } catch (error) {
      throw new Error("postLogin:", error.message);
    }
  };
  return {postLogin};
}

export {
  useAuthentication,
}
