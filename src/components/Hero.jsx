export default function Hero() {
  return (
    <section className="overflow-hidden bg-green-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">

        {/* Left Side */}
        <div>

          <div className="mb-5 inline-flex rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-800 shadow-sm">
            🎓 NSUK Student Academic Tool
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Calculate Your{" "}
            <span className="text-green-700">CGPA</span>{" "}
            With Ease
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Enter your courses, scores and credit units to automatically
            calculate your GPA and CGPA. Get instant feedback about your
            academic performance and know where you stand.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="#calculator"
              className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-800"
            >
              Start Calculating →
            </a>

            <a
              href="#about"
              className="rounded-lg border border-green-300 bg-white px-6 py-3 font-semibold text-green-800 transition hover:bg-green-100"
            >
              Learn More
            </a>

          </div>

          {/* Features */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
            <span>✓ Automatic Calculation</span>
            <span>✓ Accurate Results</span>
            <span>✓ Performance Advice</span>
          </div>

        </div>

        {/* Right Side */}
        <div className="relative">

          <div className="rounded-3xl bg-gradient-to-br from-green-700 to-green-900 p-8 shadow-2xl">

            {/* CGPA */}
            <div className="mb-6 text-center text-white">

              <p className="text-sm opacity-80">
                Current CGPA
              </p>

              <p className="mt-2 text-6xl font-bold">
                4.25
              </p>

              <div className="mx-auto mt-3 inline-flex rounded-full bg-green-500/20 px-4 py-1.5 text-sm font-medium text-green-100">
                Excellent Performance
              </div>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-white p-5">
                <p className="text-sm text-gray-500">
                  GPA
                </p>

                <p className="mt-1 text-2xl font-bold text-green-800">
                  4.50
                </p>
              </div>

              <div className="rounded-xl bg-white p-5">
                <p className="text-sm text-gray-500">
                  Total Units
                </p>

                <p className="mt-1 text-2xl font-bold text-green-800">
                  18
                </p>
              </div>

            </div>

            {/* Advice */}
            <div className="mt-4 rounded-xl bg-white p-5">

              <p className="font-semibold text-green-800">
                🎉 Excellent!
              </p>

              <p className="mt-1 text-sm text-gray-600">
                Keep maintaining your academic performance.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}