export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-bold text-gray-400">
                404
            </h1>

            <h2 className="text-2xl font-semibold mt-4">
                Page Not Found
            </h2>

            <p className="text-gray-500 mt-2">
                Sorry, the page you are looking for does not exist.
            </p>

            <a
                href="/#home"
                className="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
                Back to Home
            </a>
        </main>
    );
}