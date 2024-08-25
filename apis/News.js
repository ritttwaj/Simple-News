import axios from "axios";

const API_KEY = "e2cda7a67b0c4684a69536f87bd42f5b";

export default axios.create({
  baseURL: "https://newsapi.org/v2/",
});

export { API_KEY };
