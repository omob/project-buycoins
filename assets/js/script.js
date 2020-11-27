import {
  populateProfileSection,
  populateRepositoryList,
} from "./ui-functions.js";

const init = async () => {
  await populateRepositoryList();
  await populateProfileSection();
};
init();
