export const getGithubUser = async (username = 'octocat') => {
  const url = `https://api.github.com/users/${username}`
  return await (
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json()
}
