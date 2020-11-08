import axios from "axios";

export async function getData(url, seter, config) {
  const { data } = await axios.get(url, config);

  return data ? seter(data) : null;
}

export async function postData(url, _data, config) {
  const { data } = await axios.post(url, _data, config);

  return { ...data };
}
