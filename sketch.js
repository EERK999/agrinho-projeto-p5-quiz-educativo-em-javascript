let questions = [
  {
    q: "Qual é uma vantagem da conexão CAMPO Cidade?",
    options: ["Mais impostos", "Abandono rural", "Comércio local fortalecido", "Menos produtos"],
    answer: 2,
    explanation: "A conexão fortalece o comércio local e o consumo de alimentos regionais.",
  },
  {
    q: "Como a cidade se beneficia do campo?",
    options: ["Mais trânsito", "Mais lixo", "Alimentos frescos e acessíveis", "Menos serviços"],
    answer: 2,
    explanation: "Produtos do campo abastecem mercados urbanos com alimentos saudáveis.",
  },
  {
    q: "A integração CAMPO Cidade melhora o acesso a...",
    options: ["Poluição", "Saúde e educação", "Burocracia", "Engarrafamentos"],
    answer: 1,
    explanation: "Ela permite que moradores do campo acessem escolas e hospitais na cidade.",
  },
  {
    q: "Por que feiras locais são importantes?",
    options: ["Produtos industrializados", "Preços altos", "Distribuição de orgânicos", "Piora na saúde"],
    answer: 2,
    explanation: "Elas promovem a venda direta de produtos orgânicos do campo à cidade.",
  },
  {
    q: "A mobilidade entre campo e cidade facilita...",
    options: ["Isolamento", "Troca de conhecimentos e bens", "Conflitos", "Desemprego"],
    answer: 1,
    explanation: "A troca de saberes e mercadorias melhora a economia de ambos os lados.",
  },
  {
    q: "O campo pode contribuir com...",
    options: ["Inovações tecnológicas verdes", "Menos empregos", "Problemas urbanos", "Menos alimentos"],
    answer: 0,
    explanation: "Com a agricultura sustentável, o campo impulsiona inovação ecológica.",
  },
];

let current = 0;
let score = 0;
let feedback = "";
let showFeedback = false;
let confetes = [];
let restartButton;

function startGame() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("canvas-container").style.display = "block";
  new p5(sketch, document.getElementById("canvas-container"));
}

class Confete {
  constructor(p) {
    this.x = p.random(0, 700);
    this.y = p.random(-50, -10);
    this.size = p.random(6, 12);
    this.speedY = p.random(1, 3);
    this.speedX = p.random(-1, 1);
    this.gravity = 0.05;
    this.angle = p.random(p.TWO_PI);
    this.spin = p.random(-0.05, 0.05);
    this.color = p.color(p.random(100, 255), p.random(100, 255), p.random(100, 255));
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.speedY += this.gravity;
    this.angle += this.spin;
  }

  display(p) {
    p.push();
    p.translate(this.x, this.y);
    p.rotate(this.angle);
    p.fill(this.color);
    p.noStroke();
    p.rect(0, 0, this.size, this.size / 2);
    p.pop();
  }
}

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(700, 600);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(18);
    score = 0;
    current = 0;
    feedback = "";
    showFeedback = false;
    confetes = [];
  };

  p.draw = () => {
    p.background("#C2CAC2");

    // Avatares
    p.textSize(26);
    p.text("🌾🏡", 50, 40);
    p.text("🏙️🌃", 650, 40);
    p.textSize(18);

    if (current < questions.length) {
      p.fill("#2e7d32");
      p.text(questions[current].q, p.width / 2, 70);

      questions[current].options.forEach((opt, i) => {
        let y = 130 + i * 60;
        p.fill("#ffffff");
        p.stroke("#43a047");
        p.strokeWeight(1.5);
        p.rect(200, y, 300, 45, 10);
        p.noStroke();
        p.fill("#2e7d32");
        p.text(opt, 350, y + 25);
      });

      if (showFeedback) {
        p.fill("#1b5e20");
        p.textSize(16);
        p.text(feedback, p.width / 2, 420);
        confetes.forEach((c) => {
          c.update();
          c.display(p);
        });
      }
    } else {
p.background("#c8e6c9");
p.fill("#637C65");

if (score < 1) {
  // Mensagem para pontuação muito baixa
  p.textSize(30);
  p.text("😅 Opa! Parece que você não acertou nenhuma...", p.width / 2, 100);
  p.textSize(18);
  p.text(`Tente novamente e aprenda mais sobre a conexão campo-cidade!`, p.width / 2, 160);
} else {
  // Mensagem normal
  p.textSize(45);
  p.text("🎉 Parabéns! 🎉", p.width / 2, 100);
  p.textSize(20);
  p.text(`Você acertou ${score} de ${questions.length} perguntas!`, p.width / 2, 160);
}
     

      

      p.fill("#43a047");
      p.rect(270, 300, 160, 50, 12);
      p.fill("white");
      p.text("Reiniciar Quiz", p.width / 2, 325);

      confetes.forEach((c) => {
        c.update();
        c.display(p);
      });
    }
  };

  p.mousePressed = () => {
    if (current >= questions.length) {
      // Verifica clique no botão reiniciar
      if (p.mouseX > 270 && p.mouseX < 430 && p.mouseY > 300 && p.mouseY < 350) {
        score = 0;
        current = 0;
        feedback = "";
        showFeedback = false;
        confetes = [];
      }
      return;
    }

    if (showFeedback) {
      showFeedback = false;
      confetes = [];
      current++;
      return;
    }

    questions[current].options.forEach((_, i) => {
      let x = 150, y = 130 + i * 60, w = 300, h = 45;
      if (p.mouseX > x && p.mouseX < x + w && p.mouseY > y && p.mouseY < y + h) {
        if (i === questions[current].answer) {
          score++;
          feedback = "✅ Correto! " + questions[current].explanation;
          for (let j = 0; j < 50; j++) confetes.push(new Confete(p));
        } else {
          feedback = "❌ Incorreto. " + questions[current].explanation;
        }
        showFeedback = true;
      }
    });

    if (current === questions.length - 1) {
      localStorage.setItem("campoCidadeQuizScore", score);
      for (let j = 0; j < 100; j++) confetes.push(new Confete(p));
    }
  };
};
