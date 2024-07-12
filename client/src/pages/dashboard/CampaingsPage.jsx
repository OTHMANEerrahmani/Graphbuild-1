import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CampaignCard } from "../../components/Cards";

function CampaingsPage() {
  const { data, loading, error } = useSelector((state) => state.data);
  const [CampaignsData, setCampaignsData] = useState([]);
  const testData = new Array(50).fill(["hi"]);

  useEffect(() => {
    if (data.adaccounts && data.adaccounts.data) {
      const updatedCampaignsData = [];

      data.adaccounts?.data.forEach((adAccount) => {
        if (adAccount.campaigns && adAccount.campaigns.data) {
          adAccount?.campaigns.data.forEach((ad) => {
            updatedCampaignsData.push(ad);
          });
        }
      });
      setCampaignsData(updatedCampaignsData);
    }
  }, [data.adaccounts]);

  if (loading) {
    return (
      <div className="flex flex-row justify-center items-center w-full font-medium text-2xl ">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full font-medium text-2xl">
        Error <span className="text-red-600">{error.message}</span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-auto h-[calc(100vh)-] overflow-y-auto no-scrollbar px-2 py-4 w-full">
        {CampaignsData &&
          CampaignsData.map((campaign) => (
            <div key={campaign.id} className="w-full">
              <CampaignCard campaign={campaign} />
            </div>
          ))}
      </div>
    </>
  );
}

export default CampaingsPage;
