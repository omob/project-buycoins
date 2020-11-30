import {
  populateProfileSection,
  populateRepositoryList,
  handleWindowScroll,
} from "./ui-functions.js";

const init = async () => {
  await populateRepositoryList();
  await populateProfileSection();
};

handleWindowScroll();
init();
