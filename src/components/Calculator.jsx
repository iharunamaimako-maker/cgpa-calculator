"use client";

import { useMemo, useState } from "react";
import {
  calculateGPA,
  getGrade,
  getPerformanceAdvice,
  getClassification,
} from "@/utils/calculations";

const createCourse = () => ({
  id: Date.now() + Math.random(),
  code: "",
  title: "",
  unit: "",
  score: "",
});

const createSemester = () => ({
  id: Date.now() + Math.random(),
  gpa: "",
  units: "",
});

export default function Calculator() {
  const [courses, setCourses] = useState([createCourse()]);

  const [previousSemesters, setPreviousSemesters] = useState([]);

  const [studentInfo, setStudentInfo] = useState({
    name: "",
    matricNumber: "",
    department: "",
    level: "",
    semester: "",
    session: "",
  });

  // =========================
  // STUDENT INFORMATION
  // =========================

  const updateStudentInfo = (field, value) => {
    setStudentInfo((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =========================
  // COURSE FUNCTIONS
  // =========================

  const updateCourse = (id, field, value) => {
    setCourses((previousCourses) =>
      previousCourses.map((course) =>
        course.id === id
          ? {
              ...course,
              [field]: value,
            }
          : course
      )
    );
  };

  const addCourse = () => {
    setCourses((previousCourses) => [
      ...previousCourses,
      createCourse(),
    ]);
  };

  const removeCourse = (id) => {
    setCourses((previousCourses) => {
      if (previousCourses.length === 1) {
        return previousCourses;
      }

      return previousCourses.filter((course) => course.id !== id);
    });
  };

  // =========================
  // PREVIOUS SEMESTER FUNCTIONS
  // =========================

  const addSemester = () => {
    setPreviousSemesters((previousSemesters) => [
      ...previousSemesters,
      createSemester(),
    ]);
  };

  const removeSemester = (id) => {
    setPreviousSemesters((previousSemesters) =>
      previousSemesters.filter(
        (semester) => semester.id !== id
      )
    );
  };

  const updateSemester = (id, field, value) => {
    setPreviousSemesters((previousSemesters) =>
      previousSemesters.map((semester) =>
        semester.id === id
          ? {
              ...semester,
              [field]: value,
            }
          : semester
      )
    );
  };

  // =========================
  // RESET CALCULATOR
  // =========================

  const resetCalculator = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the calculator? All your data will be lost."
    );

    if (!confirmed) {
      return;
    }

    setCourses([createCourse()]);
    setPreviousSemesters([]);

    setStudentInfo({
      name: "",
      matricNumber: "",
      department: "",
      level: "",
      semester: "",
      session: "",
    });
  };

  // =========================
  // CALCULATIONS
  // =========================

  const results = useMemo(() => {
    const validCourses = courses.filter(
      (course) =>
        Number(course.unit) > 0 &&
        course.score !== "" &&
        Number(course.score) >= 0 &&
        Number(course.score) <= 100
    );

    const gpa = calculateGPA(validCourses);

    const totalUnits = validCourses.reduce(
      (total, course) =>
        total + Number(course.unit),
      0
    );

    const totalQualityPoints = validCourses.reduce(
      (total, course) => {
        const { point } = getGrade(course.score);

        return (
          total +
          Number(course.unit) * point
        );
      },
      0
    );

    const previousQualityPoints =
      previousSemesters.reduce(
        (total, semester) => {
          const semesterGpa = Number(semester.gpa);
          const semesterUnits = Number(semester.units);

          if (
            semesterGpa >= 0 &&
            semesterGpa <= 5 &&
            semesterUnits > 0
          ) {
            return (
              total +
              semesterGpa * semesterUnits
            );
          }

          return total;
        },
        0
      );

    const previousUnits =
      previousSemesters.reduce(
        (total, semester) => {
          const semesterGpa = Number(semester.gpa);
          const semesterUnits = Number(semester.units);

          if (
            semesterGpa >= 0 &&
            semesterGpa <= 5 &&
            semesterUnits > 0
          ) {
            return total + semesterUnits;
          }

          return total;
        },
        0
      );

    const overallQualityPoints =
      previousQualityPoints +
      totalQualityPoints;

    const overallUnits =
      previousUnits + totalUnits;

    const cgpa =
      overallUnits > 0
        ? overallQualityPoints / overallUnits
        : 0;

    return {
      gpa,
      totalUnits,
      totalQualityPoints,
      previousQualityPoints,
      previousUnits,
      overallQualityPoints,
      overallUnits,
      cgpa,
      classification: getClassification(cgpa),
      advice: getPerformanceAdvice(cgpa),
    };
  }, [courses, previousSemesters]);

  // =========================
  // UI
  // =========================

  return (
    <section
      id="calculator"
      className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-green-900 sm:text-4xl">
            CGPA Calculator
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Enter your course details and scores to
            calculate your semester GPA and overall CGPA.
          </p>
        </div>

        {/* COURSE CALCULATOR */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md sm:p-8">

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-2xl font-bold text-green-900">
                Course Calculator
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Enter your courses, units and scores.
              </p>
            </div>

            <button
              type="button"
              onClick={addCourse}
              className="rounded-lg bg-green-800 px-5 py-3 font-semibold text-white transition hover:bg-green-900"
            >
              + Add Course
            </button>

          </div>

          {/* COURSE TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px] border-collapse">

              <thead>
                <tr className="border-b border-gray-200 bg-green-50 text-left">

                  <th className="px-4 py-4 text-sm font-semibold text-green-900">
                    Course Code
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-green-900">
                    Course Title
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-green-900">
                    Unit
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-green-900">
                    Score
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-green-900">
                    Grade
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-green-900">
                    Quality Point
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-green-900">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>
                {courses.map((course) => {
                  const { grade, point } =
                    getGrade(course.score);

                  const qualityPoint =
                    Number(course.unit) > 0 &&
                    course.score !== "" &&
                    Number(course.score) >= 0 &&
                    Number(course.score) <= 100
                      ? Number(course.unit) * point
                      : 0;

                  return (
                    <tr
                      key={course.id}
                      className="border-b border-gray-100"
                    >

                      {/* COURSE CODE */}
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={course.code}
                          onChange={(event) =>
                            updateCourse(
                              course.id,
                              "code",
                              event.target.value
                            )
                          }
                          placeholder="CSC101"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
                        />
                      </td>

                      {/* COURSE TITLE */}
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={course.title}
                          onChange={(event) =>
                            updateCourse(
                              course.id,
                              "title",
                              event.target.value
                            )
                          }
                          placeholder="Course title"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
                        />
                      </td>

                      {/* UNIT */}
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          min="1"
                          max="3"
                          step="1"
                          value={course.unit}
                          onChange={(event) => {
                            const value =
                              event.target.value;

                            if (
                              value === "" ||
                              (Number(value) >= 1 &&
                                Number(value) <= 3)
                            ) {
                              updateCourse(
                                course.id,
                                "unit",
                                value
                              );
                            }
                          }}
                          placeholder="3"
                          className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
                        />
                      </td>

                      {/* SCORE */}
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="1"
                          value={course.score}
                          onChange={(event) => {
                            const value =
                              event.target.value;

                            if (
                              value === "" ||
                              (Number(value) >= 0 &&
                                Number(value) <= 100)
                            ) {
                              updateCourse(
                                course.id,
                                "score",
                                value
                              );
                            }
                          }}
                          placeholder="75"
                          className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
                        />
                      </td>

                      {/* GRADE */}
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex min-w-10 items-center justify-center rounded-full px-3 py-1 text-sm font-bold ${
                            grade === "A"
                              ? "bg-green-100 text-green-800"
                              : grade === "B"
                              ? "bg-blue-100 text-blue-800"
                              : grade === "C"
                              ? "bg-yellow-100 text-yellow-800"
                              : grade === "D"
                              ? "bg-orange-100 text-orange-800"
                              : grade === "E"
                              ? "bg-gray-100 text-gray-800"
                              : grade === "F"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {grade}
                        </span>
                      </td>

                      {/* QUALITY POINT */}
                      <td className="px-4 py-4 font-semibold text-gray-800">
                        {qualityPoint.toFixed(2)}
                      </td>

                      {/* ACTION */}
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            removeCourse(course.id)
                          }
                          disabled={courses.length === 1}
                          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Remove
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </div>

        {/* CURRENT SEMESTER RESULTS */}
        <div className="mt-8 rounded-2xl bg-gray-100 p-6 sm:p-8">

          <div>
            <h3 className="text-2xl font-bold text-green-900">
              Current Semester Results
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Your GPA and performance for the current
              semester.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">

            {/* TOTAL UNITS */}
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <p className="text-sm font-medium text-gray-500">
                Total Units
              </p>

              <p className="mt-2 text-3xl font-bold text-green-800">
                {results.totalUnits}
              </p>
            </div>

            {/* QUALITY POINTS */}
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <p className="text-sm font-medium text-gray-500">
                Quality Points
              </p>

              <p className="mt-2 text-3xl font-bold text-green-800">
                {results.totalQualityPoints.toFixed(2)}
              </p>
            </div>

            {/* SEMESTER GPA */}
            <div className="rounded-2xl bg-green-800 p-6 text-white shadow-md">
              <p className="text-sm font-medium text-green-100">
                Semester GPA
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {results.gpa.toFixed(2)}
              </p>
            </div>

          </div>
        </div>

        {/* CGPA TRACKING */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md sm:p-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-2xl font-bold text-green-900">
                CGPA Tracking
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add previous semesters to calculate your
                overall CGPA.
              </p>
            </div>

            <button
              type="button"
              onClick={addSemester}
              className="rounded-lg bg-green-800 px-5 py-3 font-semibold text-white transition hover:bg-green-900"
            >
              + Add Previous Semester
            </button>

          </div>

          {/* PREVIOUS SEMESTERS */}
          {previousSemesters.length > 0 && (
            <div className="mt-6 space-y-4">

              {previousSemesters.map(
                (semester, index) => (
                  <div
                    key={semester.id}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                  >

                    <div className="mb-4 flex items-center justify-between">

                      <h4 className="font-bold text-green-900">
                        Previous Semester{" "}
                        {index + 1}
                      </h4>

                      <button
                        type="button"
                        onClick={() =>
                          removeSemester(
                            semester.id
                          )
                        }
                        className="text-sm font-semibold text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>

                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">

                      {/* GPA */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Semester GPA
                        </label>

                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.01"
                          value={semester.gpa}
                          onChange={(event) => {
                            const value =
                              event.target.value;

                            if (
                              value === "" ||
                              (Number(value) >= 0 &&
                                Number(value) <= 5)
                            ) {
                              updateSemester(
                                semester.id,
                                "gpa",
                                value
                              );
                            }
                          }}
                          placeholder="4.20"
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
                        />
                      </div>

                      {/* UNITS */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Total Units
                        </label>

                        <input
                          type="number"
                          min="1"
                          max="100"
                          step="1"
                          value={semester.units}
                          onChange={(event) => {
                            const value =
                              event.target.value;

                            if (
                              value === "" ||
                              (Number(value) >= 1 &&
                                Number(value) <= 100)
                            ) {
                              updateSemester(
                                semester.id,
                                "units",
                                value
                              );
                            }
                          }}
                          placeholder="18"
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
                        />
                      </div>

                    </div>
                  </div>
                )
              )}

            </div>
          )}

          {/* CGPA RESULTS */}
          <div className="mt-8">

            <h4 className="text-xl font-bold text-green-900">
              CGPA Results
            </h4>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {/* OVERALL UNITS */}
              <div className="rounded-xl bg-green-50 p-5">
                <p className="text-sm font-medium text-gray-600">
                  Overall Units
                </p>

                <p className="mt-2 text-3xl font-bold text-green-800">
                  {results.overallUnits}
                </p>
              </div>

              {/* OVERALL QUALITY POINTS */}
              <div className="rounded-xl bg-green-50 p-5">
                <p className="text-sm font-medium text-gray-600">
                  Overall Quality Points
                </p>

                <p className="mt-2 text-3xl font-bold text-green-800">
                  {results.overallQualityPoints.toFixed(
                    2
                  )}
                </p>
              </div>

              {/* OVERALL CGPA */}
              <div className="rounded-xl bg-green-800 p-5 text-white">
                <p className="text-sm font-medium text-green-100">
                  Overall CGPA
                </p>

                <p className="mt-2 text-4xl font-bold text-white">
                  {results.cgpa.toFixed(2)}
                </p>
              </div>

              {/* CLASS OF DEGREE */}
              <div className="rounded-xl bg-green-50 p-5">
                <p className="text-sm font-medium text-gray-600">
                  Class of Degree
                </p>

                <p className="mt-2 text-2xl font-bold text-green-800">
                  {results.classification}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ACADEMIC FEEDBACK */}
        <div className="mt-8 rounded-2xl bg-green-900 p-6 text-white shadow-md sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-green-200">
                Academic Feedback
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                {results.advice.level}
              </h3>

              <p className="mt-3 max-w-3xl text-green-100">
                {results.advice.message}
              </p>
            </div>

            <div className="rounded-xl bg-white/10 px-5 py-4 text-center">

              <p className="text-sm text-green-200">
                Class of Degree
              </p>

              <p className="mt-1 text-xl font-bold text-white">
                {results.classification}
              </p>

            </div>

          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

          <button
            type="button"
            onClick={resetCalculator}
            className="rounded-lg border border-red-200 bg-white px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
          >
            Reset Calculator
          </button>

        </div>

      </div>
    </section>
  );
}