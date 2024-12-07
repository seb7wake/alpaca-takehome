"use client";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";

const CreateNote = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const router = useRouter();
  const { id } = useParams();
  const [loadingSummary, setLoadingSummary] = useState(false);
  useEffect(() => {
    if (id) {
      const fetchSession = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sessions/${id}`
        );
        const data = await response.json();
        if (data.session) {
          setValue("title", data.session.title);
          setValue("patientName", data.session.patient_name);
          setValue(
            "startDateTime",
            new Date(data.session.start_date).toISOString().slice(0, 16)
          );
          setValue(
            "endDateTime",
            new Date(data.session.end_date).toISOString().slice(0, 16)
          );
          setValue("notes", data.session.notes);
          setValue("aiSummary", data.session.ai_summary);
        } else {
          // toast.error("Failed to fetch session");
          router.push("/");
        }
      };
      fetchSession();
    }
  }, [id]);

  const onSubmit = async (data: FieldValues) => {
    const cleanData = {
      ...data,
      patient_name: data.patientName,
      start_date: data.startDateTime,
      end_date: data.endDateTime,
      ai_summary: data.aiSummary,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sessions/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanData),
      }
    );

    const responseData = await response.json();
    console.log(responseData);

    if (responseData.session) {
      router.push(`/`);
    } else {
      // toast.error("Failed to create session. Please try again.");
    }
  };

  const generateSummary = async () => {
    if (!watch("notes")) {
      // toast.error("Please enter notes before generating a summary");
      return;
    }
    setLoadingSummary(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sessions/generate_summary`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes: watch("notes") }),
      }
    );
    const data = await response.json();
    if (data.summary) {
      setValue("aiSummary", data.summary);
    } else {
      // toast.error("Failed to generate summary");
    }
    setLoadingSummary(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto p-4 mt-8">
        <h1 className="text-2xl font-bold mb-6">Edit Note</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Note title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title?.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="patientName"
              className="block text-sm font-medium text-gray-700"
            >
              Patient name
            </label>
            <input
              type="text"
              id="patientName"
              {...register("patientName", {
                required: "Patient name is required",
              })}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
            {errors.patientName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.patientName?.message?.toString()}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDateTime"
                className="block text-sm font-medium text-gray-700"
              >
                Shift start time
              </label>
              <input
                type="datetime-local"
                id="startDateTime"
                step="60"
                {...register("startDateTime", {
                  required: "Start date & time is required",
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
              />
              {errors.startDateTime && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.startDateTime?.message?.toString()}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="endDateTime"
                className="block text-sm font-medium text-gray-700"
              >
                Shift end time
              </label>
              <input
                type="datetime-local"
                id="endDateTime"
                step="60"
                {...register("endDateTime", {
                  required: "End date & time is required",
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
              />
              {errors.endDateTime && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.endDateTime?.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notes
            </label>
            <textarea
              id="notes"
              rows={10}
              {...register("notes", { required: "Notes are required" })}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
            {errors.notes && (
              <p className="mt-1 text-sm text-red-600">
                {errors.notes?.message?.toString()}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={generateSummary}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full py-2.5 px-4 hover:opacity-95 hover:scale-102 hover:shadow-md active:scale-98 transition-all duration-200 bg-[length:200%_200%] animate-gradient flex items-center justify-center gap-2 shadow-md"
            disabled={loadingSummary}
          >
            <span>
              {loadingSummary ? "Generating..." : "✨ Generate AI Summary"}
            </span>
          </button>

          <div>
            <label
              htmlFor="aiSummary"
              className="block text-sm font-medium text-gray-700"
            >
              AI Summary
            </label>
            <textarea
              id="aiSummary"
              rows={10}
              {...register("aiSummary")}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
              value={watch("aiSummary") || ""}
              onChange={(e) => setValue("aiSummary", e.target.value)}
            />
            {errors.aiSummary && (
              <p className="mt-1 text-sm text-red-600">
                {errors.aiSummary?.message?.toString()}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-full py-2 px-4 hover:bg-indigo-700 transition-colors"
          >
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
