const features = [
  {
    icon: "🧮",
    title: "Automatic Calculation",
    description:
      "Enter your courses, scores and credit units and let the calculator automatically calculate your GPA and CGPA.",
  },
  {
    icon: "📊",
    title: "GPA & CGPA Tracking",
    description:
      "Keep track of your semester GPA and overall CGPA in one simple and easy-to-use interface.",
  },
  {
    icon: "🎓",
    title: "Grade Evaluation",
    description:
      "Your scores are automatically converted into the appropriate grades and grade points.",
  },
  {
    icon: "💡",
    title: "Performance Advice",
    description:
      "Receive simple academic feedback based on your calculated performance.",
  },
];

export default function Features() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
            Why Use Our Calculator?
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need to Track Your Academic Performance
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            A simple academic tool designed to help students understand and
            monitor their academic performance.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-green-100 bg-green-50/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-2xl transition group-hover:bg-green-700">
                <span className="group-hover:grayscale">
                  {feature.icon}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}