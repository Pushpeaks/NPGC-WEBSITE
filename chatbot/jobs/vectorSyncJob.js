const pool = require("../config/db");
const EmbeddingService = require("../service/embeddingService");

async function updateVectors() {
  const connection = pool;

  try {
    const [rows] = await connection.execute(
      "SELECT Id, Intent, Keywords FROM ChatbotKnowledge"
    );

    for (const row of rows) {
      if (!row.Keywords) {
        console.log(`Skipping ID ${row.Id}: No keywords found.`);
        continue;
      }

      const vectorArray = EmbeddingService.generateEmbedding(row.Keywords);

      await connection.execute(
        "UPDATE ChatbotKnowledge SET Vector = ? WHERE Id = ?",
        [JSON.stringify(vectorArray), row.Id]
      );

      console.log(
        `Successfully updated [${row.Intent}] with ${vectorArray.length} dimensions.`
      );
    }

    console.log("Sync Complete: All vectors are now aligned with VOCAB");
  } catch (error) {
    console.error("Critical Error during synchronization:", error);
  }
}

module.exports = { updateVectors };
