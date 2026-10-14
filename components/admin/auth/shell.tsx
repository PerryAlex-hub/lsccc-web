import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { assets } from "@/lib/assets";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="admin-workspace grid min-h-screen bg-[#f4f6f8] lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="relative flex flex-col overflow-hidden bg-navy px-6 py-7 text-white sm:px-10 lg:min-h-screen lg:px-14 lg:py-12">
        <Image
          src={assets.operations.image}
          alt=""
          fill
          priority
          className="object-cover opacity-20"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
        <div className="absolute inset-0 bg-navy/65" />
        <Link href="/" className="relative flex max-w-sm items-center gap-4">
          <Image
            src={assets.lscccEmblem.image}
            alt={assets.lscccEmblem.alt}
            width={60}
            height={60}
            className="size-14 rounded-full object-cover"
          />
          <span className="text-sm font-bold leading-6">
            Lagos State Command
            <br />
            &amp; Control Centre
          </span>
        </Link>
        <div className="relative my-auto hidden max-w-md py-20 lg:block">
          <p className="mb-5 text-xs font-bold tracking-[0.16em] text-gold">
            STAFF WORKSPACE
          </p>
          <p className="text-[40px] font-bold leading-[1.25]">
            Keeping Lagos
            <br />
            informed.
          </p>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/75">
            Manage the news, resources and information that connect the centre
            with the people of Lagos.
          </p>
        </div>
        <p className="relative hidden text-xs text-white/60 lg:block">
          Authorised staff access · LSCCC
        </p>
      </aside>
      <div className="flex min-w-0 flex-col">
        <div className="border-b border-[#e6d9b0] bg-[#fff8e6] px-6 py-3 text-xs leading-5 text-[#705b25]">
          Staff access is by invitation. Contact your administrator if you need
          an account.
        </div>
        <main
          id="auth-main"
          className="mx-auto flex w-full max-w-[520px] flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:py-16"
        >
          {children}
        </main>
        <footer className="px-6 pb-7 text-center text-xs text-muted">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center hover:text-blue"
          >
            Return to the public website
          </Link>
        </footer>
      </div>
    </div>
  );
}
