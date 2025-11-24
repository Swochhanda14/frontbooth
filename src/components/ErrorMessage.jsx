function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mt-1 inline-block rounded border border-red-200 bg-red-50 px-2 py-1 text-sm text-red-700"
    >
      {message}
    </p>
  );
}
export default ErrorMessage;
