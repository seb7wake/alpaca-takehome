import { LiaHippoSolid } from "react-icons/lia";
import { FaPlus } from "react-icons/fa";
import Header from "./Header";
import { useRouter } from "next/navigation";

const Empty = () => {
  const router = useRouter();
  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto p-4 mt-8 flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <LiaHippoSolid className="w-16 h-16 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">No notes yet</h1>
        <p className="text-xl text-gray-600 mb-8">
          Start your journey by creating your first patient note
        </p>
        <button
          onClick={() => router.push("/new")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Create your first note
        </button>
      </div>
    </div>
  );
};

export default Empty;
