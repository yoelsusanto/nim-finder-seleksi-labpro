import axios from "axios";

const toUrlEncoded = (jsonData = {}) =>
  Object.entries(jsonData)
    .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join("&");

export default axios.create({
  baseURL: "https://api.stya.net/nim",
  transformRequest: jsonData => toUrlEncoded(jsonData)
});
