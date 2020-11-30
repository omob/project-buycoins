// import config from "../../config.js";s

const apiEndpoint = "https://api.github.com/graphql";

const queryFetch = async (query, variables) => {
  return await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer aeb45b6ba741816d40bcbf98e9fb095976f57ca3`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
};

const getProfileInfo = async () => {
  const query = `
    query ProfileInfo {
        viewer {
            name
            avatarUrl
            bio
            followers {
              totalCount
            }
            following {
              totalCount
            }
            email
            location
            starredRepositories {
              totalCount
            }
            login
        }
    }
`;

  try {
    const response = await queryFetch(query);
    return await response.json();
  } catch (error) {
    console.log("Error ", error);
    return;
  }
};

const getRepositoriesInfo = async (number_of_repos) => {
  const query = `
    query FetchRepos ($number_of_repos: Int!) {
        viewer {
            repositories(first: $number_of_repos) {
            nodes {
                name
                description
                url
                updatedAt
                forkCount
                stargazerCount
                repositoryTopics(first: 8) {
                  nodes {
                      topic {
                        name
                      }
                  }
                }
                primaryLanguage {
                  color
                  name
                }
                isPrivate
            }
            totalCount
            }
        }
    }
`;

  try {
    const response = await queryFetch(query, { number_of_repos });
    return await response.json();
  } catch (error) {
    console.log("Error ", error);
    return;
  }
};

export { getProfileInfo, getRepositoriesInfo };
