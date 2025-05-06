import { Home, BookOpen, User, LogOut } from "lucide-react";
const courses = [
  {
    title: "Foundations of Orthodox Faith",
    instructor: "Archimandrite Sophronios (Greek Orthodox)",
    progress: 60,
  },
  {
    title: "Lives of the Desert Fathers",
    instructor: "Abba Shenouda (Coptic Orthodox)",
    progress: 35,
  },
  {
    title: "The Orthodox Liturgy Explained",
    instructor: "Fr. Pavel Ivanov (Russian Orthodox)",
    progress: 80,
  },
  {
    title: "Mysteries and Sacraments in Ethiopian Orthodoxy",
    instructor: "Abba Gebre Egziabher (Ethiopian Orthodox)",
    progress: 50,
  },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 border-r shadow-sm hidden md:block">
        <h2 className="text-2xl font-bold mb-8 text-indigo-600">
          Felege Hiowot
        </h2>
        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <Home size={20} /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <BookOpen size={20} /> My Courses
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-gray-700 hover:text-indigo-600"
          >
            <User size={20} /> Profile
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-gray-700 hover:text-red-500"
          >
            <LogOut size={20} /> Logout
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-6">Welcome back!</h1>
        <h2 className="text-xl font-medium mb-4">Continue Learning</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold mb-1">{course.title}</h3>
              <p className="text-sm text-gray-500 mb-3">
                Instructor: {course.instructor}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-indigo-600 h-3 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">
                {course.progress}% complete
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
