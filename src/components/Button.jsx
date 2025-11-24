function Button({ type = "button", text, onClick, ...rest }) {
  return (
    <button
      type={type}
      className="bg-amber-700 text-white p-3 rounded font-bold"
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
}
export default Button;
