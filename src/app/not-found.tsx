import Link from 'next/link';
import Logo from './_components/Logo';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      {/* Logo Component */}
      <div className="mb-8">
        <Logo />
      </div>
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-400 mb-4 mt-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-100 mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-6">
          Sorry, we couldn’t find the page you’re looking for or it is under maintenance.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 transition duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
