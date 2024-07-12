import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateFormatter";

export default function CampaignCard({ campaign }) {
  let statusColor = "";

  switch (campaign.status.toLowerCase()) {
    case "active":
      statusColor = "bg-green-300";
      break;
    case "paused":
      statusColor = "bg-red-300";
      break;

    default:
      statusColor = "bg-gray-300";
  }

  return (
    <>
      <div className="w-full">
        <Link
          to={{
            pathname: `/dashboard/campaign/${campaign.id}`,
          }}
        >
          <div className="p-4 shadow-md bg-white border border-black dark:border-white text-sm rounded-lg mx-1 relative  w-full dark:bg-darkBackground dark:text-white min-h-32">
            <div
              className={`px-4 py-1 text-center rounded-xl absolute top-2 right-4  text-black  ${statusColor}`}
            >
              {campaign.status}
            </div>

            <div className="px-4 py-1 rounded-xl">{campaign.name}</div>

            <div className="pt-4 space-y-2 flex-col">
              <div className="  flex flex-row justify-between w-full">
                <div>objective</div>
                <div>{campaign.objective}</div>
              </div>
              <div className="  flex flex-row justify-between w-full">
                <div>Created time</div>
                <div>{formatDate(campaign.created_time)}</div>
              </div>
              <div className="  flex flex-row justify-between w-full">
                <div>Updated time</div>
                <div>{formatDate(campaign.updated_time)}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
