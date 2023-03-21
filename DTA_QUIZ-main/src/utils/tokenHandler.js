const setTokenInStorage = (data) => {
  if (data) {
    console.log("set token in storage",data)
    localStorage.setItem("DTA_TOKEN", JSON.stringify(data));
  }
};

const getTokenFromStorage = () => {
  return JSON.parse(localStorage.getItem("DTA_TOKEN"));
};

const removeTokenFromStorage = () => {
  localStorage.removeItem("DTA_TOKEN");
};

export { getTokenFromStorage, setTokenInStorage, removeTokenFromStorage };
