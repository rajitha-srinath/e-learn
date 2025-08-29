"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";

import CourseCardComponent from "@/components/course-card-component/course-card-component";

export default function () {
  const [userCourses, setUserCourses] = useState<any>([]);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/enrollment/student/${user?.id}`
        );

        if (!response.ok) {
          throw new Error("Error occurred when fetching student courses");
        }

        const data = await response.json();
        setUserCourses(data.enrolledCourses);
      } catch (error: any) {
        throw new Error("Error occurred", error.message);
      }
    };

    fetchUserCourses();
  }, []);

  return (
    <div>
    <h1 className="text-3xl font-bold text-center my-8">My Courses</h1>
      {userCourses && userCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userCourses.map((course: any) => (
            <CourseCardComponent key={course._id} course={course.courseId} />
          ))}
        </div>
      ) : (
        <h3>You didn't enroll to any course</h3>
      )}
    </div>
  );
}
