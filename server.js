//--------TEMP TO BE REPLACED WITH NEW DB
// const {firebase, database} = require("./firebase");
const request = require("request");
const xmlParser = require("xml2json");
const Promises = require("promise");
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const async = require("async");
const each = require("async/each");
const express = require("express");
const path = require("path");
const app = express();

const xmlRoot = "https://www.boardgamegeek.com/xmlapi2";

app.use(express.static(__dirname + "/build"));

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get(`/api/v1/hotness`, function(req, res){
  request(`${xmlRoot}/hot?type=boardgame`,
  function(error, response, body){
    if (!error && response.statusCode == 200){
      var json = xmlParser.toJson(body);
      json = JSON.parse(json);
      var games = json.items.item;
      games.forEach(game => {
        game.name = game.name.value;
        game.thumbnail = game.thumbnail.value;
      })
      res.send(games);
    }
  });
});

app.get(`/api/v1/matched-bg-ids?`, function(req, res){
  const ids = req.query.id.split(",")
  let count = 0;
  let userEntryTypes = {
    mechanisms: [],
    categories: [],
    families: [],
    designers: [],
    publishers: [],
    artists: []
  };
  const entryKeys = Object.keys(userEntryTypes);
  let matchList = [];
  let xmlResults = [];


  database("boardgames").where("id", "in", [...ids]).select()
    .then((bgList) => {
        const promise = new Promise((resolve) => {
          entryKeys.forEach(key => {
            database(`boardgame_${key}`)
              .where("boardgame_id", "in", [...ids]).select()
                .then(result => {
                  result.forEach(type => {
                    userEntryTypes[key].push(type[convertKey(key)])
                  });

                  if(count === entryKeys.length-1){
                    count = 0;
                    resolve();
                  } else {
                    count++;
                  };
                });
          });
        })
        promise.then(() => {
          return new Promise((resolve) => {
            entryKeys.forEach(key => {
              database(`boardgame_${key}`)
              .where(convertKey(key), "in", [...userEntryTypes[key]]).select()
              .then(result => {
                matchList = addToMatchList(result, ids, matchList);

                if(count === entryKeys.length-1){
                  count = 0;
                  resolve();
                } else {
                  count++;
                };
              })
            })
          })
        }).then(() => {
          if(bgList.length !== ids.length){
            count = 1;
            userEntryTypes = {
              mechanisms: [],
              categories: [],
              families: [],
              designers: [],
              publishers: [],
              artists: []
            };

            bgList = bgList.reduce((arr, obj) => {
              arr.push(obj.id)
              return arr;
            }, []);

            const xmlList = ids.filter(id => bgList.indexOf(Number(id)) === -1);

            request(`${xmlRoot}/thing?id=${xmlList.join(",")}`,
                (error, response, body) => {

              if (!error && response.statusCode == 200){
                let json = xmlParser.toJson(body);
                json = JSON.parse(json);
                if(json.items.item.length){
                  json.items.item.forEach((data) => {
                    xmlResults.push(convertToObject(data));
                  });
                } else {
                  xmlResults.push(convertToObject(json.items.item));
                }

                xmlResults.forEach(bgObj => {
                  for(let key in bgObj){
                    const table = {
                      Categories: "categories",
                      Designers: "designers",
                      Family: "families",
                      Mechanisms: "mechanisms"
                    }
                    database(table[key])
                      .where("type", "in", [...bgObj[key]])
                      .select()
                      .then(result => {
                          result.forEach(obj => {
                            userEntryTypes[table[key]].push(obj.id)
                          })
                        })
                      .then(() => {
                          if(xmlResults.length * Object.keys(bgObj).length === count){
                            count = 1;
                            entryKeys.forEach(key => {
                              database(`boardgame_${key}`)
                              .where(convertKey(key), "in", [...userEntryTypes[key]]).select()
                              .then(result => {
                                matchList = addToMatchList(result, ids, matchList);
                                if(count === entryKeys.length){
                                  res.send(getRecList(matchList));
                                } else {
                                  count++;
                                };
                              })
                            })
                          } else {
                            count++;
                          }
                        })
                  }
                })
              }
            })
          } else {
            res.send(getRecList(matchList));
          }
        })
    })
});

app.get(`/api/v1/bg-rec-list?`, function(req, res){
  var ids = req.query.id.split(",");

  database("boardgames").where("id", "in", [...ids]).select()
    .then(recommendations => res.send(recommendations));
});

