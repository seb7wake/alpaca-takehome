"use client";
import Header from "@/components/Header";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { postFetcher } from "@/utils/fetcher";

const CreateNote = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const router = useRouter();
  const [loadingSummary, setLoadingSummary] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    const cleanData = {
      title: data.title,
      patient_name: data.patientName,
      start_date: data.startDateTime,
      end_date: data.endDateTime,
      ai_summary: data.aiSummary,
      notes: data.notes,
    };
    const response = await postFetcher("sessions/create", cleanData);

    if (response.session) {
      router.push(`/`);
    } else {
      // error toast
    }
  };

  const generateSummary = async () => {
    if (
      !watch("notes") ||
      !watch("patientName") ||
      !watch("startDateTime") ||
      !watch("endDateTime")
    ) {
      // error toast
      return;
    }
    setLoadingSummary(true);
    try {
      const data = await postFetcher("sessions/generate_summary", {
        notes: watch("notes"),
        patient_name: watch("patientName"),
        start_date: watch("startDateTime"),
        end_date: watch("endDateTime"),
      });
      if (data?.summary) {
        setValue("aiSummary", data.summary);
      } else {
        // error toast
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mb-10">
      <Header />
      <div className="max-w-2xl mx-auto p-4 mt-8">
        <h1 className="text-2xl font-bold mb-6">Create Note</h1>
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
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 min-h-[100px]"
              value={watch("aiSummary") || ""}
              onChange={(e) => setValue("aiSummary", e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-full py-2 px-4 hover:bg-indigo-700 transition-colors"
          >
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
