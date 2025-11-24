function Button({ type = "button", text }) {
  return (
    <button type={type} className="bg-amber-700 text-white p-3 rounded font-bold">
      {text}
    </button>
  );
}
export default Button;
