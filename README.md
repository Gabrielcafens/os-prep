```
                      .-'   `'.
                     /         \
                     |         ;
                     |         |           ___.--,
            _.._     |0) = (0) |    _.---'`__.-( (_.
     __.--'`_.. '.__.\    '--. \_.-' ,.--'`     `""`
    ( ,.--'`   ',__ /./;   ;, '.__.'`    __
    _`) )  .---.__.' / |   |\   \__..--""  """--.,_
   `---' .'.''-._.-'`_./  /\ '.  \ _.--''````'''--._`-.__.'
         | |  .' _.-' |  |  \  \  '.               `----`
          \ \/ .'     \  \   '. '-._)
           \/ /        \  \    `=.__`'-.
           / /\         `) )    / / `"".`\
     , _.-'.'\ \        / /    ( (     / /
      `--'`   ) )    .-'.'      '.'.  | (
             (/`    ( (`          ) )  '-;

  ( (                ( (                 ( (
   ) )                ) )                 ) )
.........           .........         .........
|       |]         |       |]         |       |]
\       /           \       /         \       /
 `-----'             `-----'           `-----'
```

# OS Prep — Associate Reactive Developer O11

Aplicação de estudo para a certificação OutSystems Associate Reactive Developer.

Front-end 100% estático (HTML + [Alpine.js](https://alpinejs.dev/) via CDN), sem build step — basta abrir o `index.html` ou publicar como está.

## Funcionalidades

- **Simulado** — Modo prática (gabarito imediato) ou Modo exame (cronômetro 1h30, gabarito no final)
- **Flashcards** — Conceitos-chave por tópico, embaralhamento, flip animado
- **Regras de ouro** — Resumo consultável por tópico
- **Tracker de progresso** — Acompanha acertos por tópico com baseline da prova real

## Como subir no GitHub + Vercel

### 1. Criar repositório no GitHub

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/os-prep.git
git push -u origin main
```

### 2. Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **Add New Project**
3. Selecione o repositório `os-prep`
4. Clique em **Deploy** — sem configuração adicional (HTML puro)
5. Pronto! A URL `os-prep.vercel.app` estará disponível

## Estrutura do projeto

```
os-prep/
├── index.html          # Markup + diretivas Alpine (x-data, x-show, x-for...)
├── css/
│   └── style.css       # Estilos
├── js/
│   └── app.js          # Componente Alpine: function app() { return {...} }
└── data/
    └── questions.js    # Banco de questões, flashcards e regras (TOPICS, QUESTIONS, FLASHCARDS, RULES)
```

Todo o estado (página atual, simulado em andamento, flashcard exibido, progresso) vive no objeto
retornado por `app()`. O `index.html` só declara *o que* renderizar (`x-show`, `x-for`, `x-text`,
`:class`) — não há mais `getElementById`/`innerHTML` manual.

## Como adicionar questões

Edite `data/questions.js` e adicione objetos no array `QUESTIONS`:

```js
{
  id: 34,
  topic: TOPICS.AGGREGATES,
  question: "Texto da pergunta",
  options: ["Opção A", "Opção B", "Opção C", "Opção D"],
  answer: 0, // índice da resposta correta (0 = A)
  explanation: "Explicação do porquê essa resposta está correta.",
}
```

Para flashcards, adicione em `FLASHCARDS`:

```js
{
  id: 21,
  topic: TOPICS.AGGREGATES,
  front: "Pergunta ou conceito",
  back: "Resposta ou explicação",
}
```

## Tópicos disponíveis

```js
TOPICS.CLIENT_SERVER_ACTIONS
TOPICS.LOGIC_FLOWS
TOPICS.BLOCKS
TOPICS.BLOCK_EVENTS
TOPICS.ENTITIES
TOPICS.AGGREGATES
TOPICS.FORM_VALIDATIONS
TOPICS.SCREEN_LIFECYCLE
TOPICS.DATA_FETCHING
TOPICS.CLIENT_VARIABLES
TOPICS.RELATIONSHIPS
TOPICS.SECURITY
```

## Design & acessibilidade

- Layout inspirado em sites de referência de API (sidebar fixa, tipografia mono para tags/badges, paleta neutra com azul de destaque)
- Cores semânticas (vermelho/âmbar/verde) mantidas apenas onde carregam informação real (badges de desempenho, timer)
- Navegação e filtros usam `role="group"`/`aria-pressed`, resultado do simulado e explicações usam `aria-live`, flashcard é focável e vira com Enter/Espaço, e há um "pular para o conteúdo" no topo

## Notas

- O progresso é salvo no `localStorage` do browser
- As questões são baseadas no material oficial da OutSystems
- **Fonte de verdade: sempre a documentação oficial OutSystems**
