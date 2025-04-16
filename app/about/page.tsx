export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <div className="relative h-[500px] bg-gradient-to-r from-purple-200 to-purple-400 dark:from-red-900 dark:to-red-700">
        <div className="absolute inset-0 flex items-center px-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                After Buying Our Products, Why Would You Come
              </p>
              <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
                Back To
                <br />
                Buy Again
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Section */}
      <div className="bg-[#ebcc4d] dark:bg-[#eea920] p-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-7xl font-bold text-gray-900">
              Royal
              <br />
              Fashion
            </h2>
            <p className="text-3xl text-gray-800">Feel Royal</p>
          </div>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="bg-gray-900 text-white p-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start space-x-8">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-yellow-400">👕</span>
                <h3 className="text-xl font-semibold">Product</h3>
              </div>
              <p className="text-gray-400">
                Online shopping for retail sales direct to consumers via Web
                sites and mobile apps.
              </p>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold">BEST SERVICE</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-100 dark:bg-gray-800 p-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Best Value</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Premium quality products
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Cash-Back</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Money-back guarantee
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">100% Secure Payment</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We ensure secure payment!
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Customer Support 24/7</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Instant access to perfect support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
