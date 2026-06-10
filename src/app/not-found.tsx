import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-beige px-6 text-center">
      <div>
        <p className="font-serif text-[clamp(64px,12vw,140px)] leading-none text-green">404</p>
        <p className="mt-4 text-lg text-ink-soft">
          Aradığınız sayfa bulunamadı. / This page could not be found.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-green px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-green-deep"
        >
          Ana sayfa / Home
        </Link>
      </div>
    </main>
  );
}
