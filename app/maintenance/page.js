export default function Maintenance() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🛠️ We're Upgrading!</h1>
          <p className="mt-2 text-center text-gray-700">
            The website is currently under maintenance to bring you an even better experience.
            We'll be back soon with exciting improvements. 🚀
          </p>
          <p className="mt-4 text-gray-600">Getting back to you soon... ⏳</p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <span>⚡</span>
              <span>Optimizing performance</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <span>🎨</span>
              <span>Enhancing design</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <span>🔧</span>
              <span>Fixing bugs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
