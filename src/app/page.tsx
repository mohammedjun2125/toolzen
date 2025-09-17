import Link from 'next/link';
import { tools } from '@/lib/tools';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background to-card/20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary mb-4">
              Welcome to Toolzen
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
              A suite of free, fast, and privacy-focused online tools to boost your productivity.
              No data is sent to our servers for most tools. Everything happens in your browser.
            </p>
          </div>
        </section>

        <section className="w-full pb-20 md:pb-32 lg:pb-40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.map((tool) => (
                <Link href={tool.href} key={tool.href} className="group">
                  <Card className="h-full transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2 shadow-lg rounded-lg bg-card border">
                    <CardHeader className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <tool.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg font-semibold text-card-foreground">{tool.name}</CardTitle>
                      </div>
                      <CardDescription className="mt-4 text-sm text-muted-foreground">{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
