import Shared from "./Shared";

const BgRemover = () => {
  return (
    <div className="p-2 space-y-4 w-full  dark:text-white md:px-4">
      <h1 className="text-3xl font-bold">Background Remover</h1>
      <p className="p-2">
        This example shows how to integrate the Cloudinary Upload Widget into a
        React application.
      </p>
      <Shared transformType={"BgRemover"} />
    </div>
  );
};

export default BgRemover;
