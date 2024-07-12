import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { fetchData } from "../../services/api";
import { useParams } from "react-router-dom";

function AdcreativeItemPage() {
  const [cookies] = useCookies(["access-token"]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await fetchData(
          `${id}?fields=id,status,image_url,asset_feed_spec,call_to_action_type,object_story_spec,object_type`,
          cookies["access-token"]
        );
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchdata();
  }, [id, cookies]);

  if (loading) {
    return (
      <div className="flex flex-row justify-center items-center w-full font-medium text-2xl text-black dark:text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full font-medium text-2xl text-black dark:text-white">
        Error <span className="text-red-600">{error.message}</span>
      </div>
    );
  }

  return (
    <>
      <>
        <div className="flex flex-col items-center h-[calc(100vh)-] overflow-auto no-scrollbar mx-auto py-2 gap-2 w-full px-4 space-y-2 text-black dark:text-white">
          {data && (
            <div className="w-full p-4  text-[12px] md:text-sm  relative">
              <div className=" flex justify-center items-center absolute top-5 right-5">
                <div
                  className={`px-2 py-1 rounded-full text-center  ${
                    data.status.toLowerCase() === "active"
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}
                >
                  {data.status}
                </div>
              </div>
              <div className="w-full flex md:flex-row flex-col">
                <img
                  src={
                    data.object_type.toLowerCase() !== "share"
                      ? data.object_story_spec?.video_data?.image_url
                      : data.image_url
                  }
                  alt=""
                  className="rounded-sm md:w-1/3 "
                />
                <div className="flex flex-col pt-4 px-4 w-full">
                  {data.object_type && (
                    <div className=" py-4 px-6">
                      Object Type
                      <br />
                      <span className="md:text-lg font-semibold">
                        {data.object_type.replaceAll("_", " ")}
                      </span>
                    </div>
                  )}
                  {data.asset_feed_spec && (
                    <div>
                      <div className=" py-4 px-6">
                        Title <br />
                        {data.asset_feed_spec?.titles.map((item) => {
                          return <div>{item.text}</div>;
                        })}
                      </div>
                      <div className=" py-4 px-6">
                        Descriptions <br />
                        {data.asset_feed_spec?.descriptions.map((item) => {
                          return <div>{item.text}</div>;
                        })}
                      </div>
                      <div className=" py-4 px-6">
                        Bodies <br />
                        {data.asset_feed_spec?.bodies.map((item) => {
                          return <div>{item.text}</div>;
                        })}
                      </div>
                      <div className=" py-4 px-6">
                        {data.object_story_spec.call_to_action && (
                          <div className="px-2 py-1 rounded-full text-center bg-gray-50">
                            {data.object_story_spec.call_to_action.type}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {data.object_story_spec?.link_data && (
                    <div>
                      <div className=" py-4 px-6">
                        Title <br />
                        {data.object_story_spec?.link_data?.name}
                      </div>
                      <div className=" py-4 px-6">
                        Description <br />
                        {data.object_story_spec.link_data.description}
                      </div>
                      <div className=" py-4 px-6">
                        Message <br />
                        {data.object_story_spec.link_data.message}
                      </div>
                    </div>
                  )}
                  {data.object_story_spec?.video_data?.title && (
                    <div>
                      <div className=" py-4 px-6">
                        Title <br />
                        {data.object_story_spec?.video_data?.title}
                      </div>
                      <div className=" py-4 px-6">
                        Message <br />
                        {data.object_story_spec.video_data.message}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
}

export default AdcreativeItemPage;
