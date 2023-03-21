const AppTitle1 = ({ text, otherClassNames = "", color = "black" }) => (
  <h1
    className={`text-${color} ${otherClassNames} app_title_1`}
    style={{ fontSize: "40px" }}
  >
    {text}
  </h1>
);

export default AppTitle1;
