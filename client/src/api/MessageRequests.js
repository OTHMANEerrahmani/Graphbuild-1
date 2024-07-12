const baseURL = `${import.meta.env.VITE_APP_SERVER}`;

export const getMessages = (id) => {
  return fetch(`${baseURL}/message/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
};

export const addMessage = (data) => {
  return fetch(`${baseURL}/message/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
};
