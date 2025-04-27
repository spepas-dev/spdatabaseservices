// const { config } = require("../config/config");
const { Client } = require("@elastic/elasticsearch");
const { winstonLogger } = require("./logger");

const log = winstonLogger(
  `${process.env.ELASTIC_SEARCH_URL}`,
  "databaseElasticSearchServer",
  "debug"
);

const elasticSearchClient = new Client({
  node: `${process.env.ELASTIC_SEARCH_URL}`,
});

async function checkConnection() {
  let isConnected = false;
  while (!isConnected) {
    log.info("DBService connecting to ElasticSearch...");
    try {
      const health = await elasticSearchClient.cluster.health({});
      log.info(`DBService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error("Connection to Elasticsearch failed. Retrying...");
      log.log("error", "DBService checkConnection() method:", error);
    }
  }
}

module.exports = {
  checkConnection,
};
