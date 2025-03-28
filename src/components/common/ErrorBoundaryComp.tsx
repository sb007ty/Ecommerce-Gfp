import { FallbackProps } from "react-error-boundary";

function ErrorBoundaryComp({ error, resetErrorBoundary }: FallbackProps) {
  console.log(error, typeof error, " bro********");
  console.dir(error);
  return (
    <div>
      {/* Error-{error?.message} */}
      <button onClick={(e) => resetErrorBoundary()}>Refresh</button>
    </div>
  );
}

export default ErrorBoundaryComp;
