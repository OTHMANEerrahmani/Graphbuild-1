import { useCookies } from "react-cookie";
import { DropDown, DropDownMulti } from "../../../../components";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../services/api";

const SelectedMenu = ({
  selectedItems,
  setSelectedItems,
  setSelectedAdaccount,
  className,
}) => {
  const [cookies] = useCookies(["access-token"]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        if (cookies["access-token"]) {
          const response = await fetchData(
            "me?fields=adaccounts{name,campaigns{id,name,adsets{id,name}}}&limit=5000",
            cookies["access-token"]
          );
          setData(response.adaccounts.data);
        }
      } catch (error) {}
    };
    fetchDataFromAPI();
    // console.log(data);
  }, [cookies]);

  const [defaultTextAdAcc, setDefaultTextAdAcc] =
    useState("Options Adaccounts");
  const [defaultTextComp, setDefaultTextComp] = useState("Options Compaings");
  const [defaultTextAdsets, setDefaultTextAdsets] = useState("Options AdSets");

  const [CampaingsOptions, setCampaingsOptions] = useState([]);
  const [AdsetsOptions, setAdsetsOptions] = useState([]);

  // AdAccount Options
  const AdAccOptions = data.map((adAccount) => ({
    name: `AdAccount ${adAccount.name}`,
    id: adAccount.id,

    action: () => {
      setDefaultTextAdAcc(`Adaccount ${adAccount.name}`);
      setSelectedAdaccount(adAccount);

      if (adAccount.campaigns && adAccount.campaigns.data) {
        const campaignsData = adAccount.campaigns.data.map((campaign) => ({
          name: `Campaign ${campaign.name}`,
          action: () => {
            setDefaultTextComp(`Campaign ${campaign.name}`);

            if (campaign.adsets && campaign.adsets.data) {
              const adsetsData = campaign?.adsets.data.map((adset) => ({
                name: `Adset ${adset.name}`,
                id: adset.id,
              }));
              setAdsetsOptions(adsetsData);
            } else {
              setAdsetsOptions([]);
            }
          },
        }));

        setCampaingsOptions(campaignsData);
      } else {
        setCampaingsOptions([]);
      }
    },
  }));

  const handleItemClick = (item) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id
    );
    if (isSelected) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <>
      <div>
        {!cookies["access-token"] && (
          <div className="flex flex-row justify-center w-full text-red-500 font-semibold py-2">
            Need Access Token to Work
          </div>
        )}
        <div
          className={`flex lg:flex-row justify-center flex-col lg:space-x-2 space-y-2 lg:space-y-0 ${className}`}
        >
          <div className="w-full max-w-1/4">
            <DropDown default={defaultTextAdAcc} options={[...AdAccOptions]} />
          </div>
          <div className="w-full max-w-1/4">
            <DropDown
              default={defaultTextComp}
              options={[...CampaingsOptions]}
            />
          </div>
          <div className="w-full max-w-1/4">
            <DropDownMulti
              default={defaultTextAdsets}
              selectedItems={selectedItems}
              handleItemClick={handleItemClick}
              options={[...AdsetsOptions]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedMenu;
