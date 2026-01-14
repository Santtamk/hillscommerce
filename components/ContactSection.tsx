"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      // Reset after a delay
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="w-full bg-[var(--color-pine)] px-6 py-20 text-[var(--color-paper)]">
      <div className="mx-auto max-w-4xl text-center">
        <FadeIn direction="up">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-rust)]">
            Connect
          </span>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl">get in touch</h2>
          <p className="mx-auto mt-6 max-w-lg text-[var(--color-paper)]/70 leading-relaxed">
            Have a question about our products or just want to say hello? We'd love to hear from you.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-md space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full border-b border-[var(--color-paper)]/20 bg-transparent px-4 py-3 text-sm placeholder:text-[var(--color-paper)]/40 focus:border-[var(--color-rust)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full border-b border-[var(--color-paper)]/20 bg-transparent px-4 py-3 text-sm placeholder:text-[var(--color-paper)]/40 focus:border-[var(--color-rust)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  required
                  className="w-full resize-none border-b border-[var(--color-paper)]/20 bg-transparent px-4 py-3 text-sm placeholder:text-[var(--color-paper)]/40 focus:border-[var(--color-rust)] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="group relative w-full overflow-hidden border border-[var(--color-paper)]/20 px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-[var(--color-paper)] hover:text-[var(--color-pine)] disabled:opacity-50 transition-all duration-500"
            >
              <span className="relative z-10">
                {status === "idle" && "Send Message"}
                {status === "submitting" && "Sending..."}
                {status === "success" && "Message Sent"}
              </span>
            </button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
