import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-1 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-primary">Home</Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-1">
            <ChevronRight className="h-4 w-4" />
            <Link 
              href={item.href}
              className={index === items.length - 1 ? 'font-medium text-foreground' : 'hover:text-primary'}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}