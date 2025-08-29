"use client";

import { useAppSelector } from "@/lib/store/hooks";

import CourseCardComponent from "@/components/course-card-component/course-card-component";

export default function CoursesPage() {
  const { courses } = useAppSelector((state) => state.courses);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover our collection of courses designed to help
            you achieve your goals
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <>
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing {courses.length} course
              {courses.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCardComponent key={course._id} course={course} />
            ))}
          </div>
        </>
      </div>
    </div>
  );
}
