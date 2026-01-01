import styles from "./EnrollmentForm/EnrollmentForm.module.css";

const InputField = ({
  type = "text",
  placeholder = "",
  name,
  category,
  value,
  handleChange,
  handleBlur,
  errors,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      data-category={category}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className={errors[name] ? styles.error : ""}
      required
    />
  );
};

export default InputField;
