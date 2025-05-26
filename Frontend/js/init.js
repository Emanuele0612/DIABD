let userID = [];
let anime = [];
let genreNames = [];
let typeNames = [];
let sourceNames = [];
let ratingNames = [];
let neoViz;

initPage();

function initPage() {
  addChangePageEvent();
  setOptions();
  initGraph();
}

function addChangePageEvent() {
  let links = document.getElementsByClassName("toolbar-item");
  const homePage = document.getElementById("homePage");
  homePage.classList.add("active");
  Array.from(links).forEach((link) => {
    link.addEventListener("click", (e) => {
      Array.from(links).forEach(
        (link) => (link.style = "background-color:none; ")
      );
      e.target.style = "background-color:#5487df78";
      e.preventDefault();
      const href = link.getAttribute("href");
      const target = document.querySelector(href);
      const current = document.querySelector(".active");
      if (current) {
        current.style.display = "none";

        current.classList.remove("active");
      }
      target.classList.add("active");
    });
  });
}


async function getUserIDs() {
  const query = "MATCH (u:User) RETURN u.user_id AS user_id ORDER BY user_id";
  let result = await runCypherQuery(query);
  result = result.map((el) => el.user_id);
  result = result.map((el) => el.low);
  return result;
}

async function getAnime() {
  const query = "MATCH (a:Anime) RETURN a.id as id, a.title AS title";
  let result = await runCypherQuery(query);
  result = result.map((el) => {return {id:el.id.low, title:el.title}});
  return result;
}

async function getGenreNames() {
  const query = "MATCH (g:Genre) RETURN g.name AS name";
  let result = await runCypherQuery(query);
  result = result.map((el) => el.name);
  return result;
}

async function getTypeNames() {
  const query = "MATCH (t:Type) RETURN t.name AS name";
  let result = await runCypherQuery(query);
  result = result.map((el) => el.name);
  return result;
}

async function getSourceNames() {
  const query = "MATCH (s:Source) RETURN s.name AS name";
  let result = await runCypherQuery(query);
  result = result.map((el) => el.name);
  return result;
}

async function getRatingNames() {
  const query = "MATCH (r:Rating) RETURN r.name AS name";
  let result = await runCypherQuery(query);
  result = result.map((el) => el.name);
  return result;
}


async function setOptions() {
  let select = document.getElementById("functSelect");

  Object.keys(functionalityDescr).forEach((funct) => {
    let option = document.createElement("option");

    option.value = funct;
    option.innerHTML = functionalityDescr[funct];
    select.appendChild(option);
  });
  let option = document.createElement("option");
  option.value ="customQuery"
  option.innerHTML = "Write your own Cypher query that you want to execute"
  select.appendChild(option);
  userID = await getUserIDs();
  anime = await getAnime();
  genreNames = await getGenreNames();
  typeNames = await getTypeNames();
  sourceNames = await getSourceNames();
  ratingNames = await getRatingNames();

  let selectUser = document.getElementById("userIdSelect");
  userID.forEach((id) => {
    let option = document.createElement("option");
    option.value = id;
    option.innerHTML = id;
    selectUser.appendChild(option);
  });

  let selectAnime = document.getElementById("animeNameSelect");

  anime.forEach((anime) => {
    let option = document.createElement("option");
    option.value = anime.title;
    option.innerHTML = anime.title;
    selectAnime.appendChild(option);
  });

  let selectGenre = document.getElementById("genreSelect");

  genreNames.forEach((genre) => {
    let option = document.createElement("option");
    option.value = genre;
    option.innerHTML = genre;
    selectGenre.appendChild(option);
  });
  
  let selectType = document.getElementById("typeSelect");

  typeNames.forEach((type) => {
    let option = document.createElement("option");
    option.value = type;
    option.innerHTML = type;
    selectType.appendChild(option);
  });
  
  let selectSource = document.getElementById("sourceSelect");

  sourceNames.forEach((source) => {
    let option = document.createElement("option");
    option.value = source;
    option.innerHTML = source;
    selectSource.appendChild(option);
  });
  
  let selectRating = document.getElementById("ratingSelect");

  ratingNames.forEach((rating) => {
    let option = document.createElement("option");
    option.value = rating;
    option.innerHTML = rating;
    selectRating.appendChild(option);
  });
}


async function initGraph() {
  neoViz = new NeoVis.default(graphConfig);
  neoViz.render();
}
