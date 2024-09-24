// Client/src/api/customConfiguration.ts
import { Configuration } from "./axios-client";
import Cookies from "js-cookie";

// Determine the base URL based on the environment mode
const baseURL = import.meta.env.MODE === 'development' 
  ? "http://localhost:8000" 
  : "https://your-production-url.com"; // TODO: Update this URL

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