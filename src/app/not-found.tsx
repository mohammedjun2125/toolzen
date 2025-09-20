
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
          <p className="text-muted-foreground mt-2">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
