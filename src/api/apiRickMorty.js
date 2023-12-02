// apiService.js
const baseURL = "";

export default {
  async fetchData() {
    try {
      const response = await fetch(`${baseURL}/data`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching data");
    }
  },
};
