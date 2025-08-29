"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Users } from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";
import { toast } from "sonner";

import { Course } from "@/lib/store/slices/coursesSlice";

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourses] = useState<Course | null>();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/course/${id}`);

        if (!response.ok) {
          throw new Error("Error occurred when fetching course details");
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {}
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  const handleClickEnroll = async () => {
    try {
      const reqObj = {
        userId: user?.id,
        courseId: id,
      };
      const response = await fetch(
        "http://localhost:8000/api/enrollment/enroll",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqObj),
        }
      );

      if (!response.ok) {
        toast.error("Error occurred", {
          richColors: true,
        });
        throw new Error("Error occurred");
      }

      toast.success("Course enroll success", {
        richColors: true,
      });
    } catch (error) {
      throw new Error("Error occurred when enrolling");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <img
            src={course?.image}
            alt={course?.title}
            className="w-full h-56 object-cover rounded-md mb-4"
          />
          <CardTitle className="text-2xl font-bold">{course?.title}</CardTitle>
          <CardDescription>{course?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <Badge variant="secondary">{course?.category}</Badge>
            <Badge>{course?.level}</Badge>
            <Badge>
              <Users className="inline w-4 h-4 mr-1" />
              {course?.enrolledStudents} students
            </Badge>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-2 text-gray-700">
            <div>
              <span className="font-semibold">Instructor:</span>{" "}
              {course?.instructor}
            </div>
            <div>
              <Clock className="inline w-4 h-4 mr-1" />
              <span className="font-semibold">Duration:</span>{" "}
              {course?.duration} hours
            </div>
            <div>
              <span className="font-semibold">Price:</span> ₹{course?.price}
            </div>
          </div>
          <Button
            disabled={!user}
            onClick={handleClickEnroll}
            className="mt-6 w-full"
          >
            Enroll Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
