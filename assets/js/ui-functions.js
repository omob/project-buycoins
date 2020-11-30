import { getProfileInfo, getRepositoriesInfo } from "./userApi.js";

const generateRepoMarkup = (repositories) => {
  let repoMarkup = "";

  repositories.nodes.forEach(
    ({
      name,
      description,
      updatedAt,
      repositoryTopics: { nodes: topics },
      primaryLanguage,
      forkCount,
      stargazerCount,
      url,
      isPrivate,
    }) => {
      repoMarkup += `
              <li class="flex">
                  <div class="flex-1">
                      <h3 class="repo-title">
                          <a href="${url}">
                              ${name}
                          </a>
    ${
      isPrivate
        ? `<span class="label label-outline v-align-middle ml-1 mb-1">
          Private
        </span>`
        : ""
    }
                      </h3>
                      <!-- description -->
                      <div class="repo-description">
                          <p class="text-gray w-75 mb-2 pr-4" itemprop="description">
                              ${description || ""}
                          </p>
                      </div>
                      ${
                        topics.length > 0
                          ? `
                        <div class="topics">
                          ${topics
                            .map(
                              ({ topic }) =>
                                `<a class="topic-tag" href="">${topic.name}</a>`
                            )
                            .toString()
                            .replaceAll(",", " ")}
                        </div>
                        `
                          : ""
                      }
                      
                      <div class="repo-detail">
                      ${
                        primaryLanguage
                          ? `<span class="ml-0 mr-3">
                                <span
                                  class="repo-language-color"
                                  style="background-color: ${primaryLanguage.color}"
                                ></span>
                                <span itemprop="programmingLanguage">
                                  ${primaryLanguage.name}
                                </span>
                              </span>
                            `
                          : ""
                      }
                      ${
                        stargazerCount
                          ? `<span>
                              <a class="muted-link mr-3" href="${url}/stargazers">
                                <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                                ${stargazerCount}
                              </a>
                            </span>`
                          : ""
                      }
                      ${
                        forkCount
                          ? `<a class="muted-link mr-3" href="/omob/LMS-FRONTEND/network/members">
                              <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
                              ${forkCount}
                            </a>`
                          : ""
                      }
                          
                          Updated
                          <relative-time datetime="${updatedAt}" class="no-wrap"
                              title="${updatedAt}"> ${moment(updatedAt)
        .startOf("day")
        .fromNow()}
                          </relative-time>
                      </div>
                  </div>
                  <div>
                    <button class="star btn btn-sm">
                        <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16"
                            version="1.1" width="16" height="16" role="img">
                            <path fill-rule="evenodd"
                                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                            </path>
                        </svg>
                        Star
                    </button>
                </div>
              </li>
    `;
    }
  );

  return repoMarkup;
};

