export const getAPICall = async (url) => {
  let response;
  try {
    response = await fetch(url);
    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postAPICall = async (url, paylaod) => {
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(paylaod),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
