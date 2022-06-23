export const getGithubUser = async username => {
  try {
    return await (
      await fetch(
        `https://api.github.com/users/${
          username.length ? username : 'octocat'
        }`,
      )
    ).json()
  } catch (err) {
    return null
  }
}
