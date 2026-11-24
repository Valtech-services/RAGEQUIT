/* =====================================================================
   api/admin-pin.js — vérification du code PIN de l'admin côté serveur
   (point d'audit A-024). Fonction Vercel : le PIN vit dans la variable
   d'environnement ADMIN_PIN (sans préfixe VITE_), donc il n'est jamais
   copié dans le JavaScript public du site.

   GET  /api/admin-pin            -> { enabled }  (PIN configuré ou non)
   POST /api/admin-pin { pin }    -> { ok }       (en-tête Authorization :
        jeton Supabase du compte connecté ; seul le compte admin est accepté)

   Chaque essai est ralenti (~0,7 s) pour décourager les essais en série.
   ===================================================================== */
import { timingSafeEqual } from 'node:crypto'

const ADMIN_ID = '4340752c-bfae-492c-a61b-a9552ac8c908'

function sameText(a, b) {
  const x = Buffer.from(String(a)); const y = Buffer.from(String(b))
  return x.length === y.length && timingSafeEqual(x, y)
}

async function isAdminToken(token) {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key || !token) return false
  try {
    const r = await fetch(url.replace(/\/$/, '') + '/auth/v1/user', {
      headers: { apikey: key, Authorization: 'Bearer ' + token },
    })
    if (!r.ok) return false
    const u = await r.json()
    return u && u.id === ADMIN_ID
  } catch (e) {
    return false
  }
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') { try { return JSON.parse(req.body) } catch (e) { return {} } }
  return await new Promise(resolve => {
    let data = ''
    req.on('data', c => { data += c; if (data.length > 1000) req.destroy() })
    req.on('end', () => { try { resolve(JSON.parse(data || '{}')) } catch (e) { resolve({}) } })
    req.on('error', () => resolve({}))
  })
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex')
  const pin = process.env.ADMIN_PIN || ''

  if (req.method === 'GET') return res.status(200).json({ enabled: !!pin })
  if (req.method !== 'POST') return res.status(405).json({ ok: false })

  await new Promise(r => setTimeout(r, 700))
  if (!pin) return res.status(200).json({ ok: true, enabled: false })

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
  if (!(await isAdminToken(token))) return res.status(403).json({ ok: false })

  const body = await readBody(req)
  const ok = typeof body.pin === 'string' && body.pin.length <= 12 && sameText(body.pin, pin)
  return res.status(200).json({ ok })
}
