import { CONSTANTS } from "../constants";
import { ICategory } from "../models";

const getCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await fetch(`${CONSTANTS.API_URL}/categories`);
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching the data:", error);
    throw error;
  }
};

export default getCategories;
