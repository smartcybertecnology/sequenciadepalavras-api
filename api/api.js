export default function handler(req, res) {

  // --------------------------------------------
  // 🔒 CORS – Permitir SOMENTE o seu domínio
  const allowedOrigins = [
    "https://playjogosgratis.com",
    "https://www.playjogosgratis.com"
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // OPTIONS (pré-flight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // --------------------------------------------
  // 📚 Base de dados

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

  // --------------------------------------------
  // 🚀 GET
  if (req.method === "GET") {

    if (req.query.mode === "random") {
      const palavra = palavras[Math.floor(Math.random() * palavras.length)];
      return res.status(200).json({
        palavra,
        dica: dicas[palavra]
      });
    }

    return res.status(200).json({ palavras, dicas });
  }

  // --------------------------------------------
  // 🚀 POST
  if (req.method === "POST") {
    const { palavra, tentativa } = req.body ?? {};

    if (!palavra || !tentativa) {
      return res.status(400).json({ error: "Dados incompletos." });
    }

    return res.status(200).json({
      correta: tentativa.toUpperCase() === palavra.toUpperCase()
    });
  }

  // --------------------------------------------
  // ❌ Método não permitido
  return res.status(405).json({ error: "Método não permitido" });
}
