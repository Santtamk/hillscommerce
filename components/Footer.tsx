import { siteContent } from "@/data/content";

export default function Footer() {
  const { footer } = siteContent;
  return (
    <footer className="w-full border-t border-[var(--color-stone)] bg-[var(--color-paper)] pb-12 pt-16">
      <div className="mx-auto max-w-md px-6 text-center">
        <div className="border-t-2 border-dashed border-[var(--color-stone)] pt-8 space-y-4">
          <h4 className="font-serif text-xl italic text-[var(--color-pine)]">
            Himalayan Nostalgia
          </h4>
          
          <div className="space-y-2 font-mono text-xs uppercase tracking-widest text-[var(--color-pine)]/60">
            <p>{footer.address.street}</p>
            <p>{footer.address.city}</p>
            <p>{footer.address.email}</p>
          </div>

          <div className="pt-8">
             <p className="font-mono text-[10px] text-[var(--color-stone)]">
               {footer.copyright}
             </p>
             <p className="mt-2 font-mono text-[10px] text-[var(--color-stone)]">
               {footer.tagline}
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
