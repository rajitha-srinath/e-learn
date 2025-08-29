"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import { toast } from "sonner";

import { setCourses, addCourse } from "@/lib/store/slices/coursesSlice";

type Course = {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  level: string;
  price: number;
  image: string;
  enrolledStudents: number;
  category: string;
};

export default function Courses() {
  const [form, setForm] = useState<Partial<Course>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const { courses } = useAppSelector((state) => state.courses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/course");

        if (!response.ok) {
          throw new Error("Error occured when fetching courses");
        }

        const data = await response.json();

        dispatch(setCourses(data));
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form:", form);

    if (editingId) {
      console.log("editingId", editingId);

      const resposne = await fetch(
        `http://localhost:8000/api/course/${editingId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await resposne.json();
      console.log(data);
    } else {
      const response = await fetch("http://localhost:8000/api/course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Error occured when creating Course");
      }

      const data = await response.json();

      dispatch(addCourse(data));

       toast.success("Course added successfully", {
        richColors: true,
      });
    }

    setForm({});
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/course/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error occurred when deleting course");
      }

      const data = courses.filter((c) => c._id !== id);

      dispatch(setCourses(data));

      toast.success("Course deleted successfully", {
        richColors: true,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleEdit = (course: Course) => {
    setForm(course);
    setEditingId(course._id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Courses</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 mb-8 flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              placeholder="Title"
              value={form.title || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="instructor"
            >
              Instructor
            </label>
            <input
              id="instructor"
              name="instructor"
              placeholder="Instructor"
              value={form.instructor || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              name="price"
              placeholder="Price"
              type="number"
              value={form.price || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Description
            </label>
            <input
              id="description"
              name="description"
              placeholder="description"
              value={form.description || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="instructor"
            >
              Image URL
            </label>
            <input
              id="image"
              name="image"
              placeholder="image"
              value={form.image || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="price">
              Duration
            </label>
            <input
              id="duration"
              name="duration"
              placeholder="duration"
              type="number"
              value={form.duration || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Level
            </label>
            <input
              id="level"
              name="level"
              placeholder="level"
              value={form.level || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="instructor"
            >
              Category
            </label>
            <input
              id="category"
              name="category"
              placeholder="category"
              value={form.category || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="price">
              Enrolled Students
            </label>
            <input
              id="enrolledStudents"
              name="enrolledStudents"
              placeholder="enrolledStudents"
              type="number"
              value={form.enrolledStudents || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            {editingId ? "Update" : "Add"} Course
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setForm({});
                setEditingId(null);
              }}
              className="bg-muted text-foreground px-4 py-2 rounded border hover:bg-muted/80"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Instructor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="px-6 py-4">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={225}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 font-semibold">{course.title}</td>
                <td className="px-6 py-4">{course.instructor}</td>
                <td className="px-6 py-4">${course.price}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="bg-primary text-white px-3 py-1 rounded hover:bg-primary/90 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-destructive text-white px-3 py-1 rounded hover:bg-destructive/90 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
