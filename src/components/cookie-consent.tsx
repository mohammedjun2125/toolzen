'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        setShow(true);
      }
    } catch (error) {
      // localStorage is not available
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem('cookie_consent', 'true');
    } catch (error) {
       // localStorage is not available
    }
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
      <Card className="m-4 max-w-lg w-full shadow-2xl rounded-lg">
        <CardHeader>
          <CardTitle>We value your privacy</CardTitle>
          <CardDescription>
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-2">
          <Button onClick={accept} className="w-full">Accept All</Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/privacy">Read Privacy Policy</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}