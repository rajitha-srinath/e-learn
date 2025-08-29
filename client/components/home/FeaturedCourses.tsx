"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import CourseCardComponent from "@/components/course-card-component/course-card-component";
import { setCourses } from "@/lib/store/slices/coursesSlice";

export function FeaturedCourses() {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.courses);
  const featuredCourses = courses.slice(0, 3);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/course");

        if (!response.ok) {
          throw new Error("Error occurred when fetching courses");
        }

        const data = await response.json();
        dispatch(setCourses(data));
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Featured Courses
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular courses taught by industry experts
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCardComponent key={course._id} course={course} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
