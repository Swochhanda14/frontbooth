function Button({ type = "button", text }) {
  return (
    <button type={type} className="bg-amber-700 text-white p-3 rounded">
      {text}
    </button>
  );
}
export default Button;
