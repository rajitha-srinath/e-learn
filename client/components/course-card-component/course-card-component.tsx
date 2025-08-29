import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, Search } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import { Course } from "@/lib/store/slices/coursesSlice";

const CardComponent = ({course}: {course: Course}) => {
  return (
    <Card
      key={course._id}
      className="overflow-hidden hover:shadow-lg duration-300"
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          width={400}
          height={225}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
            4.8
          </div>
        </div>
        <CardTitle className="text-xl">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Instructor: {course.instructor}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {course.duration} weeks
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {course?.enrolledStudents}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-900">${course.price}</div>
        <Button asChild>
          <Link href={`/courses/${course._id}`}>View Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

export default CardComponent;
