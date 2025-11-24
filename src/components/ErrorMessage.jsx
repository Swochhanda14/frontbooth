function ErrorMessage({ message }) {
  if (!message) return null;
  return <p className="text-red-800">{message}</p>;
}
export default ErrorMessage;
