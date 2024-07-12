import { Link } from "react-router-dom";
import { getStatusBadge } from "../../utils/getStatusBadge";

export default function AddAccountCard({ adAccount }) {
  return (
    <>
      <div className="w-full">
        <Link
          to={{
            pathname: `/dashboard/adAccount/${adAccount.id}`,
          }}
        >
          <div className="p-4 shadow-md bg-white border border-black dark:border-white text-sm rounded-lg mx-1 relative  w-full dark:bg-darkBackground dark:text-white min-h-32">
            {getStatusBadge(adAccount.account_status)}

            <div className="pt-8 space-y-2">
              <div className="px-4 py-1 rounded-xl bg-lightSecondary dark:bg-darkPrimary shadow-sm absolute top-2 left-4">
                Amount Spent :{" "}
                <span className="font-bold px-4">
                  {adAccount.amount_spent ?? 0} {adAccount.currency}
                </span>
              </div>
              <span className="font-semibold text-lg/6">{adAccount.name}</span>

              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col  space-y-2">
                  <div className="px-4 py-1 rounded-xl bg-lightSecondary dark:bg-darkPrimary shadow-sm">
                    Balance
                    <span className="font-bold px-4">
                      {adAccount.balance ?? 0} {adAccount.currency}
                    </span>
                  </div>
                  <div className="px-4 py-1 rounded-xl bg-lightSecondary dark:bg-darkPrimary shadow-sm">
                    Max bid
                    <span className="font-bold px-4">
                      {adAccount.max_bid?.data?.max_bid ?? 0}{" "}
                      {adAccount.currency}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-2 px-4 py-1 rounded-xl bg-lightSecondary dark:bg-darkPrimary shadow-sm">
                  <div className="">
                    campaings
                    <span className="font-bold px-4">
                      {adAccount.campaigns?.data?.length ?? 0}
                    </span>
                  </div>
                  <div>
                    adsets
                    <span className="font-bold px-4">
                      {adAccount.adsets?.data?.length ?? 0}
                    </span>
                  </div>
                  <div>
                    ads{" "}
                    <span className="font-bold px-4">
                      {adAccount.ads?.data?.length ?? 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* <div>Max Bid : {adAccount.max_bid.data}</div> */}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
