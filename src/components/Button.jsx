import React from "react";
import styles from "@/styles/components/Button.module.scss";

/**
 * @typedef {'primary' | 'secondary' | 'third' | 'forth' } color
 * @param {{onClick:React.MouseEventHandler<HTMLButtonElement>, children:React.ReactNode, className:string, color:color}}
 */
const Button = ({
  children,
  onClick = () => {},
  color = "primary",
  className,
  type = "button",
  isLoading = false,
  disabled,
  style
}) => {
  return (
    <button
      className={`${styles["btn-" + color]} py-2 px-5 rounded  fw-bold submit_button`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {isLoading ? (
        <div
          className="spinner-grow text-white "
          role="status"
          style={{ width: "10px", height: "10px" }}
        >
            <span className="visually-hidden">Loading...</span>

        </div>
      ) : (
        <div className={className}>{children}</div>
      )}
    </button>
  );
};

export default Button;
