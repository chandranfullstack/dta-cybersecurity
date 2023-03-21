import React from "react";

/**
 * The just a wrapper component to convert all the non clickable components
 * to clickable component. Used for converting <p> tags to clickable.
 */
const AppJustClickableWrapper = (props) => {
  const { children, onClick, isDisabled = false } = props;

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type="button"
      className="app_just_clickable_wrapper"
    >
      {children}
    </button>
  );
};

export default AppJustClickableWrapper;
