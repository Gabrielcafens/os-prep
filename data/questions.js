const TOPICS = {
  CLIENT_SERVER_ACTIONS: "Client e Server Actions",
  LOGIC_FLOWS: "Fluxos Lógicos",
  BLOCKS: "Usando Blocos",
  BLOCK_EVENTS: "Eventos de Blocos",
  ENTITIES: "Entidades e Entidades Estáticas",
  AGGREGATES: "Aggregates",
  FORM_VALIDATIONS: "Validações de Formulários",
  SCREEN_LIFECYCLE: "Ciclo de Vida de Telas",
  DATA_FETCHING: "Obtenção de Dados em Telas",
  CLIENT_VARIABLES: "Client Variables",
  RELATIONSHIPS: "Relações entre Dados",
  SECURITY: "Segurança por Roles",
};

const QUESTIONS = [
  // CLIENT e SERVER ACTIONS
  {
    id: 1,
    topic: TOPICS.CLIENT_SERVER_ACTIONS,
    question: "Qual das seguintes opções é correta sobre Client Actions e Server Actions?",
    options: [
      "Server Actions podem chamar Client Actions diretamente.",
      "Client Actions podem chamar Server Actions.",
      "Client Actions e Server Actions rodam ambas no servidor.",
      "Server Actions não podem acessar o banco de dados.",
    ],
    answer: 1,
    explanation: "Client Actions rodam no browser e podem chamar Server Actions. O inverso não é possível — Server Actions rodam no servidor e não têm acesso ao contexto do browser.",
  },
  {
    id: 2,
    topic: TOPICS.CLIENT_SERVER_ACTIONS,
    question: "Para que uma Client Action possa ser usada diretamente em uma expressão, qual propriedade deve ser configurada?",
    options: [
      "Public = Yes",
      "Function = Yes, com exatamente um Output Parameter",
      "Function = Yes, sem restrições de parâmetros",
      "Expose = Yes",
    ],
    answer: 1,
    explanation: "Para usar uma Action em expressões, a propriedade Function deve ser Yes e a Action deve ter exatamente UM output parameter. Zero ou mais de um output parameter invalidam o uso como função.",
  },
  {
    id: 3,
    topic: TOPICS.CLIENT_SERVER_ACTIONS,
    question: "Qual das seguintes operações NUNCA deve ser feita em uma Client Action?",
    options: [
      "Validar campos de um formulário.",
      "Navegar para outra tela.",
      "Acessar diretamente o banco de dados via Entity Actions.",
      "Atualizar o valor de uma variável local.",
    ],
    answer: 2,
    explanation: "Client Actions rodam no browser e não têm acesso direto ao banco de dados. Operações de banco de dados devem ser feitas em Server Actions, chamadas a partir do Client.",
  },

  // FLUXOS LÓGICOS
  {
    id: 4,
    topic: TOPICS.LOGIC_FLOWS,
    question: "Considere um Switch com input = 1000, Branch 1: N < 1000, Branch 2: N > 1000. O que acontece?",
    options: [
      "Branch 1 é executado.",
      "Branch 2 é executado.",
      "O Otherwise é executado.",
      "Um erro é lançado.",
    ],
    answer: 2,
    explanation: "1000 não é menor que 1000 nem maior que 1000, portanto nenhum branch é verdadeiro e o fluxo vai para o Otherwise. Essa é uma pegadinha clássica de prova.",
  },
  {
    id: 5,
    topic: TOPICS.LOGIC_FLOWS,
    question: "Quando ocorre rollback automático de transação no OutSystems?",
    options: [
      "Qualquer exception não tratada causa rollback.",
      "Apenas erros de banco de dados causam rollback automático.",
      "Rollback só ocorre quando explicitamente programado.",
      "User Exceptions sempre causam rollback.",
    ],
    answer: 1,
    explanation: "Apenas erros de banco de dados (Database Exceptions) causam rollback automático. User Exceptions e outras exceptions não causam rollback automaticamente.",
  },
  {
    id: 6,
    topic: TOPICS.LOGIC_FLOWS,
    question: "Sobre Exception Handlers, qual afirmação é correta?",
    options: [
      "Pode haver apenas um Exception Handler por Action.",
      "O All Exceptions é sempre executado, independente do tipo de erro.",
      "O fluxo vai para o handler mais específico disponível para aquela exception.",
      "Exception Handlers só funcionam em Server Actions.",
    ],
    answer: 2,
    explanation: "O OutSystems sempre executa o handler mais específico. Se houver um Database Exception handler e ocorrer um erro de banco, ele será executado em vez do All Exceptions.",
  },
  {
    id: 7,
    topic: TOPICS.LOGIC_FLOWS,
    question: "O nó ForEach em um fluxo lógico funciona com qual tipo de variável?",
    options: [
      "Qualquer variável, inclusive Text e Integer.",
      "Apenas variáveis do tipo Record.",
      "Apenas variáveis do tipo List.",
      "Variáveis do tipo List e Record.",
    ],
    answer: 2,
    explanation: "O ForEach só itera sobre variáveis do tipo List. Tentar usar com outros tipos causará erro em tempo de desenvolvimento.",
  },

  // BLOCOS
  {
    id: 8,
    topic: TOPICS.BLOCKS,
    question: "Em quais locais um Block pode ser instanciado?",
    options: [
      "Apenas dentro de outras Screens.",
      "Dentro de Screens e outros Blocks, incluindo ele mesmo.",
      "Dentro de Screens e outros Blocks, exceto nele mesmo.",
      "Apenas dentro de outros Blocks.",
    ],
    answer: 2,
    explanation: "Um Block pode ser usado dentro de Screens e outros Blocks, mas não pode ser instanciado dentro de si mesmo (recursão direta não é suportada).",
  },
  {
    id: 9,
    topic: TOPICS.BLOCKS,
    question: "O que acontece quando o design de um Block é alterado?",
    options: [
      "Apenas as instâncias modificadas são afetadas.",
      "É necessário atualizar manualmente cada instância.",
      "Todas as instâncias são afetadas automaticamente.",
      "Não é possível alterar um Block referenciado.",
    ],
    answer: 2,
    explanation: "Uma das principais vantagens de Blocks é a manutenibilidade: ao alterar o Block original, todas as instâncias onde ele é usado são atualizadas automaticamente após publicação.",
  },

  // EVENTOS DE BLOCOS
  {
    id: 10,
    topic: TOPICS.BLOCK_EVENTS,
    question: "Qual é a forma correta de um Block enviar informação para sua Screen pai?",
    options: [
      "Usando Output Parameters do Block.",
      "Modificando diretamente uma variável da Screen pai.",
      "Disparando um Event com Trigger Event e passando Input Parameters no evento.",
      "Chamando uma Server Action da Screen pai.",
    ],
    answer: 2,
    explanation: "Blocks comunicam-se com a Screen pai através de Events. O Block dispara o evento com Trigger Event, podendo passar dados como Input Parameters do evento. A Screen pai define um handler para reagir.",
  },
  {
    id: 11,
    topic: TOPICS.BLOCK_EVENTS,
    question: "Quando é disparado o evento On Parameters Changed em um Block?",
    options: [
      "Quando o valor de um Input Parameter muda dentro da lógica do próprio Block.",
      "Quando a Screen pai muda o valor de pelo menos um Input Parameter do Block.",
      "Quando qualquer variável local do Block é alterada.",
      "Nunca — deve ser disparado manualmente.",
    ],
    answer: 1,
    explanation: "O On Parameters Changed é disparado quando o PAI (Screen ou Block pai) altera o valor de um Input Parameter do Block. Mudanças feitas dentro da lógica interna do próprio Block não disparam esse evento.",
  },
  {
    id: 12,
    topic: TOPICS.BLOCK_EVENTS,
    question: "Sobre Block Events, qual afirmação é FALSA?",
    options: [
      "Events permitem passar informação do escopo do Block para o escopo pai.",
      "Events são disparados pelo Block e tratados pelo pai.",
      "Events podem ser definidos no nível do Block ou da Screen.",
      "Duas instâncias do mesmo Block podem usar o mesmo handler para o mesmo evento.",
    ],
    answer: 2,
    explanation: "Events são definidos APENAS no nível do Block, não da Screen. A Screen define handlers para os eventos do Block, mas os eventos em si pertencem ao Block.",
  },

  // ENTIDADES
  {
    id: 13,
    topic: TOPICS.ENTITIES,
    question: "Qual é o tipo de dado padrão do Identifier em uma Entidade Normal?",
    options: [
      "Integer, com Auto Number ativado.",
      "Long Integer, com Auto Number ativado por padrão.",
      "Long Integer, mas Auto Number é opcional.",
      "Text, com valor padrão vazio.",
    ],
    answer: 1,
    explanation: "O Identifier de uma Entidade Normal é criado por padrão como Long Integer com Auto Number ativado. Já em Static Entities, o padrão é Integer.",
  },
  {
    id: 14,
    topic: TOPICS.ENTITIES,
    question: "Qual das seguintes afirmações sobre Static Entities é CORRETA?",
    options: [
      "Static Entities permitem Create, Update e Delete em runtime.",
      "Static Entities são como enumerações — apenas leitura em runtime.",
      "Static Entities só podem ter os atributos padrão (Id, Name, Order, IsActive).",
      "Static Entities não podem ser referenciadas por Entities normais.",
    ],
    answer: 1,
    explanation: "Static Entities funcionam como enumerações. Seus registros são definidos em tempo de desenvolvimento e não podem ser criados, alterados ou deletados em runtime — apenas lidos.",
  },
  {
    id: 15,
    topic: TOPICS.ENTITIES,
    question: "Qual Delete Rule NÃO garante integridade referencial?",
    options: [
      "Protect",
      "Delete",
      "Ignore",
      "Todas garantem integridade referencial",
    ],
    answer: 2,
    explanation: "Ignore permite deletar o registro pai mesmo com filhos existentes, tornando esses filhos órfãos. Protect impede a deleção e Delete apaga em cascata — ambos mantêm a integridade.",
  },

  // AGGREGATES
  {
    id: 16,
    topic: TOPICS.AGGREGATES,
    question: "Quando vários filtros são adicionados a um Aggregate, como eles são combinados?",
    options: [
      "Com o operador OR — um registro é incluído se atender a pelo menos um filtro.",
      "Com o operador AND — um registro só é incluído se atender a todos os filtros.",
      "Depende da ordem em que os filtros foram adicionados.",
      "Podem ser configurados como AND ou OR nas propriedades do Aggregate.",
    ],
    answer: 1,
    explanation: "Filtros em Aggregates são sempre combinados com AND. Se precisar de OR, é necessário usar uma expressão dentro de um único filtro.",
  },
  {
    id: 17,
    topic: TOPICS.AGGREGATES,
    question: "Em um Aggregate com Group By e função de agregação (ex: Count), qual é o output esperado?",
    options: [
      "Todos os atributos das entidades de origem, mais as colunas de agregação.",
      "Apenas as colunas agrupadas e as colunas de agregação.",
      "Apenas as colunas de agregação, sem os atributos agrupados.",
      "Todos os atributos, exceto os que estão em Group By.",
    ],
    answer: 1,
    explanation: "Quando se usa Group By, o Aggregate deixa de retornar todos os atributos. O output contém apenas as colunas que fazem parte do agrupamento + as funções de agregação aplicadas.",
  },
  {
    id: 18,
    topic: TOPICS.AGGREGATES,
    question: "O join 'With or Without' em um Aggregate equivale a qual tipo de JOIN em SQL?",
    options: [
      "INNER JOIN",
      "RIGHT JOIN",
      "LEFT JOIN",
      "FULL OUTER JOIN",
    ],
    answer: 2,
    explanation: "'With or Without' gera um LEFT JOIN — retorna todos os registros da entidade da esquerda mesmo que não haja correspondência na entidade da direita. 'Only With' gera INNER JOIN.",
  },
  {
    id: 19,
    topic: TOPICS.AGGREGATES,
    question: "O que determina automaticamente se um join será 'Only With' ou 'With or Without'?",
    options: [
      "O tipo de dado do atributo de referência.",
      "A propriedade Mandatory do atributo de referência (FK).",
      "A ordem em que as entidades foram adicionadas ao Aggregate.",
      "O Delete Rule configurado na entidade.",
    ],
    answer: 1,
    explanation: "Mandatory = Yes gera automaticamente 'Only With' (INNER JOIN). Mandatory = No gera 'With or Without' (LEFT JOIN). Isso reflete a regra de negócio definida na modelagem de dados.",
  },
  {
    id: 20,
    topic: TOPICS.AGGREGATES,
    question: "Screen Aggregates com Fetch 'At Start' executam em qual ordem quando há dois na mesma tela?",
    options: [
      "Na ordem em que foram criados no Service Studio.",
      "Em ordem alfabética pelo nome do Aggregate.",
      "Em paralelo, sem ordem garantida.",
      "O menor Aggregate (menos registros) executa primeiro.",
    ],
    answer: 2,
    explanation: "Screen Aggregates com Fetch At Start executam de forma assíncrona e em paralelo. Não há garantia de ordem de execução — nunca dependa de um Aggregate aguardar o resultado de outro.",
  },

  // VALIDAÇÕES
  {
    id: 21,
    topic: TOPICS.FORM_VALIDATIONS,
    question: "O que acontece com Form.Valid quando Built-in Validations do botão está definido como 'No'?",
    options: [
      "Form.Valid é False se algum campo obrigatório estiver vazio.",
      "Form.Valid sempre será True, independente dos campos.",
      "Form.Valid não existe quando Built-in Validations está desabilitado.",
      "Form.Valid é verificado apenas na Server Action.",
    ],
    answer: 1,
    explanation: "Quando Built-in Validations = No, as validações nativas não são executadas e Form.Valid permanece True mesmo com campos obrigatórios vazios. Toda validação deve ser feita manualmente.",
  },
  {
    id: 22,
    topic: TOPICS.FORM_VALIDATIONS,
    question: "Qual é a sequência correta ao implementar um botão de salvar com validação?",
    options: [
      "Chamar Server Action → verificar Form.Valid → exibir erro se inválido.",
      "Built-in Validations = Yes → verificar se Form.Valid é True → chamar Server Action.",
      "Verificar Form.Valid → Built-in Validations = Yes → chamar Server Action.",
      "Built-in Validations basta — não é necessário verificar Form.Valid.",
    ],
    answer: 1,
    explanation: "A sequência correta é: Built-in Validations dispara automaticamente ao clicar → verificar Form.Valid com um If → só chamar a Server Action se Form.Valid = True. Nunca enviar dados ao servidor sem essa verificação.",
  },
  {
    id: 23,
    topic: TOPICS.FORM_VALIDATIONS,
    question: "Para criar uma validação customizada (ex: senha com mínimo de 8 caracteres), o que é necessário?",
    options: [
      "Apenas setar Form.Valid = False na action.",
      "Setar Input.Valid = False e definir a mensagem de erro no campo.",
      "Usar um Exception Handler para capturar o erro de validação.",
      "Criar uma Server Action de validação separada.",
    ],
    answer: 1,
    explanation: "Validações customizadas requerem setar Input.Valid = False no input específico e definir a ValidationMessage para exibir a mensagem ao usuário. O Form.Valid será False automaticamente se qualquer input estiver inválido.",
  },

  // CICLO DE VIDA
  {
    id: 24,
    topic: TOPICS.SCREEN_LIFECYCLE,
    question: "Qual é a ordem correta dos eventos de ciclo de vida de uma Screen?",
    options: [
      "Ready → Initialize → Render → Destroy",
      "Initialize → Destroy → Ready → Render",
      "Initialize → Ready → Render → Destroy",
      "Initialize → Render → Ready → Destroy",
    ],
    answer: 2,
    explanation: "A ordem correta é Initialize → Ready → Render → Destroy. Initialize ocorre antes da renderização, Ready após o DOM estar pronto, Render a cada atualização de dados, e Destroy ao sair da tela.",
  },
  {
    id: 25,
    topic: TOPICS.SCREEN_LIFECYCLE,
    question: "Por que NÃO se deve alterar dados ou variáveis dentro do evento OnRender?",
    options: [
      "Porque OnRender é somente leitura por definição.",
      "Porque alterar dados no OnRender pode causar um loop infinito de renderizações.",
      "Porque OnRender executa antes dos dados estarem disponíveis.",
      "Porque OnRender não tem acesso às variáveis locais da tela.",
    ],
    answer: 1,
    explanation: "OnRender dispara toda vez que dados ou variáveis mudam. Se você altera uma variável dentro do OnRender, isso dispara outro OnRender, que altera a variável novamente — criando um loop infinito.",
  },
  {
    id: 26,
    topic: TOPICS.SCREEN_LIFECYCLE,
    question: "Qual é o melhor evento para verificar permissões de acesso antes de exibir uma tela?",
    options: [
      "OnReady — pois o DOM já está preparado.",
      "OnRender — para garantir que os dados estejam carregados.",
      "OnInitialize — ocorre antes da renderização, ideal para verificações de segurança.",
      "OnDestroy — para limpar dados sensíveis.",
    ],
    answer: 2,
    explanation: "OnInitialize ocorre antes da tela ser renderizada, sendo o momento ideal para verificar permissões. Se o usuário não tiver acesso, pode-se redirecionar antes de qualquer conteúdo ser exibido.",
  },

  // DATA FETCHING
  {
    id: 27,
    topic: TOPICS.DATA_FETCHING,
    question: "Qual é a diferença entre Fetch 'At Start' e 'Only On Demand' em um Screen Aggregate?",
    options: [
      "At Start carrega dados no servidor; Only On Demand carrega no browser.",
      "At Start executa automaticamente ao abrir a tela; Only On Demand requer um Refresh Data explícito em uma action.",
      "Only On Demand é mais rápido pois carrega menos dados.",
      "Não há diferença prática — apenas nomenclatura diferente.",
    ],
    answer: 1,
    explanation: "Fetch At Start executa automaticamente quando a tela inicializa. Only On Demand só executa quando chamado explicitamente via nó Refresh Data em uma Screen Action.",
  },
  {
    id: 28,
    topic: TOPICS.DATA_FETCHING,
    question: "Em uma tela com paginação, o usuário muda de página mas os dados não atualizam. Qual é a causa mais provável?",
    options: [
      "O Total Count da paginação está errado.",
      "O Aggregate não está sendo atualizado via Refresh Data no OnNavigate.",
      "O Max Records do Aggregate está muito alto.",
      "A tela precisa ser recarregada completamente.",
    ],
    answer: 1,
    explanation: "O widget de paginação apenas atualiza o StartIndex. Para que os dados mudem, é necessário chamar Refresh Data no Aggregate dentro da action OnNavigate da paginação.",
  },

  // CLIENT VARIABLES
  {
    id: 29,
    topic: TOPICS.CLIENT_VARIABLES,
    question: "Qual dos seguintes tipos NÃO pode ser armazenado em uma Client Variable?",
    options: [
      "Text",
      "Boolean",
      "Binary Data",
      "Long Integer",
    ],
    answer: 2,
    explanation: "Client Variables não suportam Binary Data, List, Record ou Structure. São aceitos apenas tipos simples como Text, Integer, Long Integer, Decimal, Boolean, Date, DateTime e Currency.",
  },
  {
    id: 30,
    topic: TOPICS.CLIENT_VARIABLES,
    question: "Client Variables sobrevivem ao fechamento do browser?",
    options: [
      "Não — são apagadas ao fechar o browser.",
      "Sim — persistem até o cache do browser ser limpo ou o logout.",
      "Depende — apenas se o usuário estiver logado.",
      "Sim — ficam no servidor associadas à sessão.",
    ],
    answer: 1,
    explanation: "Client Variables persistem no browser além da sessão atual. Elas são mantidas até que o cache seja limpo ou em alguns casos até o logout — por isso não devem guardar dados sensíveis.",
  },

  // RELACIONAMENTOS
  {
    id: 31,
    topic: TOPICS.RELATIONSHIPS,
    question: "Como criar um relacionamento 1-para-Muitos entre Entidade A (mestre) e Entidade B (detalhe)?",
    options: [
      "Adicionar um atributo de referência do tipo Entity A Identifier na Entidade B.",
      "Adicionar um atributo de referência do tipo Entity B Identifier na Entidade A.",
      "Criar uma terceira entidade com FKs para A e B.",
      "Alterar o Identifier da Entidade A para o tipo da Entidade B.",
    ],
    answer: 0,
    explanation: "No relacionamento 1:N, a FK sempre fica no lado 'Muitos'. A Entidade B (detalhe) deve ter um atributo de referência do tipo Entity A Identifier, apontando para o mestre.",
  },
  {
    id: 32,
    topic: TOPICS.RELATIONSHIPS,
    question: "Como criar um relacionamento Muitos-para-Muitos entre Entidade A e Entidade B?",
    options: [
      "Adicionar FK de B em A e FK de A em B simultaneamente.",
      "Alterar o Identifier de B para o tipo de A.",
      "Criar uma terceira entidade com dois atributos de referência: um para A e outro para B.",
      "Usar uma Static Entity para mapear os relacionamentos.",
    ],
    answer: 2,
    explanation: "Relacionamento N:N exige uma entidade de junção (junction table) contendo FKs para ambas as entidades. Essa terceira entidade representa a associação entre os registros.",
  },

  // SEGURANÇA
  {
    id: 33,
    topic: TOPICS.SECURITY,
    question: "Um usuário tem apenas a Role 'OrdersAdmin'. A quais telas ele tem acesso?",
    options: [
      "Apenas telas com a Role 'OrdersAdmin' marcada.",
      "Telas com 'OrdersAdmin' e também telas com 'Registered' marcada.",
      "Apenas telas com 'Anonymous' marcada.",
      "Nenhuma tela, pois não tem a Role 'Registered'.",
    ],
    answer: 1,
    explanation: "Ter qualquer Role específica implica automaticamente a Role 'Registered'. Portanto, o usuário acessa telas marcadas com 'OrdersAdmin' E telas marcadas com 'Registered'.",
  },

  // CLIENT e SERVER ACTIONS (extra)
  {
    id: 34,
    topic: TOPICS.CLIENT_SERVER_ACTIONS,
    question: "O que acontece na Client Action quando ela chama uma Server Action dentro do fluxo lógico?",
    options: [
      "A execução continua imediatamente para o próximo nó, em paralelo.",
      "A execução do fluxo pausa naquele nó até a Server Action retornar, e só então continua.",
      "A Server Action é executada no browser, sem round-trip ao servidor.",
      "A Client Action é abortada e o controle passa para a Server Action.",
    ],
    answer: 1,
    explanation: "Apesar de o browser fazer uma chamada assíncrona ao servidor, o fluxo lógico do Service Studio trata a chamada como síncrona: a execução pausa no nó da Server Action até a resposta chegar, e só então os nós seguintes são executados.",
  },

  // FLUXOS LÓGICOS (extra)
  {
    id: 35,
    topic: TOPICS.LOGIC_FLOWS,
    question: "Qual a diferença entre usar um nó 'If' e um 'Exception Handler' num fluxo lógico?",
    options: [
      "São equivalentes — ambos capturam erros de execução.",
      "'If' testa uma condição lógica; 'Exception Handler' captura erros lançados durante a execução do fluxo.",
      "'Exception Handler' só existe em Server Actions.",
      "'If' só pode ser usado em Client Actions.",
    ],
    answer: 1,
    explanation: "'If' é um desvio condicional baseado numa expressão booleana. 'Exception Handler' é um bloco que captura exceções (erros em runtime, como falha de conexão com o banco) lançadas durante a execução dos nós dentro dele.",
  },

  // USANDO BLOCOS (extra)
  {
    id: 36,
    topic: TOPICS.BLOCKS,
    question: "Como um Block recebe dados da tela que o contém?",
    options: [
      "Através de Client Variables globais.",
      "Através de Input Parameters definidos nas propriedades do Block.",
      "Blocks não podem receber dados externos.",
      "Através de Session Variables.",
    ],
    answer: 1,
    explanation: "Blocks reutilizáveis recebem dados de fora através de Input Parameters, configurados nas propriedades do Block e preenchidos como atributos ao arrastar o Block para uma tela.",
  },
  {
    id: 37,
    topic: TOPICS.BLOCKS,
    question: "É possível usar a mesma instância de Block em múltiplas telas da aplicação?",
    options: [
      "Não — cada Block só pode ser usado em uma tela.",
      "Sim — o Block é reutilizável e cada tela mantém sua própria instância independente com os parâmetros que ela define.",
      "Sim, mas apenas Blocks marcados como 'Public'.",
      "Não — Blocks só funcionam dentro do módulo em que foram criados.",
    ],
    answer: 1,
    explanation: "Blocks foram feitos para reutilização: podem ser arrastados para múltiplas telas (inclusive de outros módulos, se marcados como públicos), cada uma com sua própria instância e parâmetros.",
  },

  // EVENTOS DE BLOCOS (extra)
  {
    id: 38,
    topic: TOPICS.BLOCK_EVENTS,
    question: "Como um Block se comunica com a tela que o contém quando ocorre uma ação interna (ex: clique num item de uma lista dentro do Block)?",
    options: [
      "Alterando diretamente uma variável da tela pai.",
      "Disparando um Block Event, que a tela pai escuta e trata em uma Screen Action.",
      "Chamando diretamente uma Client Action da tela pai.",
      "Isso não é possível — Blocks são isolados.",
    ],
    answer: 1,
    explanation: "Blocks se comunicam com o exterior através de Block Events. O Block dispara o evento com dados, e a tela que o contém implementa uma action associada a esse evento para reagir.",
  },

  // ENTIDADES (extra)
  {
    id: 39,
    topic: TOPICS.ENTITIES,
    question: "Qual é a principal diferença entre uma Entity comum e uma Static Entity?",
    options: [
      "Static Entity não pode ter atributos além do Identifier.",
      "Static Entity armazena uma lista fixa de valores definida em tempo de desenvolvimento, editável apenas no Service Studio.",
      "Static Entity só existe em Service Actions.",
      "Não há diferença — são termos equivalentes.",
    ],
    answer: 1,
    explanation: "Static Entities guardam registros fixos (como um enum), definidos e editados no Service Studio. São ideais para listas de opções que raramente mudam, como status ou categorias.",
  },

  // VALIDAÇÕES (extra)
  {
    id: 40,
    topic: TOPICS.FORM_VALIDATIONS,
    question: "O que a propriedade 'Required' de um Input faz quando o botão de submit tem Built-in Validations = Yes?",
    options: [
      "Nada — Required não tem efeito sem lógica adicional.",
      "Marca automaticamente o campo como inválido e exibe mensagem padrão se estiver vazio ao submeter.",
      "Bloqueia a digitação de caracteres inválidos em tempo real.",
      "Torna o campo somente leitura até ser preenchido.",
    ],
    answer: 1,
    explanation: "Quando Required = Yes e o botão de submit tem Built-in Validations = Yes, o próprio widget verifica automaticamente se o campo está vazio e exibe a mensagem de validação padrão, sem necessidade de lógica manual.",
  },

  // CICLO DE VIDA (extra)
  {
    id: 41,
    topic: TOPICS.SCREEN_LIFECYCLE,
    question: "Um Screen Parameter obrigatório (Mandatory = Yes) não é passado ao navegar para a tela. O que acontece?",
    options: [
      "A tela abre normalmente com o parâmetro vazio.",
      "A navegação falha e uma exceção é lançada antes da tela renderizar.",
      "O parâmetro assume automaticamente seu valor default.",
      "A tela redireciona para a Home Screen do módulo.",
    ],
    answer: 1,
    explanation: "Screen Parameters marcados como Mandatory precisam ser fornecidos na navegação. Se não forem, a plataforma lança uma exceção de execução antes mesmo da tela ser processada.",
  },

  // OBTENÇÃO DE DADOS (extra)
  {
    id: 42,
    topic: TOPICS.DATA_FETCHING,
    question: "Para atualizar apenas os dados de um Aggregate específico sem recarregar a tela inteira, qual nó deve ser usado?",
    options: [
      "Destroy Data",
      "Refresh Data, selecionando o Aggregate desejado como Source",
      "Reload Screen Data",
      "Ajax Refresh",
    ],
    answer: 1,
    explanation: "O nó Refresh Data permite selecionar especificamente qual(is) Aggregate(s) devem ser re-executados, sem precisar recarregar a tela inteira ou outros dados que não mudaram.",
  },
  {
    id: 43,
    topic: TOPICS.DATA_FETCHING,
    question: "Qual é a desvantagem de filtrar uma lista grande usando a propriedade Visible de um List Records, em vez de filtrar no próprio Aggregate?",
    options: [
      "Não há diferença de performance entre os dois métodos.",
      "Todos os registros são trazidos do banco de dados, mesmo os que ficam ocultos, desperdiçando tráfego e processamento.",
      "O List Records não suporta expressões no Visible.",
      "O filtro no Aggregate é sempre mais lento, pois roda no servidor.",
    ],
    answer: 1,
    explanation: "Filtrar via Visible apenas esconde os itens no client-side — todos os registros continuam sendo buscados no banco e trafegados até o browser. Filtrar diretamente no Aggregate reduz o volume de dados na origem, sendo mais eficiente.",
  },

  // CLIENT VARIABLES (extra)
  {
    id: 44,
    topic: TOPICS.CLIENT_VARIABLES,
    question: "Qual é a diferença de escopo entre uma Client Variable e uma Local Variable de uma Screen Action?",
    options: [
      "São idênticas em escopo e tempo de vida.",
      "Client Variable mantém o valor entre navegações de tela dentro da mesma sessão do browser; Local Variable só existe durante a execução da action.",
      "Local Variable persiste entre sessões; Client Variable não.",
      "Client Variable só pode ser usada em Server Actions.",
    ],
    answer: 1,
    explanation: "Client Variables vivem no escopo da aplicação no browser e mantêm o valor conforme o usuário navega entre telas. Local Variables existem apenas durante a execução da action em que foram declaradas.",
  },
  {
    id: 45,
    topic: TOPICS.CLIENT_VARIABLES,
    question: "Como o valor inicial (default) de uma Client Variable é definido?",
    options: [
      "Sempre via uma Server Action executada no login.",
      "Na propriedade 'Default Value' da variável, configurada no Service Studio.",
      "Automaticamente como null/vazio, sem possibilidade de configuração.",
      "Somente através de uma Static Entity associada.",
    ],
    answer: 1,
    explanation: "Assim como variáveis locais, Client Variables têm uma propriedade Default Value configurável no Service Studio, que define o valor inicial antes de qualquer atribuição em runtime.",
  },

  // RELAÇÕES ENTRE DADOS (extra)
  {
    id: 46,
    topic: TOPICS.RELATIONSHIPS,
    question: "A Entidade B tem uma FK obrigatória para a Entidade A com Delete Rule = 'Protect'. O que acontece ao tentar excluir um registro de A que tem registros relacionados em B?",
    options: [
      "O registro de A é excluído e os relacionados em B ficam com FK nula.",
      "A exclusão é bloqueada enquanto existirem registros relacionados em B.",
      "Os registros relacionados em B são excluídos automaticamente (cascade).",
      "Nada acontece com a integridade — a exclusão sempre é permitida.",
    ],
    answer: 1,
    explanation: "Delete Rule 'Protect' impede a exclusão do registro mestre enquanto existirem registros filhos relacionados, garantindo integridade referencial. 'Delete' faria cascade; 'Ignore' permitiria a exclusão órfã (não recomendado).",
  },
  {
    id: 47,
    topic: TOPICS.RELATIONSHIPS,
    question: "Como modelar um relacionamento 1-para-1 entre Entidade A e Entidade B no OutSystems?",
    options: [
      "Não é suportado nativamente — precisa de uma entidade de junção.",
      "Adicionando um atributo de referência para a outra entidade com a restrição Is Unique = Yes em um dos lados.",
      "Fazendo os dois Identifiers apontarem um para o outro.",
      "Usando uma Static Entity para representar o par.",
    ],
    answer: 1,
    explanation: "Um relacionamento 1:1 é modelado como um 1:N onde o atributo de referência recebe a restrição Is Unique = Yes, garantindo que cada registro do lado 'muitos' só possa se relacionar a um único registro do outro lado.",
  },

  // SEGURANÇA (extra)
  {
    id: 48,
    topic: TOPICS.SECURITY,
    question: "O que a Role 'Anonymous' representa em um módulo OutSystems?",
    options: [
      "Usuários autenticados sem nenhuma role customizada.",
      "Qualquer visitante, autenticado ou não — é a role padrão que todo mundo tem.",
      "Apenas usuários administradores do ambiente.",
      "Uma role que precisa ser criada manualmente pelo desenvolvedor.",
    ],
    answer: 1,
    explanation: "'Anonymous' é uma role implícita que toda tela tem por padrão e representa qualquer visitante, mesmo sem login. Marcar uma tela apenas com 'Anonymous' a torna pública.",
  },
  {
    id: 49,
    topic: TOPICS.SECURITY,
    question: "Como verificar programaticamente, dentro de uma action, se o usuário logado tem uma determinada Role?",
    options: [
      "Não é possível checar roles fora da segurança de tela.",
      "Usando a função CheckRole('NomeDaRole') em uma condição (If).",
      "Apenas comparando o Username diretamente.",
      "As roles só podem ser verificadas no Service Center.",
    ],
    answer: 1,
    explanation: "A função built-in CheckRole('NomeDaRole') retorna um booleano indicando se o usuário autenticado possui aquela Role, permitindo verificações de segurança dentro da lógica de Client/Server Actions.",
  },
  {
    id: 50,
    topic: TOPICS.SECURITY,
    question: "Uma tela está marcada com as Roles 'Sales' e 'Support' (ambas marcadas na aba Roles). Quem pode acessá-la?",
    options: [
      "Apenas usuários que tenham as duas roles simultaneamente (AND).",
      "Usuários que tenham pelo menos uma das duas roles (OR).",
      "Ninguém, pois é preciso escolher apenas uma role por tela.",
      "Apenas o Administrador do ambiente.",
    ],
    answer: 1,
    explanation: "Múltiplas Roles marcadas numa tela funcionam com lógica OR: basta o usuário ter qualquer uma delas para acessar. Para exigir múltiplas roles simultaneamente, seria necessária lógica adicional (ex: CheckRole em cascata).",
  },
];

