// import { AddAccountCard } from "../../components";
import { useSelector } from "react-redux";
import AddAccountCard from "../../components/Cards/AdAccountCard";
function Home() {
  const { data, loading, error } = useSelector((state) => state.data);

  if (data == null) {
    return (
      <div className="flex flex-row justify-center items-center w-full font-medium text-2xl dark:text-white ">
        Not Started yet :(
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-row justify-center items-center w-full font-medium text-2xl dark:text-white ">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full font-medium text-2xl  dark:text-white">
        Error <span className="text-red-600">{error}</span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-2 mx-auto h-[calc(100vh)-] overflow-y-auto no-scrollbar px-2 py-4 w-full">
        {data &&
          data.adaccounts &&
          data.adaccounts.data &&
          data.adaccounts.data.map((adAccount) => (
            <div key={adAccount.id} className="lg:w-96 w-full">
              <AddAccountCard adAccount={adAccount} />
            </div>
          ))}
      </div>
    </>
  );
}

export default Home;
