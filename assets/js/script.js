import { getProfileInfo, getRepositoriesInfo } from "./userApi.js";

const userRepoList = document.querySelector(".user-repositories-list ul");

const generateRepoMarkUp = (repositories) => {
  let repoMarkup = "";

  repositories.nodes.forEach(
    ({
      name,
      description,
      updatedAt,
      forkCount,
      projectUrl,
      repositoryTopics: { topics: nodes },
    }) => {
      repoMarkup += `
              <li>
                  <div>
                      <h3 class="repo-title">
                          <a href="${projectUrl}">
                              ${name}
                          </a>
                      </h3>
                      <!-- description -->
                      <div class="repo-description">
                          <p class="text-gray w-75 mb-2 pr-4" itemprop="description">
                              ${description}
                          </p>
                      </div>
                      <div class="repo-detail">
                          <span class="ml-0 mr-3">
                              <span class="repo-language-color" style="background-color: #2c3e50"></span>
                              <span itemprop="programmingLanguage">Vue</span>
                          </span>
                          Updated
                          <relative-time datetime="${updatedAt}" class="no-wrap"
                              title="${updatedAt}"> ${moment(updatedAt)
        .startOf("day")
        .fromNow()}
                          </relative-time>
                      </div>
                  </div>
                  <div></div>
              </li>
    `;
    }
  );

  return repoMarkup;
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
};

const init = async () => {
  await populateRepositoryList();
};
init();
