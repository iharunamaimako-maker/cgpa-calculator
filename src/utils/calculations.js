// Grade boundaries for the 5-point grading system
export const gradeScale = [
  { min: 70, grade: "A", point: 5 },
  { min: 60, grade: "B", point: 4 },
  { min: 50, grade: "C", point: 3 },
  { min: 45, grade: "D", point: 2 },
  { min: 40, grade: "E", point: 1 },
  { min: 0, grade: "F", point: 0 },
];

// Convert a score into a grade and grade point
export function getGrade(score) {
  const numericScore = Number(score);

  if (Number.isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
    return {
      grade: "-",
      point: 0,
    };
  }

  const result = gradeScale.find(
    (item) => numericScore >= item.min
  );

  return {
    grade: result.grade,
    point: result.point,
  };
}

// Calculate quality point for one course
export function calculateQualityPoint(unit, gradePoint) {
  return Number(unit) * Number(gradePoint);
}

// Calculate GPA for a collection of courses
export function calculateGPA(courses) {
  if (!courses || courses.length === 0) {
    return 0;
  }

  let totalUnits = 0;
  let totalQualityPoints = 0;

  courses.forEach((course) => {
    const unit = Number(course.unit);
    const score = Number(course.score);

    if (unit > 0 && !Number.isNaN(score)) {
      const { point } = getGrade(score);

      totalUnits += unit;
      totalQualityPoints += calculateQualityPoint(unit, point);
    }
  });

  if (totalUnits === 0) {
    return 0;
  }

  return totalQualityPoints / totalUnits;
}

// Calculate CGPA from multiple semesters
export function calculateCGPA(semesters) {
  if (!semesters || semesters.length === 0) {
    return 0;
  }

  let totalUnits = 0;
  let totalQualityPoints = 0;

  semesters.forEach((semester) => {
    semester.courses?.forEach((course) => {
      const unit = Number(course.unit);
      const score = Number(course.score);

      if (unit > 0 && !Number.isNaN(score)) {
        const { point } = getGrade(score);

        totalUnits += unit;
        totalQualityPoints += calculateQualityPoint(unit, point);
      }
    });
  });

  if (totalUnits === 0) {
    return 0;
  }

  return totalQualityPoints / totalUnits;
}

// Determine academic performance
export function getPerformanceAdvice(cgpa) {
  const value = Number(cgpa);

  if (Number.isNaN(value)) {
    return {
      level: "No Result",
      message:
        "Enter your course information to receive your academic performance feedback.",
    };
  }

  if (value >= 4.5) {
    return {
      level: "Excellent Performance 🎉",
      message:
        "Outstanding performance! Your CGPA is excellent. Keep maintaining your consistency, discipline, and strong study habits.",
    };
  }

  if (value >= 3.5) {
    return {
      level: "Very Good Performance 👏",
      message:
        "Very good performance! You are doing well academically. Keep working consistently and focus on improving your weaker courses to reach an excellent CGPA.",
    };
  }

  if (value >= 2.5) {
    return {
      level: "Good Performance 👍",
      message:
        "Good performance, but there is still room for improvement. Identify the courses where you scored lower and dedicate more study time to them.",
    };
  }

  if (value >= 2.0) {
    return {
      level: "Fair Performance ⚠️",
      message:
        "Your performance is fair, but you need to put in more effort. Improve your study routine, attend classes regularly, and seek help when you have difficulty understanding a course.",
    };
  }

  return {
    level: "Needs Improvement 📚",
    message:
      "Your current performance needs significant improvement. Review your study habits, focus on your weaker courses, and consider seeking academic support from lecturers or classmates.",
  };
}

// Determine class of degree from CGPA
export function getClassification(cgpa) {
  const value = Number(cgpa);

  if (value >= 4.5) {
    return "First Class";
  }

  if (value >= 3.5) {
    return "Second Class Upper";
  }

  if (value >= 2.5) {
    return "Second Class Lower";
  }

  if (value >= 2.0) {
    return "Third Class";
  }

  return "Pass";
}