import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import SignCard from "../components/dictionary/SignCard";
import SignDetailModal from "../components/dictionary/SignDetailModal";
import { getAllSigns, getCategories, getSignsByCategory, searchSigns } from "../services/signService";
import {
  RiSearchLine,
  RiBookOpenLine,
  RiLoader4Line,
} from "react-icons/ri";

export default function Dictionary() {
  const [signs, setSigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSign, setSelectedSign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [signsRes, catsRes] = await Promise.all([
          getAllSigns(),
          getCategories(),
        ]);
        setSigns(signsRes.data);
        setCategories(catsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCategoryChange = async (category) => {
    setActiveCategory(category);
    setSearchQuery("");
    setLoading(true);
    try {
      if (category === "All") {
        const res = await getAllSigns();
        setSigns(res.data);
      } else {
        const res = await getSignsByCategory(category);
        setSigns(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value) => {
    setSearchQuery(value);
    setActiveCategory("All");
    if (!value.trim()) {
      const res = await getAllSigns();
      setSigns(res.data);
      return;
    }
    try {
      const res = await searchSigns(value);
      setSigns(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />

      <div className="pt-28 pb-16 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            <RiBookOpenLine size={12} />
            Sign Dictionary
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Learn ASL Signs</h1>
          <p className="text-gray-400 max-w-2xl">
            Browse the complete collection of supported American Sign Language signs.
            Each sign includes detailed instructions on how to perform it correctly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <RiSearchLine size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search signs"
              className="w-full bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("All")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === "All" ? "bg-indigo-600 text-white" : "bg-white/[0.04] text-gray-400 hover:text-white border border-white/10 hover:border-white/20"}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? "bg-indigo-600 text-white" : "bg-white/[0.04] text-gray-400 hover:text-white border border-white/10 hover:border-white/20"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RiLoader4Line size={28} className="animate-spin text-indigo-400" />
          </div>
        ) : signs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No signs found</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">{signs.length} signs found</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {signs.map((sign) => (
                <SignCard key={sign.id} sign={sign} onClick={setSelectedSign} />
              ))}
            </div>
          </>
        )}
      </div>

      {selectedSign && (
        <SignDetailModal sign={selectedSign} onClose={() => setSelectedSign(null)} />
      )}
    </div>
  );
}