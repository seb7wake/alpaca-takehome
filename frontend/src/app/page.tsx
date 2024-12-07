"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Header from "@/components/Header";
import Note from "@/components/Note";
import { Session } from "../../types";
import { FaPlus } from "react-icons/fa6";
import Spinner from "@/components/Spinner";
import Error from "@/components/form/Error";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data, error } = useSWR("sessions", fetcher);
  const router = useRouter();
  console.log("data", data);

  if (error) return <Error error={error} />;
  if (!data) return <Spinner />;

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto p-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Notes</h1>
          <button
            className="px-3 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors flex items-center gap-2"
            onClick={() => {
              router.push("/new");
            }}
          >
            <FaPlus />
            Add Note
          </button>
        </div>
        <div className="space-y-4">
          {data.sessions?.map((session: Session) => (
            <div key={session.id}>
              <Note session={session} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
