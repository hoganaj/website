import { ReactNode } from 'react';

export const metadata = {
  title: 'Sanity',
  description: 'Edit blog using Sanity',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
