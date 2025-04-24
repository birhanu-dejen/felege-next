import { Search } from "lucide-react";
import React from "react";

export default function CourseSearchBar({ onSearch }) {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex items-center rounded-full border border-gray-300 shadow-sm overflow-hidden">
        <input
          type="text"
          placeholder="What do you want to learn?"
          className="flex-grow px-5 py-3 text-sm focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700  p-2 rounded-full mr-2 transition-colors cursor-pointer"
        >
          <Search className="text-white" size={18} />
        </button>
      </div>
    </form>
  );
}
