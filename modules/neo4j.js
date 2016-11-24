const neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("http://localhost:7687", neo4j.auth.basic("neo4j", "prymkrex"));
const session = driver.session();

exports.run = (query) => {
    // session.run(query).then()

    session
      // .run("MERGE (james:Person {name : {nameParam} }) RETURN james.name", { nameParam:'James' })
      .run(query)
      .then(function(result) {
        result.records.forEach(function(record) {
          console.log(record._fields);
        });
        session.close();
      })
      .catch(function(error) {
        console.log(error);
      });
}

exports.upload = () => {
    console.log('hello!');
    session.run("CREATE (a:Person {name:'Ruby'})").then(function() {
        return session.run("MATCH (a:Person) WHERE a.name = 'Baku' RETURN a.name AS name");
    }).then(function(result) {
        console.log(result.records[0].get("name"));
        session.close();
        driver.close();
    })
}
