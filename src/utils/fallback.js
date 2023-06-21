"use client";

function Fallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong: </p>
      <pre style={{ color: "blue" }}>{error.message}</pre>
    </div>
  );
}

export default Fallback;
