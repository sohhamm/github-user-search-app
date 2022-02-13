export const getGithubUser = async username =>
  await (
    await fetch(
      `https://api.github.com/users/${username.length ? username : 'octocat'}`,
    )
  ).json()
