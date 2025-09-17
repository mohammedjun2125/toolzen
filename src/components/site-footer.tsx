import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Toolzen. All rights reserved.</p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
