export function BlogListingSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading blog stories" className="animate-pulse">
      <div className="grid grid-cols-1 gap-10 border-y border-dark/10 py-8 md:py-12 lg:grid-cols-12 lg:gap-16">
        <div className="aspect-[16/10] bg-dark/5 lg:col-span-7" />
        <div className="space-y-6 lg:col-span-5 lg:py-10">
          <div className="h-3 w-32 bg-gold/20" />
          <div className="h-12 w-full bg-dark/5" />
          <div className="h-12 w-4/5 bg-dark/5" />
          <div className="h-4 w-full bg-dark/5" />
          <div className="h-4 w-3/4 bg-dark/5" />
        </div>
      </div>
    </div>
  );
}
