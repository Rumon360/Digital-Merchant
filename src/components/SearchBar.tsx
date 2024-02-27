"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <form onSubmit={handleSearch} className="w-full lg:max-w-80">
        <div className="flex items-center rounded-lg px-3 py-2.5 w-full border">
          <input
            type="text"
            className="border-none flex-1 placeholder:text-sm text-sm h-full w-full outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit" className="flex-shrink-0 outline-none">
            <Search size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
