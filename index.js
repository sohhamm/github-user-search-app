import {getGithubUser} from './data.js'

let userData
let theme = 'light'

const profileDiv = document.querySelector('.mainContainer')
const themeTextDark = document.querySelector('.flex-c.dark')
const themeTextLight = document.querySelector('.flex-c.light')

function detectColorScheme() {
  // GUSA => Github User Search App
  if (localStorage.getItem('__GUSA__theme')) {
    if (localStorage.getItem('__GUSA__theme') == 'dark') {
      theme = 'dark'
    }
  } else if (!window.matchMedia) {
    return false
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark'
  }

  if (theme == 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
    themeTextLight.style.display = 'none'
    themeTextDark.style.display = 'flex'
  } else {
    themeTextDark.style.display = 'none'
    themeTextLight.style.display = 'flex'
  }
}

detectColorScheme()

themeTextDark.addEventListener('click', () => switchTheme('L'))
themeTextLight.addEventListener('click', () => switchTheme('D'))

function switchTheme(theme) {
  if (theme === 'D') {
    localStorage.setItem('__GUSA__theme', 'dark')
    document.documentElement.setAttribute('data-theme', 'dark')
    themeTextLight.style.display = 'none'
    themeTextDark.style.display = 'flex'
  } else {
    localStorage.setItem('__GUSA__theme', 'light')
    document.documentElement.setAttribute('data-theme', 'light')
    themeTextDark.style.display = 'none'
    themeTextLight.style.display = 'flex'
  }
}

const makeProfileTemplate = async () => {
  if (!userData) {
    await handleSearch()
  }
  const template = ` <div class="profileTop">
    <img
      src="${userData.avatar_url}"
      alt="profile"
      class="profilePic"
    />
    <div class="profileMain">
      <div class="profileMainInfo">
        <div>
          <h1 class="name">${userData.name}</h1>
          <p class="username">@${userData.login}</p>
          <p class="joinDate tablet">Joined ${new Date(userData.created_at)
            .toDateString()
            .slice(4)}</p>
        </div>
        <p class="joinDate desktop">Joined ${new Date(userData.created_at)
          .toDateString()
          .slice(4)}</p>
      </div>
      <p class="bio desktop">${userData.bio ?? 'This profile has no bio'}</p>
    </div>
  </div>

  <p class="bio tablet">${userData.bio ?? 'This profile has no bio'}</p>

  <div class="profileBottom">
    <div class="stats">
      <div>
        <p class="statTitle">Repos</p>
        <p class="statInfo">${userData.public_repos}</p>
      </div>

      <div>
        <p class="statTitle">Followers</p>
        <p class="statInfo">${userData.followers}</p>
      </div>

      <div>
        <p class="statTitle">Following</p>
        <p class="statInfo">${userData.following}</p>
      </div>
    </div>

    <div class="extraInfos">
      <div class="flex">
        <img
          src="./assets/icon-location.svg"
          alt="location"
          class="extraInfoIcon"
        />
        <p class="extraInfoTitle" style="padding-left:5px;">${
          userData.location ?? 'Not Available'
        }</p>
      </div>

      <div class="flex ${userData.twitter_username ? '' : 'NA'}">
        <img
          src="./assets/icon-twitter.svg"
          alt="twitter"
          class="extraInfoIcon NA"
        />
        <p class="extraInfoTitle">${
          userData.twitter_username ?? 'Not Available'
        }</p>
      </div>

      <div class="flex">
        <img
          src="./assets/icon-website.svg"
          alt="website"
          class="extraInfoIcon"
        />
        <a href=${userData.blog} target="_blank">
        <p class="extraInfoTitle ${!userData.blog.length ? 'NA' : ''}">${
    userData.blog.length ? userData.blog : 'Not Available'
  }</p>
        </a>
      </div>

      <div class="flex">
        <img
          src="./assets/icon-company.svg"
          alt="company"
          class="extraInfoIcon"
        />
        <p class="extraInfoTitle">${userData.company ?? 'Not Available'}</p>
      </div>
    </div>
  </div>`

  profileDiv.innerHTML = template
}

makeProfileTemplate()

async function handleSearch() {
  const search = document.getElementById('search')
  const searchText = search.value
  userData = await getGithubUser(searchText)
  if (searchText) search.value = ''
  const noResult = document.querySelector('.noResult')
  if (userData.message === 'Not Found') {
    noResult.style.display = 'block'
    return
  } else {
    noResult.style.display = 'none'
  }
  makeProfileTemplate()
}

const searchButton = document.querySelector('.searchButton')
const searchInput = document.querySelector('#search')

searchButton.addEventListener('click', handleSearch)
searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    handleSearch(e)
  }
})