const generateProfileMarkup = ({
  name,
  avatarUrl,
  bio,
  followers: { totalCount: totalFollowers },
  following: { totalCount: totalFollowing },
  email,
  location,
  starredRepositories: { totalCount: totalRepoStars },
  login: username,
}) => {
  return `    
  
                  <div class="flex d-md-none p-1">
                    <div style="width: 16%">
                        <img class="img-responsive img-rounded"
                            src="${avatarUrl}" />
                    </div>
                    <div class="mr-2">
                        <h1 class="m-0 pt-1 username px-2">
                            <span class="fullname">Ayodeji Abodunrin</span>
                            <span class="username">omob</span>
                        </h1>
                    </div>
                </div>
                <div class="profile-image mx-2 d-none d-md-block z-index-2 position-relative">
                    <a href="">
                        <img class="img-responsive img-rounded"
                            src="${avatarUrl}" />
                    </a>
                </div>
                <div class="px-2">
                    <h1 class="m-0 pt-1 username d-none d-md-block">
                        <span class="fullname">${name}</span>
                        <span class="username">${username}</span>
                    </h1>
                    <p>${bio}</p>
                    <button class="btn w-100 font-weight-bold ">Edit Profile</button>
                    <div class="mt-2 mt-md-0">
                        <div class="mb-3 font-size-14">
                            <a class="" href="">
                                <svg class="octicon octicon-people text-gray-light" height="16" viewBox="0 0 16 16"
                                    version="1.1" width="16" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z">
                                    </path>
                                </svg>
                                <span class="text-bold text-gray-dark">${totalFollowers}</span>
                                followers
                            </a> · <a class="link-gray no-underline no-wrap" href="">
                                <span class="text-bold text-gray-dark">${totalFollowing}</span>
                                following
                            </a> · <a class="link-gray no-underline no-wrap" href="/omob?tab=stars">
                                <svg class="octicon octicon-star text-gray-light" height="16" viewBox="0 0 16 16"
                                    version="1.1" width="16" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                                    </path>
                                </svg>
                                <span class="text-bold text-gray-dark">${totalRepoStars}</span>
                            </a>
                        </div>
                    </div>
                    <ul class="mt-1 v-card">
                        <li class="hide-sm hide-md">
                            <svg class="octicon octicon-location" viewBox="0 0 16 16" version="1.1" width="16"
                                height="16" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z">
                                </path>
                            </svg>
                            <span class="p-label">${location}</span>
                        </li>
                        <li><svg class="octicon octicon-mail" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z">
                                </path>
                            </svg>
                            <a class="u-email" href="mailto:${email}">${email}</a>
                        </li>


                    </ul>
                </div>`;
};

const setRepositoriesCount = (count) => {
  const repositoryCount = document.querySelector("span.total-repositories");

  repositoryCount.setAttribute("title", count);
  repositoryCount.textContent = count;
};

const populateRepositoryList = async () => {
  const userRepoList = document.querySelector(".user-repositories-list ul");

  const result = await getRepositoriesInfo(20);

  if (!result) return;

  const {
    data: {
      viewer: { repositories },
    },
  } = result;

  userRepoList.innerHTML = generateRepoMarkup(repositories);
  setRepositoriesCount(repositories.totalCount);
};

const setNavbarLoginUser = (user) => {
  const navbarImage = document.querySelector("img.avatar-user");
  navbarImage.setAttribute("alt", user.login);
  navbarImage.setAttribute("src", user.avatarUrl);
};

const populateProfileSection = async () => {
  const profileSection = document.querySelector(".profile-section");
  const result = await getProfileInfo();

  if (!result) return;

  const {
    data: { viewer: user },
  } = result;

  profileSection.innerHTML = generateProfileMarkup(user);

  setNavbarLoginUser(user);
  navigationBarInfo(user);
};

const navigationBarInfo = (userProfile) => {
  const userProfileAvatar = document.querySelector(".user-avatar img");
  const logonName = document.querySelector(".user-profile-logon-name");

  userProfileAvatar.setAttribute("src", userProfile.avatarUrl);
  userProfileAvatar.setAttribute("alt", userProfile.login);

  logonName.textContent = userProfile.login;
};

const handleWindowScroll = () => {
  const stickyNav = document.querySelector(".sticky-div");
  const stickyNavwrapper = document.querySelector(".nav-wrapper");

  const userProfileMini = document.querySelector(".user-profile-mini");

  window.addEventListener("scroll", (x) => {
    // desktop view sticky div
    if (x.currentTarget.scrollY > 90) {
      stickyNav.classList.add("scroll");
    } else {
      stickyNav.classList.remove("scroll");
    }

    // mobile view sticky div
    if (x.currentTarget.scrollY > 376) {
      stickyNavwrapper.classList.add("scroll");
    } else {
      stickyNavwrapper.classList.remove("scroll");
    }

    // user profile mini avatar
    if (x.currentTarget.scrollY > 290) {
      userProfileMini.classList.remove("hidden");
    } else {
      userProfileMini.classList.add("hidden");
    }
  });
};

export { populateRepositoryList, populateProfileSection, handleWindowScroll };
