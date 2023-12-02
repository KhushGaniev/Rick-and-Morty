const baseURL = "https://rickandmortyapi.com/api/character/?";

async function getDataRickMorty(queryParams = {}) {
  const queryString = Object.keys(queryParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
    )
    .join("&");

  const url = `${baseURL}${queryString ? `?${queryString}` : ""}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
}

export { getDataRickMorty };
