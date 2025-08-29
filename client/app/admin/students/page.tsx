"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setStudents, addStudent } from "@/lib/store/slices/studentSlice";
import { toast } from "sonner";

type Student = {
  _id: string;
  email: string;
  userName: string;
  name: string;
  role?: string;
  password?: string;
};

export default function Students() {
  const [form, setForm] = useState<Partial<Student>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const { students } = useAppSelector((state) => state.students);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user");

        if (!response.ok) {
          throw new Error("Error occured when fetching students");
        }

        const data = await response.json();

        dispatch(setStudents(data));
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    fetchStudents();
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

      if (!resposne.ok) {
        toast.error("Error occurred when editing student", {
          richColors: true,
        });
        throw new Error("Error occurred when editing student");
      }

      const data = await resposne.json();
      console.log(data);

      toast.success("Student updated successfully", {
        richColors: true,
      });
    } else {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Error occured when creating User");
      }

      const data = await response.json();
      dispatch(addStudent(data));

      toast.success("Student added successfully", {
        richColors: true,
      });
    }

    setForm({});
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/user/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Error occurred when deleting student", {
          richColors: true,
        });

        throw new Error('Error occurred when deleting student')
      }
      
      const data = students.filter((c) => c._id !== id);
      dispatch(setStudents(data));

      toast.success("Student deleted successfully", {
        richColors: true,
      });
    } catch (error) {}
  };

  const handleEdit = (student: Student) => {
    setForm(student);
    setEditingId(student._id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Students</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 mb-8 flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              placeholder="email"
              value={form.email || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {!editingId && (
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="Password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                value={form.password || ""}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="Name">
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="name"
              value={form.name || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="userName"
            >
              User Name
            </label>
            <input
              id="userName"
              name="userName"
              placeholder="userName"
              value={form.userName || ""}
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
            {editingId ? "Update" : "Add"} Student
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
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                User Name
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student._id}>
                <td className="px-6 py-4 font-semibold">{student.email}</td>
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4">${student.userName}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="bg-primary text-white px-3 py-1 rounded hover:bg-primary/90 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="bg-destructive text-white px-3 py-1 rounded hover:bg-destructive/90 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No student found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