app.get(`/api/v1/bg-details/:id`, (req, res) => {
  const id = req.params.id;
  const types = ["artists", "designers", "publishers", "categories", "mechanisms", "families"];

  const promise = new Promise((resolve) => {
    let typeList = {};
    types.forEach((type, i) => {
      database(`boardgame_${type}`).where("boardgame_id", id).select()
        .then(typeIDs => {
          typeList[type] = [];
          typeIDs.forEach(dbObj => typeList[type].push(dbObj[convertKey(type)]));
        })
        .then(() => {
          if(types.length-1 === i){
            resolve(typeList);
          }
        })
      })
  })

  promise.then(typeList => {
    let count = 0;
    let bgDetails = {};
    let listCount = 0;
    Object.keys(typeList).forEach(type => {
      listCount += typeList[type].length;
    });
    new Promise((resolve)=> {
      types.forEach((type, i) => {
        if (typeList[type].length > 0) {
          typeList[type].forEach(typeID => {
              database(type).where("id", typeID).select()
              .then(obj => {
                if(bgDetails[type]){
                  bgDetails[type].push(obj[0].type)
                } else {
                  bgDetails[type] = [obj[0].type];
                }
              }). then(() => {
                count++;
                if(listCount === count){
                  setTimeout(() => {
                    resolve(bgDetails)
                  }, 200)
                }
              })
          })
        } else {
          bgDetails[type] = ["N/A"]
        }
      })
    }).then(bgDetails => res.json(bgDetails))
  })
})

app.get(`/api/v1/search?`, function(req, res){
  let search = req.query.id.split(" ");
  const exact = req.query.exact;

  search = search.map(str => {
    let result = str.toLowerCase();
    return result[0].toUpperCase() + result.slice(1);
  })

  database.raw(`SELECT * FROM boardgames WHERE name LIKE '%${search.join(" ")}%'`)
    .then(games => res.json(games.rows));
});

app.get(`/api/v1/boardgame/:id`, (req, res) => {
  const id = req.params.id;

  database("boardgames").where("id", id).select()
    .then(game => res.send(game[0]));

})

const convertKey = (str) => {
  switch (str) {
    case "mechanisms":
      return "mechanism_id"
    case "categories":
      return "category_id";
    case "families":
      return "family_id";
    case "designers":
      return "designer_id";
    case "publishers":
      return "publisher_id";
    case "artists":
      return "artist_id";
    default:
      break;
  }
};

const getRecList = (matchList) => {
  let recObj = {};
  for(let i=0; matchList.length>i; i++){
    if(recObj[matchList[i]]){
      recObj[matchList[i]]++;
    } else {
      recObj[matchList[i]] = 1;
    }
  }

  let recommendations =
      Object.keys(recObj).sort((a,b) => {
        return recObj[b]-recObj[a];
      }).splice(0,20);

  return recommendations;
}

const convertToObject = (data) => {
  return data.link.reduce((obj, e) => {
    switch (e.type) {
      case "boardgamedesigner":
      if (obj["Designers"]) {
        obj["Designers"].push(e.value);
        return obj;
      } else {
        obj["Designers"] = [e.value];
        return obj;
      }

      case "boardgamecategory":
      if (obj["Categories"]) {
        obj["Categories"].push(e.value);
        return obj;
      } else {
        obj["Categories"] = [e.value];
        return obj;
      }

      case "boardgamemechanic":
      if (obj["Mechanisms"]) {
        obj["Mechanisms"].push(e.value);
        return obj;
      } else {
        obj["Mechanisms"] = [e.value];
        return obj;
      }

      case "boardgamefamily":
      if (obj["Family"]) {
        obj["Family"].push(e.value);
        return obj;
      } else {
        obj["Family"] = [e.value];
        return obj;
      }
      default:
      return obj;
    }
  }, {});
};

const addToMatchList = (result, ids, matchList) => {
  for(let i=0; result.length>i; i++){
    if (ids.indexOf(result[i].boardgame_id.toString()) == -1){
      matchList.push(result[i].boardgame_id);
    }
  };
  return matchList
}

function cleanData(data){
  if(typeof data == "object"){
    return data.map(function(e){
      return e.split(/[\.#$/\]\[\s]/g).join("_");
    });
  } else {
    return data.split(/[\.#$/\]\[\s]/g).join("_");
  }
}

app.listen(app.get("port"), () => {
  console.log(`Server is running on ${app.get("port")}.`);
});

module.exports = app;
