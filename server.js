//--------TEMP TO BE REPLACED WITH NEW DB
// const {firebase, database} = require("./firebase");
const cors = require('cors');
const request = require("request");
const xmlParser = require("xml2json");
const Promises = require("promise");

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
//-------------------------------------------------
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(__dirname + "/build"));

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get(`/hotness`, function(req, res){
  request("https://bgg-json.azurewebsites.net/hot",
  function(error, response, body){
    if (!error && response.statusCode == 200){
      res.send(body);
    }
  });
});

// app.get("/test", (req, res) => {
//   // database.ref(`Categories/`).once("value")
//   //   .then((snap) => {
//   //     res.json(snap.val());
//   //   })
//   // database("boardgames").select()
//   //   .then((boardgames) => res.status(200).json(boardgames))
//   //   .catch((err) => console.log("something went wrong with /test!"));
// });


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
    default:
      break;
  }
};

app.get(`/matched-boardgames?`, function(req, res){
  const ids = req.query.id.split(",")
  let count = 0;
  let userEntryTypes = {
    mechanisms: [],
    categories: [],
    families: [],
    designers: []
  };
  const entryKeys = Object.keys(userEntryTypes);
  let matchList = [];
  let xmlResults = [];


  database("boardgames").where("id", "in", [...ids]).select()
    .then((bgList) => {

      ////--------------KNEX-------------------------------//////
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
                for(let i=0; result.length>i; i++){
                  if (ids.indexOf(result[i].boardgame_id.toString()) == -1){
                    matchList.push(result[i].boardgame_id);
                  }
                };

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
              designers: []
            };

            bgList = bgList.reduce((arr, obj) => {
              arr.push(obj.id)
              return arr;
            }, []);

            const xmlList = ids.filter(id => bgList.indexOf(Number(id)) === -1);

            request(`https://www.boardgamegeek.com/xmlapi2/thing?id=${xmlList.join(",")}`,
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
                    let table = null;
                    switch (key) {
                      case "Categories":
                        table = "categories";
                        break;
                      case "Designers":
                        table = "designers";
                        break;
                      case "Family":
                        table = "families";
                        break;
                      case "Mechanisms":
                        table = "mechanisms";
                        break;
                      default:
                        return;
                    }
                    database(table)
                      .where("type", "in", [...bgObj[key]]).select()
                        .then(result => {
                          result.forEach(obj => {
                            userEntryTypes[table].push(obj.id)
                          })
                        })
                        .then(() => {
                          if(xmlResults.length * Object.keys(bgObj).length === count){
                            count = 1;
                            entryKeys.forEach(key => {
                              database(`boardgame_${key}`)
                              .where(convertKey(key), "in", [...userEntryTypes[key]]).select()
                              .then(result => {
                                for(let i=0; result.length>i; i++){
                                  if (ids.indexOf(result[i].boardgame_id.toString()) == -1){
                                    matchList.push(result[i].boardgame_id);
                                  }
                                };
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
        //////////----------------------------------------------------//////////

    })






  /////--------------RAW MULTI SELECT------------------------/////
  // database.raw(`
  //   SELECT boardgame_mechanisms.mechanism_id,
  //          boardgame_families.family_id,
  //          boardgame_categories.category_id
  //   FROM boardgame_mechanisms
  //   JOIN boardgame_families ON boardgame_families.boardgame_id =
  //                              boardgame_mechanisms.boardgame_id
  //   JOIN boardgame_categories ON boardgame_categories.boardgame_id =
  //                                boardgame_mechanisms.boardgame_id
  //   WHERE boardgame_mechanisms.boardgame_id in (${req.query.id})
  //   `)
  // .then((result) => {
  //   let mechanisms = {};
  //   let families = {};
  //   let categories = {}
  //
  //   result.rows.forEach(obj => {
  //     mechanisms[obj.mechanism_id] = null;
  //     families[obj.family_id] = null;
  //     categories[obj.category_id] = null;
  //   })
  //   userEntryTypes.mechanisms = Object.keys(mechanisms);
  //   userEntryTypes.families = Object.keys(families);
  //   userEntryTypes.categories = Object.keys(categories);
  //   console.log(userEntryTypes);
  // })
  ///-----------------------------------------------------/////////



  // ids.forEach(function(id, i){
  //   database("boardgames").where("id", "in", [...ids]).select()
  //   .then(function(result){
  //     count++;
  //     console.log(result);
  //     if(result === null){
  //       xmlList.push(id);
  //     } else {
  //       results.push(result);
  //     }
  //   })
  //   .then(function(){
  //     if (count === ids.length) {
  //       if(xmlList.length > 0){
  //         results.push({xml: xmlList});
  //         res.send(results);
  //       } else {
  //         res.send(results);
  //       }
  //     }
  //   });
  // });
});

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

app.get(`/list?`, function(req, res){
  var ids = req.query.id;

  request(`https://www.boardgamegeek.com/xmlapi2/thing?id=${ids}`,
  function(error, response, body){
    if (!error && response.statusCode == 200){
      var json = xmlParser.toJson(body);
      json = JSON.parse(json);
      if(json.items)
        res.send(json.items.item);
    }
  });
});

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
}

app.get(`/xml?`, (req, res) => {
  var ids = req.params.id;
  var results = [];
  request(`https://www.boardgamegeek.com/xmlapi2/thing?id=${ids}`,
  function (error, response, body){
    if (!error && response.statusCode == 200){
      var json = xmlParser.toJson(body);
      json = JSON.parse(json);

      if(json.items.item.length){
        json.items.item.forEach(function(data){
          results.push(convertToObject(data));
        });
        res.send(results);
      } else {
        results.push(convertToObject(json.items.item));
        res.send(results);
      }
    }
  })
});

app.get(`/recommendation?`, function(req, res){
  var key = Object.keys(req.query)[0];
  var cleanValues = cleanData(req.query[key]).split(",");
  var results = []

  cleanValues.forEach(function(value, index){
    database.ref(`${key}/${value}`).once("value")
    .then(function(snapshot){
      if(snapshot.val() !== null){
        results.push(...snapshot.val());
      }
    })
    .then(function(){
      if(cleanValues.length-1 === index){
        res.json(results)
      }
    });
  });
});

app.get(`/search?`, function(req, res){
  var search = req.query.id.split(" ").join("+");
  var exact = req.query.exact

  request(`https://www.boardgamegeek.com/xmlapi2/search?query=${search}&type=boardgame&exact=${exact}`,
  function (error, response, body){
    if (!error && response.statusCode == 200){
      var json = xmlParser.toJson(body);
      var gameList = JSON.parse(json);
      if(gameList.items.total == 0){
        res.send([])
      } else {
        gameList = gameList.items.item;
        if(gameList.length > 1){
          gameList = gameList.map(function(game){
            return game.id;
          });
          res.send(gameList);
        } else {
          res.send([gameList.id]);
        }
      }
    }
  });
});

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
