import { useSelector } from "react-redux";

const baseURL = `${import.meta.env.VITE_APP_SERVER}`;

const authHeaders = () => {
  const auth = useSelector((state) => state.auth);
  if (auth.token && auth.user) {
    return {
      Authorization: `Bearer ${auth.token}`,
    };
  }
  return {};
};

export const getUser = async (userId) => {
  try {
    const response = await fetch(`${baseURL}/user/${userId}`, {});
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const findAdminUser = async () => {
  try {
    const users = await fetch(`${baseURL}/user/`);
    const usersData = await users.json();
    const adminUser = usersData.find((user) => user.isAdmin === true);
    return adminUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUser = (id, formData) => {
  return fetch(`${baseURL}/user/${id}`, {
    method: "PUT",
    headers: {
      ...authHeaders(),
    },
    body: formData,
  }).then((response) => response.json());
};

export const getAllSubscribesUser = () => {
  return fetch(`${baseURL}/user/subscriber`, {}).then((response) =>
    response.json()
  );
};
