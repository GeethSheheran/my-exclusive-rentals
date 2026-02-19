import { Button } from '@/components/ui/Button';


export function CTASection() {
    return (
        <section className="py-20 md:py-24 bg-floral-white relative overflow-hidden">
            {/* Abstract Background Element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-floral-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container relative z-10 text-center">
                <h2 className="font-serif text-5xl md:text-7xl font-light text-dark mb-8">
                    Your Dream Stay <span className="text-gold ">Awaits</span>
                </h2>
                <p className="text-dark/90 text-xl tracking-wide font-thin font-sans mb-12 max-w-2xl mx-auto">
                    Book your stay with Exclusive Rentals today and experience the perfect blend of luxury and tranquility in Nilaveli.
                </p>
                <Button variant="solid" className="lg:flex mx-auto rounded-full !px-6 !py-5 text-xs font-bold tracking-wider shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all hover:-translate-y-0.5">
                    Enquire Now
                </Button>
            </div>
        </section>
    );
}
