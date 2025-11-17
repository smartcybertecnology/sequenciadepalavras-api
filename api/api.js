export default function handler(req, res) {

  // 🔒 CORS – SOMENTE SEU DOMÍNIO
  res.setHeader("Access-Control-Allow-Origin", "https://playjogosgratis.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 🎯 PALAVRAS POR NÍVEL DE DIFICULDADE
  const palavrasPorNivel = {
    facil: [
      "CASA","SOL","BOLA","GATO","PEIXE","FLOR","SAPO","LUA","PATO","PAO",
      "AGUA","FOGO","LUZ","BEM","MAL","DIA","NOI","COR","POR","SIM"
    ],
    normal: [
      "ARVORE","CHUVA","RUIM","MAIS","MENOS","TUDO","NADA","TERRA","VENTO",
      "ESCURO","FELIZ","TRISTE","GRANDE","PEQUENO","ALTO","BAIXO","RAPIDO",
      "LENTO","QUENTE","FRIO","LONGE","PERTO","CERTO","ERRADO","FORTE"
    ],
    dificil: [
      "ELEFANTE","BORBOLETA","COMPUTADOR","BIBLIOTECA","CHOCOLATE","DINOSAURO",
      "HELICOPTERO","REFRIGERADOR","FOTOGRAFIA","AMBULANCIA","ESQUELETO",
      "EXTRAORDINARIO","PARALELEPIPEDO","PSICOLOGIA","FILOSOFIA","ARQUITETURA",
      "PNEUMONIA","EXCECAO","GUERREIRO","LABIRINTO","MARAVILHOSO","MISTERIOSO"
    ]
  };

  const dicasPorPalavra = {
    // FÁCIL
    CASA: "Lugar onde moramos",
    SOL: "Brilha no céu durante o dia",
    BOLA: "Usada para brincar",
    GATO: "Animal que mia",
    PEIXE: "Vive na água",
    FLOR: "Colorida e perfumada",
    SAPO: "Pula e vive perto da água",
    LUA: "Aparece no céu à noite",
    PATO: "Animal que faz 'quack'",
    PAO: "Comida feita com farinha",
    AGUA: "Líquido que bebemos",
    FOGO: "Muito quente",
    LUZ: "Ilumina",
    BEM: "Oposto de mal",
    MAL: "Oposto de bem",
    DIA: "Quando o sol está brilhando",
    NOI: "Quando está escuro",
    COR: "Azul, vermelho, verde...",
    POR: "Colocar algo em algum lugar",
    SIM: "Resposta positiva",

    // NORMAL
    ARVORE: "Tem tronco e folhas",
    CHUVA: "Cai do céu",
    RUIM: "Oposto de bom",
    MAIS: "Sinal usado para somar",
    MENOS: "Sinal usado para subtrair",
    TUDO: "O conjunto inteiro",
    NADA: "Zero / vazio",
    TERRA: "Solo / chão",
    VENTO: "Ar em movimento",
    ESCURO: "Sem luz",
    FELIZ: "Sentimento de alegria",
    TRISTE: "Sentimento de tristeza",
    GRANDE: "Maior que o normal",
    PEQUENO: "Menor que o normal",
    ALTO: "Não é baixo",
    BAIXO: "Não é alto",
    RAPIDO: "Veloz, ligeiro",
    LENTO: "Devagar",
    QUENTE: "Alta temperatura",
    FRIO: "Baixa temperatura",
    LONGE: "Distante",
    PERTO: "Próximo",
    CERTO: "Correto",
    ERRADO: "Incorreto",
    FORTE: "Tem muita força",

    // DIFÍCIL
    ELEFANTE: "Maior animal terrestre",
    BORBOLETA: "Inseto com asas coloridas",
    COMPUTADOR: "Máquina eletrônica para processar dados",
    BIBLIOTECA: "Lugar com muitos livros",
    CHOCOLATE: "Doce feito de cacau",
    DINOSAURO: "Réptil extinto há milhões de anos",
    HELICOPTERO: "Aeronave com hélices",
    REFRIGERADOR: "Eletrodoméstico para conservar alimentos",
    FOTOGRAFIA: "Imagem capturada por câmera",
    AMBULANCIA: "Veículo de emergência médica",
    ESQUELETO: "Estrutura óssea do corpo",
    EXTRAORDINARIO: "Algo fora do comum",
    PARALELEPIPEDO: "Figura geométrica tridimensional",
    PSICOLOGIA: "Ciência que estuda a mente",
    FILOSOFIA: "Estudo sobre a existência e conhecimento",
    ARQUITETURA: "Arte de projetar construções",
    PNEUMONIA: "Infecção nos pulmões",
    EXCECAO: "Caso especial fora da regra",
    GUERREIRO: "Combatente, lutador",
    LABIRINTO: "Caminho complexo com muitas voltas",
    MARAVILHOSO: "Extraordinário, fantástico",
    MISTERIOSO: "Enigmático, secreto"
  };

  // 👉 GET
  if (req.method === "GET") {

    // Modo random com nível
    if (req.query.mode === "random") {
      const nivel = req.query.nivel || "normal"; // padrão: normal
      const palavrasDoNivel = palavrasPorNivel[nivel] || palavrasPorNivel.normal;
      
      const palavra = palavrasDoNivel[Math.floor(Math.random() * palavrasDoNivel.length)];
      
      return res.status(200).json({
        palavra,
        dica: dicasPorPalavra[palavra],
        nivel
      });
    }

    // Retorna todas as palavras organizadas por nível
    return res.status(200).json({ 
      palavrasPorNivel, 
      dicas: dicasPorPalavra 
    });
  }

  // 👉 POST
  if (req.method === "POST") {
    const { palavra, tentativa } = req.body ?? {};
    if (!palavra || !tentativa) {
      return res.status(400).json({ error: "Dados incompletos." });
    }
    return res.status(200).json({
      correta: tentativa.toUpperCase() === palavra.toUpperCase()
    });
  }

  return res.status(405).json({ error: "Método não permitido" });
}
