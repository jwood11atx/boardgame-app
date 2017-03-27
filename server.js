//--------TEMP TO BE REPLACED WITH NEW DB
const {firebase, fbdb} = require("./firebase");
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

app.get(`/api/v1/hotness`, (req, res) => {
  request(`${xmlRoot}/hot?type=boardgame`,
  (error, response, body) => {
    if (!error && response.statusCode == 200){
      let json = xmlParser.toJson(body);
      json = JSON.parse(json);
      let games = json.items.item;
      games.forEach(game => {
        game.name = game.name.value;
        game.thumbnail = game.thumbnail.value;
      })
      res.send(games);
    }
  });
});

app.get(`/api/v1/matched-bg-ids?`, (req, res) => {
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

app.get(`/api/v1/bg-rec-list?`, (req, res) => {
  const ids = req.query.id.split(",");

  database("boardgames").where("id", "in", [...ids]).select()
    .then(recommendations => res.send(recommendations));
});

app.get(`/api/v1/bg-details/:id`, (req, res) => {
  const id = req.params.id;

  database(`boardgames`).where("id", id).select()
    .then(result => {
      if(result.length === 0){
        getXML(id, res);
      } else {
        const types = ["artists", "designers", "publishers", "categories", "mechanisms", "families"];
        let typeList = {};
        let count = 0;

        const promise = new Promise((resolve) => {
          types.forEach((type, i) => {
            database(`boardgame_${type}`).where("boardgame_id", id).select()
              .then(typeIDs => {
                typeList[type] = [];
                typeIDs.forEach(dbObj => {
                  typeList[type].push(dbObj[convertKey(type)]);
                })
              })
              .then(() => {
                count++;
                if(types.length === count){
                  resolve(typeList);
                }
              });
          });
        });

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
          }).then(bgDetails => {
            res.json(bgDetails)
          });
        });
      }
    });
});

app.get(`/api/v1/search?`, (req, res) => {
  let search = req.query.id.split(" ");
  const exact = req.query.exact;

  search = search.map(str => {
    let result = str.toLowerCase();
    return result[0].toUpperCase() + result.slice(1);
  });


  if (exact == 0) {
    database.raw(`SELECT * FROM boardgames WHERE name LIKE '%${search.join(" ")}%'`)
      .then(games => res.json(games.rows));
  } else {
    database("boardgames").where("name", search.join(" ")).select()
      .then(games => res.send(games));
  }

});

app.get(`/api/v1/boardgame/:id`, (req, res) => {
  const id = req.params.id;

  database("boardgames").where("id", id).select()
    .then(game => {
      if (game[0]) {
        res.send(game[0])
      } else {
        getXML(id, res);
      }
    });

});


const getXML = (id, res) => {
  request(`${xmlRoot}/thing?id=${id}`,
      (error, response, body) => {
    if (!error && response.statusCode == 200){
      let gameDetails = xmlParser.toJson(body);
      gameDetails = JSON.parse(gameDetails).items.item;

      let { thumbnail, image, name, description, yearpublished, minplayers, maxplayers, playingtime} = gameDetails;

      description = description.replace(/&times;/g, "x")
                       .replace(/&mdash;/g, "-")
                       .replace(/&#10;/g, "")
                       .replace(/&.*;/g, "");

      let boardgame = {
        id,
        thumbnail,
        image,
        description,
        name: name.value,
        yearpublished: yearpublished.value,
        minplayers: minplayers.value,
        maxplayers: maxplayers.value,
        playingtime: playingtime.value
      };

      database("boardgames").insert(boardgame)
        .then(() => {
          database("boardgames").select();
        });

      const detailsObj = convertToObject(gameDetails);

      updateTypeTables(detailsObj.categories, "categories", "category_id", id);
      updateTypeTables(detailsObj.mechanisms, "mechanisms", "mechanism_id", id);
      updateTypeTables(detailsObj.families, "families", "family_id", id);
      updateTypeTables(detailsObj.designers, "designers", "designer_id", id);
      updateTypeTables(detailsObj.artists, "artists", "artist_id", id);
      updateTypeTables(detailsObj.publishers, "publishers", "publisher_id", id);


      let bgDetails = Object.assign({}, boardgame, detailsObj);
      res.send(bgDetails);
    }
  })
}

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
      if (obj["designers"]) {
        obj["designers"].push(e.value);
        return obj;
      } else {
        obj["designers"] = [e.value];
        return obj;
      }

      case "boardgameartist":
      if (obj["artists"]) {
        obj["artists"].push(e.value);
        return obj;
      } else {
        obj["artists"] = [e.value];
        return obj;
      }

      case "boardgamepublisher":
      if (obj["publishers"]) {
        obj["publishers"].push(e.value);
        return obj;
      } else {
        obj["publishers"] = [e.value];
        return obj;
      }

      case "boardgamecategory":
      if (obj["categories"]) {
        obj["categories"].push(e.value);
        return obj;
      } else {
        obj["categories"] = [e.value];
        return obj;
      }

      case "boardgamemechanic":
      if (obj["mechanisms"]) {
        obj["mechanisms"].push(e.value);
        return obj;
      } else {
        obj["mechanisms"] = [e.value];
        return obj;
      }

      case "boardgamefamily":
      if (obj["families"]) {
        obj["families"].push(e.value);
        return obj;
      } else {
        obj["families"] = [e.value];
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

const cleanData = (data) => {
  if(typeof data == "object"){
    return data.map((e) => {
      return e.split(/[\.#$/\]\[\s]/g).join("_");
    });
  } else {
    return data.split(/[\.#$/\]\[\s]/g).join("_");
  }
};

const updateTypeTables = (typeArr, typeStr, type_id, boardgame_id) => {
  if (typeArr) {
    typeArr.forEach(type => {
      database(typeStr).where("type", type).select()
      .then((selection) => {
        if(selection.length === 0){
          database(typeStr).insert({type})
          .then(() => {
            updateJoinTables(type, typeArr, typeStr, type_id, boardgame_id);
          })
        } else {
          updateJoinTables(type, typeArr, typeStr, type_id, boardgame_id, selection);
        }
      });
    })
  }
};

const insertData = (typeStr, type_id, boardgame_id, result) => {
  database(`boardgame_${typeStr}`).insert(
    {
      boardgame_id,
      [type_id]: result[0].id
    }
  )
    .then(() => {
      database(`boardgame_${typeStr}`).select();
    })
};

const updateJoinTables = (type, typeArr, typeStr, type_id, boardgame_id, result) => {
  let dataObj = {};
  if (result) {
    insertData(typeStr, type_id, boardgame_id, result)
  } else {
    database(typeStr).where("type", type).select()
    .then((result) => {
      insertData(typeStr, type_id, boardgame_id, result)
    })
  }
};

/////////--------------------FIREBASE--------------------------////////////




///////////////////////////////////////////////////////////////////////////

app.listen(app.get("port"), () => {
  console.log(`Server is running on ${app.get("port")}.`);
});

module.exports = app;