const FLASHCARDS = [
  {
    id: 1,
    topic: TOPICS.CLIENT_SERVER_ACTIONS,
    front: "Qual a diferença fundamental entre Client Action e Server Action?",
    back: "Client Action roda no BROWSER (sem acesso ao banco). Server Action roda no SERVIDOR (acesso total ao banco e APIs). Client pode chamar Server, mas Server NÃO pode chamar Client.",
  },
  {
    id: 2,
    topic: TOPICS.CLIENT_SERVER_ACTIONS,
    front: "O que é necessário para usar uma Action como função em uma expressão?",
    back: "Function = Yes + exatamente UM Output Parameter obrigatório. Screen Actions nunca podem ser funções.",
  },
  {
    id: 3,
    topic: TOPICS.LOGIC_FLOWS,
    front: "O que acontece no Switch quando nenhum branch é verdadeiro?",
    back: "O Otherwise é executado. O Switch executa apenas o PRIMEIRO branch verdadeiro — os demais são ignorados.",
  },
  {
    id: 4,
    topic: TOPICS.LOGIC_FLOWS,
    front: "Quando ocorre rollback automático no OutSystems?",
    back: "APENAS em erros de banco de dados (Database Exception). User Exceptions e outros erros NÃO causam rollback automático.",
  },
  {
    id: 5,
    topic: TOPICS.LOGIC_FLOWS,
    front: "O ForEach funciona com quais tipos de variável?",
    back: "Apenas variáveis do tipo LIST. Não funciona com Record, Text, Integer ou outros tipos simples.",
  },
  {
    id: 6,
    topic: TOPICS.BLOCKS,
    front: "Como um Block comunica algo para a Screen pai?",
    back: "Via EVENTS — o Block dispara um evento com Trigger Event. A Screen pai define um handler para reagir. O inverso (pai → block) é feito por Input Parameters.",
  },
  {
    id: 7,
    topic: TOPICS.BLOCK_EVENTS,
    front: "Quando é disparado o On Parameters Changed?",
    back: "Quando o PAI altera um Input Parameter do Block. Mudanças feitas DENTRO do próprio Block NÃO disparam esse evento.",
  },
  {
    id: 8,
    topic: TOPICS.ENTITIES,
    front: "Qual o tipo padrão do ID em Entidade Normal vs Static Entity?",
    back: "Entidade Normal: Long Integer (Auto Number ativo por padrão). Static Entity: Integer. Essa diferença cai muito na prova!",
  },
  {
    id: 9,
    topic: TOPICS.ENTITIES,
    front: "Atributos padrão de uma Static Entity",
    back: "Id, Name, Order, IsActive — esses quatro são criados automaticamente. Static Entity = enumeração, sem CRUD em runtime.",
  },
  {
    id: 10,
    topic: TOPICS.ENTITIES,
    front: "Delete Rules: Protect, Delete e Ignore",
    back: "Protect: impede deletar pai com filhos (padrão). Delete: apaga pai e filhos em cascata. Ignore: deleta pai, filhos viram órfãos. Apenas Ignore não garante integridade referencial.",
  },
  {
    id: 11,
    topic: TOPICS.AGGREGATES,
    front: "Como filtros múltiplos são combinados em um Aggregate?",
    back: "Sempre com AND. Um registro só aparece se atender a TODOS os filtros. Para OR, use uma expressão dentro de um único filtro.",
  },
  {
    id: 12,
    topic: TOPICS.AGGREGATES,
    front: "Only With vs With or Without (joins)",
    back: "Only With = INNER JOIN (FK Mandatory = Yes). With or Without = LEFT JOIN (FK Mandatory = No). O OutSystems define automaticamente pelo Mandatory da FK.",
  },
  {
    id: 13,
    topic: TOPICS.AGGREGATES,
    front: "O que o Group By muda no output do Aggregate?",
    back: "Com Group By, o output contém APENAS as colunas agrupadas + funções de agregação. Os outros atributos da entidade desaparecem do output.",
  },
  {
    id: 14,
    topic: TOPICS.AGGREGATES,
    front: "Screen Aggregates executam em qual ordem?",
    back: "Em PARALELO, sem ordem garantida. Nunca dependa de um Aggregate esperar o resultado de outro.",
  },
  {
    id: 15,
    topic: TOPICS.FORM_VALIDATIONS,
    front: "O que acontece com Form.Valid quando Built-in Validations = No?",
    back: "Form.Valid sempre será TRUE, mesmo com campos obrigatórios vazios. Toda validação deve ser feita manualmente.",
  },
  {
    id: 16,
    topic: TOPICS.FORM_VALIDATIONS,
    front: "Sequência correta para salvar com validação",
    back: "1. Built-in Validations = Yes no botão → 2. If Form.Valid → 3. (True) chamar Server Action → 4. (False) parar e exibir erros. NUNCA chamar servidor sem checar Form.Valid.",
  },
  {
    id: 17,
    topic: TOPICS.SCREEN_LIFECYCLE,
    front: "Ordem dos eventos de ciclo de vida",
    back: "Initialize → Ready → Render → Destroy. Initialize: antes de renderizar. Ready: DOM pronto. Render: a cada mudança de dados. Destroy: ao sair da tela.",
  },
  {
    id: 18,
    topic: TOPICS.SCREEN_LIFECYCLE,
    front: "Por que não alterar dados no OnRender?",
    back: "Causa LOOP INFINITO. OnRender dispara quando dados mudam → você altera dados → dispara OnRender novamente → loop.",
  },
  {
    id: 19,
    topic: TOPICS.CLIENT_VARIABLES,
    front: "O que NÃO pode ser armazenado em Client Variables?",
    back: "Binary Data, List, Record, Structure. Também: senhas e dados sensíveis (são visíveis no browser). Client Variables persistem mesmo após fechar o browser.",
  },
  {
    id: 20,
    topic: TOPICS.RELATIONSHIPS,
    front: "Onde fica a FK em cada tipo de relacionamento?",
    back: "1:N → FK fica no lado MUITOS. 1:1 → ID da entidade filha tem o tipo da entidade pai. N:N → terceira entidade de junção com FKs para ambas.",
  },
];

