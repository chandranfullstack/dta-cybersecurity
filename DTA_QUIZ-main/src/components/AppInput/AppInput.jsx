import React from "react";

const AppInput = ({
  placeholder,
  name,
  value,
  onChange,
  type = "text",
  customStyles,
  id,
  isRequired,
  className,
  inputStyles,
  IconSrc,
  iconClickAction,
  ...restProps
}) => {
  return (
    <>
      <div style={{ ...customStyles }} className="position-relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          required={isRequired}
          className={className}
          style={{ ...inputStyles }}
          {...restProps}
        />

        {IconSrc && (
          <IconSrc
            className="position-absolute"
            onClick={iconClickAction}
            style={{
              top: "22px",
              right: "22px",
              cursor: "pointer",
              width: "18px",
              height: "18px",
              color: "#136378",
            }}
          />
        )}
      </div>
    </>
  );
};

export default AppInput;
