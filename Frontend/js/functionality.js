
let cypherQuery;
let cypherQuery2;

function executeCustomQuery(){
    closeAllItems();
    showCustomQueryItem();
  
    document.getElementById("form_button").addEventListener("click", async function (event) {
      event.preventDefault();
      cypherQuery = document.getElementById("customQuery").value;
      let res=await runCypherQuery(cypherQuery);
      if(res!=false){
        writeResults(res);
        updateGraph(cypherQuery);
      }
      });
  }

  function getMostRatedUser() {
    closeAllItems();
  
    document.getElementById("form_button").addEventListener("click", async function (event) {
        event.preventDefault();
  
        cypherQuery =
          "MATCH (u:User)-[:RATED]->(a:Anime) RETURN u.user_id AS user_id, COUNT(a) AS ratedAnime ORDER BY ratedAnime  DESC LIMIT 10";
          let res=await runCypherQuery(cypherQuery);
          hideVizDiv() 
          writeResults(res);
      });
  }
  
  function getAnimeRatedByUser() {
    closeAllItems();
    showUserIDItem();
  
    document.getElementById("form_button").addEventListener("click", async function (event) {
        event.preventDefault();
        let userID = document.getElementById("userIdSelect").value;
        cypherQuery =
          "MATCH p=(u:User {user_id: "+
          userID +
          "})-[r:RATED]->(a:Anime) RETURN p";
  
          cypherQuery2 =
          "MATCH (u:User {user_id: "+
          userID +
          "})-[r:RATED]->(a:Anime) RETURN u.user_id as user_id, r.rating as rating, a.title as anime ORDER BY r.rating DESC";
  
        updateGraph(cypherQuery);
        let res=await runCypherQuery(cypherQuery2);
        writeResults(res);
      });
  }
  
  function getAnimeRecommendedForUser() {
    closeAllItems();
    showUserIDItem();
  
    document.getElementById("form_button").addEventListener("click", async function (event) {
        event.preventDefault();
  
        let userID = document.getElementById("userIdSelect").value;
        cypherQuery =
          "MATCH p=(u:User {user_id: " +
          userID +
          "})-[:RECOMMENDED]->(a:Anime) RETURN p";
  
          cypherQuery2 =
          "MATCH (u:User {user_id: "+
          userID +
          "})-[r:RECOMMENDED]->(a:Anime) RETURN u.user_id as user_id, r.rating as rating, a.title as anime ORDER BY r.rating DESC";
          updateGraph(cypherQuery);
          let res=await runCypherQuery(cypherQuery2);
          writeResults(res);
      });
  }
  
  function getRatingsForSameAnime() {
    closeAllItems();
   showAnimeNameItem();
  
    document.getElementById("form_button").addEventListener("click", async function (event) {
        event.preventDefault();
        let animeName = document.getElementById("animeNameSelect").value;
        cypherQuery =
          "MATCH (a:Anime {title: '" + animeName + "'})<-[r:RATED]-(u:User) RETURN a.title AS title, u.user_id AS user_id, r.rating AS rating ORDER BY rating DESC LIMIT 10";
          let res=await runCypherQuery(cypherQuery);
          hideVizDiv()
          writeResults(res);
      });
  }
  
  function getRatingsForAnime() {
    closeAllItems();
  
    document.getElementById("form_button").addEventListener("click", async function (event) {
        event.preventDefault();
        cypherQuery =
          "MATCH (a:Anime) RETURN a.title AS title, a.average_score AS average_rating ORDER BY average_rating DESC LIMIT 10";
          let res=await runCypherQuery(cypherQuery);
          hideVizDiv()
          writeResults(res);
      });
  }

  function getPopularAnimeByGenre() {
    closeAllItems();
    showGenreNameItem();
  
    document.getElementById("form_button").addEventListener("click", async function (event) {
        event.preventDefault();
        let genre = document.getElementById("genreSelect").value;
        cypherQuery =
          "MATCH (u:User)-[r:RATED]->(a:Anime)-[b:BELONGS_TO_GENRE]->(g:Genre {name: '" +
          genre +
          "'}) RETURN a, b, g, AVG(a.average_score) as avgRating ORDER BY avgRating DESC LIMIT 10";
        
          cypherQuery2 =
          "MATCH (u:User)-[r:RATED]->(a:Anime)-[:BELONGS_TO_GENRE]->(g:Genre {name: '" +
          genre +
          "'}) RETURN a.title AS anime, AVG(a.average_score) as avgRating ORDER BY avgRating DESC LIMIT 10";
        
          updateGraph(cypherQuery);
          let res=await runCypherQuery(cypherQuery2);
          writeResults(res)
      });
  }
  
  function getUserFavoriteGenres() {
    closeAllItems();
    showUserIDItem();
  
    document.getElementById("form_button").addEventListener("click", async function (event) {
        event.preventDefault();
        let userID = document.getElementById("userIdSelect").value;
        cypherQuery =
          "MATCH (u:User {user_id: " +userID +"})-[r:RATED]->(:Anime)-[:BELONGS_TO_GENRE]->(g:Genre) \
           WITH g.name as genre, AVG(r.rating) as avgRating, count(r) as numRatedAnime\
           RETURN genre, avgRating, numRatedAnime ORDER BY avgRating DESC";
  
          let res=await runCypherQuery(cypherQuery);
          hideVizDiv()
          writeResults(res)
      });
  }

  function getSimilarAnime(){
    closeAllItems();
    showAnimeNameItem();
  
    document.getElementById("form_button").addEventListener("click", async function (event) {
        event.preventDefault();
        let animeName = document.getElementById("animeNameSelect").value;
        cypherQuery =
          "MATCH p=(:Anime {title: '" + animeName +"'})-[s:SIMILAR_TO]->(:Anime) RETURN p";
  
        cypherQuery2 =
          "MATCH (a1:Anime {title: '" +animeName +"'})-[r:SIMILAR_TO]->(a2:Anime) RETURN a1.title as anime, a2.title as similar_anime, r.similarity as similarity_score ORDER BY similarity_score DESC LIMIT 10";
        
          updateGraph(cypherQuery);
          let res=await runCypherQuery(cypherQuery2);
          writeResults(res)
      });
  }

  function getUserRecAnimeBySimilarity(){

    closeAllItems();
    showUserIDItem();
  
    document.getElementById("form_button").addEventListener("click", async function (event) {
        event.preventDefault();
        let user = document.getElementById("userIdSelect").value;
        cypherQuery =
          "MATCH p=(u:User {user_id: " +
          user +
          "})-[r:RATED]->(a:Anime)-[:SIMILAR_TO]->(:Anime) WHERE r.rating >= 6 RETURN p";
        cypherQuery2 =
          "MATCH (u:User {user_id: " +
          user +
          "})-[r:RATED]->(:Anime)-[s:SIMILAR_TO]->(a:Anime) WHERE r.rating >= 6 RETURN a.title as title, s.similarity as similarity_score ORDER BY similarity_score DESC";
        updateGraph(cypherQuery);
        let res=await runCypherQuery(cypherQuery2);
        writeResults(res)
      });

  }
  
  function getPopularAnimeByType() {
    closeAllItems();
    showTypeNameItem();
  
    document.getElementById("form_button").addEventListener("click", async function (event) {
        event.preventDefault();
        let genre = document.getElementById("typeSelect").value;
        cypherQuery =
          "MATCH (u:User)-[r:RATED]->(a:Anime)-[b:TYPE]->(t:Type {name: '" +
          genre +
          "'}) RETURN a, b, t, AVG(a.average_score) as avgRating ORDER BY avgRating DESC LIMIT 10";
        
          cypherQuery2 =
          "MATCH (u:User)-[r:RATED]->(a:Anime)-[:TYPE]->(t:Type {name: '" +
          genre +
          "'}) RETURN a.title AS anime, AVG(a.average_score) as avgRating ORDER BY avgRating DESC LIMIT 10";
        
          updateGraph(cypherQuery);
          let res=await runCypherQuery(cypherQuery2);
          writeResults(res)
      });
  }
  
  function getPopularAnimeBySource() {
    closeAllItems();
    showSourceNameItem();
  
    document.getElementById("form_button").addEventListener("click", async function (event) {
        event.preventDefault();
        let genre = document.getElementById("sourceSelect").value;
        cypherQuery =
          "MATCH (u:User)-[r:RATED]->(a:Anime)-[b:ADAPTED_FROM]->(s:Source {name: '" +
          genre +
          "'}) RETURN a, b, s, AVG(a.average_score) as avgRating ORDER BY avgRating DESC LIMIT 10";
        
          cypherQuery2 =
          "MATCH (u:User)-[r:RATED]->(a:Anime)-[:ADAPTED_FROM]->(s:Source {name: '" +
          genre +
          "'}) RETURN a.title AS anime, AVG(a.average_score) as avgRating ORDER BY avgRating DESC LIMIT 10";
        
          updateGraph(cypherQuery);
          let res=await runCypherQuery(cypherQuery2);
          writeResults(res)
      });
  }
  
  function getPopularAnimeByRating() {
    closeAllItems();
    showRatingNameItem();
  
    document.getElementById("form_button").addEventListener("click", async function (event) {
        event.preventDefault();
        let genre = document.getElementById("ratingSelect").value;
        cypherQuery =
          "MATCH (u:User)-[r:RATED]->(a:Anime)-[b:RATED_AS]->(r:Rating {name: '" +
          genre +
          "'}) RETURN a, b, r, AVG(a.average_score) as avgRating ORDER BY avgRating DESC LIMIT 10";
        
          cypherQuery2 =
          "MATCH (u:User)-[r:RATED]->(a:Anime)-[:RATED_AS]->(r:Rating {name: '" +
          genre +
          "'}) RETURN a.title AS anime, AVG(a.average_score) as avgRating ORDER BY avgRating DESC LIMIT 10";
        
          updateGraph(cypherQuery);
          let res=await runCypherQuery(cypherQuery2);
          writeResults(res)
      });
  }
