export default function Navbar() {
  return (
    <nav className="border-b border-green-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo and Name */}
        <div className="flex items-center gap-3">
          {/* Temporary NSUK Logo */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-700 bg-green-50 text-xl">
            🎓
          </div>

          <div>
            <h1 className="text-lg font-bold text-green-800 sm:text-xl">
              NSUK CGPA Calculator
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Knowledge for Development
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#"
            className="font-medium text-green-800 transition hover:text-green-600"
          >
            Home
          </a>

          <a
            href="#about"
            className="font-medium text-gray-600 transition hover:text-green-700"
          >
            About
          </a>
          <a
            href="#calculator"
            className="font-medium text-gray-600 transition hover:text-green-700"
          >
            Calculator
          </a>

        </div>

        {/* Button */}
        <a
          href="#calculator"
          className="rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 sm:px-5"
        >
          Calculate Now
        </a>

      </div>
    </nav>
  );
}