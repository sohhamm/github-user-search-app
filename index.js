import {getGithubUser} from './data.js'

let userData

const profileDiv = document.querySelector('.mainContainer')

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
        </div>
        <p class="joinDate">Joined ${new Date(userData.created_at)
          .toDateString()
          .slice(4)}</p>
      </div>
      <p class="bio">${userData.bio ?? 'This profile has no bio'}</p>
    </div>
  </div>

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
        <p class="extraInfoTitle">${userData.location ?? 'Not Available'}</p>
      </div>

      <div class="flex NA">
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
        <p class="extraInfoTitle ${!userData.blog.length ? 'NA' : ''}">${
    userData.blog.length ? userData.blog : 'Not Available'
  }</p>
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

  console.log(userData)

  profileDiv.innerHTML = template
}

makeProfileTemplate()

async function handleSearch() {
  const searchText = document.getElementById('search').value
  userData = await getGithubUser(searchText)
  makeProfileTemplate()
}

const searchInput = document.querySelector('.searchButton')

searchInput.addEventListener('click', handleSearch)
