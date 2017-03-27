process.env.NODE_ENV = "test";

const chaiHttp = require("chai-http");
const chai = require("chai");
const {expect} = require("chai");
const knex = require("../../../db/knex.js");
const app = require("../../../server.js");

chai.use(chaiHttp);

describe("Server/API", () => {

  describe("GET on page load ", () => {
    it("should fetch index.html", (done) => {
      chai.request(app)
        .get("/")
        .end((err, res) => {
          if(err) {done(err)};
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          done();
        });
    });
  });

  describe("/hotness", function(){
    this.timeout(5000);
    it("should fetch the HOTNESSSS", (done) => {
      chai.request(app)
        .get("/api/v1/hotness")
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(50);
          expect(res.body[0]).to.have.property("id");
          expect(res.body[0]).to.have.property("rank");
          expect(res.body[0]).to.have.property("thumbnail");
          expect(res.body[0]).to.have.property("name");
          expect(res.body[0]).to.have.property("yearpublished");
        })
        .then(() => done())
    });
  });

  describe("/matched-bg-ids", () => {
    it("should return a list of matched games", (done) => {
      chai.request(app)
        .get("/api/v1/matched-bg-ids?id=18749,18785")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
          res.body.forEach(id => {
            expect(id).to.not.equal("18715");
            expect(id).to.not.equal("18732");
          })
        done();
      });
    });
  });

  describe("/bg-rec-list?", function(){
    it("should fetch the a list of recommended games", (done) => {
      chai.request(app)
        .get("/api/v1/bg-rec-list?id=18480,18785")
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          expect(res.body[0]).to.have.property("rank");
          expect(res.body[0].rank).to.be.a("number");
          expect(res.body[0].rank).to.equal(71);
          expect(res.body[0]).to.have.property("id");
          expect(res.body[0].id).to.be.a("number");
          expect(res.body[0].id).to.equal(18480);
          expect(res.body[0]).to.have.property("name");
          expect(res.body[0].name).to.be.a("string");
          expect(res.body[0].name).to.equal("Care Bears: How Many Bears?");
          expect(res.body[0]).to.have.property("thumbnail");
          expect(res.body[0].thumbnail).to.be.a("string");
          expect(res.body[0].thumbnail).to.equal("//cf.geekdo-images.com/images/pic81891_t.jpg");
          expect(res.body[0]).to.have.property("image");
          expect(res.body[0].image).to.be.a("string");
          expect(res.body[0].image).to.equal("//cf.geekdo-images.com/images/pic81891.jpg");
          expect(res.body[0]).to.have.property("description");
          expect(res.body[0].description).to.be.a("string");
          expect(res.body[0].description).to.equal("How Many Bears is a children\'s card game about counting and color matching.  Players turn over cards from their hand and try to match cards in the middle of the table by either color or number of bears on each card.  The player who collects the most matches wins.  Ages 4 - 8");
          expect(res.body[0]).to.have.property("minplayers");
          expect(res.body[0].minplayers).to.be.a("number");
          expect(res.body[0].minplayers).to.equal(1);
          expect(res.body[0]).to.have.property("maxplayers");
          expect(res.body[0].maxplayers).to.be.a("number");
          expect(res.body[0].maxplayers).to.equal(4);
          expect(res.body[0]).to.have.property("yearpublished");
          expect(res.body[0].yearpublished).to.be.a("number");
          expect(res.body[0].yearpublished).to.equal(1983);
          expect(res.body[0]).to.have.property("playingtime");
          expect(res.body[0].playingtime).to.be.a("number");
          expect(res.body[0].playingtime).to.equal(10);
          done();
        })
    });
  });

  describe("/bg-details", () => {
    it("should return an object with the game's details", (done) => {
      chai.request(app)
        .get(`/api/v1/bg-details/18749`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("artists");
          expect(res.body.artists).to.be.a("array");
          expect(res.body.artists[0]).to.equal("Mike Lemick")
          expect(res.body).to.have.property("designers");
          expect(res.body.designers).to.be.a("array");
          expect(res.body.designers[0]).to.equal("Richard H. Berg")
          expect(res.body).to.have.property("publishers");
          expect(res.body.publishers).to.be.a("array");
          expect(res.body.publishers[0]).to.equal("GMT Games")
          expect(res.body).to.have.property("categories");
          expect(res.body.categories).to.be.a("array");
          expect(res.body.categories[0]).to.equal("Expansion for Base-game")
          expect(res.body).to.have.property("mechanisms");
          expect(res.body.mechanisms).to.be.a("array");
          expect(res.body.mechanisms[0]).to.equal("Hex-and-Counter")
          expect(res.body).to.have.property("families");
          expect(res.body.families).to.be.a("array");
          expect(res.body.families[0]).to.equal("Great Battles of History")
        done();
      });
    });
  });

  describe("/search?", () => {
    it("should return an array of game objects related to the search query", (done) => {
      chai.request(app)
        .get(`/api/v1/search?id=care&exact=0`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body[0]).to.have.property("rank");
          expect(res.body[0].rank).to.be.a("number");
          expect(res.body[0].rank).to.equal(71);
          expect(res.body[0]).to.have.property("id");
          expect(res.body[0].id).to.be.a("number");
          expect(res.body[0].id).to.equal(18480);
          expect(res.body[0]).to.have.property("name");
          expect(res.body[0].name).to.be.a("string");
          expect(res.body[0].name).to.equal("Care Bears: How Many Bears?");
          expect(res.body[0]).to.have.property("thumbnail");
          expect(res.body[0].thumbnail).to.be.a("string");
          expect(res.body[0].thumbnail).to.equal("//cf.geekdo-images.com/images/pic81891_t.jpg");
          expect(res.body[0]).to.have.property("image");
          expect(res.body[0].image).to.be.a("string");
          expect(res.body[0].image).to.equal("//cf.geekdo-images.com/images/pic81891.jpg");
          expect(res.body[0]).to.have.property("description");
          expect(res.body[0].description).to.be.a("string");
          expect(res.body[0].description).to.equal("How Many Bears is a children\'s card game about counting and color matching.  Players turn over cards from their hand and try to match cards in the middle of the table by either color or number of bears on each card.  The player who collects the most matches wins.  Ages 4 - 8");
          expect(res.body[0]).to.have.property("minplayers");
          expect(res.body[0].minplayers).to.be.a("number");
          expect(res.body[0].minplayers).to.equal(1);
          expect(res.body[0]).to.have.property("maxplayers");
          expect(res.body[0].maxplayers).to.be.a("number");
          expect(res.body[0].maxplayers).to.equal(4);
          expect(res.body[0]).to.have.property("yearpublished");
          expect(res.body[0].yearpublished).to.be.a("number");
          expect(res.body[0].yearpublished).to.equal(1983);
          expect(res.body[0]).to.have.property("playingtime");
          expect(res.body[0].playingtime).to.be.a("number");
          expect(res.body[0].playingtime).to.equal(10);
        done();
      });
    });
  });


  describe("/boardgame/id", () => {
    it("should return a game object", (done) => {
      chai.request(app)
        .get(`/api/v1/boardgame/18480`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("rank");
          expect(res.body.rank).to.be.a("number");
          expect(res.body.rank).to.equal(71);
          expect(res.body).to.have.property("id");
          expect(res.body.id).to.be.a("number");
          expect(res.body.id).to.equal(18480);
          expect(res.body).to.have.property("name");
          expect(res.body.name).to.be.a("string");
          expect(res.body.name).to.equal("Care Bears: How Many Bears?");
          expect(res.body).to.have.property("thumbnail");
          expect(res.body.thumbnail).to.be.a("string");
          expect(res.body.thumbnail).to.equal("//cf.geekdo-images.com/images/pic81891_t.jpg");
          expect(res.body).to.have.property("image");
          expect(res.body.image).to.be.a("string");
          expect(res.body.image).to.equal("//cf.geekdo-images.com/images/pic81891.jpg");
          expect(res.body).to.have.property("description");
          expect(res.body.description).to.be.a("string");
          expect(res.body.description).to.equal("How Many Bears is a children\'s card game about counting and color matching.  Players turn over cards from their hand and try to match cards in the middle of the table by either color or number of bears on each card.  The player who collects the most matches wins.  Ages 4 - 8");
          expect(res.body).to.have.property("minplayers");
          expect(res.body.minplayers).to.be.a("number");
          expect(res.body.minplayers).to.equal(1);
          expect(res.body).to.have.property("maxplayers");
          expect(res.body.maxplayers).to.be.a("number");
          expect(res.body.maxplayers).to.equal(4);
          expect(res.body).to.have.property("yearpublished");
          expect(res.body.yearpublished).to.be.a("number");
          expect(res.body.yearpublished).to.equal(1983);
          expect(res.body).to.have.property("playingtime");
          expect(res.body.playingtime).to.be.a("number");
          expect(res.body.playingtime).to.equal(10);
        done();
      });
    });
  });
});
