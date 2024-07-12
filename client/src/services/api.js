const API_URL = "https://graph.facebook.com/";
const version = "v19.0";

export const fetchData = async (fields, access_token) => {
  try {
    const response = await fetch(
      `${API_URL}${version}/${fields}&access_token=${access_token}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchDataFromUrl = async (url) => {
  try {
    const response = await fetch(
      `${url}`
      //   {
      //   method: "GET",
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
