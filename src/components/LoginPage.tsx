import { Mail } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-blue-600 mb-2">Peli</h1>
          <p className="text-gray-600">Penn Dining Hall Ratings</p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="mb-4">Welcome to Peli</h2>
            <p className="text-gray-600 mb-6">
              Sign in with your Penn email to view ratings and share your dining hall experiences.
            </p>
          </div>

          <button
            onClick={onLogin}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Sign in with Penn Email
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Note:</strong> Your ratings will be aggregated anonymously. Individual identities are never
              displayed publicly.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-center">
            By signing in, you agree to allow your ratings to be used for aggregation and academic analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
