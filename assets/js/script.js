import { getProfileInfo, getRepositoriesInfo } from "./userApi.js";
import { generateRepoMarkUp } from "./ui-functions.js";

const userRepoList = document.querySelector(".user-repositories-list ul");

const populateRepositoryList = async () => {
  const result = await getRepositoriesInfo(20);

  if (!result) return;

  const {
    data: {
      viewer: { repositories },
    },
  } = result;

  userRepoList.innerHTML = generateRepoMarkUp(repositories);
};

const init = async () => {
  await populateRepositoryList();
};
init();
