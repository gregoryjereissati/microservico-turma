import { db } from "../config/database.js";
import { ObjectId } from "mongodb";

// Listar todas as turmas
export async function getTodasTurmas() {
  try {
    console.log("Acessando a coleção Turmas...");
    const collection = db.collection("Turmas");
    return await collection.find().toArray();
  } catch (error) {
    console.error("Erro ao acessar a coleção Turmas:", error.message);
    throw error;
  }
}

// Buscar uma turma específica por ID
export async function getTurma(id) {
  try {
    console.log(`Buscando a turma com ID: ${id}`);
    const collection = db.collection("Turmas");
    const turma = await collection.findOne({ _id: new ObjectId(id) });

    if (!turma) {
      console.log(`Nenhuma turma encontrada com o ID: ${id}`);
      return null;
    }

    return turma;
  } catch (error) {
    console.error(`Erro ao buscar a turma com ID ${id}:`, error.message);
    throw error;
  }
}

// Criar uma nova turma
export async function criarTurma(novaTurma) {
    try {
      console.log("Criando uma nova turma...");
      const collection = db.collection("Turmas");
      const result = await collection.insertOne(novaTurma);
  
      if (!result.acknowledged) {
        throw new Error("Falha ao inserir a nova turma");
      }
  
      const turmaCriada = { _id: result.insertedId, ...novaTurma };
      console.log("Nova turma criada com sucesso:", turmaCriada);
  
      return turmaCriada;
    } catch (error) {
      console.error("Erro ao criar uma nova turma:", error.message);
      throw error;
    }
  }
  

// Atualizar uma turma existente
export async function atualizarTurma(id, turmaAtualizada) {
  try {
    console.log(`Atualizando a turma com ID: ${id}`);
    const collection = db.collection("Turmas");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: turmaAtualizada }
    );

    if (result.matchedCount === 0) {
      console.log(`Nenhuma turma encontrada para o ID: ${id}`);
    }

    return result;
  } catch (error) {
    console.error(`Erro ao atualizar a turma com ID ${id}:`, error.message);
    throw error;
  }
}

// Deletar uma turma existente
export async function deletarTurma(id) {
  try {
    console.log(`Deletando a turma com ID: ${id}`);
    const collection = db.collection("Turmas");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      console.log(`Nenhuma turma encontrada para deletar com o ID: ${id}`);
    }

    return result;
  } catch (error) {
    console.error(`Erro ao deletar a turma com ID ${id}:`, error.message);
    throw error;
  }
}
