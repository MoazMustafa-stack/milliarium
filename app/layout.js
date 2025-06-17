require('./globals.css')

export const metadata = {
  title: 'Milliarium - Kanban Task Manager',
  description: 'A modern board task manager',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}