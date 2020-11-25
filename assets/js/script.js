import { getProfileInfo, getRepositoriesInfo } from "./userApi.js";

const init = async () => {
  console.log(await getRepositoriesInfo(10));
  await getProfileInfo();
};
init();
