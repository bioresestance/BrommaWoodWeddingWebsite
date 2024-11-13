// Client/src/api/customConfiguration.ts
import { Configuration } from "./axios-client";
import Cookies from "js-cookie";

// Determine the base URL based on the environment mode
const baseURL:string = import.meta.env.VITE_API_BASE_URL || "PLACEHOLDER_BASE_URL";

console.log("API Base URL: ", baseURL);

const apiConfiguration = new Configuration({
  basePath: baseURL,
  accessToken: () => {
    const token = Cookies.get("token");
    if (token) {
      return token;
    }
    return "";
  },
});

export default apiConfiguration;