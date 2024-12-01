import { MongoClient } from "mongodb";

export let db;

export async function connectToDatabase(connectionString) {
  try {
    console.log("Conectando ao MongoDB...");
    const client = new MongoClient(connectionString);
    await client.connect();
    console.log("Conexão feita com sucesso ao MongoDB Atlas.");
    db = client.db("Turma"); // Substitua "Turma" pelo nome do seu banco no MongoDB Atlas
    console.log("Banco de dados inicializado:", db.databaseName);
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Finaliza o processo em caso de erro
  }
}