const RULES = [
  {
    topic: TOPICS.CLIENT_SERVER_ACTIONS,
    rules: [
      "Client Action roda no browser — Server Action roda no servidor",
      "Client PODE chamar Server, Server NÃO PODE chamar Client",
      "Para usar em expressão: Function = Yes + exatamente 1 output parameter",
      "Screen Actions são locais à tela e não têm output parameters",
      "Operações de banco de dados → sempre em Server Action",
    ],
  },
  {
    topic: TOPICS.LOGIC_FLOWS,
    rules: [
      "Switch: executa apenas o PRIMEIRO branch verdadeiro",
      "Switch sem branch verdadeiro → vai para Otherwise",
      "Exception Handler: vai para o handler MAIS ESPECÍFICO",
      "All Exceptions: captura qualquer erro sem handler específico",
      "Rollback automático: apenas Database Exception",
      "ForEach: apenas variáveis do tipo List",
    ],
  },
  {
    topic: TOPICS.BLOCKS,
    rules: [
      "Block pode ser usado em Screens e outros Blocks",
      "Block NÃO pode ser instanciado dentro de si mesmo",
      "Mudança no Block reflete em TODAS as instâncias automaticamente",
      "Block comunica com pai via Events (Trigger Event)",
      "Pai comunica com Block via Input Parameters",
    ],
  },
  {
    topic: TOPICS.BLOCK_EVENTS,
    rules: [
      "On Parameters Changed: disparado quando o PAI muda um input do Block",
      "Mudanças internas do Block NÃO disparam On Parameters Changed",
      "Events são definidos no Block, handlers são definidos no pai",
      "Events permitem passar dados do Block para o pai via Input Parameters do evento",
    ],
  },
  {
    topic: TOPICS.AGGREGATES,
    rules: [
      "Filtros múltiplos: sempre combinados com AND",
      "Only With = INNER JOIN (Mandatory = Yes)",
      "With or Without = LEFT JOIN (Mandatory = No)",
      "Group By: output contém APENAS colunas agrupadas + agregações",
      "Screen Aggregates: executam em PARALELO, sem ordem garantida",
      "Colunas ocultas (greyed-out): excluídas do output (otimização)",
      "Fetch At Start: automático ao abrir tela",
      "Only On Demand: precisa de Refresh Data explícito",
    ],
  },
  {
    topic: TOPICS.FORM_VALIDATIONS,
    rules: [
      "Built-in Validations = No → Form.Valid sempre True",
      "Sequência: Built-in → If Form.Valid → Server Action",
      "Validação custom: Input.Valid = False + ValidationMessage",
      "Nunca enviar ao servidor sem checar Form.Valid",
    ],
  },
  {
    topic: TOPICS.SCREEN_LIFECYCLE,
    rules: [
      "Ordem: Initialize → Ready → Render → Destroy",
      "OnInitialize: setar variáveis e verificar permissões (antes de renderizar)",
      "OnReady: DOM pronto — manipulação de DOM e scripts JS",
      "OnRender: NUNCA alterar dados aqui (causa loop)",
      "Tela nova renderiza ANTES da tela anterior ser destruída",
    ],
  },
  {
    topic: TOPICS.ENTITIES,
    rules: [
      "Entidade Normal: ID = Long Integer, Auto Number (padrão)",
      "Static Entity: ID = Integer; atributos padrão: Id, Name, Order, IsActive",
      "Static Entity = enumeração — sem CRUD em runtime",
      "Delete Rule: Protect (padrão), Delete (cascata), Ignore (órfãos)",
      "Apenas Ignore não garante integridade referencial",
    ],
  },
  {
    topic: TOPICS.RELATIONSHIPS,
    rules: [
      "1:N → FK fica no lado MUITOS",
      "1:1 → ID da filha tem o tipo do ID da entidade pai",
      "N:N → terceira entidade de junção com duas FKs",
    ],
  },
  {
    topic: TOPICS.CLIENT_VARIABLES,
    rules: [
      "Armazenadas no browser — persistem após fechar o browser",
      "NÃO suportam: Binary Data, List, Record, Structure",
      "NUNCA armazenar senhas ou dados sensíveis",
      "Diferentes de Local Variable (morre ao sair da tela)",
    ],
  },
];
