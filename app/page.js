import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Milliarium
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                A modern Kanban task manager that helps you organize your work and life
              </p>
            </div>
            <div className="flex justify-center">
              <Link
                href="/auth/login"
                className="rounded-md bg-primary-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
