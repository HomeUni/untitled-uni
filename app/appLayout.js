// AppLayout.js

import { ThemeProvider } from './hooks/themeProvider'; // Update the path
import Nav from './nav';
import Footer from './footer';
import { Suspense } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function AppLayout({ children }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <html lang="en" className="h-full">
          <body className="h-full bg-gray-50 dark:bg-dark-background-muted">
            <Suspense>
              <Nav />
            </Suspense>
            {children}
            <Footer />
          </body>
        </html>
      </UserProvider>
    </ThemeProvider>
  );
}
