// sequenciadepalavras-api/api.js

export default function handler(req, res) {

  const palavras = [
    "CASA","SOL","BOLA","GATO","PEIXE","ARVORE","FLOR","SAPO","CHUVA","LUA",
    "PATO","RUIM","BEM","PAO","MAIS","MENOS","TUDO","NADA","AGUA","FOGO",
    "TERRA","VENTO","LUZ","ESCURO","FELIZ","TRISTE","GRANDE","PEQUENO","ALTO","BAIXO"
  ];

  const dicas = {
    CASA: "Lugar onde moramos",
    SOL: "Brilha no céu durante o dia",
    BOLA: "Usada para brincar",
    GATO: "Animal que mia",
    PEIXE: "Vive na água",
    ARVORE: "Tem tronco e folhas",
    FLOR: "Colorida e perfumada",
    SAPO: "Pula e vive perto da água",
    CHUVA: "Cai do céu",
    LUA: "Aparece no céu à noite",
    PATO: "Animal que faz 'quack'",
    RUIM: "Oposto de bom",
    BEM: "Oposto de mal",
    PAO: "Comida feita com farinha",
    MAIS: "Sinal usado para somar",
    MENOS: "Sinal usado para subtrair",
    TUDO: "O conjunto inteiro",
    NADA: "Zero / vazio",
    AGUA: "Líquido que bebemos",
    FOGO: "Muito quente",
    TERRA: "Solo / chão",
    VENTO: "Ar em movimento",
    LUZ: "Ilumina",
    ESCURO: "Sem luz",
    FELIZ: "Sentimento de alegria",
    TRISTE: "Sentimento de tristeza",
    GRANDE: "Maior que o normal",
    PEQUENO: "Menor que o normal",
    ALTO: "Não é baixo",
    BAIXO: "Não é alto"
  };

  // ---------------------------------------------------
  // Rotas:

  if (req.method === "GET") {

    // rota: /api?mode=random
    if (req.query.mode === "random") {
      const palavra = palavras[Math.floor(Math.random() * palavras.length)];
      return res.status(200).json({
        palavra,
        dica: dicas[palavra]
      });
    }

    // rota padrão: retorna todas
    return res.status(200).json({ palavras, dicas });
  }

  // rota: verificar palavra  
  if (req.method === "POST") {
    const { palavra, tentativa } = req.body;

    return res.status(200).json({
      correta: tentativa === palavra
    });
  }

  return res.status(405).json({ error: "Método não permitido" });
}
