function InputField({
  type = "text",
  id,
  name,
  placeholder,
  register,
  validation,
}) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="p-3 border rounded w-full mb-4"
      {...(register ? register(name, validation) : {})}
    />
  );
}
export default InputField;
