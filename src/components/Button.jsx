function Button({ type = "button", text, onClick, className = "", disabled, ...rest }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
      className= " justify-center rounded-md bg-amber-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {text}
    </button>
  );
}
export default Button;
