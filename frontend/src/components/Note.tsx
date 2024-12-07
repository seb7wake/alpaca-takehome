import React from "react";
import { Session } from "../../types";
import { useRouter } from "next/navigation";
const Note = ({ session }: { session: Session }) => {
  const router = useRouter();
  return (
    <div
      className="p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer hover:scale-[1.01] hover:bg-gray-50"
      onClick={() => {
        router.push(`/edit/${session.id}`);
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg text-gray-900">{session.title}</h3>
        <span className="text-sm text-gray-500">
          {new Date(session.start_date).toLocaleString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{session.patient_name}</p>
      <p className="text-sm text-gray-700">
        {session.notes.length > 100
          ? `${session.notes.substring(0, 100)}...`
          : session.notes}
      </p>
    </div>
  );
};

export default Note;
