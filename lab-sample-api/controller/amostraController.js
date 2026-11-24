import { Amostra } from "../model/Amostra.js";
import {
  cadastrar,
  listar,
  buscarPorIndice,
  excluir,
  atualizar
} from "../repository/amostraRepository.js";

export function cadastrarAmostra(req, res) {
  const { codigo, material, origem, resultado } = req.body;

  const amostra = new Amostra(codigo, material, origem, resultado);
  cadastrar(amostra);

  return res.status(201).json({
    mensagem: "Amostra cadastrada com sucesso.",
    amostra
  });
}

export function listarAmostras(req, res) {
  const amostras = listar();
  return res.status(200).json(amostras);
}

export function buscarAmostra(req, res) {
  const indice = Number(req.params.indice);

  if (!Number.isInteger(indice) || indice < 0) {
    return res.status(404).json({ mensagem: "Amostra não encontrada." });
  }

  const amostra = buscarPorIndice(indice);

  if (!amostra) {
    return res.status(404).json({ mensagem: "Amostra não encontrada." });
  }

  return res.status(200).json(amostra);
}

export function excluirAmostra(req, res) {
  const indice = Number(req.params.indice);

  if (!Number.isInteger(indice) || indice < 0) {
    return res.status(404).json({ mensagem: "Amostra não encontrada." });
  }

  const amostra = buscarPorIndice(indice);

  if (!amostra) {
    return res.status(404).json({ mensagem: "Amostra não encontrada." });
  }

  excluir(indice);

  return res.status(200).json({
    mensagem: "Amostra excluída com sucesso.",
    amostra
  });
}

export function atualizarAmostra(req, res) {
  const indice = Number(req.params.indice);

  if (!Number.isInteger(indice) || indice < 0) {
    return res.status(404).json({ mensagem: "Amostra não encontrada." });
  }

  const amostraAtual = buscarPorIndice(indice);

  if (!amostraAtual) {
    return res.status(404).json({ mensagem: "Amostra não encontrada." });
  }

  const { codigo, material, origem, resultado } = req.body;

  const amostraAtualizada = new Amostra(
    codigo ?? amostraAtual.codigo,
    material ?? amostraAtual.material,
    origem ?? amostraAtual.origem,
    resultado ?? amostraAtual.resultado
  );

  atualizar(indice, amostraAtualizada);

  return res.status(200).json({
    mensagem: "Amostra atualizada com sucesso.",
    amostra: amostraAtualizada
  });
}
