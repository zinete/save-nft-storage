import { Axios } from "../request/http";

const getFileList = async () => {
  return await Axios.get(`/?limit=10`);
};

export { getFileList };
