const getHostAPIUrl = () => {
  if (import.meta.env.REACT_APP_NODE_ENV === "production") return "https://";
  return "https://api-dtacyber-staging.ajaidanial.wtf";
};
export default getHostAPIUrl;
