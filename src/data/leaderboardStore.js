/*
  leaderboardStore — couche d'abstraction du classement.

  POUR L'INSTANT : 100% front-end. Les scores sont stockes en localStorage
  et melanges a un jeu de faux joueurs pour que le classement soit credible
  des le depart.

  PLUS TARD : pour brancher Supabase, il suffira de remplacer le corps des
  fonctions submitScore() et getLeaderboard() par des appels reseau.
  Le reste de l'application (GamePage, LeaderboardPage) n'aura PAS a changer.

  Le classement est indexe par couple (game, mode). Chaque jeu peut avoir
  un ou plusieurs modes. Rage Hockey : 'survival' + 'classic'. STAQ : 'classic'.
*/

const STORAGE_KEY = 'rage_arcade_scores_v2'
const NAME_KEY = 'rage_arcade_player_name'

/* =====================================================================
   FAUX JOUEURS — donnent un classement credible avant d'avoir du trafic.
   Indexes par 'game/mode'. Scores : survival = secondes, sinon = points.
   ===================================================================== */
const SEEDS = {
  'rage-hockey/survival': [
    { name: 'NeonReflex', score: 412, diff: 'rage' },
    { name: 'PuckMaster', score: 388, diff: 'rage' },
    { name: 'IceQueen',   score: 351, diff: 'normal' },
    { name: 'xRageQuitx', score: 327, diff: 'rage' },
    { name: 'SlapShot99', score: 298, diff: 'normal' },
    { name: 'FrostByte',  score: 274, diff: 'normal' },
    { name: 'BumperKing', score: 251, diff: 'rage' },
    { name: 'Vortex',     score: 233, diff: 'normal' },
    { name: 'CyanStreak', score: 210, diff: 'chill' },
    { name: 'GhostGoal',  score: 189, diff: 'normal' },
    { name: 'TurboMitt',  score: 167, diff: 'chill' },
    { name: 'ZeroChill',  score: 142, diff: 'normal' },
  ],
  'rage-hockey/classic': [
    { name: 'PuckMaster', score: 268, diff: 'rage' },
    { name: 'NeonReflex', score: 244, diff: 'rage' },
    { name: 'SlapShot99', score: 221, diff: 'normal' },
    { name: 'IceQueen',   score: 198, diff: 'rage' },
    { name: 'xRageQuitx', score: 187, diff: 'normal' },
    { name: 'BumperKing', score: 165, diff: 'normal' },
    { name: 'FrostByte',  score: 154, diff: 'normal' },
    { name: 'Vortex',     score: 138, diff: 'chill' },
    { name: 'CyanStreak', score: 122, diff: 'normal' },
    { name: 'GhostGoal',  score: 110, diff: 'chill' },
    { name: 'TurboMitt',  score: 96,  diff: 'chill' },
    { name: 'ZeroChill',  score: 84,  diff: 'normal' },
  ],
  'staq/classic': [
    { name: 'SkyBuilder', score: 87, diff: 'normal' },
    { name: 'BrickGod',   score: 79, diff: 'normal' },
    { name: 'WobbleKing', score: 72, diff: 'normal' },
    { name: 'PerfectTap', score: 66, diff: 'normal' },
    { name: 'TowerRat',   score: 61, diff: 'normal' },
    { name: 'StackAttak', score: 55, diff: 'normal' },
    { name: 'NoFalls',    score: 50, diff: 'normal' },
    { name: 'HighRise',   score: 44, diff: 'normal' },
    { name: 'ComboChain', score: 39, diff: 'normal' },
    { name: 'SteadyHand', score: 34, diff: 'normal' },
    { name: 'JengaJedi',  score: 29, diff: 'normal' },
    { name: 'BlockHead',  score: 24, diff: 'normal' },
  ],
}

/* =====================================================================
   STOCKAGE LOCAL
   ===================================================================== */
function readLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeLocal(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
  } catch {
    /* quota plein ou storage indisponible : sans effet */
  }
}

/* =====================================================================
   PSEUDO DU JOUEUR
   ===================================================================== */
export function getPlayerName() {
  try {
    return localStorage.getItem(NAME_KEY) || ''
  } catch {
    return ''
  }
}

export function setPlayerName(name) {
  const clean = String(name || '').trim().slice(0, 16)
  try {
    localStorage.setItem(NAME_KEY, clean)
  } catch {
    /* sans effet */
  }
  return clean
}

/* =====================================================================
   API PUBLIQUE
   ===================================================================== */

/*
  submitScore — enregistre un score.
  entry : { game, mode, score, scoreLabel, diff, name }
*/
export function submitScore(entry) {
  const scores = readLocal()
  const record = {
    game: entry.game || 'rage-hockey',
    mode: entry.mode || 'classic',
    score: Number(entry.score) || 0,
    scoreLabel: entry.scoreLabel || String(entry.score || 0),
    diff: entry.diff || 'normal',
    name: (entry.name || getPlayerName() || 'You').slice(0, 16),
    date: Date.now(),
    isLocal: true,
  }
  scores.push(record)
  // On ne garde que les 300 derniers scores locaux pour ne pas saturer.
  const trimmed = scores
    .sort((a, b) => b.date - a.date)
    .slice(0, 300)
  writeLocal(trimmed)
  return record
}

/*
  getLeaderboard — renvoie le classement trie pour un jeu + mode.
  game : 'rage-hockey' | 'staq' | ...
  mode : 'survival' | 'classic'
  Fusionne faux joueurs + scores locaux, garde le meilleur par pseudo.
*/
export function getLeaderboard(game = 'rage-hockey', mode = 'classic', limit = 100) {
  const key = game + '/' + mode
  const seed = SEEDS[key] || []
  const isTime = mode === 'survival'

  const seedRows = seed.map(s => ({
    ...s,
    game,
    mode,
    isLocal: false,
    scoreLabel: isTime ? formatTime(s.score) : String(s.score),
  }))

  const localRows = readLocal()
    .filter(s => s.game === game && s.mode === mode)

  // Fusion + meilleur score par pseudo
  const byName = new Map()
  for (const row of [...seedRows, ...localRows]) {
    const existing = byName.get(row.name)
    if (!existing || row.score > existing.score) {
      byName.set(row.name, row)
    }
  }

  return [...byName.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((row, i) => ({ ...row, rank: i + 1 }))
}

/*
  getPlayerBest — meilleur score local du joueur pour un jeu + mode.
  Renvoie null si le joueur n'a pas encore joue.
*/
export function getPlayerBest(game = 'rage-hockey', mode = 'classic') {
  const name = getPlayerName()
  const rows = readLocal().filter(s => s.game === game && s.mode === mode)
  if (rows.length === 0) return null
  const best = rows.reduce((a, b) => (b.score > a.score ? b : a))
  const board = getLeaderboard(game, mode, 1000)
  const found = board.find(r => r.name === (name || 'You') && r.score === best.score)
  return { ...best, rank: found ? found.rank : null }
}

/* =====================================================================
   UTILITAIRE
   ===================================================================== */
export function formatTime(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds))
  const m = Math.floor(s / 60)
  const ss = s % 60
  return m + ':' + (ss < 10 ? '0' : '') + ss
}