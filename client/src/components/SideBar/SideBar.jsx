import { useEffect, useState } from "react";
import DropDown from "../DropDown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { styles } from "../../styles";
import {
  DataClear,
  fetchDataFailure,
  fetchDataRequest,
  fetchDataSuccess,
} from "../../../state/actions/dataActions";
import { fetchData } from "../../services/api";

const Sidebar = ({ className }) => {
  const navigate = useNavigate();
  const [defaultTextAdAcc, setDefaultTextAdAcc] =
    useState("Options Adaccounts");
  const [defaultTextComp, setDefaultTextComp] = useState("Options Compaings");
  const [defaultTextAdsets, setDefaultTextAdsets] = useState("Options AdSets");
  const [defaultTextAds, setDefaultTextAds] = useState("Options Ads");
  const [defaultTextAdcreatives, setDefaultTextAdcreatives] = useState(
    "Options Adcreatives"
  );
  const { data, loading, error } = useSelector((state) => state.data);

  const AdAccountData = data?.adaccounts?.data || [];

  // campaigns Options
  const [CampaingsOptions, setCampaingsOptions] = useState([]);
  const [AdsetsOptions, setAdsetsOptions] = useState([]);
  const [AdsOptions, setAdsOptions] = useState([]);
  const [AdcreativeOptions, setAdcreativeOptions] = useState([]);

  // AdAccount Options
  const AdAccOptions = AdAccountData?.map((adAccount) => ({
    name: `AdAccount ${adAccount.name}`,
    action: () => {
      setDefaultTextAdAcc(`AdAccount ${adAccount.name}`);
      if (adAccount.campaigns && adAccount.campaigns.data) {
        const campaignsData = adAccount.campaigns.data.map((campaign) => ({
          name: `Campaign ${campaign.name}`,
          action: () => {
            setDefaultTextComp(`Campaign ${campaign.name}`);
            navigate(`/dashboard/campaign/${campaign.id}`);
          },
        }));
        setCampaingsOptions(campaignsData);
      } else {
        setCampaingsOptions([]);
      }

      if (adAccount.adsets && adAccount.adsets.data) {
        const adsetsData = adAccount.adsets.data.map((adset) => ({
          name: `Adset ${adset.name}`,
          action: () => {
            setDefaultTextAdsets(`Adsets ${adset.name}`);
            navigate(`/dashboard/adsets/${adset.id}`);
          },
        }));
        setAdsetsOptions(adsetsData);
      } else {
        setAdsetsOptions([]);
      }

      if (adAccount.ads && adAccount.ads.data) {
        const adsData = adAccount.ads.data.map((ad) => ({
          name: `Ad ${ad.name}`,
          action: () => {
            setDefaultTextAds(`Ads ${ad.name}`);
            navigate(`/dashboard/ads/${ad.id}`);
          },
        }));
        setAdsOptions(adsData);
      } else {
        setAdsOptions([]);
      }

      if (adAccount.adcreatives && adAccount.adcreatives.data) {
        const adcreativesData = adAccount.adcreatives.data.map(
          (adcreative) => ({
            name: `Adcreative ${adcreative.name}`,
            action: () => {
              setDefaultTextAdcreatives(`Adcreatives ${adcreative.name}`);
              navigate(`/dashboard/adcreative/${adcreative.id}`);
            },
          })
        );
        setAdcreativeOptions(adcreativesData);
      } else {
        setAdcreativeOptions([]);
      }

      navigate(`/dashboard/adAccount/${adAccount.id}`);
    },
  }));

  // Use AdAccOptions array as needed

  const [accessToken, setAccessToken] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["access-token"]);
  const [showTokenInput, setShowTokenInput] = useState(true);

  const handleAccess = () => {
    setCookie("access-token", accessToken, { path: "/" });
  };
  const handleForget = () => {
    dispatch(DataClear());
    removeCookie("access-token", { path: "/" });
    setAccessToken("");
  };
  useEffect(() => {
    if (cookies["access-token"]) {
      setShowTokenInput(false);
    } else {
      setShowTokenInput(true);
    }
  }, [cookies]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      dispatch(fetchDataRequest());
      try {
        if (cookies["access-token"]) {
          const responseData = await fetchData(
            "me?fields=id,name,email,picture{url},adaccounts{campaigns{id,name,objective,status,created_time,updated_time},adsets{id,name,updated_time,created_time,status},ads{id,name,created_time,status,updated_time},adcreatives{id,name,status,object_type,image_url,object_story_spec},amount_spent,balance,currency,account_status,name}&limit=5000",
            cookies["access-token"]
          );
          dispatch(fetchDataSuccess(responseData));
        } else {
        }
      } catch (error) {
        dispatch(fetchDataFailure(error.message));
      }
    };
    fetchDataFromAPI();
  }, [dispatch, cookies]);

  return (
    <>
      <div
        className={`${className}  px-2 bg-white dark:bg-darkSecondary   overflow-auto no-scrollbar pb-4 `}
      >
        <div className="space-y-2">
          {showTokenInput ? (
            <div className="flex flex-col gap-1  pt-4 max-w-1/4">
              <input
                type="text"
                className="w-full px-2 py-2 text-sm border border-gray-300 dark:border-none rounded-lg outline-none bg-slate-50 dark:bg-darkPrimary dark:text-white"
                name="tags"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder="Access Token"
              />
              <button
                className="bg-transparent dark:bg-darkSecondary hover:dark:bg-blue-500 hover:bg-blue-500 drak:hover:bg-blue-500 text-blue-700 dark:text-white font-semibold hover:text-white  py-2 px-4 border border-blue-500 dark:border-white hover:border-transparent rounded text-sm shadow-md "
                onClick={handleAccess}
              >
                Access
              </button>
            </div>
          ) : (
            <div className="pt-3 space-y-4">
              {error && (
                <div className="text-sm text-center bg-slate-50 dark:bg-darkPrimary rounded-md space-y-2 dark:text-white py-4 shadow-md border border-black dark:border-white font-semibold px-2">
                  <div>Something Went Wrong</div>
                  <div>Check your Access Token might not be valid {error}</div>
                </div>
              )}
              {loading && (
                <div className="text-sm text-center bg-slate-50 dark:bg-darkPrimary rounded-md space-y-2 dark:text-white py-4 shadow-md border border-black dark:border-white font-semibold px-2">
                  <div>Loading</div>
                </div>
              )}
              {!error && !loading && (
                <div className="flex flex-row items-center ">
                  <img
                    src={data?.picture?.data.url ?? ""}
                    alt=""
                    className="w-14 h-14 rounded-full"
                  />
                  <div className="pl-4 text-sm dark:text-white">
                    <div>{data?.name ?? ""}</div>
                    <div>{data?.email ?? "johnDoe@gmail.com"}</div>
                  </div>
                </div>
              )}
              <button
                className={`${styles.buttonSideBar}`}
                onClick={handleForget}
              >
                Forget Token
              </button>
            </div>
          )}
          {!showTokenInput && (
            <div>
              <DropDown
                default={defaultTextAdAcc}
                options={[
                  {
                    name: "All AdsAccounct",
                    action: () => {
                      setDefaultTextAdAcc("All AdsAccounct");
                      navigate(`/dashboard`);
                    },
                  },
                  ...AdAccOptions,
                ]}
              />
              <DropDown
                default={defaultTextComp}
                options={[
                  {
                    name: "All Compaings",
                    action: () => {
                      setDefaultTextComp("All Campaings");
                      navigate(`/dashboard/campaing`);
                    },
                  },
                  ...CampaingsOptions,
                ]}
              />
              <DropDown
                default={defaultTextAdsets}
                options={[
                  {
                    name: "All AdSets",
                    action: () => {
                      setDefaultTextAdsets("All AdSets");
                      navigate(`/dashboard/adsets`);
                    },
                  },
                  ...AdsetsOptions,
                ]}
              />
              <DropDown
                default={defaultTextAds}
                options={[
                  {
                    name: "All Ads",
                    action: () => {
                      setDefaultTextAds("All Ads");
                      navigate(`/dashboard/ads`);
                    },
                  },
                  ...AdsOptions,
                ]}
              />
              <DropDown
                default={defaultTextAdcreatives}
                options={[
                  {
                    name: "All Adcreatives",
                    action: () => {
                      setDefaultTextAdcreatives("All Adcreatives");
                      navigate(`/dashboard/adcreative`);
                    },
                  },
                  ...AdcreativeOptions,
                ]}
              />
            </div>
          )}
          <button
            className={`${styles.buttonSideBar}`}
            onClick={() => {
              navigate(`/dashboard/products`);
            }}
          >
            Products
          </button>
          {/* <div className="dark:text-white text-sm font-medium underline">
            AI Generations
          </div> */}
          <button
            className={`${styles.buttonSideBar}`}
            onClick={() => {
              navigate(`/dashboard/AI/text`);
            }}
          >
            Text Generations
          </button>
          <button
            className={`${styles.buttonSideBar}`}
            onClick={() => {
              navigate(`/dashboard/AI/generate-fill`);
            }}
          >
            Generate Fill
          </button>
          <button
            className={`${styles.buttonSideBar}`}
            onClick={() => {
              navigate(`/dashboard/AI/image-restore`);
            }}
          >
            Image Restore
          </button>
          <button
            className={`${styles.buttonSideBar}`}
            onClick={() => {
              navigate(`/dashboard/AI/bg-remover`);
            }}
          >
            Background Remover
          </button>
          <button
            className={`${styles.buttonSideBar}`}
            onClick={() => {
              navigate(`/dashboard/AI/gallery`);
            }}
          >
            Gallery
          </button>
          <button
            className={`${styles.buttonSideBar}`}
            onClick={() => {
              navigate(`/dashboard/Recommendation`);
            }}
          >
            Recommendation system
          </button>
          <button
            className={`${styles.buttonSideBar}`}
            onClick={() => {
              navigate(`/dashboard/WebScraping`);
            }}
          >
            Web Scraping
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
