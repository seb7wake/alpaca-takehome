import { LiaHippoSolid } from "react-icons/lia";

const Error = ({ error }: { error: string }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-6">
        <LiaHippoSolid className="w-16 h-16 text-indigo-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oh Hippo!</h1>
      <p className="text-xl text-gray-600 mb-6">
        Looks like our hungry hippo ate some important data!
      </p>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
        <p className="text-red-600 font-mono text-sm">{error}</p>
      </div>
      <p className="mt-6 text-gray-500 italic">
        Don&apos;t worry, our hippo is currently being put on a strict &quot;no
        data&quot; diet
      </p>
    </div>
  );
};

export default Error;
