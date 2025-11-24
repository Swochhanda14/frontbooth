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
      className="p-3 border rounded w-full mb-1 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
      {...(register ? register(name, validation) : {})}
    />
  );
}
export default InputField;
