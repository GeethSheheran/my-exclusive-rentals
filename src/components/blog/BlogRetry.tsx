export function BlogRetry({ onRetry }: { onRetry: () => void }) {
  return (
    <div role="alert" className="mb-8 border border-gold/30 p-6 font-sans text-dark/70">
      <p>We couldn’t load the latest stories. Please try again.</p>
      <button type="button" onClick={onRetry} className="mt-3 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-gold">
        Try again
      </button>
    </div>
  );
}
