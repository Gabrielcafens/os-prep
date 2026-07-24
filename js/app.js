// ─── HELPERS ─────────────────────────────────────────────────────────────────
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function fmtTime(seconds) {
  const m = Math.floor(Math.abs(seconds) / 60).toString().padStart(2, '0');
  const s = (Math.abs(seconds) % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ─── ALPINE COMPONENT ────────────────────────────────────────────────────────
function app() {
  return {
    // navigation
    page: 'quiz',
    topics: [...new Set(QUESTIONS.map(q => q.topic))],
    letters: ['A', 'B', 'C', 'D'],

    // quiz setup
    mode: 'practice',
    quizTopicFilter: 'all',
    quizCount: 10,
    quizScreen: 'setup', // 'setup' | 'question' | 'result'

    // quiz run
    quizQuestions: [],
    currentQ: 0,
    answered: false,
    selectedIndex: null,
    score: 0,
    wrongTopics: {},
    elapsed: 0,
    totalSeconds: 90 * 60, // 1h30 for exam mode
    timerInterval: null,

    // flashcards
    fcTopicFilter: 'all',
    fcQuestions: [],
    fcIndex: 0,
    fcFlipped: false,
    fcDisplayed: null,

    // rules
    rulesTopicFilter: 'all',

    // tracker
    topicStats: {},

    // theme
    theme: localStorage.getItem('os_theme') || 'system',

    // profile menu
    profileOpen: false,

    init() {
      this.initTracker();
      this.fcQuestions = shuffle([...FLASHCARDS]);
      this.fcDisplayed = this.fcQuestions[0] ?? null;
      this.applyTheme();
    },

    // ─── THEME ─────────────────────────────────────────────────────────────
    get isDarkMode() {
      return this.theme === 'dark'
        || (this.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    },

    applyTheme() {
      if (this.theme === 'system') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', this.theme);
      }
    },

    toggleTheme() {
      this.theme = this.isDarkMode ? 'light' : 'dark';
      localStorage.setItem('os_theme', this.theme);
      this.applyTheme();
    },

    // ─── NAVIGATION ────────────────────────────────────────────────────────
    showPage(id) {
      this.page = id;
      if (id === 'quiz') this.quizScreen = 'setup';
    },

    // ─── QUIZ ──────────────────────────────────────────────────────────────
    get currentQuestion() {
      return this.quizQuestions[this.currentQ];
    },

    startQuiz() {
      let pool = this.quizTopicFilter === 'all'
        ? [...QUESTIONS]
        : QUESTIONS.filter(q => q.topic === this.quizTopicFilter);
      pool = shuffle(pool).slice(0, Math.min(this.quizCount, pool.length));

      this.quizQuestions = pool;
      this.currentQ = 0;
      this.score = 0;
      this.wrongTopics = {};
      this.elapsed = 0;
      this.answered = false;
      this.selectedIndex = null;
      this.quizScreen = 'question';

      if (this.mode === 'exam') this.startTimer();
    },

    selectOption(index) {
      if (this.answered) return;
      this.answered = true;
      this.selectedIndex = index;

      const q = this.currentQuestion;
      const correct = index === q.answer;
      if (correct) {
        this.score++;
      } else {
        this.wrongTopics[q.topic] = (this.wrongTopics[q.topic] || 0) + 1;
      }

      this.updateStats(q.topic, correct);
    },

    nextQuestion() {
      this.currentQ++;
      this.answered = false;
      this.selectedIndex = null;
      if (this.currentQ >= this.quizQuestions.length) this.endQuiz();
    },

    endQuiz() {
      this.stopTimer();
      this.quizScreen = 'result';
    },

    get resultPct() {
      return this.quizQuestions.length ? Math.round(this.score / this.quizQuestions.length * 100) : 0;
    },

    get resultPass() {
      return this.resultPct >= 70;
    },

    get wrongEntries() {
      return Object.entries(this.wrongTopics).sort((a, b) => b[1] - a[1]);
    },

    formatTime(seconds) {
      return fmtTime(seconds);
    },

    // ─── TIMER ─────────────────────────────────────────────────────────────
    startTimer() {
      this.elapsed = 0;
      this.timerInterval = setInterval(() => {
        this.elapsed++;
        if (this.totalSeconds - this.elapsed <= 0) this.endQuiz();
      }, 1000);
    },

    stopTimer() {
      clearInterval(this.timerInterval);
    },

    get timerRemaining() {
      return this.totalSeconds - this.elapsed;
    },

    get timerText() {
      return fmtTime(this.timerRemaining);
    },

    get timerClass() {
      return this.timerRemaining < 300 ? 'danger' : this.timerRemaining < 600 ? 'warning' : '';
    },

    // ─── FLASHCARDS ────────────────────────────────────────────────────────
    setFcTopic(t) {
      this.fcTopicFilter = t;
      this.fcQuestions = t === 'all'
        ? shuffle([...FLASHCARDS])
        : shuffle(FLASHCARDS.filter(f => f.topic === t));
      this.fcIndex = 0;
      this.showFlashcard();
    },

    showFlashcard() {
      this.fcFlipped = false;
      // delay matches the .5s flip transition — swap content mid-flip like the original
      setTimeout(() => {
        this.fcDisplayed = this.fcQuestions[this.fcIndex] ?? null;
      }, 250);
    },

    flipCard() {
      if (!this.fcQuestions.length) return;
      this.fcFlipped = !this.fcFlipped;
    },

    fcPrev() {
      this.fcIndex = (this.fcIndex - 1 + this.fcQuestions.length) % this.fcQuestions.length;
      this.showFlashcard();
    },

    fcNext() {
      this.fcIndex = (this.fcIndex + 1) % this.fcQuestions.length;
      this.showFlashcard();
    },

    shuffleFC() {
      this.fcQuestions = shuffle([...this.fcQuestions]);
      this.fcIndex = 0;
      this.showFlashcard();
    },

    // ─── RULES ─────────────────────────────────────────────────────────────
    get filteredRules() {
      return this.rulesTopicFilter === 'all'
        ? RULES
        : RULES.filter(r => r.topic === this.rulesTopicFilter);
    },

    // ─── TRACKER ───────────────────────────────────────────────────────────
    initTracker() {
      const stored = JSON.parse(localStorage.getItem('os_stats') || '{}');

      // Baseline from real exam results
      const baseline = {
        [TOPICS.AGGREGATES]: { done: 0, correct: 0, examScore: 66, label: '66% na prova' },
        [TOPICS.CLIENT_SERVER_ACTIONS]: { done: 0, correct: 0, examScore: 0, label: '0% na prova 🔴' },
        [TOPICS.LOGIC_FLOWS]: { done: 0, correct: 0, examScore: 0, label: '0% na prova 🔴' },
        [TOPICS.BLOCKS]: { done: 0, correct: 0, examScore: 0, label: '0% na prova 🔴' },
        [TOPICS.BLOCK_EVENTS]: { done: 0, correct: 0, examScore: 0, label: '0% na prova 🔴' },
        [TOPICS.ENTITIES]: { done: 0, correct: 0, examScore: 33, label: '33% na prova' },
        [TOPICS.FORM_VALIDATIONS]: { done: 0, correct: 0, examScore: 33, label: '33% na prova' },
        [TOPICS.SCREEN_LIFECYCLE]: { done: 0, correct: 0, examScore: 100, label: '100% na prova ✅' },
        [TOPICS.DATA_FETCHING]: { done: 0, correct: 0, examScore: 50, label: '50% na prova' },
        [TOPICS.CLIENT_VARIABLES]: { done: 0, correct: 0, examScore: 100, label: '100% na prova ✅' },
        [TOPICS.RELATIONSHIPS]: { done: 0, correct: 0, examScore: 100, label: '100% na prova ✅' },
        [TOPICS.SECURITY]: { done: 0, correct: 0, examScore: 100, label: '100% na prova ✅' },
      };

      const merged = {};
      Object.keys(baseline).forEach(k => {
        merged[k] = { ...baseline[k], ...(stored[k] || {}) };
      });
      this.topicStats = merged;
    },

    updateStats(topic, correct) {
      if (!this.topicStats[topic]) return;
      this.topicStats[topic].done++;
      if (correct) this.topicStats[topic].correct++;
      localStorage.setItem('os_stats', JSON.stringify(this.topicStats));
    },

    resetStats() {
      if (!confirm('Resetar todo o progresso?')) return;
      localStorage.removeItem('os_stats');
      Object.keys(this.topicStats).forEach(k => {
        this.topicStats[k].done = 0;
        this.topicStats[k].correct = 0;
      });
    },

    get overallStats() {
      const values = Object.values(this.topicStats);
      const totalDone = values.reduce((a, b) => a + b.done, 0);
      const totalCorrect = values.reduce((a, b) => a + b.correct, 0);
      const pct = totalDone ? Math.round(totalCorrect / totalDone * 100) : 0;
      return { pct, totalDone, totalCorrect };
    },

    trackerColor(examScore) {
      return examScore === 0 ? 'red' : examScore < 60 ? 'amber' : 'green';
    },

    trackerBadgeClass(examScore) {
      const c = this.trackerColor(examScore);
      return c === 'green' ? 'blue' : c;
    },

    appPct(data) {
      return data.done ? Math.round(data.correct / data.done * 100) : null;
    },
  };
}
