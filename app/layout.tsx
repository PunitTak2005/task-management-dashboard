
import './globals.css';
import ClientLayoutWrapper from '@/src/components/ClientLayoutWrapper';

export const metadata = {
  title: 'Task Management Dashboard',
  description: 'Manage your tasks efficiently',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 min-h-screen">
                  <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
