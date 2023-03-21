import useAppStore from "src/store";

const removeUserToken = () => {
  const invalidateUser = useAppStore.getState().removeUserNameAndToken;
  localStorage.removeItem("token");
  invalidateUser();
};

export default removeUserToken;
