import Shared from "./Shared";

const GenerateFill = () => {
  return (
    <div className="p-2 space-y-4 w-full dark:text-white md:px-4">
      <h1 className="text-3xl font-bold">Generate Fill</h1>

      <p className="p-2">
        This example shows how to integrate the Cloudinary Upload Widget into a
        React application.
      </p>
      <Shared transformType={"generateFill"} />
    </div>
  );
};

export default GenerateFill;
