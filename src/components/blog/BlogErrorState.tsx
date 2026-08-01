import { AlertCircle } from "lucide-react";

export function BlogErrorState({ message }: { message: string }) {
  return (
    <div className="border-y border-dark/10 py-24 text-center" role="alert">
      <AlertCircle aria-hidden="true" className="mx-auto text-gold" size={34} strokeWidth={1} />
      <h2 className="mt-6 break-words font-serif text-3xl text-dark md:text-4xl">The blog is unavailable</h2>
      <p className="mx-auto mt-4 max-w-xl break-all font-sans font-light leading-relaxed text-dark/55">
        {message}
      </p>
    </div>
  );
}
