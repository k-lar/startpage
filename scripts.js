/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"XKQUAWNGrmKemYUe","label":"net","bookmarks":[{"id":"BOvD0ghtzmpEXdP1","label":"youtube","url":"https://www.youtube.com/"},{"id":"e4ECTWeGdK3HAP0o","label":"twitter","url":"https://twitter.com/"},{"id":"bvBuhM7MWfFzGNQL","label":"spotify","url":"https://open.spotify.com/"}]},{"id":"eN6Hi1rowShOojk3","label":"dev","bookmarks":[{"id":"ukCHAZeMKlzTouPi","label":"gitlab","url":"https://gitlab.com/k_lar/"},{"id":"RqoaAhUKhM9bvgO2","label":"github","url":"https://github.com/k-lar/"}]},{"id":"YDH45cHnVk53Y1uq","label":"misc","bookmarks":[{"id":"4E0WgTm8ZZY6FtG2","label":"knaben","url":"https://knaben.ru"},{"id":"rNqbzVDq6mgis4pQ","label":"fmovies","url":"https://fmovies.to"},{"id":"EM53X9n0mSFBgoyy","label":"kimanime","url":"https://kimanime.com/"},{"id":"TjCJuxpdcNnLo5Rp","label":"animepahe","url":"https://animepahe.ru/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
