import { getProfileInfo, getRepositoriesInfo } from "./userApi.js";
import { generateRepoMarkUp } from "./ui-functions.js";

const userRepoList = document.querySelector(".user-repositories-list ul");
const repositoryCount = document.querySelector("span.total-repositories");

const setRepositoriesCount = (count) => {
  repositoryCount.setAttribute("title", count);
  repositoryCount.textContent = count;
};

const populateRepositoryList = async () => {
  const result = await getRepositoriesInfo(20);

  if (!result) return;

  const {
    data: {
      viewer: { repositories },
    },
  } = result;

  userRepoList.innerHTML = generateRepoMarkUp(repositories);
  setRepositoriesCount(repositories.totalCount);
};

const init = async () => {
  await populateRepositoryList();
};
init();
