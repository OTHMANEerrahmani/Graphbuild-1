import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import CalculateSenario from "../../../utils/calculations";
import { useParams } from "react-router-dom";
import { fetchData, fetchDataFromUrl } from "../../../services/api";
import { formatDate } from "../../../utils/dateFormatter";

function ProductItemPage() {
  const [cookies] = useCookies(["access-token"]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [scenarios, setScenarios] = useState([]);

  const addScenario = () => {
    const newScenarios = [
      ...scenarios,
      {
        name: `Scenario ${scenarios.length + 1}`,
        confirmationRate: "",
        deliveredRate: "",
        disabled: false,
      },
    ];
    setScenarios(newScenarios);
  };

  const removeScenario = (index) => {
    const newScenarios = [...scenarios];
    newScenarios.splice(index, 1);
    setScenarios(newScenarios);
  };

  const updateInput = (index, key, value) => {
    const newScenarios = [...scenarios];
    newScenarios[index][key] = value;
    setScenarios(newScenarios);
  };
  const { id } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await fetchDataFromUrl(
          `${import.meta.env.VITE_APP_SERVER}/products/${id}`
        );
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchdata();
  }, []);

  const fetchDetails = async (id) => {
    try {
      const response = await fetchData(
        `${id}?fields=id,name,insights{spend,actions}`,
        cookies["access-token"]
      );
      // insights{spend,reach}
      return response;
    } catch (error) {
      throw error;
    }
  };

  const [campaignsData, setCampaignsData] = useState([]);
  const [retreivedError, setRetreivedError] = useState(null);

  useEffect(() => {
    // Fetch details for each campaign and adset
    const fetchDataForCampaigns = async () => {
      const updatedCampaignsData = [];
      for (const campaign of product.senarioData) {
        try {
          const updatedAdsets = [];
          const campaigndetails = await fetchDetails(campaign.id);

          let purchaseValue = 0;
          const actions = campaigndetails.insights?.data[0]?.actions;
          if (actions) {
            const purchaseAction = actions.find(
              (action) => action.action_type === "purchase"
            );
            if (purchaseAction) {
              purchaseValue = parseInt(purchaseAction.value);
            }
          }

          const campaigndetail = {
            id: campaigndetails.id,
            name: campaigndetails.name,
            lead: purchaseValue,
            cpl: campaigndetails.insights?.data[0]?.spend,
          };
          console.log(purchaseValue);
          console.log(campaigndetails.insights?.data[0]?.spend);

          for (const adset of campaign.adsets) {
            const details = await fetchDetails(adset.id);
            let purchaseAdsetValue = 0;

            const actions = details.insights?.data[0]?.actions;
            if (actions) {
              const purchaseAction = actions.find(
                (action) => action.action_type === "purchase"
              );
              if (purchaseAction) {
                purchaseAdsetValue = parseInt(purchaseAction.value);
              }
            }

            const updatedAdset = {
              id: details.id,
              name: details.name,
              lead: purchaseAdsetValue,
              cpl: details.insights?.data[0]?.spend,
            };
            updatedAdsets.push(updatedAdset);
          }
          const updatedCampaign = {
            campaigndetail,
            adsets: updatedAdsets,
          };
          updatedCampaignsData.push(updatedCampaign);
          setRetreivedError(null);
        } catch (error) {
          setRetreivedError(
            "Something Went Wrong, Retreved data may be Empty !!!"
          );
          console.error("Error fetching details for campaign:", error);
        }
      }
      setCampaignsData(updatedCampaignsData);
    };
    fetchDataForCampaigns();
  }, [product.senarioData]);

  if (loading) {
    return (
      <div className="flex flex-row justify-center items-center w-full font-medium text-2xl dark:text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full font-medium text-2xl dark:text-white">
        Error <span className="text-red-600">{error.message}</span>
      </div>
    );
  }

  return (
    <>
      <div className="h-[calc(100vh)-] overflow-y-auto no-scrollbar  py-4 px-6 text-[14px] md:text-sm text-left w-full  dark:text-white relative space-y-2 ">
        <div className="w-full flex lg:flex-row flex-col p-4 gap-4">
          <img
            src={
              product.picturePath
                ? `${import.meta.env.VITE_APP_SERVER}/assets/${
                    product.picturePath
                  }`
                : `/default-image.jpg`
            }
            alt=""
            className="rounded-lg lg:w-2/4 h-96 object-cover "
          />

          <div className="flex flex-col pt-4 px-4 w-full rounded-md dark:bg-darkBackground bg-white md:space-y-2">
            <div className=" py-2 md:py-4 px-6 capitalize font-semibold text-3xl">
              {" "}
              {product.name}
            </div>
            <div className="flex flex-col md:flex-row justify-around">
              <div className=" py-4 px-6">
                Product price
                <span className="font-semibold px-4 text-xl">
                  {product.prdPrix}
                </span>
              </div>
              <div className=" py-4 px-6">
                Purchase price
                <span className="font-semibold px-4 text-xl">
                  {product.prixVente}
                </span>
              </div>
            </div>

            <div className=" py-4 px-6 capitalize flex flex-row">
              <div className="w-32">country</div>
              <span className="px-4 font-medium  w-full text-center">
                {product.country}
              </span>
            </div>
            <div className=" py-4 px-6 capitalize flex flex-row">
              <div className="w-32">call center</div>
              <span className="px-4 font-medium w-full text-center">
                {product.callCenter}
              </span>
            </div>
            <div className="flex flex-col md:flex-row justify-around items-center py-2 space-y-2">
              <div className="py-2 px-4  dark:bg-darkPrimary bg-slate-200 rounded-full ">
                Created {formatDate(product.createdAt)}
              </div>
              <div className="py-2 px-4   dark:bg-darkPrimary bg-slate-200 rounded-full">
                Last Update {formatDate(product.updatedAt)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="">Scenarios</div>
          <button
            className="font-medium  rounded-full px-6 py-2 bg-white dark:bg-darkBackground border dark:border-white border-black hover:underline"
            onClick={() => {
              addScenario();
            }}
          >
            Add Scenario
          </button>
        </div>
        {scenarios.map((scenario, index) => (
          <div key={index} className="px-4 py-2">
            <div className="flex flex-row items-center justify-between w-full">
              <div>{scenario.name}</div>
              <div className="flex flex-row">
                <MdDelete
                  size={"30px"}
                  color={darkMode ? "white" : "black"}
                  onClick={() => removeScenario(index)}
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col justify-center md:space-x-2 space-y-1 md:space-y-0">
              <input
                type="text"
                className="input"
                placeholder="confirmation rate"
                disabled={scenario.disabled}
                onChange={(e) =>
                  updateInput(index, "confirmationRate", e.target.value)
                }
              />

              <input
                type="text"
                className="input"
                placeholder="delivered rate"
                disabled={scenario.disabled}
                onChange={(e) =>
                  updateInput(index, "deliveredRate", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        {scenarios.map((scenario, index) => (
          <div className="space-y-2" key={index}>
            <div className="flex flex-row justify-between pr-8">
              <div className="pt-4">{scenario.name}</div>
              <div className="pt-4">Profit</div>
            </div>

            <div className="h-[2px] w-full dark:bg-white bg-darkBackground rounded-full my-1" />
            <div className="px-4 ">
              {retreivedError && (
                <div className="text-red-500 text-center font-bold underline">
                  {" "}
                  {retreivedError}
                </div>
              )}
              {product.senarioData.map((campaign, index) => (
                <div
                  key={index}
                  className="my-2 dark:bg-darkSecondary bg-white rounded-md"
                >
                  <div className="flex flex-row items-center justify-between px-2 py-2">
                    <div>
                      Campaigns
                      <span className="font-semibold uppercase text-lg px-4">
                        {campaign.name}
                      </span>
                        {/* {campaignsData[index]?.campaigndetail.lead}{" "}
                        {campaignsData[index]?.campaigndetail.cpl} */}
                    </div>
                    {scenario.confirmationRate &&
                      scenario.deliveredRate &&
                      !retreivedError && (
                        <CalculateSenario
                          lead={campaignsData[index]?.campaigndetail.lead ?? 0}
                          prd_price={product.prdPrix}
                          prix_vente={product.prixVente}
                          cpl={campaignsData[index]?.campaigndetail.cpl}
                          confirmation_rate={scenario.confirmationRate / 100}
                          delivred_rate={scenario.deliveredRate / 100}
                        />
                      )}
                  </div>
                  <div className="px-2">
                    <div className="underline">Ads</div>
                    {campaign?.adsets.map((adset, indx) => (
                      <div
                        key={indx}
                        className="flex flex-row items-center justify-between px-2 py-2"
                      >
                        <div>
                          <span className="font-semibold capitalize text-lg">
                            {adset.name}
                          </span>
                          {/* {campaignsData[index]?.adsets[indx]?.lead}{" "}
                          {campaignsData[index]?.adsets[indx]?.cpl} */}
                        </div>
                        {/* {!retreivedError}? */}
                        {scenario.confirmationRate &&
                          scenario.deliveredRate &&
                          !retreivedError && (
                            <CalculateSenario
                              lead={campaignsData[index].adsets[indx].lead ?? 0}
                              prd_price={product.prdPrix}
                              prix_vente={product.prixVente}
                              cpl={campaignsData[index].adsets[indx].cpl}
                              confirmation_rate={
                                scenario.confirmationRate / 100
                              }
                              delivred_rate={scenario.deliveredRate / 100}
                            />
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default ProductItemPage;
