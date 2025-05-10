import { Search } from "lucide-react";
import React, { ChangeEvent, FormEvent } from "react";

interface CourseSearchBarProps {
  onSearch?: (query: string) => void;
}

const CourseSearchBar: React.FC<CourseSearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex items-center rounded-full border border-gray-300 shadow-sm overflow-hidden">
        <input
          type="text"
          placeholder="What do you want to learn?"
          className="flex-grow px-5 py-3 text-sm focus:outline-none"
          value={query}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full mr-2 transition-colors cursor-pointer"
        >
          <Search className="text-white" size={18} />
        </button>
      </div>
    </form>
  );
};

export default CourseSearchBar;
