/* CJ_BUILD 20261017-012350 */
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useCallback,
  useContext,
  createContext
} = React;
const {
  Plus,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
  Upload,
  Download,
  Link,
  Clock,
  Activity,
  Crosshair,
  Hourglass,
  Terminal,
  Database,
  RotateCcw,
  AlertTriangle,
  Volume2,
  FolderInput,
  Save,
  Cpu,
  Zap,
  Palette,
  Play,
  SkipForward,
  MoreVertical,
  Eraser,
  Layers,
  CalendarDays,
  Tag,
  Undo2,
  ListChecks,
  Timer,
  Settings,
  ChevronDown,
  Archive,
  Flag,
  FileText,
  Brain,
  Target,
  StickyNote,
  Flame,
  Snowflake,
  ImagePlus,
  Minus,
  Share2
} = LucideReact;
const BETA = typeof window !== 'undefined' && !!window.CJ_BETA;
const MAIN_KEY = 'cyberjournal2077.v1';
const BETA_KEY = 'cyberjournal2077.beta';
const LS_KEY = BETA ? BETA_KEY : MAIN_KEY;
const APP_VERSION = '1.0.0';
const UI = {
  mono: false
};
const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s;
const nice = s => UI.mono && s && s === s.toUpperCase() ? cap(s) : s;
const uid = (p = 'id') => `${p}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
const pad = n => String(n).padStart(2, '0');
const dKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseKey = k => {
  const [y, m, d] = k.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const dow = d => (d.getDay() + 6) % 7;
const toLocalInput = d => `${dKey(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
const parseLocal = s => {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d) ? null : d;
};
const toMin = hhmm => {
  const [h, m] = String(hhmm || '0:0').split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const round1 = x => Math.round(x * 10) / 10;
const hexRgb = h => {
  let m = String(h || '#000000').replace('#', '');
  if (m.length === 3) m = m.split('').map(c => c + c).join('');
  const n = parseInt(m.slice(0, 6), 16) || 0;
  return `${n >> 16 & 255},${n >> 8 & 255},${n & 255}`;
};
const alpha = (hex, a) => `rgba(${hexRgb(hex)},${a})`;
const plural = (n, one, few, many) => {
  const a = Math.abs(n) % 100,
    b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b > 1 && b < 5) return few;
  if (b === 1) return one;
  return many;
};
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const fmtDay = k => {
  const d = parseKey(k);
  return `${d.getDate()} ${MONTHS_GEN[d.getMonth()]} ${d.getFullYear()}`;
};
const fmtDT = v => {
  const d = v instanceof Date ? v : new Date(v);
  if (isNaN(d)) return '—';
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const fmtTotalHMS = ms => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
};
const inWindow = (now, a, b) => {
  const m = now.getHours() * 60 + now.getMinutes(),
    s = toMin(a),
    e = toMin(b);
  return s <= e ? m >= s && m <= e : m >= s || m <= e;
};
const windowDate = (now, a, b) => {
  const m = now.getHours() * 60 + now.getMinutes(),
    s = toMin(a),
    e = toMin(b);
  return s > e && m <= e ? dKey(addDays(now, -1)) : dKey(now);
};
const SCORE_COLOR = {
  5: '#59FF00',
  4: '#B8FF00',
  3: '#FFD600',
  2: '#FF7A00',
  1: '#FF2A2A'
};
const ringColor = (avg, thr) => avg == null ? 'rgba(255,255,255,.18)' : avg >= thr.g ? '#59FF00' : avg >= thr.l ? '#B8FF00' : avg >= thr.y ? '#FFD600' : '#FF4D1A';
const activeCards = (cards, key) => {
  const w = dow(parseKey(key));
  return cards.filter(c => c.type === 'once' ? c.date === key : (c.days || []).includes(w));
};
const calcAvg = vals => {
  const v = vals.filter(n => typeof n === 'number');
  return v.length ? round1(v.reduce((a, b) => a + b, 0) / v.length) : null;
};
const schedText = c => c.type === 'once' ? `РАЗОВАЯ · ${fmtDay(c.date)}` : (c.days || []).length === 7 ? 'ПРИВЫЧКА · КАЖДЫЙ ДЕНЬ' : `ПРИВЫЧКА · ${(c.days || []).slice().sort().map(d => WD[d]).join(' ')}`;
const THEMES = {
  classic: {
    name: 'Cyberpunk Classic',
    sub: 'Red / Cyan',
    main: '#FF4655',
    alt: '#00F0FF',
    warn: '#FCEE0A',
    bg1: '#18080C',
    bg2: '#0A0A0F',
    sel: ['#D9524C', '#F2906F']
  },
  gold: {
    name: 'Night City Gold',
    sub: 'Yellow / Cyan',
    main: '#FCEE0A',
    alt: '#00F0FF',
    warn: '#FF9F1C',
    bg1: '#161305',
    bg2: '#09090B',
    sel: ['#B7A800', '#E9DB4A'],
    selFg: '#0B0B10',
    selSub: '#6B1500'
  },
  bio: {
    name: 'Bio-Monitor',
    sub: 'Neon Green',
    main: '#3DFF6E',
    alt: '#C6FF3D',
    warn: '#E5FF00',
    bg1: '#04150A',
    bg2: '#040806',
    sel: ['#159A3E', '#47D873'],
    selFg: '#02110A',
    selSub: '#0A3A18'
  },
  arasaka: {
    name: 'Arasaka Corp',
    sub: 'Minimal Red / White',
    main: '#E8112D',
    alt: '#F4F4F4',
    warn: '#FFFFFF',
    bg1: '#111113',
    bg2: '#060607',
    sel: ['#9E0C1F', '#E8112D']
  }
};
const MONO_ACCENTS = [{
  id: 'lime',
  name: 'Лайм',
  c: '#B8FF00'
}, {
  id: 'mint',
  name: 'Мята',
  c: '#3DDC97'
}, {
  id: 'sky',
  name: 'Небо',
  c: '#4CB3FF'
}, {
  id: 'sun',
  name: 'Солнце',
  c: '#FFC83D'
}, {
  id: 'coral',
  name: 'Коралл',
  c: '#FF6B57'
}, {
  id: 'violet',
  name: 'Фиалка',
  c: '#A98BFF'
}];
const UI_STYLES = [{
  id: 'cyber',
  name: 'Cyberpunk',
  sub: 'Неон, рамки, глитч'
}, {
  id: 'mono',
  name: 'Моно',
  sub: 'Чёрный, скругления, стикеры'
}];
const DEFAULT_SETTINGS = {
  winStart: '21:00',
  winEnd: '23:59',
  retro: true,
  weekStart: 1,
  thr: {
    g: 4.5,
    l: 3.5,
    y: 2.5
  },
  ui: 'cyber',
  monoAccent: 'lime',
  theme: 'classic',
  scanlines: true,
  crt: true,
  glitch: true,
  sound: true,
  haptics: true,
  avatar: 'preset:m',
  avatarHolo: false,
  backupDays: 7
};
const SFX = {
  on: true,
  vib: true,
  soft: false,
  ctx: null
};
const VIBES = {
  click: 10,
  tab: 8,
  open: 12,
  close: 8,
  check: 22,
  uncheck: 12,
  score: 18,
  save: [18, 50, 28],
  error: [70, 50, 70]
};
function sfx(kind = 'click') {
  if (kind === 'none') return;
  const ua = navigator.userActivation;
  if (SFX.vib && (!ua || ua.isActive)) {
    try {
      if (navigator.vibrate) navigator.vibrate(VIBES[kind] || VIBES.click);
    } catch (e) {}
  }
  if (!SFX.on) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = SFX.ctx || (SFX.ctx = new AC());
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime;
    const tone = (f1, f2, dur, type = 'square', vol = 0.04, delay = 0) => {
      const o = ctx.createOscillator(),
        g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f1, t + delay);
      o.frequency.exponentialRampToValueAtTime(f2, t + delay + dur);
      g.gain.setValueAtTime(0.0001, t + delay);
      g.gain.exponentialRampToValueAtTime(vol, t + delay + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + delay + dur);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t + delay);
      o.stop(t + delay + dur + 0.03);
    };
    if (SFX.soft) {
      switch (kind) {
        case 'check':
          tone(660, 990, 0.07, 'sine', 0.06);
          tone(990, 1320, 0.08, 'sine', 0.05, 0.06);
          break;
        case 'uncheck':
          tone(700, 440, 0.08, 'sine', 0.05);
          break;
        case 'open':
          tone(440, 660, 0.09, 'sine', 0.045);
          break;
        case 'close':
          tone(660, 440, 0.08, 'sine', 0.04);
          break;
        case 'save':
          tone(523, 523, 0.08, 'sine', 0.06);
          tone(659, 659, 0.08, 'sine', 0.06, 0.08);
          tone(784, 784, 0.13, 'sine', 0.06, 0.16);
          break;
        case 'error':
          tone(320, 200, 0.18, 'triangle', 0.06);
          break;
        case 'tab':
          tone(880, 880, 0.035, 'sine', 0.045);
          break;
        case 'score':
          tone(740, 1000, 0.06, 'sine', 0.06);
          break;
        default:
          tone(1180, 1180, 0.03, 'sine', 0.045);
      }
      return;
    }
    switch (kind) {
      case 'check':
        tone(900, 1800, 0.05, 'square', 0.035);
        tone(1500, 2800, 0.07, 'triangle', 0.04, 0.045);
        break;
      case 'uncheck':
        tone(1700, 600, 0.08, 'square', 0.03);
        break;
      case 'open':
        tone(260, 1300, 0.12, 'sawtooth', 0.022);
        break;
      case 'close':
        tone(1300, 260, 0.1, 'sawtooth', 0.018);
        break;
      case 'save':
        tone(600, 900, 0.06, 'triangle', 0.05);
        tone(900, 1350, 0.06, 'triangle', 0.05, 0.07);
        tone(1350, 2100, 0.1, 'triangle', 0.05, 0.14);
        break;
      case 'error':
        tone(240, 90, 0.22, 'sawtooth', 0.05);
        break;
      case 'tab':
        tone(2300, 1200, 0.035, 'square', 0.028);
        break;
      case 'score':
        tone(1100, 1650, 0.05, 'triangle', 0.05);
        break;
      default:
        tone(2500, 1400, 0.03, 'square', 0.026);
    }
  } catch (e) {}
}
const IDB_NAME = 'cyberjournal2077-img';
const isIdb = v => typeof v === 'string' && v.startsWith('idb:');
const isInline = v => typeof v === 'string' && v.startsWith('data:image/');
const IMG = {
  p: null,
  urls: new Map()
};
function idbOpen() {
  if (!IMG.p) {
    IMG.p = new Promise((res, rej) => {
      if (!window.indexedDB) {
        rej(new Error('no-idb'));
        return;
      }
      const r = indexedDB.open(IDB_NAME, 1);
      r.onupgradeneeded = () => r.result.createObjectStore('img');
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    }).catch(e => {
      IMG.p = null;
      throw e;
    });
  }
  return IMG.p;
}
function idbTx(mode, fn) {
  return idbOpen().then(db => new Promise((res, rej) => {
    const tx = db.transaction('img', mode),
      out = {};
    fn(tx.objectStore('img'), out);
    tx.oncomplete = () => res(out.v);
    tx.onerror = tx.onabort = () => rej(tx.error);
  }));
}
const imgPut = entries => idbTx('readwrite', st => {
  const at = Date.now();
  entries.forEach(([id, blob]) => blob && st.put({
    blob,
    at
  }, id));
});
const imgGet = id => idbTx('readonly', (st, out) => {
  const r = st.get(id);
  r.onsuccess = () => {
    out.v = r.result ? r.result.blob : null;
  };
});
const imgDel = ids => idbTx('readwrite', st => ids.forEach(id => st.delete(id)));
const imgList = () => idbTx('readonly', (st, out) => {
  out.v = [];
  const r = st.openCursor();
  r.onsuccess = () => {
    const c = r.result;
    if (!c) return;
    out.v.push({
      id: c.key,
      size: c.value.blob && c.value.blob.size || 0,
      at: c.value.at || 0
    });
    c.continue();
  };
});
function dataURLToBlob(u) {
  const i = u.indexOf(',');
  const head = u.slice(5, i),
    b64 = /;base64/i.test(head);
  const type = head.split(';')[0] || 'application/octet-stream';
  if (!b64) return new Blob([decodeURIComponent(u.slice(i + 1))], {
    type
  });
  const bin = atob(u.slice(i + 1)),
    a = new Uint8Array(bin.length);
  for (let k = 0; k < bin.length; k++) a[k] = bin.charCodeAt(k);
  return new Blob([a], {
    type
  });
}
const blobToDataURL = b => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(r.result);
  r.onerror = rej;
  r.readAsDataURL(b);
});
function loadImage(blob) {
  return new Promise((res, rej) => {
    const u = URL.createObjectURL(blob),
      img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(u);
      res(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(u);
      rej(new Error('decode'));
    };
    img.src = u;
  });
}
function canvasBlob(img, maxDim, q) {
  const k = Math.min(1, maxDim / Math.max(img.width, img.height));
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(img.width * k));
  c.height = Math.max(1, Math.round(img.height * k));
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  const enc = type => new Promise(res => c.toBlob(res, type, q));
  return enc('image/webp').then(b => b && b.type === 'image/webp' ? b : enc('image/jpeg'));
}
const THUMB_DIM = 240;
async function makeThumb(img) {
  if (Math.max(img.width, img.height) <= THUMB_DIM * 1.5) return null;
  try {
    return await canvasBlob(img, THUMB_DIM, 0.75);
  } catch (e) {
    return null;
  }
}
async function storeImageFile(file, maxDim = 1080, q = 0.8) {
  const img = await loadImage(file);
  const full = await canvasBlob(img, maxDim, q);
  const id = uid('img');
  try {
    await imgPut([[id, full], [`${id}.t`, await makeThumb(img)]]);
    return `idb:${id}`;
  } catch (e) {
    return blobToDataURL(maxDim > 1080 || q > 0.8 ? await canvasBlob(img, 1080, 0.8) : full);
  }
}
async function storeInlineImage(u) {
  const blob = dataURLToBlob(u);
  let thumb = null;
  try {
    thumb = await makeThumb(await loadImage(blob));
  } catch (e) {}
  const id = uid('img');
  await imgPut([[id, blob], [`${id}.t`, thumb]]);
  return `idb:${id}`;
}
async function imgURL(id, thumb) {
  const key = thumb ? `${id}.t` : id;
  if (IMG.urls.has(key)) return IMG.urls.get(key);
  let blob = null;
  try {
    blob = await imgGet(key);
  } catch (e) {}
  if (!blob && thumb) return imgURL(id, false);
  const u = blob ? URL.createObjectURL(blob) : '';
  if (u) IMG.urls.set(key, u);
  return u;
}
function useImgSrc(v, thumb = false) {
  const id = isIdb(v) ? v.slice(4) : null;
  const cached = id ? IMG.urls.get(thumb ? `${id}.t` : id) : null;
  const [got, setGot] = useState(null);
  useEffect(() => {
    if (!id || cached) return undefined;
    let live = true;
    imgURL(id, thumb).then(u => {
      if (live) setGot({
        v,
        u
      });
    });
    return () => {
      live = false;
    };
  }, [v, thumb]);
  if (!id) return v || '';
  return cached || (got && got.v === v ? got.u : '');
}
function Img({
  src,
  thumb,
  ...rest
}) {
  const u = useImgSrc(src, thumb);
  return u ? React.createElement("img", _extends({
    src: u,
    alt: ""
  }, rest)) : React.createElement("div", _extends({}, rest, {
    style: {
      ...(rest.style || {}),
      background: 'rgba(255,255,255,.04)'
    }
  }));
}
function mapImages(d, fn) {
  const m = v => {
    if (!v) return v;
    const r = fn(v);
    return r === undefined ? v : r;
  };
  const avatar = d.settings.avatar;
  return {
    ...d,
    missions: d.missions.map(x => x.image ? {
      ...x,
      image: m(x.image)
    } : x),
    shards: d.shards.map(x => x.image ? {
      ...x,
      image: m(x.image)
    } : x),
    cards: d.cards.map(x => String(x.icon).startsWith('url:') ? {
      ...x,
      icon: `url:${m(x.icon.slice(4))}`
    } : x),
    timers: d.timers.map(x => x.bgUrl ? {
      ...x,
      bgUrl: m(x.bgUrl)
    } : x),
    focus: d.focus.bg ? {
      ...d.focus,
      bg: m(d.focus.bg)
    } : d.focus,
    settings: avatar && !String(avatar).startsWith('preset:') ? {
      ...d.settings,
      avatar: m(avatar)
    } : d.settings
  };
}
const listImages = d => {
  const out = [];
  mapImages(d, v => {
    out.push(v);
  });
  return out;
};
async function collectImages(d) {
  const ids = [...new Set(listImages(d).filter(isIdb).map(v => v.slice(4)))];
  const out = {};
  for (const id of ids) {
    for (const key of [id, `${id}.t`]) {
      let b = null;
      try {
        b = await imgGet(key);
      } catch (e) {}
      if (b) out[key] = await blobToDataURL(b);
    }
  }
  return out;
}
function demoMapImage() {
  const R = rng(2077);
  let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200"><rect width="320" height="200" fill="#1c0306"/>';
  s += '<g transform="rotate(-24 160 100)">';
  for (let i = 0; i < 9; i++) s += `<rect x="-60" y="${i * 34 - 40}" width="440" height="${2 + R() * 3}" fill="#2f6bd6" opacity="${0.5 + R() * 0.4}"/>`;
  for (let i = 0; i < 12; i++) s += `<rect x="${i * 38 - 40}" y="-60" width="${2 + R() * 2}" height="320" fill="#2f6bd6" opacity="${0.35 + R() * 0.4}"/>`;
  for (let i = 0; i < 90; i++) {
    const x = R() * 400 - 40,
      y = R() * 300 - 50,
      w = 6 + R() * 26,
      h = 6 + R() * 22;
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${R() > 0.3 ? '#c4121f' : '#ff4655'}" opacity="${(0.55 + R() * 0.45).toFixed(2)}"/>`;
  }
  s += '</g><circle cx="196" cy="92" r="7" fill="none" stroke="#00f0ff" stroke-width="2"/><circle cx="196" cy="92" r="2.5" fill="#00f0ff"/></svg>';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
}
const DEFAULT_SECTIONS = () => [{
  id: 'sec_main',
  name: 'MAIN JOBS',
  collapsed: false
}, {
  id: 'sec_side',
  name: 'SIDE JOBS',
  collapsed: false
}, {
  id: 'sec_gigs',
  name: 'GIGS',
  collapsed: false
}];
const DEFAULT_TAGS = () => [{
  id: 'tg_diary',
  name: 'дневник',
  color: '#FF4655'
}, {
  id: 'tg_thoughts',
  name: 'мысли',
  color: '#00F0FF'
}, {
  id: 'tg_goals',
  name: 'цели',
  color: '#FCEE0A'
}, {
  id: 'tg_summary',
  name: 'итоги',
  color: '#59FF00'
}];
const FOCUS_GOAL = 25;
const emptyFocus = () => ({
  sessions: [],
  inbox: [],
  goals: [{
    from: '2000-01-01',
    min: FOCUS_GOAL
  }],
  lastMin: 25,
  bg: '',
  bgDim: 'mid',
  active: null
});
const emptyState = () => ({
  v: 1,
  sections: DEFAULT_SECTIONS(),
  missions: [],
  shards: [],
  tags: DEFAULT_TAGS(),
  cards: [],
  ratings: {},
  timers: [],
  settings: {
    ...DEFAULT_SETTINGS,
    thr: {
      ...DEFAULT_SETTINGS.thr
    }
  },
  focus: emptyFocus(),
  meta: {
    retroIgnored: [],
    since: new Date().toISOString(),
    lastBackupAt: '',
    backupAskedOn: ''
  }
});
function normalizeFocus(f) {
  const out = {
    ...emptyFocus(),
    ...(f && typeof f === 'object' ? f : {})
  };
  if (!Array.isArray(out.sessions)) out.sessions = [];
  if (!Array.isArray(out.inbox)) out.inbox = [];
  if (!Array.isArray(out.goals) || !out.goals.length) out.goals = emptyFocus().goals;
  if (typeof out.bg !== 'string') out.bg = '';
  delete out.level;
  const a = out.active;
  out.active = a && typeof a === 'object' && a.startAt && a.endAt ? {
    distractions: 0,
    reasons: {},
    leaves: 0,
    away: 0,
    parked: [],
    stoppedAt: 0,
    ...a
  } : null;
  return out;
}
function normalize(d) {
  const base = emptyState();
  const out = {
    ...base,
    ...(d || {})
  };
  for (const k of ['sections', 'missions', 'shards', 'tags', 'cards', 'timers']) if (!Array.isArray(out[k])) out[k] = base[k];
  if (!out.ratings || typeof out.ratings !== 'object' || Array.isArray(out.ratings)) out.ratings = {};
  out.settings = {
    ...DEFAULT_SETTINGS,
    ...(d && d.settings || {}),
    thr: {
      ...DEFAULT_SETTINGS.thr,
      ...(d && d.settings && d.settings.thr || {})
    }
  };
  if (typeof (d && d.settings && d.settings.crt) !== 'boolean') out.settings.crt = out.settings.scanlines !== false;
  out.meta = {
    ...base.meta,
    ...(d && d.meta || {})
  };
  if (!Array.isArray(out.meta.retroIgnored)) out.meta.retroIgnored = [];
  out.focus = normalizeFocus(d && d.focus);
  out.v = 1;
  return out;
}
const step = (text, optional = false, done = false) => ({
  id: uid('st'),
  text,
  optional,
  done
});
const blankMission = sectionId => ({
  id: uid('m'),
  sectionId,
  title: '',
  status: 'DANGER: MODERATE',
  statusColor: '',
  alert: false,
  isNew: true,
  badge: {
    shape: 'diamond',
    text: 'NC',
    color: '#F5B83D'
  },
  steps: [step('')],
  image: '',
  imageCaption: '',
  holo: true,
  description: '',
  deadline: '',
  countdown: false,
  done: false,
  createdAt: new Date().toISOString()
});
const blankShard = () => ({
  id: uid('sh'),
  title: '',
  body: '',
  tags: [],
  image: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});
const blankCard = () => ({
  id: uid('c'),
  name: '',
  icon: 'st:star',
  iconColor: '#FCEE0A',
  iconFrame: 'oct',
  glow: '#3A1052',
  type: 'habit',
  days: [0, 1, 2, 3, 4, 5, 6],
  date: dKey(new Date()),
  criteria: {
    5: '',
    4: '',
    3: '',
    2: '',
    1: ''
  }
});
const blankTimer = () => {
  const n = new Date();
  n.setSeconds(0, 0);
  const t = addDays(n, 7);
  t.setHours(12, 0, 0, 0);
  return {
    id: uid('t'),
    title: '',
    sub: '',
    mode: 'to',
    start: toLocalInput(n),
    target: toLocalInput(t),
    bg: 'smoke',
    bgUrl: '',
    font: 'bebas',
    accent: '#FF4655'
  };
};
function makeDemo() {
  const now = new Date();
  const at = (days, h, m = 0) => {
    const d = addDays(now, days);
    d.setHours(h, m, 0, 0);
    return d;
  };
  const st = emptyState();
  st.sections = [...DEFAULT_SECTIONS(), {
    id: 'sec_psycho',
    name: 'CYBERPSYCHO SIGHTING',
    collapsed: true
  }];
  const corpoDeadline = toLocalInput(at(5, 9));
  st.missions = [{
    ...blankMission('sec_main'),
    id: 'm_space',
    title: 'THE SPACE IN BETWEEN',
    status: 'DANGER: MODERATE',
    alert: true,
    isNew: false,
    badge: {
      shape: 'diamond',
      text: 'WB',
      color: '#F5B83D'
    },
    steps: [step('Встретиться с Мисти у «Эзотерики»', false, true), step('Поговорить с Виктором о биочипе'), step('Осмотреть квартиру Джеки', true)],
    description: 'После провала в «Компеки Плаза» в голове тикает таймер. Нужно найти тех, кто разбирается в биочипах, и понять, сколько времени осталось.\n\nМисти знает, где искать Вика — начни с неё. Не торопись с выводами: в Найт-Сити каждый ответ стоит эдди, а каждая ошибка — дороже.',
    createdAt: at(-6, 10).toISOString()
  }, {
    ...blankMission('sec_main'),
    id: 'm_down',
    title: 'DOWN ON THE STREET',
    status: 'DANGER: HIGH',
    statusColor: '#FF8A3D',
    isNew: false,
    badge: {
      shape: 'diamond',
      text: 'WB',
      color: '#F5B83D'
    },
    steps: [step('Дождаться звонка Такэмуры'), step('Прийти на встречу в Джапантаун'), step('Не привлекать внимания', true)],
    description: 'Такэмура хочет выйти на связь. Встреча на рынке в Джапантауне — людно, шумно, удобно для тех, кто не любит лишних глаз. Держи оружие под рукой и не задавай лишних вопросов.',
    createdAt: at(-5, 12).toISOString()
  }, {
    ...blankMission('sec_main'),
    id: 'm_ghost',
    title: 'GHOST TOWN',
    status: 'DANGER: MODERATE',
    isNew: false,
    badge: {
      shape: 'square',
      text: 'WATSON',
      color: '#E0262E'
    },
    steps: [step('Встретиться с Панам в пустошах'), step('Проверить машину и заправиться'), step('Захватить пару гранат', true)],
    description: 'Панам ждёт за городом. Дорога долгая, а договор с кочевниками держится на честном слове. Подготовься заранее — в пустошах заправок нет.',
    createdAt: at(-4, 9).toISOString()
  }, {
    ...blankMission('sec_main'),
    id: 'm_corpo',
    title: 'THE CORPO-RAT',
    status: 'DANGER: MODERATE',
    alert: true,
    isNew: true,
    badge: {
      shape: 'triangle',
      text: 'N',
      color: '#FFFFFF'
    },
    steps: [step('Прочитать отчёт на личном терминале', true), step('Сесть в AV Дженкинса')],
    image: demoMapImage(),
    imageCaption: 'AV',
    holo: true,
    description: 'Утро начинается с отчёта на личном терминале — сводка по объекту ждёт с ночи. Дженкинс дал понять: работа грязная, но если сделать её чисто, повышение у тебя в кармане.\n\nAV уже на крыше, взлёт через пятнадцать минут. Корпорации не прощают опозданий, а Арасака не прощает ничего.\n\nПомни: в этой башне каждый играет за свою команду. Доверяй только данным, которые проверил сам. Записывай всё, что видишь, — однажды это может спасти тебе жизнь. Или карьеру. В Найт-Сити разница невелика.',
    deadline: corpoDeadline,
    countdown: true,
    createdAt: at(-1, 8).toISOString()
  }, {
    ...blankMission('sec_side'),
    id: 'm_eng',
    title: 'ПРОКАЧАТЬ АНГЛИЙСКИЙ',
    status: 'DANGER: LOW',
    statusColor: '#00F0FF',
    isNew: false,
    badge: {
      shape: 'square',
      text: 'EDU',
      color: '#00A8C6'
    },
    steps: [step('20 минут Anki каждый день', false, true), step('Посмотреть доклад без субтитров'), step('Написать пост на английском', true)],
    description: 'Цель — свободно читать техническую документацию и смотреть доклады без субтитров. Маленькими шагами, но без пропусков.',
    createdAt: at(-9, 19).toISOString()
  }, {
    ...blankMission('sec_gigs'),
    id: 'm_laptop',
    title: 'ПРОДАТЬ СТАРЫЙ НОУТБУК',
    status: 'REWARD: 15 000 €$',
    statusColor: '#59FF00',
    isNew: false,
    badge: {
      shape: 'circle',
      text: '€$',
      color: '#59FF00'
    },
    steps: [step('Сбросить систему и сделать фото'), step('Выставить объявление'), step('Встретиться с покупателем')],
    description: 'Минимальная цена — 15 000 €$. Торг уместен, обмен на импланты не предлагать.',
    createdAt: at(-2, 14).toISOString()
  }, {
    ...blankMission('sec_main'),
    id: 'm_pickup',
    title: 'THE PICKUP',
    status: 'DANGER: HIGH',
    statusColor: '#FF8A3D',
    isNew: false,
    badge: {
      shape: 'diamond',
      text: 'WB',
      color: '#F5B83D'
    },
    steps: [step('Встретиться с Декстером', false, true), step('Забрать бота у Мальстрёма', false, true), step('Воспользоваться чипом Militech', true, true)],
    description: 'Контракт закрыт: робот у нас, Мальстрём остался без товара. Декстер доволен, а значит, следующий заказ не заставит себя ждать.',
    done: true,
    completedAt: at(-3, 21, 40).toISOString(),
    createdAt: at(-8, 11).toISOString()
  }, {
    ...blankMission('sec_side'),
    id: 'm_gym',
    title: 'ОФОРМИТЬ АБОНЕМЕНТ В ЗАЛ',
    status: 'DANGER: LOW',
    statusColor: '#00F0FF',
    isNew: false,
    badge: {
      shape: 'square',
      text: 'GYM',
      color: '#00A8C6'
    },
    steps: [step('Выбрать зал рядом с домом', false, true), step('Оплатить абонемент на 3 месяца', false, true)],
    description: 'Абонемент оплачен до конца квартала. Теперь главное — не превращать его в пожертвование.',
    done: true,
    completedAt: at(-6, 18, 5).toISOString(),
    createdAt: at(-10, 9).toISOString()
  }];
  st.shards = [{
    ...blankShard(),
    id: 'sh_1',
    title: 'Первая запись в журнале',
    tags: ['tg_diary'],
    body: 'Запускаю новый протокол: каждый день — миссии, вечером — честная оценка по карточкам.\n\nСмысл не в идеальных пятёрках, а в том, чтобы видеть картину целиком. Календарь не врёт: если кольца желтеют, значит, пора что-то менять.',
    createdAt: at(-12, 22, 14).toISOString(),
    updatedAt: at(-12, 22, 14).toISOString()
  }, {
    ...blankShard(),
    id: 'sh_2',
    title: 'Мысли о дисциплине',
    tags: ['tg_thoughts'],
    body: 'Мотивация — это заряд батареи: кончается в самый неподходящий момент. Дисциплина — это кабель от сети.\n\nЗаметил: если вечером записать три главные миссии на завтра, утро начинается без раскачки. Попробую держать это правило неделю.',
    createdAt: at(-7, 23, 2).toISOString(),
    updatedAt: at(-7, 23, 2).toISOString()
  }, {
    ...blankShard(),
    id: 'sh_3',
    title: `Цели на ${MONTHS[now.getMonth()].toLowerCase()}`,
    tags: ['tg_goals', 'tg_diary'],
    body: '1. Средний балл за месяц — не ниже 4.0.\n2. Ни одного дня с кольцом красного цвета.\n3. Закрыть миссию THE CORPO-RAT до дедлайна.\n4. Читать по 20 страниц в день.\n5. Спать не меньше восьми часов хотя бы пять дней в неделю.',
    createdAt: at(-14, 10, 30).toISOString(),
    updatedAt: at(-3, 9, 12).toISOString()
  }];
  st.cards = [{
    id: 'card_food',
    name: 'Питание',
    icon: 'st:donut',
    iconColor: '#FCEE0A',
    iconFrame: 'oct',
    glow: '#5E4A00',
    type: 'habit',
    days: [0, 1, 2, 3, 4, 5, 6],
    date: dKey(now),
    criteria: {
      5: '2 приема пищи, небольшие порции, здоровое питание',
      4: '3 приема пищи, здоровое питание',
      3: 'Фастфуд, сладости, без переедания',
      2: 'Переедание здоровой пищей',
      1: 'Переедание, фастфуд, сладости'
    }
  }, {
    id: 'card_sleep',
    name: 'Режим сна',
    icon: 'st:sleep',
    iconColor: '#00F0FF',
    iconFrame: 'hex',
    glow: '#0F3B52',
    type: 'habit',
    days: [0, 1, 2, 3, 4, 5, 6],
    date: dKey(now),
    criteria: {
      5: 'Спал ≥8 часов и встал до 11:00',
      4: 'Спал ≥8 часов, но проснулся позже 11:00',
      3: 'Спал 6–8 часов, но встал до 11:00',
      2: 'Спал 6–8 часов, но встал позже 11:00',
      1: 'Спал <6 часов'
    }
  }, {
    id: 'card_train',
    name: 'Тренировка',
    icon: 'st:dumbbell',
    iconColor: '#B98CF0',
    iconFrame: 'shield',
    glow: '#3A1052',
    type: 'habit',
    days: [0, 2, 4],
    date: dKey(now),
    criteria: {
      5: 'Полная тренировка 60+ минут',
      4: 'Тренировка 40–60 минут',
      3: 'Лёгкая активность 20–40 минут',
      2: 'Только разминка или прогулка',
      1: 'Тренировка пропущена'
    }
  }];
  const food = [4, 5, 3, 2, 5, 4, 5, 5, 4, 3, 5, 5, 4, 5, 4, 5];
  const sleep = [3, 4, 4, 2, 3, 5, 4, 5, 5, 4, 4, 5, 5, 4, 3, 4];
  const train = [5, 4, 3, 1, 4, 5, 5, 4, null, 5, 4, 5, 5, 4, 5, 3];
  const notes = {
    1: 'Ровный день. Без сладкого, лёг вовремя — завтра держу темп.',
    5: 'Сорвался на фастфуд вечером, но режим сна вытянул.',
    13: 'Плохо спал, весь день как в тумане. Нужно убрать телефон из спальни.'
  };
  for (let i = 16; i >= 1; i--) {
    const k = dKey(addDays(now, -i)),
      idx = 16 - i;
    const scores = {};
    for (const c of activeCards(st.cards, k)) {
      const v = c.id === 'card_food' ? food[idx] : c.id === 'card_sleep' ? sleep[idx] : train[idx];
      scores[c.id] = {
        score: v,
        name: c.name
      };
    }
    st.ratings[k] = {
      scores,
      note: notes[i] || '',
      avg: calcAvg(Object.values(scores).map(s => s.score)),
      at: at(-i, 22).toISOString()
    };
  }
  const y = dKey(addDays(now, -1));
  st.shards.push({
    ...blankShard(),
    id: 'sh_4',
    title: `Итог дня — ${fmtDay(y)}`,
    tags: ['tg_summary', 'tg_diary'],
    dayKey: y,
    body: `${notes[1]}\n\nСредний балл: ${st.ratings[y].avg.toFixed(1)} / 5`,
    createdAt: at(-1, 22, 41).toISOString(),
    updatedAt: at(-1, 22, 41).toISOString()
  });
  const release = new Date(now.getTime() + (2 * 24 + 10) * 3600e3);
  release.setMinutes(0, 0, 0);
  const ny = new Date(now.getFullYear() + 1, 0, 1, 0, 0);
  st.timers = [{
    id: 't_release',
    title: 'РЕЛИЗ АЛЬБОМА',
    sub: 'NEON TEARS // ITUNES · SPOTIFY',
    mode: 'to',
    start: toLocalInput(at(-12, 12)),
    target: toLocalInput(release),
    bg: 'smoke',
    bgUrl: '',
    font: 'bebas',
    accent: '#FF2E63'
  }, {
    id: 't_corpo',
    title: 'THE CORPO-RAT',
    sub: 'ДЕДЛАЙН МИССИИ',
    mode: 'to',
    start: toLocalInput(at(-1, 8)),
    target: corpoDeadline,
    bg: 'grid',
    bgUrl: '',
    font: 'orbitron',
    accent: '#00F0FF',
    missionId: 'm_corpo'
  }, {
    id: 't_sugar',
    title: 'БЕЗ САХАРА',
    sub: 'СТРИК ЧИСТОГО ПИТАНИЯ',
    mode: 'since',
    start: '',
    target: toLocalInput(at(-47, 8)),
    bg: 'matrix',
    bgUrl: '',
    font: 'mono',
    accent: '#39FF6A'
  }, {
    id: 't_ny',
    title: `НОВЫЙ ${now.getFullYear() + 1} ГОД`,
    sub: 'NIGHT CITY // NEW YEAR',
    mode: 'to',
    start: toLocalInput(new Date(now.getFullYear(), 0, 1)),
    target: toLocalInput(ny),
    bg: 'city',
    bgUrl: '',
    font: 'oswald',
    accent: '#FCEE0A'
  }];
  const fs = (days, h, missionId, title, goal, planMin, min, distractions, reasons, leaves, score) => ({
    id: uid('fs'),
    missionId,
    title,
    goal,
    start: at(days, h).toISOString(),
    planMin,
    ms: min * 60e3,
    away: 0,
    distractions,
    reasons,
    leaves,
    score,
    completed: min >= planMin,
    goalDone: score >= 4
  });
  st.focus = {
    ...emptyFocus(),
    sessions: [fs(-6, 10, 'm_eng', 'ПРОКАЧАТЬ АНГЛИЙСКИЙ', 'Разобрать 20 новых слов', 15, 15, 2, {
      mind: 1
    }, 0, 4), fs(-5, 19, 'm_corpo', 'THE CORPO-RAT', 'Черновик отчёта', 15, 15, 5, {
      phone: 3,
      noise: 1
    }, 2, 2), fs(-4, 11, 'm_eng', 'ПРОКАЧАТЬ АНГЛИЙСКИЙ', 'Подкаст + конспект', 15, 15, 1, {
      mind: 1
    }, 0, 5), fs(-3, 18, 'm_corpo', 'THE CORPO-RAT', 'Собрать цифры для отчёта', 20, 20, 3, {
      phone: 2
    }, 0, 4), fs(-2, 10, '', '', 'Прочитать главу книги', 20, 20, 2, {
      mind: 2
    }, 0, 4), fs(-1, 20, 'm_corpo', 'THE CORPO-RAT', 'Финальная правка отчёта', 20, 20, 4, {
      tired: 2,
      phone: 1
    }, 1, 3)],
    goals: [{
      from: '2000-01-01',
      min: 15
    }],
    lastMin: 20,
    inbox: [{
      id: uid('fi'),
      text: 'Купить кабель USB-C',
      at: at(-1, 20, 7).toISOString()
    }]
  };
  return st;
}
function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return normalize(JSON.parse(raw));
    if (BETA) {
      const main = localStorage.getItem(MAIN_KEY);
      const d = main ? normalize(JSON.parse(main)) : makeDemo();
      return {
        ...d,
        settings: {
          ...d.settings,
          ui: 'mono'
        }
      };
    }
  } catch (e) {}
  return makeDemo();
}
const AT_KEY = `${LS_KEY}.at`;
const getLocalAt = () => {
  try {
    return localStorage.getItem(AT_KEY) || '';
  } catch (e) {
    return '';
  }
};
const setLocalAt = v => {
  try {
    localStorage.setItem(AT_KEY, v);
  } catch (e) {}
};
async function claudeCap(name) {
  try {
    return window.claude && window.claude.use ? await window.claude.use(name) : null;
  } catch (e) {
    return null;
  }
}
async function saveFile(filename, text) {
  const dl = await claudeCap('downloads');
  if (dl) {
    try {
      await dl.save({
        filename,
        data: text
      });
      return 'saved';
    } catch (e) {
      return e && e.code === 'declined' ? 'declined' : 'error';
    }
  }
  try {
    const url = URL.createObjectURL(new Blob([text], {
      type: 'application/json'
    }));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
    return 'saved';
  } catch (e) {
    return 'error';
  }
}
const backupText = async (data, pretty = true) => {
  let images = {};
  try {
    images = await collectImages(data);
  } catch (e) {}
  return JSON.stringify({
    app: 'cyberjournal2077',
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    data,
    images
  }, null, pretty ? 2 : 0);
};
const exportBackup = async data => saveFile(`cyberjournal-backup-${dKey(new Date())}.json`, await backupText(data));
const canShareFiles = () => {
  try {
    return !window.claude && !!navigator.canShare && navigator.canShare({
      files: [new File(['{}'], 'a.txt', {
        type: 'text/plain'
      })]
    });
  } catch (e) {
    return false;
  }
};
async function sendBackup(data, ask) {
  if (!canShareFiles()) return exportBackup(data);
  const file = new File([await backupText(data, false)], `cyberjournal-backup-${dKey(new Date())}.txt`, {
    type: 'text/plain'
  });
  const share = async () => {
    try {
      await navigator.share({
        files: [file],
        title: 'CyberJournal · бэкап'
      });
      return 'saved';
    } catch (e) {
      return e && e.name === 'AbortError' ? 'declined' : e && e.name === 'NotAllowedError' ? 'again' : 'error';
    }
  };
  let res = await share();
  if (res === 'again') res = (await ask({
    title: 'Бэкап готов',
    code: 'SYS // BACKUP.SHARE',
    text: 'Файл собран. Нажми «Отправить» и выбери, куда сохранить: Telegram, Google Диск и т. п.',
    ok: 'Отправить'
  })) === true ? await share() : 'declined';
  return res === 'again' ? 'error' : res;
}
const hasContent = d => d.missions.length + d.shards.length + d.timers.length + Object.keys(d.ratings).length + d.focus.sessions.length > 0;
const daysSince = iso => {
  const t = Date.parse(iso);
  return isNaN(t) ? Infinity : Math.floor((Date.now() - t) / 864e5);
};
async function storagePersisted(request) {
  try {
    const s = navigator.storage;
    if (!s || !s.persisted) return null;
    if (await s.persisted()) return true;
    return request && s.persist ? await s.persist() : false;
  } catch (e) {
    return null;
  }
}
const CLOUD_CHUNK = 90000;
async function cloudPull(c) {
  const meta = await c.db.doc(`${c.base}/meta`).get();
  if (!meta.exists) return null;
  const m = meta.data();
  const parts = [];
  for (let i = 0; i < m.n; i++) {
    const s = await c.db.doc(`${c.base}/c${i}`).get();
    parts.push(s.exists ? s.data().p : '');
  }
  const json = parts.join('');
  try {
    return {
      savedAt: m.savedAt || '',
      n: m.n,
      parts,
      data: JSON.parse(json)
    };
  } catch (e) {
    return null;
  }
}
const CSS = `
.cj-root{font-family:'Rajdhani','Exo 2',system-ui,sans-serif;color:#ECE6E9;background:radial-gradient(130% 70% at 50% -10%,var(--bg1) 0%,var(--bg2) 75%);-webkit-tap-highlight-color:transparent;-webkit-font-smoothing:antialiased;height:100%;overflow:hidden;position:relative;}
.cj-root *{box-sizing:border-box;}
.cj-root button{font-family:inherit;cursor:pointer;}
.cj-root input,.cj-root textarea,.cj-root select{font-family:'Exo 2','Rajdhani',sans-serif;}
.f-mono{font-family:'Share Tech Mono','JetBrains Mono',ui-monospace,monospace;}
.f-disp{font-family:'Oswald','Bebas Neue',sans-serif;}
.f-orb{font-family:'Orbitron','Russo One',sans-serif;}
.f-unb{font-family:'Unbounded','Russo One',sans-serif;}
.f-inter{font-family:'Inter',system-ui,sans-serif;}
.f-read{font-family:'Exo 2','Inter',sans-serif;}
.noscb::-webkit-scrollbar{display:none}.noscb{scrollbar-width:none}
.cut{--c:var(--cut,12px);clip-path:polygon(0 0,calc(100% - var(--c)) 0,100% var(--c),100% 100%,var(--c) 100%,0 calc(100% - var(--c)));}
.cut-tr{--c:var(--cut,12px);clip-path:polygon(0 0,calc(100% - var(--c)) 0,100% var(--c),100% 100%,0 100%);}
.cut-br{--c:var(--cut,12px);clip-path:polygon(0 0,100% 0,100% calc(100% - var(--c)),calc(100% - var(--c)) 100%,0 100%);}
.frame{padding:1px;background:var(--fc,rgba(var(--main-rgb),.5));}
.frame-in{background:var(--fb,linear-gradient(180deg,rgba(24,13,26,.95),rgba(12,9,18,.95)));height:100%;}
.micro{font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:rgba(var(--main-rgb),.6);}
.lbl{display:block;font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(var(--alt-rgb),.8);margin-bottom:6px;}
.h1{font-weight:700;font-size:27px;line-height:1.05;letter-spacing:.06em;text-transform:uppercase;color:var(--main);text-shadow:0 0 12px rgba(var(--main-rgb),.55);}
.hdr-line{position:relative;height:1px;margin-top:10px;background:rgba(var(--main-rgb),.55);box-shadow:0 0 8px rgba(var(--main-rgb),.6);}
.hdr-line::before{content:'';position:absolute;left:0;top:-1px;height:3px;width:30%;background:var(--alt);box-shadow:0 0 10px var(--alt);}
.hdr-line::after{content:'';position:absolute;right:0;top:-4px;width:7px;height:7px;border:1px solid var(--main);transform:rotate(45deg);background:var(--bg2);}
.txt-main{color:var(--main)}.txt-alt{color:var(--alt)}.txt-warn{color:var(--warn)}
.glow-main{text-shadow:0 0 8px rgba(var(--main-rgb),.6);}
.glow-alt{text-shadow:0 0 8px rgba(var(--alt-rgb),.55);}
.inp{width:100%;display:block;background:rgba(0,0,0,.45);border:1px solid rgba(var(--main-rgb),.35);color:#F3EEF1;padding:10px 12px;font-size:16px;outline:none;border-radius:0;transition:border-color .15s,box-shadow .15s;}
.inp::placeholder{color:rgba(255,255,255,.3);}
.inp:focus{border-color:var(--alt);box-shadow:0 0 0 1px rgba(var(--alt-rgb),.35),0 0 16px rgba(var(--alt-rgb),.18);}
textarea.inp{resize:vertical;line-height:1.5;}
.inp[type=time],.inp[type=date],.inp[type=datetime-local],.inp[type=number]{color-scheme:dark;}
.btn{--cut:9px;display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:12px 16px;font-weight:700;font-size:14px;letter-spacing:.1em;text-transform:uppercase;background:var(--b-bg);color:var(--b-fg);box-shadow:inset 0 0 0 1px var(--b-bd);transition:transform .08s,filter .15s;line-height:1.05;}
.btn:active{transform:scale(.97);filter:brightness(1.25);}
.btn:disabled{opacity:.35;pointer-events:none;}
.btn-sm{padding:9px 11px;font-size:12px;--cut:7px;gap:5px;}
.icon-btn{--cut:8px;display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;flex-shrink:0;color:var(--alt);background:rgba(var(--alt-rgb),.07);box-shadow:inset 0 0 0 1px rgba(var(--alt-rgb),.38);}
.icon-btn:active{filter:brightness(1.5);}
.icon-btn.sm{width:32px;height:32px;--cut:6px;}
.icon-btn.red{color:#FF5A5A;background:rgba(255,42,42,.08);box-shadow:inset 0 0 0 1px rgba(255,42,42,.45);}
.tg{--cut:7px;position:relative;flex-shrink:0;width:48px;height:26px;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.22);transition:background .2s;}
.tg>i{position:absolute;top:4px;left:4px;width:18px;height:18px;background:rgba(255,255,255,.35);transition:left .18s,background .18s;}
.tg.on{background:rgba(var(--alt-rgb),.16);box-shadow:inset 0 0 0 1px var(--alt);}
.tg.on>i{left:26px;background:var(--alt);box-shadow:0 0 10px var(--alt);}
.seg{--cut:10px;display:flex;gap:3px;padding:3px;background:rgba(0,0,0,.45);box-shadow:inset 0 0 0 1px rgba(255,255,255,.13);}
.seg-b{--cut:8px;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:10px 6px;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.55);transition:color .15s;}
.seg-b.on{background:var(--sa);color:#08080b;}
.modal-bg{background:rgba(3,2,6,.8);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);animation:fadein .18s ease-out;}
.modal-panel{background:linear-gradient(180deg,var(--bg1),var(--bg2) 60%);border-top:1px solid var(--main);box-shadow:0 -10px 40px rgba(var(--main-rgb),.25);animation:sheetin .22s cubic-bezier(.2,.9,.3,1);}
.modal-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:14px 16px 12px;border-bottom:1px solid rgba(var(--main-rgb),.35);}
.modal-title{font-size:21px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--main);text-shadow:0 0 10px rgba(var(--main-rgb),.5);line-height:1.1;}
.modal-foot{display:flex;gap:8px;padding:12px 16px calc(12px + env(safe-area-inset-bottom));border-top:1px solid rgba(var(--main-rgb),.25);background:rgba(0,0,0,.35);}
@keyframes fadein{from{opacity:0}to{opacity:1}}
@keyframes sheetin{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}
@keyframes dlgin{0%{transform:scale(.94);opacity:0;filter:hue-rotate(90deg)}60%{filter:none}100%{transform:none;opacity:1}}
.dlg-in{animation:dlgin .22s ease-out;}
.sheet-item{display:flex;align-items:center;gap:12px;width:100%;padding:14px 12px;font-size:16px;font-weight:600;letter-spacing:.04em;color:#EDE7EA;text-align:left;border-bottom:1px solid rgba(255,255,255,.06);}
.sheet-item:last-child{border-bottom:0}
.sheet-item:active{background:rgba(var(--main-rgb),.15);}
.sheet-item.danger{color:#FF5A5A;}
.sheet-item:disabled{opacity:.3}
.toast{position:fixed;left:50%;bottom:calc(84px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:300;max-width:92vw;padding:10px 16px;--cut:8px;background:rgba(6,6,10,.95);color:var(--alt);box-shadow:inset 0 0 0 1px var(--alt),0 0 20px rgba(var(--alt-rgb),.3);font-weight:700;letter-spacing:.1em;font-size:13px;text-transform:uppercase;animation:toastin .25s ease-out;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.toast-act{display:flex;align-items:center;gap:12px;padding:6px 6px 6px 14px;}
.toast-msg{min-width:0;overflow:hidden;text-overflow:ellipsis;}
.toast-btn{flex-shrink:0;display:inline-flex;align-items:center;gap:5px;--cut:6px;padding:7px 10px;background:var(--warn);color:#0a0a0f;font:inherit;font-size:12px;letter-spacing:.08em;text-transform:uppercase;}
@keyframes toastin{0%{opacity:0;transform:translate(-50%,10px)}30%{opacity:1;transform:translate(calc(-50% + 3px),0)}45%{transform:translate(calc(-50% - 3px),0)}60%{transform:translate(-50%,0)}}
/* сканлайны / ЭЛТ */
.scan,.crt{position:fixed;inset:0;pointer-events:none;z-index:250;}
.scan{background:repeating-linear-gradient(0deg,rgba(0,0,0,.2) 0,rgba(0,0,0,.2) 1px,transparent 1px,transparent 3px);}
.crt,.crt-on .scan{animation:flick 7s infinite steps(1);}
.crt::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 58%,rgba(0,0,0,.5) 100%);}
@keyframes flick{0%,100%{opacity:1}43%{opacity:.82}44%{opacity:1}88%{opacity:.9}89%{opacity:1}}
/* глитч */
.glitch{position:relative;display:inline-block;}
.fx-glitch .glitch::before,.fx-glitch .glitch::after{content:attr(data-text);position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;text-shadow:none;white-space:nowrap;}
.fx-glitch .glitch::before{color:var(--alt);animation:gl1 4.5s infinite steps(1);clip-path:inset(0 0 100% 0);}
.fx-glitch .glitch::after{color:var(--warn);animation:gl2 4.5s infinite steps(1);clip-path:inset(100% 0 0 0);}
@keyframes gl1{0%,89%,100%{clip-path:inset(0 0 100% 0);transform:none}90%{clip-path:inset(8% 0 62% 0);transform:translate(-3px,0)}92%{clip-path:inset(54% 0 18% 0);transform:translate(2px,0)}94%{clip-path:inset(30% 0 44% 0);transform:translate(-2px,0)}96%{clip-path:inset(0 0 100% 0)}}
@keyframes gl2{0%,89%,100%{clip-path:inset(100% 0 0 0);transform:none}91%{clip-path:inset(66% 0 8% 0);transform:translate(3px,0)}93%{clip-path:inset(18% 0 64% 0);transform:translate(-3px,0)}95%{clip-path:inset(78% 0 4% 0);transform:translate(2px,0)}97%{clip-path:inset(100% 0 0 0)}}
.fx-glitch .gbox{animation:gbox 7s infinite steps(1);}
@keyframes gbox{0%,93%,100%{transform:none;filter:none}94%{transform:translate(2px,-1px) skewX(-3deg);filter:hue-rotate(40deg)}95%{transform:translate(-2px,1px)}96%{transform:none;filter:none}}
/* миссии */
.sec-title{font-size:20px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--main);text-shadow:0 0 10px rgba(var(--main-rgb),.55);line-height:1;}
.m-title{font-size:19px;font-weight:600;letter-spacing:.03em;text-transform:uppercase;color:var(--alt);line-height:1.08;text-shadow:0 0 8px rgba(var(--alt-rgb),.45);}
.m-status{font-size:15px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-top:7px;line-height:1;}
.alert-tag{position:absolute;left:-10px;top:-7px;z-index:2;width:21px;height:24px;background:var(--warn);color:#111;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:15px;clip-path:polygon(0 0,100% 0,100% 74%,50% 100%,0 74%);}
.new-tag{font-family:'Share Tech Mono',monospace;font-size:9px;padding:1px 4px;border:1px solid rgba(255,255,255,.5);color:rgba(255,255,255,.85);letter-spacing:.1em;}
.step-box{width:22px;height:22px;flex-shrink:0;border:1.5px solid rgba(var(--main-rgb),.55);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;margin-top:1px;}
.step-box.cur{background:var(--warn);border-color:var(--warn);color:#111;}
.step-box.done{background:rgba(var(--alt-rgb),.14);border-color:var(--alt);color:var(--alt);}
.desc{color:rgba(var(--main-rgb),1);filter:brightness(1.15);font-size:16px;line-height:1.6;white-space:pre-wrap;font-family:'Exo 2','Rajdhani',sans-serif;}
.neon-track{position:absolute;right:2px;top:0;bottom:0;width:3px;background:rgba(var(--main-rgb),.18);}
.neon-thumb{position:absolute;left:-1px;width:5px;background:var(--main);box-shadow:0 0 8px var(--main),0 0 16px rgba(var(--main-rgb),.6);transition:top .05s;}
.holo{position:relative;overflow:hidden;}
.holo img{filter:grayscale(1) sepia(1) hue-rotate(-45deg) saturate(5) contrast(1.1) brightness(.85);}
.holo::after{content:'';position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(var(--main-rgb),.22) 0,rgba(var(--main-rgb),.22) 1px,transparent 1px,transparent 3px),linear-gradient(180deg,rgba(var(--main-rgb),.15),transparent 60%,rgba(var(--main-rgb),.2));mix-blend-mode:screen;animation:holo 3s infinite steps(1);}
@keyframes holo{0%,100%{opacity:1}50%{opacity:.7}51%{opacity:1}}
.tag{display:inline-flex;align-items:center;gap:3px;font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.05em;padding:3px 8px;color:var(--tc);box-shadow:inset 0 0 0 1px var(--tc);background:rgba(0,0,0,.35);white-space:nowrap;}
.tag.on{background:var(--tc);color:#0a0a0f;}
.plus-btn{--cut:10px;width:46px;height:46px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--main);color:#0a0a0f;}
.plus-btn:active{filter:brightness(1.3);}
.done-stamp{font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.14em;color:var(--alt);box-shadow:inset 0 0 0 1px var(--alt);padding:2px 5px;}
/* навигация */
.nav{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));background:linear-gradient(180deg,rgba(10,8,14,.94),rgba(5,4,8,.99));border-top:1px solid rgba(var(--main-rgb),.45);box-shadow:0 -6px 24px rgba(var(--main-rgb),.14);position:relative;z-index:20;}
.nav-b{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:9px 2px 8px;color:rgba(255,255,255,.42);}
.nav-b .nl{font-size:11px;font-weight:700;letter-spacing:.03em;line-height:1;white-space:nowrap;}
.nav-b .ns{font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:.08em;opacity:.75;line-height:1;white-space:nowrap;}
.nav-b.on{color:var(--main);text-shadow:0 0 8px rgba(var(--main-rgb),.7);}
.nav-b.on::before{content:'';position:absolute;top:-1px;left:22%;right:22%;height:3px;background:var(--main);box-shadow:0 0 12px var(--main);}
.nav-b.on svg{filter:drop-shadow(0 0 5px var(--main));}
/* Переход между вкладками: видимые блоки экрана проявляются по очереди (класс и задержку ставит App).
   Используется translate, а не transform, и нет clip-path — чтобы не сбивать -translate-* и скошенные углы .cut.
   fill-mode backwards — после анимации ничего не остаётся. */
.cj-rise{animation:cjrise .34s cubic-bezier(.25,.8,.35,1) backwards;}
@keyframes cjrise{
  0%{opacity:0;translate:0 8px;filter:grayscale(.85) brightness(1.25);}
  60%{opacity:1;filter:none;}
  100%{opacity:1;translate:0 0;}
}
.nav-b.on::before{animation:navon .3s ease-out backwards;}
@keyframes navon{from{opacity:0;transform:scaleX(.2)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.cj-rise,.nav-b.on::before{animation:none;}}
/* статистика */
.st-score{font-family:'Orbitron','Russo One',sans-serif;font-weight:900;line-height:1;letter-spacing:.02em;font-variant-numeric:tabular-nums;}
.seg-bar{display:grid;grid-template-columns:repeat(10,1fr);gap:4px;}
.seg-bar i{display:block;height:7px;background:rgba(255,255,255,.08);transform:skewX(-24deg);}
.day-cell{position:relative;display:flex;align-items:center;justify-content:center;width:44px;height:44px;margin:0 auto;}
.day-sel{position:absolute;inset:0;--cut:9px;background:rgba(var(--main-rgb),.14);box-shadow:inset 0 0 0 1.5px var(--main);}
.day-today{position:absolute;bottom:-1px;left:50%;margin-left:-5px;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:6px solid var(--warn);filter:drop-shadow(0 0 3px var(--warn));}
.crit-row{display:grid;grid-template-columns:60px 1fr;align-items:center;gap:6px;border-bottom:1px solid rgba(var(--main-rgb),.18);padding:9px 0;}
.wd-chip{min-width:40px;padding:8px 0;text-align:center;font-weight:700;font-size:13px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18);color:rgba(255,255,255,.5);--cut:6px;}
.wd-chip.on{background:var(--alt);color:#06080a;box-shadow:none;}
.thumb{--cut:7px;width:40px;height:54px;display:flex;align-items:flex-start;justify-content:center;padding-top:7px;opacity:.5;transition:opacity .15s,transform .15s;box-shadow:inset 0 0 0 1px rgba(var(--main-rgb),.35);flex-shrink:0;}
.thumb.on{opacity:1;transform:translateY(-3px);box-shadow:inset 0 0 0 1.5px var(--alt);}
/* лента отсчёта */
.feed{height:100%;overflow-y:auto;scroll-snap-type:y mandatory;overscroll-behavior-y:contain;}
.tk{position:relative;height:100%;scroll-snap-align:start;scroll-snap-stop:always;overflow:hidden;}
.tk-num{font-size:min(60vw,290px);line-height:.8;color:#fff;text-shadow:0 6px 40px rgba(0,0,0,.45);}
.tk-lbl{font-size:min(14.5vw,66px);line-height:.98;color:#fff;margin-top:16px;letter-spacing:.01em;text-transform:uppercase;}
.tk-title{margin-top:20px;font-size:21px;letter-spacing:.12em;color:#fff;text-transform:uppercase;text-shadow:0 0 14px rgba(0,0,0,.6);}
.tk-sub{margin-top:5px;font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.18em;color:rgba(255,255,255,.6);text-transform:uppercase;}
.tk-hms{margin-top:14px;font-family:'Share Tech Mono',monospace;font-size:24px;letter-spacing:.14em;padding:4px 12px;background:rgba(0,0,0,.35);box-shadow:inset 0 0 0 1px rgba(255,255,255,.18);}
.rail-b{display:flex;flex-direction:column;align-items:center;gap:6px;color:#fff;opacity:.9;filter:drop-shadow(0 2px 6px rgba(0,0,0,.6));}
.rail-b span{writing-mode:vertical-rl;font-size:13px;letter-spacing:.14em;font-weight:600;}
.rail-b:active{opacity:.6;}
.smoke-drift{animation:drift 28s ease-in-out infinite;will-change:transform;transform-origin:center;}
@keyframes drift{0%,100%{transform:scale(1.15) translate(0,0)}50%{transform:scale(1.35) translate(-5%,4%) rotate(3deg)}}
.grid-floor{position:absolute;left:-60%;right:-60%;bottom:-6%;height:52%;background-image:linear-gradient(rgba(0,240,255,.75) 2px,transparent 2px),linear-gradient(90deg,rgba(255,46,140,.7) 2px,transparent 2px);background-size:46px 46px;transform:perspective(260px) rotateX(64deg);transform-origin:top center;animation:gridmove 1.6s linear infinite;-webkit-mask-image:linear-gradient(180deg,transparent,#000 30%);mask-image:linear-gradient(180deg,transparent,#000 30%);}
@keyframes gridmove{from{background-position:0 0}to{background-position:0 46px}}
.grid-sun{position:absolute;left:50%;top:22%;width:min(62vw,280px);aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:linear-gradient(180deg,#FCEE0A 0%,#FF7A00 40%,#FF2E8C 75%);-webkit-mask-image:linear-gradient(180deg,#000 55%,transparent 55%,transparent 59%,#000 59%,#000 68%,transparent 68%,transparent 73%,#000 73%,#000 81%,transparent 81%,transparent 87%,#000 87%);mask-image:linear-gradient(180deg,#000 55%,transparent 55%,transparent 59%,#000 59%,#000 68%,transparent 68%,transparent 73%,#000 73%,#000 81%,transparent 81%,transparent 87%,#000 87%);box-shadow:0 0 80px rgba(255,46,140,.6);}
.rain{position:absolute;inset:-20%;background:repeating-linear-gradient(105deg,transparent 0,transparent 13px,rgba(180,220,255,.08) 13px,rgba(180,220,255,.08) 14px);animation:rain .5s linear infinite;}
@keyframes rain{from{transform:translate(0,0)}to{transform:translate(-6px,28px)}}
.mx-col{position:absolute;top:0;writing-mode:vertical-rl;text-orientation:upright;color:#39FF6A;font-size:17px;letter-spacing:3px;text-shadow:0 0 8px #39FF6A;opacity:.5;animation:mxfall linear infinite;-webkit-mask-image:linear-gradient(180deg,transparent,#000 75%);mask-image:linear-gradient(180deg,transparent,#000 75%);}
@keyframes mxfall{from{transform:translateY(-100%)}to{transform:translateY(115vh)}}
/* настройки */
.set-head{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid rgba(var(--main-rgb),.3);background:linear-gradient(90deg,rgba(var(--main-rgb),.14),transparent);}
.set-n{font-family:'Share Tech Mono',monospace;font-size:11px;color:#0a0a0f;background:var(--main);padding:2px 5px;letter-spacing:.06em;}
.set-t{font-size:16px;font-weight:700;letter-spacing:.1em;color:var(--main);text-transform:uppercase;}
.term-bg{background-image:linear-gradient(rgba(var(--main-rgb),.05) 1px,transparent 1px),linear-gradient(90deg,rgba(var(--main-rgb),.05) 1px,transparent 1px);background-size:22px 22px;}
.stat-cell{padding:10px;box-shadow:inset 0 0 0 1px rgba(var(--alt-rgb),.22);background:rgba(var(--alt-rgb),.04);--cut:8px;}
/* фокус-сессия */
.focus-bg{background:radial-gradient(120% 60% at 50% 38%,var(--bg1) 0%,var(--bg2) 75%);}
.f-ring{filter:drop-shadow(0 0 7px rgba(var(--alt-rgb),.75));}
.f-time{font-family:'Orbitron','Russo One',sans-serif;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:.02em;line-height:1;color:#fff;text-shadow:0 0 18px rgba(var(--alt-rgb),.55);}
.f-alert{--cut:10px;background:rgba(255,42,42,.14);box-shadow:inset 0 0 0 1px #FF2A2A,0 0 24px rgba(255,42,42,.35);color:#FF5A5A;animation:dlgin .25s ease-out;}
.f-chip{--cut:7px;padding:8px 12px;font-weight:700;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--alt);box-shadow:inset 0 0 0 1px rgba(var(--alt-rgb),.55);background:rgba(var(--alt-rgb),.06);}
.f-chip:active{filter:brightness(1.4);}
.f-range{-webkit-appearance:none;appearance:none;height:30px;background:transparent;cursor:pointer;touch-action:pan-y;}
.f-range:focus{outline:none;}
.f-range::-webkit-slider-runnable-track{height:4px;background:linear-gradient(90deg,var(--alt) 0 var(--p),rgba(255,255,255,.12) var(--p) 100%);box-shadow:0 0 8px rgba(var(--alt-rgb),.35);}
.f-range::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;margin-top:-7px;background:var(--alt);transform:rotate(45deg);box-shadow:0 0 10px var(--alt);border:2px solid #0a0a0f;}
.f-range::-moz-range-track{height:4px;background:rgba(255,255,255,.12);}
.f-range::-moz-range-progress{height:4px;background:var(--alt);}
.f-range::-moz-range-thumb{width:16px;height:16px;border:2px solid #0a0a0f;border-radius:0;background:var(--alt);transform:rotate(45deg);}
`;
const MONO_CSS = `
.cj-root.ui-mono{font-family:'Inter',system-ui,sans-serif;color:#F2F2F7;background:#000;}
.ui-mono input,.ui-mono textarea,.ui-mono select{font-family:'Inter',system-ui,sans-serif;}
.ui-mono .f-mono,.ui-mono .f-read,.ui-mono .f-disp{font-family:'Inter',system-ui,sans-serif;font-variant-numeric:tabular-nums;}
.ui-mono .mx-col{font-family:'Share Tech Mono',monospace;}
.ui-mono .f-orb,.ui-mono .st-score{font-family:'Unbounded','Inter',sans-serif;font-weight:700;letter-spacing:-.01em;}
.ui-mono .uppercase{text-transform:none;}
.ui-mono [class*="tracking-"]{letter-spacing:0;}
.ui-mono .deco{display:none!important;}
.ui-mono .cut,.ui-mono .cut-tr,.ui-mono .cut-br{clip-path:none;border-radius:12px;}
.ui-mono div[style*="inset 0 0 0 1px"]{border-radius:14px;}
.ui-mono .frame{background:var(--fc,rgba(255,255,255,.07));border-radius:var(--r,20px);}
.ui-mono .frame-in{background:var(--fb,#111113);border-radius:calc(var(--r,20px) - 1px);}
.ui-mono .micro{font-family:'Inter',sans-serif;font-size:11px;font-weight:600;letter-spacing:.03em;color:#8E8E93;}
.ui-mono .lbl{font-family:'Inter',sans-serif;font-size:13px;font-weight:500;letter-spacing:0;text-transform:none;color:#8E8E93;margin-bottom:7px;}
.ui-mono .h1{font-family:'Inter',sans-serif;font-weight:700;font-size:30px;letter-spacing:-.02em;text-transform:none;color:#fff;text-shadow:none;}
.ui-mono .txt-main{color:#F2F2F7;}
.ui-mono .glow-main,.ui-mono .glow-alt{text-shadow:none;}
.ui-mono .txt-alt.glow-alt{color:#F2F2F7;}
.ui-mono .sec-title{font-size:19px;font-weight:700;letter-spacing:-.01em;text-transform:none;color:#fff;text-shadow:none;line-height:1.2;}
.ui-mono .m-title{font-size:16.5px;font-weight:600;letter-spacing:-.01em;text-transform:none;color:#fff;text-shadow:none;line-height:1.25;}
.ui-mono .m-status{font-size:12.5px;font-weight:600;letter-spacing:0;text-transform:none;margin-top:4px;}
.ui-mono .desc{color:#C7C7CC;filter:none;font-family:'Inter',sans-serif;font-size:15.5px;line-height:1.6;}
.ui-mono .inp{background:#1C1C1E;border:1px solid transparent;border-radius:12px;color:#fff;padding:11px 13px;}
.ui-mono .inp::placeholder{color:#636366;}
.ui-mono .inp:focus{border-color:var(--alt);box-shadow:none;}
.ui-mono .btn{border-radius:14px;font-weight:600;font-size:15px;letter-spacing:-.005em;text-transform:none;box-shadow:none;padding:13px 18px;}
.ui-mono .btn-sm{border-radius:12px;font-size:13.5px;padding:10px 13px;}
.ui-mono .btn:active{transform:scale(.97);filter:brightness(1.12);}
.ui-mono .icon-btn{border-radius:50%;background:rgba(255,255,255,.1);color:#E5E5EA;box-shadow:none;}
.ui-mono .icon-btn.red{background:rgba(255,69,58,.15);color:#FF6961;box-shadow:none;}
.ui-mono .tg{width:50px;height:30px;border-radius:15px;background:#39393D;box-shadow:none;}
.ui-mono .tg>i{top:3px;left:3px;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.35);}
.ui-mono .tg.on{background:var(--alt);box-shadow:none;}
.ui-mono .tg.on>i{left:23px;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.35);}
.ui-mono .seg{background:#1C1C1E;box-shadow:none;border-radius:13px;}
.ui-mono .seg-b{border-radius:10px;text-transform:none;letter-spacing:0;font-weight:600;font-size:14px;color:#8E8E93;}
.ui-mono .seg-b.on{background:#3A3A3C;color:#fff;}
.ui-mono .modal-bg{background:rgba(0,0,0,.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);}
.ui-mono .modal-panel{background:#0E0E10;border-top:0;border-radius:24px 24px 0 0;box-shadow:0 -10px 40px rgba(0,0,0,.6);}
.ui-mono .modal-head{border-bottom:0;padding:18px 16px 8px;align-items:center;}
.ui-mono .modal-title{font-weight:700;font-size:22px;letter-spacing:-.01em;text-transform:none;color:#fff;text-shadow:none;margin-top:0;}
.ui-mono .modal-foot{border-top:1px solid #1C1C1E;background:#0E0E10;}
.ui-mono .dlg-in{animation:mdlg .2s ease-out;}
@keyframes mdlg{from{transform:scale(.96);opacity:0}to{transform:none;opacity:1}}
.ui-mono .sheet-item{font-weight:500;letter-spacing:0;border-bottom-color:#2C2C2E;}
.ui-mono .sheet-item:active{background:rgba(255,255,255,.06);}
.ui-mono .toast{border-radius:999px;background:rgba(242,242,247,.97);color:#000;box-shadow:0 8px 30px rgba(0,0,0,.55);font-weight:600;letter-spacing:0;text-transform:none;font-size:14px;animation:mtoast .25s ease-out;}
.ui-mono .toast-btn{border-radius:999px;background:#000;color:var(--alt);text-transform:none;letter-spacing:0;font-size:13px;}
@keyframes mtoast{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
.ui-mono .alert-tag{clip-path:none;border-radius:50%;width:20px;height:20px;left:-6px;top:-6px;font-size:13px;box-shadow:0 0 0 3px #000;}
.ui-mono .new-tag{font-weight:700;font-size:10px;border:0;background:var(--alt);color:#000;border-radius:999px;padding:2px 7px;letter-spacing:.02em;}
.ui-mono .done-stamp{font-family:'Inter',sans-serif;font-weight:700;font-size:10px;letter-spacing:.02em;box-shadow:none;background:rgba(var(--alt-rgb),.16);border-radius:999px;padding:3px 8px;}
.ui-mono .step-box{border-radius:8px;border:1.5px solid #48484A;}
.ui-mono .step-box.cur{background:var(--warn);border-color:var(--warn);color:#000;}
.ui-mono .step-box.done{background:var(--alt);border-color:var(--alt);color:#000;}
.ui-mono .neon-track{background:transparent;}
.ui-mono .neon-thumb{background:#48484A;box-shadow:none;border-radius:3px;}
.ui-mono .holo img{filter:none;}
.ui-mono .holo::after{display:none;}
.ui-mono .tag{border-radius:999px;box-shadow:none;background:rgba(255,255,255,.08);font-family:'Inter',sans-serif;font-weight:600;letter-spacing:0;padding:5px 10px;}
.ui-mono .tag.on{background:var(--tc);color:#000;}
.ui-mono .plus-btn{border-radius:50%;background:var(--alt);color:#000;}
.ui-mono .nav{background:rgba(0,0,0,.94);border-top:1px solid #1C1C1E;box-shadow:none;}
.ui-mono .nav-b{color:#8E8E93;padding:9px 2px 8px;gap:4px;}
.ui-mono .nav-b .nl{font-size:11px;font-weight:600;letter-spacing:0;}
.ui-mono .nav-b.on{color:var(--alt);text-shadow:none;}
.ui-mono .nav-b.on::before{display:none;}
.ui-mono .nav-b.on svg{filter:none;}
.ui-mono .seg-bar i{transform:none;border-radius:3px;height:6px;background:#2C2C2E;}
.ui-mono .day-sel{border-radius:50%;background:rgba(255,255,255,.1);box-shadow:none;inset:2px;}
.ui-mono .day-today{border:0;width:5px;height:5px;border-radius:50%;background:var(--alt);margin-left:-2.5px;bottom:-4px;filter:none;}
.ui-mono .day-n{font-family:'Unbounded','Inter',sans-serif;font-size:12px;font-weight:500;}
.ui-mono .wd-chip{border-radius:10px;box-shadow:none;background:#1C1C1E;color:#8E8E93;}
.ui-mono .wd-chip.on{background:var(--alt);color:#000;}
.ui-mono .thumb{border-radius:12px;box-shadow:none;opacity:.45;}
.ui-mono .thumb.on{box-shadow:0 0 0 2px var(--alt);opacity:1;}
.ui-mono .sw{border-radius:50%;}
.ui-mono .tk-hms{border-radius:999px;box-shadow:none;background:rgba(0,0,0,.3);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);font-family:'Inter',sans-serif;font-weight:600;letter-spacing:.04em;font-size:22px;padding:6px 18px;font-variant-numeric:tabular-nums;}
.ui-mono .tk-sub{font-family:'Inter',sans-serif;font-weight:600;letter-spacing:.08em;}
.ui-mono .set-head{background:none;border-bottom:0;padding:16px 16px 2px;}
.ui-mono .set-n{display:none;}
.ui-mono .set-t{font-size:17px;font-weight:700;letter-spacing:-.01em;text-transform:none;color:#fff;}
.ui-mono .set-head svg{color:var(--alt);}
.ui-mono .term-bg{background-image:none;}
.ui-mono .stat-cell{background:#1C1C1E;box-shadow:none;border-radius:14px;}
.mono-card{position:relative;border-radius:30px;overflow:hidden;}
.mono-score{display:flex;align-items:baseline;justify-content:center;gap:7px;width:min(80%,300px);padding:14px 16px;border-radius:22px;background:rgba(17,17,19,.92);box-shadow:inset 0 0 0 1px #2A2A2D;}
.mono-crit{display:grid;grid-template-columns:76px 1fr;align-items:center;gap:8px;padding:13px 0;border-bottom:1px solid #2C2C2E;text-align:center;}
.mono-crit.head{border-bottom:0;padding:0 0 6px;font-size:16px;font-weight:500;color:#fff;}
.mono-dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.mono-row{background:#111113;border-radius:18px;}
.mono-pill{min-width:26px;padding:3px 8px;border-radius:999px;background:#2C2C2E;color:#fff;font-weight:600;font-size:12px;text-align:center;}
.mono-rail{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.3);color:#fff;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}
.mono-rail:active{transform:scale(.94);}
.mono-blob{position:absolute;left:50%;top:-12%;width:140%;aspect-ratio:1;margin-left:-70%;border-radius:50%;animation:drift 24s ease-in-out infinite;will-change:transform;}
.ui-mono .focus-bg{background:#000;}
.ui-mono .f-ring{filter:none;}
.ui-mono .f-time{font-family:'Unbounded','Inter',sans-serif;font-weight:500;letter-spacing:-.02em;text-shadow:none;}
.ui-mono .f-alert{border-radius:16px;background:rgba(255,69,58,.16);box-shadow:none;color:#FF6961;animation:mdlg .2s ease-out;}
.ui-mono .f-range::-webkit-slider-runnable-track{height:6px;border-radius:3px;box-shadow:none;background:linear-gradient(90deg,var(--alt) 0 var(--p),#2C2C2E var(--p) 100%);}
.ui-mono .f-range::-webkit-slider-thumb{width:26px;height:26px;margin-top:-10px;border:0;border-radius:50%;transform:none;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.5);}
.ui-mono .f-range::-moz-range-thumb{width:26px;height:26px;border:0;border-radius:50%;transform:none;background:#fff;}
.ui-mono .f-chip{border-radius:999px;box-shadow:none;background:#1C1C1E;color:#F2F2F7;text-transform:none;letter-spacing:0;font-weight:600;font-size:14px;}
`;
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);
function useNow(ms = 1000, active = true) {
  const [n, setN] = useState(Date.now());
  useEffect(() => {
    if (!active) return undefined;
    const t = setInterval(() => setN(Date.now()), ms);
    return () => clearInterval(t);
  }, [ms, active]);
  return n;
}
function Frame({
  children,
  className = '',
  inner = '',
  color,
  bg,
  cut = 12,
  style,
  onClick,
  mc,
  mb
}) {
  const fc = UI.mono ? mc : color,
    fb = UI.mono ? mb : bg;
  return React.createElement("div", {
    onClick: onClick,
    className: `frame cut ${className}`,
    style: {
      '--cut': `${cut}px`,
      ...(UI.mono ? {
        '--r': `${Math.round(cut * 1.45)}px`
      } : {}),
      ...(fc ? {
        '--fc': fc
      } : {}),
      ...(fb ? {
        '--fb': fb
      } : {}),
      ...style
    }
  }, React.createElement("div", {
    className: `frame-in cut ${inner}`
  }, children));
}
const BTN_V = {
  main: {
    bg: 'var(--main)',
    fg: '#0a0a0f',
    bd: 'transparent'
  },
  alt: {
    bg: 'var(--alt)',
    fg: '#05080a',
    bd: 'transparent'
  },
  ghost: {
    bg: 'rgba(var(--alt-rgb),.06)',
    fg: 'var(--alt)',
    bd: 'rgba(var(--alt-rgb),.55)'
  },
  ghostMain: {
    bg: 'rgba(var(--main-rgb),.07)',
    fg: 'var(--main)',
    bd: 'rgba(var(--main-rgb),.6)'
  },
  danger: {
    bg: '#E8112D',
    fg: '#fff',
    bd: 'transparent'
  },
  dangerGhost: {
    bg: 'rgba(255,42,42,.07)',
    fg: '#FF5A5A',
    bd: 'rgba(255,42,42,.55)'
  },
  dark: {
    bg: 'rgba(255,255,255,.06)',
    fg: '#E6E0E3',
    bd: 'rgba(255,255,255,.2)'
  }
};
const BTN_M = {
  main: {
    bg: 'var(--alt)',
    fg: '#050505',
    bd: 'transparent'
  },
  alt: {
    bg: '#F2F2F7',
    fg: '#050505',
    bd: 'transparent'
  },
  ghost: {
    bg: '#1C1C1E',
    fg: '#F2F2F7',
    bd: 'transparent'
  },
  ghostMain: {
    bg: '#1C1C1E',
    fg: '#F2F2F7',
    bd: 'transparent'
  },
  danger: {
    bg: '#FF453A',
    fg: '#fff',
    bd: 'transparent'
  },
  dangerGhost: {
    bg: 'rgba(255,69,58,.14)',
    fg: '#FF6961',
    bd: 'transparent'
  },
  dark: {
    bg: '#1C1C1E',
    fg: '#C7C7CC',
    bd: 'transparent'
  }
};
function Btn({
  children,
  onClick,
  variant = 'main',
  className = '',
  icon: Icon,
  small,
  disabled,
  snd = 'click',
  style
}) {
  const set = UI.mono ? BTN_M : BTN_V;
  const v = set[variant] || set.main;
  return React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: e => {
      sfx(snd);
      if (onClick) onClick(e);
    },
    className: `btn cut ${small ? 'btn-sm' : ''} ${className}`,
    style: {
      '--b-bg': v.bg,
      '--b-fg': v.fg,
      '--b-bd': v.bd,
      ...style
    }
  }, Icon && React.createElement(Icon, {
    size: small ? 14 : 16,
    strokeWidth: 2.3
  }), children);
}
function IconBtn({
  icon: Icon,
  onClick,
  red,
  sm,
  title
}) {
  return React.createElement("button", {
    type: "button",
    title: title,
    "aria-label": title,
    onClick: e => {
      e.stopPropagation();
      sfx();
      onClick && onClick(e);
    },
    className: `icon-btn cut ${red ? 'red' : ''} ${sm ? 'sm' : ''}`
  }, React.createElement(Icon, {
    size: sm ? 15 : 17,
    strokeWidth: 2.2
  }));
}
function Toggle({
  on,
  onChange,
  label,
  hint
}) {
  return React.createElement("button", {
    type: "button",
    onClick: () => {
      sfx(on ? 'uncheck' : 'check');
      onChange(!on);
    },
    className: "flex items-center justify-between w-full gap-3 py-2.5 text-left"
  }, React.createElement("span", {
    className: "min-w-0"
  }, React.createElement("span", {
    className: "block text-[15px] font-semibold text-white/90 leading-tight"
  }, label), hint && React.createElement("span", {
    className: "block text-[12px] text-white/45 leading-snug mt-0.5 f-read"
  }, hint)), React.createElement("span", {
    className: `tg cut ${on ? 'on' : ''}`
  }, React.createElement("i", null)));
}
function Field({
  label,
  children,
  className = ''
}) {
  return React.createElement("div", {
    className: `block mb-4 ${className}`
  }, React.createElement("span", {
    className: "lbl"
  }, label), children);
}
function Segmented({
  value,
  onChange,
  options,
  accent = 'var(--main)',
  className = ''
}) {
  return React.createElement("div", {
    className: `seg cut ${className}`,
    style: {
      '--sa': accent
    }
  }, options.map(o => React.createElement("button", {
    key: String(o.v),
    type: "button",
    onClick: () => {
      if (o.v !== value) {
        sfx('tab');
        onChange(o.v);
      }
    },
    className: `seg-b cut ${o.v === value ? 'on' : ''}`
  }, o.i && React.createElement(o.i, {
    size: 15,
    strokeWidth: 2.3
  }), React.createElement("span", null, o.l))));
}
function Modal({
  onClose,
  title,
  code,
  children,
  footer,
  full
}) {
  useEffect(() => {
    sfx('open');
  }, []);
  return React.createElement("div", {
    className: "fixed inset-0 z-[60] flex items-end justify-center modal-bg",
    onMouseDown: e => {
      if (e.target === e.currentTarget && onClose) {
        sfx('close');
        onClose();
      }
    }
  }, React.createElement("div", {
    className: "modal-panel w-full max-w-[480px] flex flex-col",
    style: {
      height: full ? '100dvh' : 'auto',
      maxHeight: full ? 'none' : '94dvh'
    }
  }, React.createElement("div", {
    className: "modal-head"
  }, React.createElement("div", {
    className: "min-w-0"
  }, React.createElement("div", {
    className: "micro deco"
  }, code || 'SYS.DIALOG // EDIT'), React.createElement("div", {
    className: "modal-title mt-1"
  }, title)), onClose && React.createElement(IconBtn, {
    icon: X,
    onClick: () => {
      sfx('close');
      onClose();
    },
    title: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
  })), React.createElement("div", {
    className: "flex-1 overflow-y-auto px-4 py-4"
  }, children), footer && React.createElement("div", {
    className: "modal-foot"
  }, footer)));
}
function Dialog({
  d,
  close
}) {
  const [val, setVal] = useState(d.value || '');
  const fin = v => {
    close();
    d.res(v);
  };
  useEffect(() => {
    sfx(d.danger ? 'error' : 'open');
  }, []);
  return React.createElement("div", {
    className: "fixed inset-0 z-[90] flex items-center justify-center p-5 modal-bg"
  }, React.createElement(Frame, {
    className: "w-full max-w-[400px] dlg-in",
    color: d.danger ? '#FF2A2A' : 'var(--main)',
    cut: 16,
    bg: "linear-gradient(180deg,rgba(26,12,20,.98),rgba(8,7,12,.98))",
    mc: d.danger ? 'rgba(255,69,58,.45)' : 'transparent',
    mb: "#1C1C1E"
  }, React.createElement("div", {
    className: "p-5"
  }, React.createElement("div", {
    className: "micro deco flex items-center gap-2"
  }, React.createElement(AlertTriangle, {
    size: 11
  }), " ", d.code || 'SYSTEM MESSAGE'), React.createElement("div", {
    className: "text-[21px] font-bold mt-1 uppercase tracking-wide leading-tight",
    style: {
      color: d.danger ? '#FF4D4D' : 'var(--main)'
    }
  }, d.title), d.text && React.createElement("p", {
    className: "text-[15px] text-white/80 mt-2 whitespace-pre-line leading-snug f-read"
  }, d.text), d.input && React.createElement("input", {
    autoFocus: true,
    className: "inp mt-3",
    value: val,
    placeholder: d.placeholder || '',
    onChange: e => setVal(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') fin(val);
    }
  }), React.createElement("div", {
    className: "flex flex-wrap gap-2 mt-5 justify-end"
  }, d.extra && React.createElement(Btn, {
    variant: "dark",
    small: true,
    onClick: () => fin('extra')
  }, d.extra), d.cancel !== false && React.createElement(Btn, {
    variant: "ghost",
    small: true,
    onClick: () => fin(d.input ? null : false)
  }, d.cancel || 'Отмена'), React.createElement(Btn, {
    variant: d.danger ? 'danger' : 'main',
    small: true,
    onClick: () => fin(d.input ? val : true)
  }, d.ok || 'OK')))));
}
function Sheet({
  title,
  items,
  onClose
}) {
  useEffect(() => {
    sfx('open');
  }, []);
  return React.createElement("div", {
    className: "fixed inset-0 z-[70] modal-bg flex items-end justify-center",
    onMouseDown: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, React.createElement("div", {
    className: "w-full max-w-[480px] p-3",
    style: {
      paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
      animation: 'sheetin .2s ease-out'
    }
  }, React.createElement(Frame, {
    cut: 14,
    bg: "linear-gradient(180deg,rgba(26,12,20,.98),rgba(8,7,12,.98))",
    mc: "transparent",
    mb: "#1C1C1E"
  }, React.createElement("div", {
    className: "p-2"
  }, React.createElement("div", {
    className: "micro px-3 py-2"
  }, title), items.filter(Boolean).map((it, i) => React.createElement("button", {
    key: i,
    type: "button",
    disabled: it.disabled,
    onClick: () => {
      sfx();
      onClose();
      it.on();
    },
    className: `sheet-item ${it.danger ? 'danger' : ''}`
  }, it.icon && React.createElement(it.icon, {
    size: 17
  }), React.createElement("span", null, it.label))), React.createElement("button", {
    type: "button",
    className: "sheet-item justify-center text-white/50",
    onClick: () => {
      sfx('close');
      onClose();
    }
  }, "\u041E\u0442\u043C\u0435\u043D\u0430")))));
}
function NeonScroll({
  children,
  maxH = 230,
  className = ''
}) {
  const ref = useRef(null);
  const [st, setSt] = useState({
    top: 0,
    h: 1,
    show: false
  });
  const upd = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const h = el.clientHeight / Math.max(1, el.scrollHeight);
    setSt({
      top: el.scrollTop / Math.max(1, el.scrollHeight),
      h,
      show: h < 0.995
    });
  }, []);
  useEffect(() => {
    upd();
    const t = setTimeout(upd, 120);
    return () => clearTimeout(t);
  }, [children, upd]);
  return React.createElement("div", {
    className: `relative ${className}`
  }, React.createElement("div", {
    ref: ref,
    onScroll: upd,
    className: "overflow-y-auto noscb pr-5",
    style: {
      maxHeight: maxH
    }
  }, children), st.show && React.createElement("div", {
    className: "neon-track"
  }, React.createElement("div", {
    className: "neon-thumb",
    style: {
      top: `${st.top * 100}%`,
      height: `${Math.max(8, st.h * 100)}%`
    }
  })));
}
function ImageInput({
  value,
  onChange,
  maxDim = 1080,
  quality = 0.8,
  noPreview
}) {
  const fileRef = useRef(null);
  const {
    toast
  } = useApp();
  const [url, setUrl] = useState(value && !isInline(value) && !isIdb(value) ? value : '');
  const [busy, setBusy] = useState(false);
  return React.createElement("div", null, value && !noPreview && React.createElement("div", {
    className: "relative mb-2"
  }, React.createElement(Img, {
    src: value,
    className: "w-full max-h-48 min-h-[96px] object-cover",
    style: {
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.2)'
    }
  }), React.createElement("button", {
    type: "button",
    onClick: () => {
      sfx('uncheck');
      onChange('');
      setUrl('');
    },
    className: "absolute top-2 right-2 bg-black/75 text-white/90 p-1.5"
  }, React.createElement(X, {
    size: 16
  }))), React.createElement("div", {
    className: "flex gap-2"
  }, React.createElement("input", {
    className: "inp flex-1 min-w-0",
    placeholder: "https://\u2026 \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",
    value: url,
    onChange: e => setUrl(e.target.value)
  }), React.createElement(Btn, {
    small: true,
    variant: "ghost",
    icon: Link,
    onClick: () => {
      if (url.trim()) onChange(url.trim());
    }
  }, "OK")), React.createElement(Btn, {
    small: true,
    variant: "dark",
    className: "mt-2 w-full",
    icon: Upload,
    disabled: busy,
    onClick: () => fileRef.current && fileRef.current.click()
  }, busy ? 'Сжатие…' : 'Загрузить с устройства'), React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: "image/*",
    hidden: true,
    onChange: async e => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      setBusy(true);
      try {
        onChange(await storeImageFile(f, maxDim, quality));
      } catch (err) {
        toast('Не удалось прочитать файл');
      }
      setBusy(false);
      e.target.value = '';
    }
  }));
}
function ColorRow({
  value,
  onChange,
  presets
}) {
  return React.createElement("div", {
    className: "flex flex-wrap items-center gap-2"
  }, presets.map(c => React.createElement("button", {
    key: c,
    type: "button",
    onClick: () => {
      sfx();
      onChange(c);
    },
    "aria-label": c,
    className: "w-8 h-8 cut sw",
    style: {
      '--cut': '6px',
      background: c,
      boxShadow: value === c ? '0 0 0 2px #fff inset, 0 0 0 4px rgba(0,0,0,.6) inset' : 'none'
    }
  })), React.createElement("label", {
    className: "w-8 h-8 cut relative overflow-hidden flex items-center justify-center text-white/70",
    style: {
      '--cut': '6px',
      background: 'rgba(255,255,255,.08)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.25)'
    }
  }, React.createElement(Palette, {
    size: 15
  }), React.createElement("input", {
    type: "color",
    value: /^#[0-9a-f]{6}$/i.test(value || '') ? value : '#ffffff',
    onChange: e => onChange(e.target.value),
    className: "absolute inset-0 opacity-0"
  })));
}
function Empty({
  icon: Icon = Database,
  title,
  text,
  children
}) {
  return React.createElement("div", {
    className: "flex flex-col items-center text-center px-6 py-10"
  }, React.createElement(Icon, {
    size: 30,
    className: "txt-main opacity-60"
  }), React.createElement("div", {
    className: "mt-3 font-bold tracking-widest uppercase txt-main"
  }, title), text && React.createElement("div", {
    className: "text-sm text-white/45 mt-1 f-read"
  }, text), children && React.createElement("div", {
    className: "mt-4"
  }, children));
}
function ScreenHeader({
  code,
  title,
  sub,
  right
}) {
  if (UI.mono) return React.createElement("div", {
    className: "px-4 pt-6 pb-1"
  }, React.createElement("div", {
    className: "flex items-end justify-between gap-3"
  }, React.createElement("div", {
    className: "min-w-0"
  }, React.createElement("h1", {
    className: "h1"
  }, title), sub && React.createElement("div", {
    className: "text-[13px] text-white/45 mt-1"
  }, sub)), right));
  return React.createElement("div", {
    className: "px-4 pt-4 pb-1"
  }, React.createElement("div", {
    className: "flex items-end justify-between gap-3"
  }, React.createElement("div", {
    className: "min-w-0"
  }, React.createElement("div", {
    className: "micro mb-1"
  }, code), React.createElement("h1", {
    className: "h1 glitch",
    "data-text": title
  }, title), sub && React.createElement("div", {
    className: "text-[12px] text-white/45 mt-1 f-read"
  }, sub)), right), React.createElement("div", {
    className: "hdr-line"
  }));
}
function TagChip({
  tag,
  on,
  onClick,
  small
}) {
  if (!tag) return null;
  const El = onClick ? 'button' : 'span';
  return React.createElement(El, {
    type: onClick ? 'button' : undefined,
    onClick: onClick ? () => {
      sfx('tab');
      onClick();
    } : undefined,
    className: `tag cut ${on ? 'on' : ''}`,
    style: {
      '--tc': tag.color,
      '--cut': '5px',
      fontSize: small ? 10 : 11
    }
  }, "#", tag.name);
}
const burstPts = (cx, cy, ro, ri, n) => {
  const p = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? ri : ro,
      a = Math.PI * i / n - Math.PI / 2;
    p.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return p.join(' ');
};
const ICONS = {
  donut: ['Питание', React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "12"
  }), React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "4.5"
  }), React.createElement("path", {
    d: "M5 13 q2.5 -3 5 0 t5 0 t5 0 t5 0 t3 -1"
  }), React.createElement("path", {
    d: "M10 9 l2 1 M20 8 l1 2 M23 19 l2 -1 M9 21 l1.5 1.5"
  }))],
  apple: ['Фрукты', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 9 c-4 -3 -11 -1 -11 7 c0 7 5 12 8 12 c1 0 2 -1 3 -1 s2 1 3 1 c3 0 8 -5 8 -12 c0 -8 -7 -10 -11 -7 z"
  }), React.createElement("path", {
    d: "M16 9 c0 -3 1 -5 4 -6"
  }), React.createElement("path", {
    d: "M10 15 c0 -2 1 -3 2 -3"
  }))],
  water: ['Вода', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 3 C16 3 6 14 6 20 a10 10 0 0 0 20 0 C26 14 16 3 16 3 Z"
  }), React.createElement("path", {
    d: "M11 20 a5 5 0 0 0 4 5"
  }))],
  coffee: ['Кофе', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M5 12 h17 v7 a7 7 0 0 1 -7 7 h-3 a7 7 0 0 1 -7 -7 z"
  }), React.createElement("path", {
    d: "M22 14 h2.5 a3 3 0 0 1 0 6 h-2.5"
  }), React.createElement("path", {
    d: "M10 3 c-1.5 2 1.5 3 0 6 M15 3 c-1.5 2 1.5 3 0 6"
  }))],
  sleep: ['Сон', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M19 5 A12 12 0 1 0 28 21 A9.5 9.5 0 1 1 19 5 Z"
  }), React.createElement("path", {
    d: "M21 4 h5 l-5 5 h5"
  }), React.createElement("path", {
    d: "M26 11 h3 l-3 3 h3"
  }))],
  sun: ['Ранний подъём', React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "6"
  }), React.createElement("path", {
    d: "M16 2 v4 M16 26 v4 M2 16 h4 M26 16 h4 M6 6 l3 3 M23 23 l3 3 M26 6 l-3 3 M9 23 l-3 3"
  }))],
  dumbbell: ['Силовая', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M4 16 h24"
  }), React.createElement("path", {
    d: "M7 10 v12 M11 7 v18 M21 7 v18 M25 10 v12"
  }))],
  run: ['Бег', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M3 22 h21 c3 0 5 -1.5 5 -3.5 c0 -2 -2 -3 -5 -3.5 l-5 -1 l-4 -6 l-4 2 l1 4 l-4 1 l-5 -3 z"
  }), React.createElement("path", {
    d: "M3 22 v3 h26 v-3"
  }), React.createElement("path", {
    d: "M12 16 l2 -1 M15 18 l2 -1"
  }))],
  steps: ['Шаги', React.createElement(React.Fragment, null, React.createElement("ellipse", {
    cx: "10",
    cy: "11",
    rx: "4",
    ry: "6"
  }), React.createElement("circle", {
    cx: "10",
    cy: "22.5",
    r: "2.5"
  }), React.createElement("ellipse", {
    cx: "22",
    cy: "14",
    rx: "4",
    ry: "6"
  }), React.createElement("circle", {
    cx: "22",
    cy: "25.5",
    r: "2.5"
  }))],
  bolt: ['Энергия', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M18 3 L7 18 h8 l-2 11 L25 13 h-8 Z"
  }))],
  heart: ['Здоровье', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 27 C6 20 3 15 3 10.5 C3 6.5 6 4 9.5 4 C12.5 4 14.5 6 16 8 C17.5 6 19.5 4 22.5 4 C26 4 29 6.5 29 10.5 C29 15 26 20 16 27 Z"
  }), React.createElement("path", {
    d: "M7 14 h5 l2 -4 l3 8 l2 -4 h6"
  }))],
  pill: ['Витамины', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M7 22 l13 -13 a5 5 0 0 1 7 7 l-13 13 a5 5 0 0 1 -7 -7 z"
  }), React.createElement("path", {
    d: "M13.5 15.5 l7 7"
  }))],
  lotus: ['Медитация', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 26 c-6 0 -11 -4 -12 -9 c5 0 9 2 12 6 c3 -4 7 -6 12 -6 c-1 5 -6 9 -12 9 z"
  }), React.createElement("path", {
    d: "M16 23 c-3 -4 -3 -10 0 -16 c3 6 3 12 0 16 z"
  }))],
  brain: ['Мозг', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 6 c-3 -3 -9 -2 -9 3 c-4 1 -4 7 -1 8 c-2 3 0 8 4 8 c1 3 5 3 6 0 z"
  }), React.createElement("path", {
    d: "M16 6 c3 -3 9 -2 9 3 c4 1 4 7 1 8 c2 3 0 8 -4 8 c-1 3 -5 3 -6 0 z"
  }), React.createElement("path", {
    d: "M16 6 v19 M10 13 h3 M19 17 h3"
  }))],
  book: ['Чтение', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 8 C12 5 7 5 3 6 v19 c4 -1 9 -1 13 2 c4 -3 9 -3 13 -2 v-19 c-4 -1 -9 -1 -13 2 z"
  }), React.createElement("path", {
    d: "M16 8 v19"
  }))],
  pen: ['Дневник', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M22 4 l6 6 l-16 16 l-8 2 l2 -8 z"
  }), React.createElement("path", {
    d: "M19 7 l6 6"
  }))],
  globe: ['Языки', React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "12"
  }), React.createElement("path", {
    d: "M16 4 c-5 4 -5 20 0 24 c5 -4 5 -20 0 -24"
  }), React.createElement("path", {
    d: "M4 16 h24 M6 10 h20 M6 22 h20"
  }))],
  code: ['Код', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M11 9 L4 16 L11 23 M21 9 L28 16 L21 23 M18 6 L14 26"
  }))],
  target: ['Фокус', React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "12"
  }), React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "6.5"
  }), React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "1.5"
  }), React.createElement("path", {
    d: "M16 1 v6 M16 25 v6 M1 16 h6 M25 16 h6"
  }))],
  clock: ['Время', React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "12"
  }), React.createElement("path", {
    d: "M16 8 v8 l5 4"
  }))],
  coin: ['Финансы', React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "13"
  }), React.createElement("path", {
    d: "M20 11 c-1 -2 -3 -2 -4 -2 c-3 0 -5 1 -5 3.5 c0 5 9 2.5 9 7.5 c0 2.5 -2 3.5 -5 3.5 c-2 0 -4 -1 -5 -2 M15.5 6 v20"
  }))],
  broom: ['Уборка', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M25 3 L15 14"
  }), React.createElement("path", {
    d: "M10 14 h9 l3 4 l-4 10 h-11 l-1 -10 z"
  }), React.createElement("path", {
    d: "M11 21 l-1 7 M15 21 v7 M19 21 l1 6"
  }))],
  plant: ['Рост', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 28 V13"
  }), React.createElement("path", {
    d: "M16 18 c-6 0 -10 -4 -10 -10 c6 0 10 4 10 10 z"
  }), React.createElement("path", {
    d: "M16 14 c0 -6 4 -10 10 -10 c0 6 -4 10 -10 10 z"
  }), React.createElement("path", {
    d: "M10 28 h12"
  }))],
  music: ['Музыка', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M12 24 V7 L26 4 V21"
  }), React.createElement("path", {
    d: "M12 24 a4 3.5 0 1 1 -8 0 a4 3.5 0 1 1 8 0 M26 21 a4 3.5 0 1 1 -8 0 a4 3.5 0 1 1 8 0"
  }), React.createElement("path", {
    d: "M12 11 L26 8"
  }))],
  eye: ['Экранное время', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M2 16 Q16 3 30 16 Q16 29 2 16 Z"
  }), React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "5"
  }), React.createElement("path", {
    d: "M1 16 h4 M27 16 h4"
  }))],
  chip: ['Импланты', React.createElement(React.Fragment, null, React.createElement("rect", {
    x: "8",
    y: "8",
    width: "16",
    height: "16"
  }), React.createElement("rect", {
    x: "12.5",
    y: "12.5",
    width: "7",
    height: "7"
  }), React.createElement("path", {
    d: "M12 3 v5 M16 3 v5 M20 3 v5 M12 24 v5 M16 24 v5 M20 24 v5 M3 12 h5 M3 16 h5 M3 20 h5 M24 12 h5 M24 16 h5 M24 20 h5"
  }))],
  nophone: ['Без телефона', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M10 3 h12 a2 2 0 0 1 2 2 v22 a2 2 0 0 1 -2 2 h-12 a2 2 0 0 1 -2 -2 v-22 a2 2 0 0 1 2 -2 z"
  }), React.createElement("path", {
    d: "M14 25 h4"
  }), React.createElement("path", {
    d: "M3 4 L29 28"
  }))],
  nosmoke: ['Без курения', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M3 18 h19 v5 h-19 z M25 18 v5 M28 18 v5"
  }), React.createElement("path", {
    d: "M24 15 c0 -3 3 -3 3 -6 c0 -2 -1 -3 -2 -4"
  }), React.createElement("path", {
    d: "M4 4 L28 28"
  }))],
  noalco: ['Без алкоголя', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M10 4 h12 c0 7 -2 11 -6 11 c-4 0 -6 -4 -6 -11 z"
  }), React.createElement("path", {
    d: "M16 15 v11 M11 27 h10"
  }), React.createElement("path", {
    d: "M5 4 L27 28"
  }))],
  game: ['Игры', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M9 10 h14 a6 6 0 0 1 6 6 v3 a4 4 0 0 1 -7 3 l-2 -2 h-8 l-2 2 a4 4 0 0 1 -7 -3 v-3 a6 6 0 0 1 6 -6 z"
  }), React.createElement("path", {
    d: "M10 14 v5 M7.5 16.5 h5 M21 15 h.1 M24 18 h.1"
  }))],
  skull: ['Вредные привычки', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 3 c-7 0 -12 5 -12 11 c0 4 2 6 4 7 v5 h16 v-5 c2 -1 4 -3 4 -7 c0 -6 -5 -11 -12 -11 z"
  }), React.createElement("circle", {
    cx: "11",
    cy: "15",
    r: "2.6"
  }), React.createElement("circle", {
    cx: "21",
    cy: "15",
    r: "2.6"
  }), React.createElement("path", {
    d: "M13 26 v-3 M16 26 v-3 M19 26 v-3"
  }))],
  mountain: ['Походы', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M2 27 L12 10 L18 19 L22 14 L30 27 Z"
  }), React.createElement("path", {
    d: "M9 15 l3 2 l2 -3"
  }))],
  bike: ['Велосипед', React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "8",
    cy: "22",
    r: "5"
  }), React.createElement("circle", {
    cx: "24",
    cy: "22",
    r: "5"
  }), React.createElement("path", {
    d: "M8 22 L13 12 H21 L24 22 M13 12 L17 22 H8 M19 8 h4 M11 10 h4"
  }))],
  phone: ['Звонок близким', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M8 4 h4 l2 6 l-3 2 c2 4 4 6 8 8 l2 -3 l6 2 v4 c0 2 -2 3 -4 3 C13 26 6 19 5 8 c0 -2 1 -4 3 -4 z"
  }))],
  fire: ['Стрик', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 29 c-6 0 -10 -4 -10 -9 c0 -6 6 -9 6 -15 c4 3 6 6 6 10 c1 -1 2 -3 2 -5 c3 3 6 6 6 11 c0 5 -4 8 -10 8 z"
  }), React.createElement("path", {
    d: "M16 29 c-3 0 -4 -2 -4 -4 c0 -3 4 -5 4 -8 c2 2 4 4 4 8 c0 2 -1 4 -4 4 z"
  }))],
  star: ['Цель', React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 3 l3.8 8.2 l9 1 l-6.7 6 l1.9 8.8 l-8 -4.6 l-8 4.6 l1.9 -8.8 l-6.7 -6 l9 -1 z"
  }))]
};
const STICKERS = Object.keys(ICONS).map(k => `st:${k}`);
const STICKER_FRAMES = [['oct', 'Окта'], ['hex', 'Гекс'], ['shield', 'Щит'], ['diamond', 'Ромб'], ['cut', 'Срез'], ['circle', 'Круг']];
const FRAME_PTS = {
  oct: [[20, 3], [44, 3], [61, 20], [61, 44], [44, 61], [20, 61], [3, 44], [3, 20]],
  hex: [[32, 2], [59, 17], [59, 47], [32, 62], [5, 47], [5, 17]],
  shield: [[6, 5], [58, 5], [58, 36], [32, 62], [6, 36]],
  diamond: [[32, 1], [63, 32], [32, 63], [1, 32]],
  cut: [[3, 3], [49, 3], [61, 15], [61, 61], [15, 61], [3, 49]]
};
const ptsStr = (pts, k = 1) => pts.map(([x, y]) => `${(32 + (x - 32) * k).toFixed(1)},${(32 + (y - 32) * k).toFixed(1)}`).join(' ');
const stickerLabel = icon => {
  if (icon.startsWith('st:')) return (ICONS[icon.slice(3)] || ['Стикер'])[0];
  return icon.startsWith('url:') ? 'Своя картинка' : 'Эмодзи';
};
const OL = '#121212';
const ol = (d, c, w = 2) => React.createElement(React.Fragment, null, React.createElement("path", {
  d: d,
  stroke: OL,
  strokeWidth: w + 3
}), React.createElement("path", {
  d: d,
  stroke: c,
  strokeWidth: w
}));
const blobPts = (cx, cy, r, amp, n, seg = 56) => Array.from({
  length: seg
}, (_, i) => {
  const a = i / seg * Math.PI * 2,
    rr = r + amp * Math.sin(a * n);
  return `${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`;
}).join(' ');
function sunPath(n, r, R, hw) {
  const pt = (a, rad) => `${(32 + rad * Math.cos(a)).toFixed(2)} ${(32 + rad * Math.sin(a)).toFixed(2)}`;
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + i * 2 * Math.PI / n;
    d += `${i ? `A${r} ${r} 0 0 1` : 'M'} ${pt(a - hw, r)} L${pt(a, R)} L${pt(a + hw, r)} `;
  }
  return `${d}A${r} ${r} 0 0 1 ${pt(-Math.PI / 2 - hw, r)} Z`;
}
const TOON_FRAMES = {
  oct: p => React.createElement("path", _extends({
    d: sunPath(8, 21.5, 31, 0.27)
  }, p)),
  hex: p => React.createElement("path", _extends({
    d: sunPath(12, 23, 30.5, 0.17)
  }, p)),
  shield: p => React.createElement("path", _extends({
    d: "M9 6 H55 Q58 6 58 9 V35 Q58 41 52 46 L34.5 59.5 Q32 61.5 29.5 59.5 L12 46 Q6 41 6 35 V9 Q6 6 9 6 Z"
  }, p)),
  diamond: p => React.createElement("path", _extends({
    d: "M29 4 Q32 1 35 4 L60 29 Q63 32 60 35 L35 60 Q32 63 29 60 L4 35 Q1 32 4 29 Z"
  }, p)),
  cut: p => React.createElement("rect", _extends({
    x: "4",
    y: "4",
    width: "56",
    height: "56",
    rx: "15"
  }, p)),
  circle: p => React.createElement("circle", _extends({
    cx: "32",
    cy: "32",
    r: "29"
  }, p))
};
const TOON_FRAME_NAMES = {
  oct: 'Звезда',
  hex: 'Солнце',
  shield: 'Щит',
  diamond: 'Ромб',
  cut: 'Квадрат',
  circle: 'Круг'
};
const TY = '#FFD43B',
  TO = '#FF8C2B',
  TR = '#FF4D4D',
  TP = '#FF7EB6',
  TV = '#B48CFF',
  TB = '#4DB6FF',
  TG = '#5FD35F',
  TW = '#FFFFFF',
  TBR = '#B9773F',
  TGR = '#C9CED6',
  TD = '#2B2B33';
const noSign = React.createElement(React.Fragment, null, ol('M16 3.5 a12.5 12.5 0 1 1 -0.01 0 Z', TR, 2.6), ol('M7.2 7.2 L24.8 24.8', TR, 2.6));
const TOON = {
  donut: c => React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "15",
    cy: "17",
    r: "12",
    fill: "#D9934E"
  }), React.createElement("polygon", {
    points: blobPts(15, 17, 9.4, 1.1, 7),
    fill: TV
  }), React.createElement("circle", {
    cx: "15",
    cy: "17",
    r: "3.6",
    fill: c
  }), React.createElement("g", {
    strokeWidth: "1.7"
  }, React.createElement("path", {
    d: "M8.5 13 l1.8 -1",
    stroke: TW
  }), React.createElement("path", {
    d: "M19.5 11 l1.6 1.2",
    stroke: TB
  }), React.createElement("path", {
    d: "M21.5 19.5 l-.6 1.9",
    stroke: TY
  }), React.createElement("path", {
    d: "M10 21.5 l1.8 .8",
    stroke: TG
  }), React.createElement("path", {
    d: "M14.5 9.4 l1.9 -.2",
    stroke: TP
  }), React.createElement("path", {
    d: "M17.5 24 l1.8 -.6",
    stroke: TW
  })), React.createElement("circle", {
    cx: "25.5",
    cy: "7",
    r: "4.6",
    fill: TR
  }), React.createElement("path", {
    d: "M23.8 5.3 l3.4 3.4 M27.2 5.3 l-3.4 3.4",
    strokeWidth: "1.5"
  })),
  apple: () => React.createElement(React.Fragment, null, ol('M16 10 C16 7.5 16.5 5.5 18 4', TBR, 1.6), React.createElement("path", {
    d: "M16 10 C12 7 5 8.5 5 16 C5 23 9.5 28 13 28 C14.3 28 15 27.3 16 27.3 C17 27.3 17.7 28 19 28 C22.5 28 27 23 27 16 C27 8.5 20 7 16 10 Z",
    fill: TR
  }), React.createElement("path", {
    d: "M17.5 7 C18 3.5 22 2.5 25 3.5 C24 6.5 21 8 17.5 7 Z",
    fill: TG
  }), React.createElement("ellipse", {
    cx: "10",
    cy: "15",
    rx: "1.5",
    ry: "3",
    fill: TW,
    stroke: "none",
    transform: "rotate(20 10 15)"
  })),
  water: () => React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 3 C16 3 6 14.5 6 20.5 A10 10 0 0 0 26 20.5 C26 14.5 16 3 16 3 Z",
    fill: TB
  }), React.createElement("path", {
    d: "M10.5 20 a5.5 5.5 0 0 0 4 5",
    stroke: TW,
    strokeWidth: "2"
  })),
  coffee: () => React.createElement(React.Fragment, null, ol('M11 2.5 c-1.5 2 1.5 3 0 5.5', TW, 1.4), ol('M16.5 2 c-1.5 2 1.5 3 0 5.5', TW, 1.4), React.createElement("ellipse", {
    cx: "15",
    cy: "27",
    rx: "12",
    ry: "2.6",
    fill: TW
  }), ol('M23 14.5 h1.5 a3.2 3.2 0 0 1 0 6.4 h-1.8', TW, 1.8), React.createElement("path", {
    d: "M5 11.5 h19 v7.5 a8 8 0 0 1 -8 8 h-3 a8 8 0 0 1 -8 -8 z",
    fill: TW
  }), React.createElement("ellipse", {
    cx: "14.5",
    cy: "11.8",
    rx: "9.5",
    ry: "1.9",
    fill: TBR
  }), React.createElement("path", {
    d: "M6.5 16.5 h16",
    stroke: TP,
    strokeWidth: "2.2"
  })),
  sleep: () => React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "14",
    cy: "19",
    r: "10.5",
    fill: "#FFC94A"
  }), React.createElement("path", {
    d: "M8.2 18 q2 1.8 4 0 M15.8 18 q2 1.8 4 0",
    strokeWidth: "1.4"
  }), React.createElement("ellipse", {
    cx: "14",
    cy: "23.8",
    rx: "1.4",
    ry: "1.7",
    fill: "#7A3B12"
  }), ol('M11.5 6.5 h2.6 l-2.6 3 h2.6', TW, 1.5), ol('M17 2.8 h3.6 l-3.6 4.2 h3.6', TW, 1.8), ol('M23 -1 h5 l-5 6 h5', TW, 2.1)),
  sun: () => React.createElement(React.Fragment, null, ol('M16 1.5 v4 M16 26.5 v4 M1.5 16 h4 M26.5 16 h4 M5.7 5.7 l2.8 2.8 M23.5 23.5 l2.8 2.8 M26.3 5.7 l-2.8 2.8 M8.5 23.5 l-2.8 2.8', TO, 2), React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "8.5",
    fill: TY
  }), React.createElement("circle", {
    cx: "13",
    cy: "14",
    r: "1",
    fill: OL
  }), React.createElement("circle", {
    cx: "19",
    cy: "14",
    r: "1",
    fill: OL
  }), React.createElement("path", {
    d: "M12.5 17.5 q3.5 3.5 7 0",
    strokeWidth: "1.4"
  })),
  dumbbell: () => React.createElement(React.Fragment, null, ol('M6 16 h20', TGR, 2.4), React.createElement("rect", {
    x: "2.5",
    y: "8.5",
    width: "5",
    height: "15",
    rx: "1.6",
    fill: TR
  }), React.createElement("rect", {
    x: "7",
    y: "11",
    width: "3.6",
    height: "10",
    rx: "1.2",
    fill: TO
  }), React.createElement("rect", {
    x: "24.5",
    y: "8.5",
    width: "5",
    height: "15",
    rx: "1.6",
    fill: TR
  }), React.createElement("rect", {
    x: "21.4",
    y: "11",
    width: "3.6",
    height: "10",
    rx: "1.2",
    fill: TO
  })),
  run: () => React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M3.5 21 L4 11.5 c2 1.5 5 1.5 7 -1 l3.5 3.5 c2 1.5 4 2 7 2.3 c4 .5 7.5 1.8 7.5 4.2 v.5 Z",
    fill: TB
  }), React.createElement("path", {
    d: "M3 21 h26.5 v2 c0 1.2 -1 2 -2.3 2 H5 c-1.2 0 -2 -.8 -2 -2 Z",
    fill: TW
  }), React.createElement("path", {
    d: "M12 14.5 l2 -1.3 M14.6 16.4 l2 -1.3 M17.2 17.9 l2 -1.1",
    stroke: TW,
    strokeWidth: "1.3"
  }), React.createElement("path", {
    d: "M6 17.5 q4 -1.2 7.5 1",
    strokeWidth: "1.3"
  })),
  steps: () => React.createElement(React.Fragment, null, React.createElement("ellipse", {
    cx: "10",
    cy: "11",
    rx: "4.2",
    ry: "6.2",
    fill: TW
  }), React.createElement("ellipse", {
    cx: "10",
    cy: "21.8",
    rx: "2.9",
    ry: "2.7",
    fill: TW
  }), React.createElement("ellipse", {
    cx: "22",
    cy: "15",
    rx: "4.2",
    ry: "6.2",
    fill: TW
  }), React.createElement("ellipse", {
    cx: "22",
    cy: "25.8",
    rx: "2.9",
    ry: "2.7",
    fill: TW
  })),
  bolt: () => React.createElement("path", {
    d: "M18.5 2 L6.5 18 h8 l-2.2 12 L25.5 13 h-8.2 Z",
    fill: TY
  }),
  heart: () => React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 27 C6 20 3 15 3 10.5 C3 6.5 6 4 9.5 4 C12.5 4 14.5 6 16 8 C17.5 6 19.5 4 22.5 4 C26 4 29 6.5 29 10.5 C29 15 26 20 16 27 Z",
    fill: TR
  }), ol('M7 14.5 h4.5 l2 -4 l3 8 l2 -4 h6', TW, 1.5)),
  pill: () => React.createElement("g", {
    transform: "rotate(-40 16 16)"
  }, React.createElement("path", {
    d: "M16 10 H10 a6 6 0 0 0 0 12 H16 Z",
    fill: TR
  }), React.createElement("path", {
    d: "M16 10 H22 a6 6 0 0 1 0 12 H16 Z",
    fill: TW
  }), React.createElement("path", {
    d: "M8.5 13 h3.5",
    stroke: TW,
    strokeWidth: "1.5"
  })),
  lotus: () => React.createElement(React.Fragment, null, ol('M5 28.5 h22', TB, 1.8), React.createElement("path", {
    d: "M16 26 C10 26 4.5 22 3.5 16.5 C9 16.5 13.5 19.5 16 23 Z",
    fill: "#FF6FB0"
  }), React.createElement("path", {
    d: "M16 26 C22 26 27.5 22 28.5 16.5 C23 16.5 18.5 19.5 16 23 Z",
    fill: "#FF6FB0"
  }), React.createElement("path", {
    d: "M16 25 C12 20.5 12 12 16 5.5 C20 12 20 20.5 16 25 Z",
    fill: "#FFA3CF"
  })),
  brain: () => React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 6 C13 3 7 4 7 9 C3 10 3 16 6 17.5 C4 21 6.5 26 10.5 25.5 C11.5 28.5 15 28.5 16 26 Z",
    fill: "#FF9EC4"
  }), React.createElement("path", {
    d: "M16 6 C19 3 25 4 25 9 C29 10 29 16 26 17.5 C28 21 25.5 26 21.5 25.5 C20.5 28.5 17 28.5 16 26 Z",
    fill: "#FF9EC4"
  }), React.createElement("path", {
    d: "M10 12 q2 0 3 2 M9 19.5 q2.5 -1 4 1 M22 12 q-2 0 -3 2 M23 19.5 q-2.5 -1 -4 1",
    strokeWidth: "1.3"
  })),
  book: () => React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M2 9 V27 C6.5 25.8 11.5 26.2 16 29 C20.5 26.2 25.5 25.8 30 27 V9 Z",
    fill: TB
  }), React.createElement("path", {
    d: "M16 8 C12 5 7 5 3.5 6 V24.5 C7.5 23.5 12 24 16 27 Z",
    fill: TW
  }), React.createElement("path", {
    d: "M16 8 C20 5 25 5 28.5 6 V24.5 C24.5 23.5 20 24 16 27 Z",
    fill: TW
  }), React.createElement("path", {
    d: "M6.5 10.5 q3.5 -.8 6.5 .8 M6.5 14.5 q3.5 -.8 6.5 .8 M19 11.3 q3 -1.6 6.5 -.8 M19 15.3 q3 -1.6 6.5 -.8",
    strokeWidth: "1.1"
  })),
  pen: () => React.createElement("g", {
    transform: "rotate(-45 16 16)"
  }, React.createElement("path", {
    d: "M4 12.5 h3.5 v7 H4 a1.5 1.5 0 0 1 -1.5 -1.5 v-4 a1.5 1.5 0 0 1 1.5 -1.5 z",
    fill: TP
  }), React.createElement("rect", {
    x: "7.5",
    y: "12.5",
    width: "2.5",
    height: "7",
    fill: TGR
  }), React.createElement("rect", {
    x: "10",
    y: "12.5",
    width: "11.5",
    height: "7",
    fill: TY
  }), React.createElement("path", {
    d: "M21.5 12.5 L28.5 16 L21.5 19.5 Z",
    fill: "#F2C48D"
  }), React.createElement("path", {
    d: "M26.2 14.85 L28.5 16 L26.2 17.15 Z",
    fill: OL
  })),
  globe: () => React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "12.5",
    fill: TB
  }), React.createElement("path", {
    d: "M9 8.5 c2 -1 5 -.5 5.5 1.5 c.5 2 -2 2.5 -1.5 4.5 c.5 2 -1.5 3.5 -3.5 3 c-2 -.5 -3.5 -3 -3 -5 c.3 -1.6 1 -3.2 2.5 -4 z",
    fill: TG
  }), React.createElement("path", {
    d: "M19 14 c2 -1 5 0 6 2 c1 2.5 -.5 5.5 -2.5 7 c-1.5 1 -3 .5 -3 -1 c0 -1.5 -1.5 -2.5 -1.5 -4 c0 -1.6 0 -3.2 1 -4 z",
    fill: TG
  }), React.createElement("path", {
    d: "M18 5.5 c1.5 -.3 3.5 .3 4 1.4 c-1 .8 -3 .9 -4 -1.4 z",
    fill: TG
  })),
  code: () => React.createElement(React.Fragment, null, React.createElement("rect", {
    x: "2.5",
    y: "5",
    width: "27",
    height: "22",
    rx: "4",
    fill: TD
  }), React.createElement("path", {
    d: "M2.5 10.5 h27",
    strokeWidth: "1.5"
  }), React.createElement("circle", {
    cx: "6.2",
    cy: "7.8",
    r: "1.1",
    fill: TR,
    stroke: "none"
  }), React.createElement("circle", {
    cx: "9.4",
    cy: "7.8",
    r: "1.1",
    fill: TY,
    stroke: "none"
  }), React.createElement("circle", {
    cx: "12.6",
    cy: "7.8",
    r: "1.1",
    fill: TG,
    stroke: "none"
  }), ol('M11 15 l-3.5 3.5 l3.5 3.5 M21 15 l3.5 3.5 l-3.5 3.5', TG, 1.8), ol('M17.5 14 l-3 9', TW, 1.6)),
  target: () => React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "15",
    cy: "17",
    r: "12.5",
    fill: TW
  }), React.createElement("circle", {
    cx: "15",
    cy: "17",
    r: "9",
    fill: TR
  }), React.createElement("circle", {
    cx: "15",
    cy: "17",
    r: "5.5",
    fill: TW
  }), React.createElement("circle", {
    cx: "15",
    cy: "17",
    r: "2.2",
    fill: TR
  }), ol('M15 17 L26 6', TD, 1.6), React.createElement("path", {
    d: "M24.5 4 l2.5 -2.5 l.5 3.5 l3.5 .5 l-2.5 2.5 z",
    fill: TY
  })),
  clock: () => React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M9 26 l-2.2 3 M23 26 l2.2 3",
    strokeWidth: "2"
  }), React.createElement("path", {
    d: "M4.5 9.5 a4.5 4.5 0 0 1 6 -5.5 z",
    fill: TR
  }), React.createElement("path", {
    d: "M27.5 9.5 a4.5 4.5 0 0 0 -6 -5.5 z",
    fill: TR
  }), React.createElement("circle", {
    cx: "16",
    cy: "17",
    r: "10.5",
    fill: TR
  }), React.createElement("circle", {
    cx: "16",
    cy: "17",
    r: "7.8",
    fill: TW
  }), React.createElement("path", {
    d: "M16 12 v5 l3.5 2.5",
    strokeWidth: "1.7"
  })),
  coin: () => React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "13",
    fill: TY
  }), React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "9.5",
    fill: "#F5B400"
  }), React.createElement("path", {
    d: "M19.5 12.3 c-.8 -1.4 -2.2 -1.8 -3.5 -1.8 c-2 0 -3.6 1 -3.6 2.7 c0 3.6 7.4 1.8 7.4 5.4 c0 1.8 -1.7 2.7 -3.8 2.7 c-1.5 0 -3 -.6 -3.8 -1.7 M16 8.5 v15",
    strokeWidth: "1.7"
  }), React.createElement("path", {
    d: "M7 12.5 a9.5 9.5 0 0 1 4 -5",
    stroke: TW,
    strokeWidth: "1.4"
  })),
  broom: () => React.createElement(React.Fragment, null, ol('M15 13 L26.5 2.5', TBR, 2.2), React.createElement("path", {
    d: "M9.5 15.5 h11 l3 6 c-1 3 -3 5.5 -6 7 h-7 c-2.5 -1.5 -4 -4 -4 -7 z",
    fill: TY
  }), React.createElement("rect", {
    x: "9.5",
    y: "12.8",
    width: "11",
    height: "3.6",
    rx: "1",
    fill: TR
  }), React.createElement("path", {
    d: "M12 21 l-.8 6.3 M15 21 v7 M18 21 l1 6.3",
    strokeWidth: "1.1"
  })),
  plant: () => React.createElement(React.Fragment, null, ol('M16 18 V9', TG, 1.8), React.createElement("path", {
    d: "M16 12.5 c-6 0 -9.5 -3.5 -9.5 -8.5 c6 0 9.5 3.5 9.5 8.5 z",
    fill: TG
  }), React.createElement("path", {
    d: "M16 10.5 c0 -5 3.5 -8.5 9 -8.5 c0 5 -3.5 8.5 -9 8.5 z",
    fill: "#8BE36B"
  }), React.createElement("path", {
    d: "M9 19.5 h14 l-2 9.5 h-10 z",
    fill: "#E2763A"
  }), React.createElement("rect", {
    x: "7.5",
    y: "17",
    width: "17",
    height: "3.8",
    rx: "1.2",
    fill: "#F08C4E"
  })),
  music: () => React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M11.5 23 V8.5 L26 5 V20",
    strokeWidth: "2.2"
  }), React.createElement("path", {
    d: "M11.5 8.5 L26 5 v3.5 L11.5 12 z",
    fill: OL
  }), React.createElement("ellipse", {
    cx: "8",
    cy: "23.5",
    rx: "4.2",
    ry: "3.4",
    fill: TV,
    transform: "rotate(-20 8 23.5)"
  }), React.createElement("ellipse", {
    cx: "22.5",
    cy: "20.5",
    rx: "4.2",
    ry: "3.4",
    fill: TV,
    transform: "rotate(-20 22.5 20.5)"
  })),
  eye: () => React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M2 16 Q16 3 30 16 Q16 29 2 16 Z",
    fill: TW
  }), React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "6",
    fill: TB
  }), React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "2.8",
    fill: OL
  }), React.createElement("circle", {
    cx: "18",
    cy: "13.8",
    r: "1.3",
    fill: TW,
    stroke: "none"
  })),
  chip: () => React.createElement(React.Fragment, null, ol('M11 3.5 v4 M16 3.5 v4 M21 3.5 v4 M11 24.5 v4 M16 24.5 v4 M21 24.5 v4 M3.5 11 h4 M3.5 16 h4 M3.5 21 h4 M24.5 11 h4 M24.5 16 h4 M24.5 21 h4', TGR, 1.6), React.createElement("rect", {
    x: "7",
    y: "7",
    width: "18",
    height: "18",
    rx: "3",
    fill: TD
  }), React.createElement("rect", {
    x: "11.5",
    y: "11.5",
    width: "9",
    height: "9",
    rx: "1.5",
    fill: TG
  })),
  nophone: () => React.createElement(React.Fragment, null, React.createElement("rect", {
    x: "9.5",
    y: "3",
    width: "13",
    height: "26",
    rx: "3",
    fill: TD
  }), React.createElement("rect", {
    x: "11.5",
    y: "6.5",
    width: "9",
    height: "17",
    rx: "1",
    fill: TB
  }), noSign),
  nosmoke: () => React.createElement(React.Fragment, null, ol('M9 14 c-1.5 -2 1.5 -3 0 -5.5 c-1 -1.5 0 -3 1 -4', TGR, 1.5), React.createElement("rect", {
    x: "5",
    y: "16.5",
    width: "16",
    height: "5",
    rx: "1",
    fill: TW
  }), React.createElement("rect", {
    x: "21",
    y: "16.5",
    width: "6.5",
    height: "5",
    rx: "1",
    fill: TO
  }), React.createElement("rect", {
    x: "3",
    y: "16.5",
    width: "3",
    height: "5",
    rx: "1",
    fill: TR
  }), noSign),
  noalco: () => React.createElement(React.Fragment, null, ol('M16 15.5 v10', TW, 1.6), ol('M11 27 h10', TW, 2), React.createElement("path", {
    d: "M9.5 4 h13 c0 7.5 -2.5 11.5 -6.5 11.5 c-4 0 -6.5 -4 -6.5 -11.5 z",
    fill: TW
  }), React.createElement("path", {
    d: "M10.2 8.5 h11.6 c-.6 4.4 -2.6 6.8 -5.8 6.8 c-3.2 0 -5.2 -2.4 -5.8 -6.8 z",
    fill: "#C2185B"
  }), noSign),
  game: () => React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M9 9.5 h14 a6.5 6.5 0 0 1 6.5 6.5 v3.5 a4.2 4.2 0 0 1 -7.4 2.8 l-2 -2.3 h-8.2 l-2 2.3 a4.2 4.2 0 0 1 -7.4 -2.8 v-3.5 a6.5 6.5 0 0 1 6.5 -6.5 z",
    fill: TV
  }), React.createElement("path", {
    d: "M9.5 13 v6 M6.5 16 h6",
    strokeWidth: "2.2"
  }), React.createElement("circle", {
    cx: "21.5",
    cy: "14.5",
    r: "1.7",
    fill: TR
  }), React.createElement("circle", {
    cx: "24.8",
    cy: "17.6",
    r: "1.7",
    fill: TY
  })),
  skull: () => React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 3 c-7 0 -12 5 -12 11.5 c0 4 2 6.5 4.5 7.5 v5 h15 v-5 c2.5 -1 4.5 -3.5 4.5 -7.5 c0 -6.5 -5 -11.5 -12 -11.5 z",
    fill: TW
  }), React.createElement("circle", {
    cx: "11",
    cy: "15",
    r: "3",
    fill: OL
  }), React.createElement("circle", {
    cx: "21",
    cy: "15",
    r: "3",
    fill: OL
  }), React.createElement("path", {
    d: "M16 18.5 l-1.4 2.5 h2.8 z",
    fill: OL
  }), React.createElement("path", {
    d: "M13 27 v-3 M16 27 v-3 M19 27 v-3",
    strokeWidth: "1.2"
  })),
  mountain: () => React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "26.5",
    cy: "5.5",
    r: "3",
    fill: TY
  }), React.createElement("path", {
    d: "M12 28 L21 9 L30.5 28 Z",
    fill: "#7E8BA3"
  }), React.createElement("path", {
    d: "M1.5 28 L11.5 8 L22 28 Z",
    fill: "#A9B4C8"
  }), React.createElement("path", {
    d: "M8.3 14.4 L11.5 8 L14.8 14.6 l-2 -1.3 l-1.3 1.6 l-1.3 -1.6 z",
    fill: TW
  })),
  bike: () => React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "8",
    cy: "21",
    r: "5.6",
    strokeWidth: "2.6"
  }), React.createElement("circle", {
    cx: "24",
    cy: "21",
    r: "5.6",
    strokeWidth: "2.6"
  }), ol('M8 21 L13 11.5 H21.5 L24 21 M13 11.5 L17 21 H8 M17 21 L21.5 11.5', TR, 1.8), React.createElement("path", {
    d: "M10.5 9 h4.5",
    strokeWidth: "2.4"
  }), React.createElement("path", {
    d: "M21.5 11.5 L20.5 7.5 h3.5",
    strokeWidth: "2"
  })),
  phone: () => React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M8 4 h4 l2 6 l-3 2 c2 4 4 6 8 8 l2 -3 l6 2 v4 c0 2 -2 3 -4 3 C13 26 6 19 5 8 c0 -2 1 -4 3 -4 z",
    fill: TG
  }), React.createElement("path", {
    d: "M24.5 11 c-3 -2 -4.5 -3.5 -4.5 -5.2 c0 -1.3 1 -2.3 2.2 -2.3 c1 0 1.7 .6 2.3 1.3 c.6 -.7 1.3 -1.3 2.3 -1.3 c1.2 0 2.2 1 2.2 2.3 c0 1.7 -1.5 3.2 -4.5 5.2 z",
    fill: TR
  })),
  fire: () => React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 29.5 c-6 0 -10 -4 -10 -9 c0 -6 6 -9 6 -15.5 c4 3 6 6 6 10 c1 -1 2 -3 2 -5 c3 3 6 6.5 6 11 c0 5 -4 8.5 -10 8.5 z",
    fill: TO
  }), React.createElement("path", {
    d: "M16 29.5 c-3 0 -4.5 -2 -4.5 -4.3 c0 -3 4.5 -5 4.5 -8.2 c2 2 4.5 4.2 4.5 8.2 c0 2.3 -1.5 4.3 -4.5 4.3 z",
    fill: TY
  })),
  star: () => React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M16 3 l3.8 8.2 l9 1 l-6.7 6 l1.9 8.8 l-8 -4.6 l-8 4.6 l1.9 -8.8 l-6.7 -6 l9 -1 z",
    fill: TY
  }), React.createElement("path", {
    d: "M11 13.4 l2.2 -.3",
    stroke: TW,
    strokeWidth: "1.6"
  }))
};
function ToonSticker({
  icon,
  color,
  size,
  frame
}) {
  const id = useMemo(() => uid('tn'), []);
  const mini = size < 40;
  const shape = TOON_FRAMES[frame] ? frame : 'oct';
  const outline = p => TOON_FRAMES[shape](p);
  const key = icon.startsWith('st:') ? icon.slice(3) : null;
  const glyph = key && TOON[key] ? TOON[key](color) : null;
  const k = shape === 'diamond' ? 1.05 : 1.32;
  const pic = useImgSrc(icon.startsWith('url:') ? icon.slice(4) : '', mini);
  const sw = mini ? 3.6 : 2.4;
  return React.createElement("svg", {
    viewBox: "0 0 64 64",
    width: size,
    height: size,
    style: {
      display: 'block',
      overflow: 'visible'
    },
    "aria-label": stickerLabel(icon)
  }, React.createElement("defs", null, React.createElement("clipPath", {
    id: `${id}c`
  }, outline({}))), outline({
    fill: color,
    stroke: OL,
    strokeWidth: sw,
    strokeLinejoin: 'round'
  }), pic && React.createElement("g", {
    clipPath: `url(#${id}c)`
  }, React.createElement("image", {
    href: pic,
    x: "0",
    y: "0",
    width: "64",
    height: "64",
    preserveAspectRatio: "xMidYMid slice"
  })), pic && outline({
    fill: 'none',
    stroke: OL,
    strokeWidth: sw,
    strokeLinejoin: 'round'
  }), glyph && React.createElement("g", {
    transform: `translate(${32 - 16 * k} ${(shape === 'shield' ? 30 : 32) - 16 * k}) scale(${k})`,
    fill: "none",
    stroke: OL,
    strokeWidth: mini ? 2 : 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, glyph), icon.startsWith('em:') && React.createElement("text", {
    x: "32",
    y: "34",
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: "30"
  }, icon.slice(3)));
}
function Sticker({
  icon = 'st:star',
  color = '#FCEE0A',
  size = 96,
  frame = 'oct',
  toon = UI.mono
}) {
  if (toon) return React.createElement(ToonSticker, {
    icon: icon,
    color: color,
    size: size,
    frame: frame
  });
  return React.createElement(NeonSticker, {
    icon: icon,
    color: color,
    size: size,
    frame: frame
  });
}
function NeonSticker({
  icon,
  color,
  size,
  frame
}) {
  const id = useMemo(() => uid('stk'), []);
  const mini = size < 40;
  const shape = FRAME_PTS[frame] ? frame : frame === 'circle' ? 'circle' : 'oct';
  const outline = (props, k = 1) => shape === 'circle' ? React.createElement("circle", _extends({
    cx: "32",
    cy: "32",
    r: 30 * k
  }, props)) : React.createElement("polygon", _extends({
    points: ptsStr(FRAME_PTS[shape], k),
    strokeLinejoin: "round"
  }, props));
  const key = icon.startsWith('st:') ? icon.slice(3) : null;
  const glyph = key && ICONS[key] ? ICONS[key][1] : null;
  const k = shape === 'diamond' ? 0.95 : shape === 'shield' ? 1.08 : 1.2;
  const pic = useImgSrc(icon.startsWith('url:') ? icon.slice(4) : '', mini);
  return React.createElement("svg", {
    viewBox: "0 0 64 64",
    width: size,
    height: size,
    style: {
      display: 'block',
      overflow: 'visible'
    },
    "aria-label": stickerLabel(icon)
  }, React.createElement("defs", null, React.createElement("radialGradient", {
    id: `${id}g`,
    cx: "50%",
    cy: "42%",
    r: "60%"
  }, React.createElement("stop", {
    offset: "0",
    stopColor: color,
    stopOpacity: ".38"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: color,
    stopOpacity: "0"
  })), React.createElement("clipPath", {
    id: `${id}c`
  }, outline({})), React.createElement("pattern", {
    id: `${id}p`,
    width: "4",
    height: "3",
    patternUnits: "userSpaceOnUse"
  }, React.createElement("rect", {
    width: "4",
    height: "1",
    fill: color,
    opacity: ".22"
  }))), outline({
    fill: '#0a0810',
    stroke: color,
    strokeWidth: mini ? 3 : 2,
    style: {
      filter: `drop-shadow(0 0 ${mini ? 2 : 4}px ${color})`
    }
  }), React.createElement("g", {
    clipPath: `url(#${id}c)`
  }, React.createElement("rect", {
    width: "64",
    height: "64",
    fill: `url(#${id}g)`
  }), pic && React.createElement("image", {
    href: pic,
    x: "0",
    y: "0",
    width: "64",
    height: "64",
    preserveAspectRatio: "xMidYMid slice"
  }), !mini && React.createElement("rect", {
    width: "64",
    height: "64",
    fill: `url(#${id}p)`
  })), !mini && outline({
    fill: 'none',
    stroke: color,
    strokeOpacity: 0.35,
    strokeWidth: 0.8
  }, 0.84), glyph && React.createElement("g", {
    transform: `translate(${32 - 16 * k} ${(shape === 'shield' ? 29 : 32) - 16 * k}) scale(${k})`,
    fill: "none",
    stroke: color,
    strokeWidth: mini ? 3 : 2.1,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      filter: `drop-shadow(0 0 ${mini ? 1.5 : 3}px ${color})`
    }
  }, glyph), icon.startsWith('em:') && React.createElement("text", {
    x: "32",
    y: "34",
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: "28"
  }, icon.slice(3)), !mini && React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M2 10 V2 H10",
    fill: "none",
    stroke: "#fff",
    strokeOpacity: ".7",
    strokeWidth: "1.2"
  }), React.createElement("path", {
    d: "M62 54 V62 H54",
    fill: "none",
    stroke: "#fff",
    strokeOpacity: ".7",
    strokeWidth: "1.2"
  }), React.createElement("rect", {
    x: "52",
    y: "4",
    width: "6",
    height: "2",
    fill: color,
    opacity: ".9"
  })));
}
function ChipIcon({
  active,
  dim,
  kind
}) {
  if (UI.mono) {
    const I = kind === 'shard' ? FileText : Flag;
    return React.createElement("span", {
      className: "mono-dot",
      style: {
        background: active ? 'var(--alt)' : '#1C1C1F',
        color: active ? '#000' : '#8E8E93',
        opacity: dim ? 0.5 : 1
      }
    }, React.createElement(I, {
      size: 14,
      strokeWidth: 2.3
    }));
  }
  return React.createElement("svg", {
    width: "30",
    height: "44",
    viewBox: "0 0 30 44",
    style: {
      opacity: dim ? 0.4 : 1,
      filter: active ? 'drop-shadow(0 0 5px var(--main))' : 'none'
    }
  }, React.createElement("g", {
    transform: "rotate(-9 15 22)"
  }, React.createElement("path", {
    d: "M6 3 h14 l6 6 v29 a3 3 0 0 1 -3 3 h-17 a3 3 0 0 1 -3 -3 v-32 a3 3 0 0 1 3 -3z",
    style: {
      fill: active ? 'rgba(var(--main-rgb),.38)' : 'rgba(var(--main-rgb),.16)',
      stroke: 'var(--main)'
    },
    strokeWidth: "1.6"
  }), React.createElement("path", {
    d: "M10 8 h9 M10 12 h5",
    style: {
      stroke: 'var(--main)'
    },
    strokeWidth: "1.4"
  }), React.createElement("path", {
    d: "M19 20 a6.5 6.5 0 1 0 1 6",
    style: {
      stroke: 'var(--main)'
    },
    strokeWidth: "2.2",
    fill: "none"
  }), React.createElement("circle", {
    cx: "14.5",
    cy: "26.5",
    r: "2.3",
    style: {
      fill: 'var(--main)'
    }
  })));
}
function MissionBadge({
  badge,
  size = 46
}) {
  const b = badge || {};
  if (!b.shape || b.shape === 'none') return null;
  const c = b.color || '#F5B83D',
    t = String(b.text || '').slice(0, 7);
  const fs = t.length > 4 ? 6.5 : t.length > 2 ? 9 : 12;
  if (UI.mono) {
    const [r, g, bl] = hexRgb(c).split(',').map(Number);
    const ink = r * 0.299 + g * 0.587 + bl * 0.114 > 150 ? '#111' : '#fff';
    const mfs = t.length > 4 ? 7 : t.length > 2 ? 9.5 : 13;
    return React.createElement("div", {
      className: "shrink-0 flex items-center justify-center",
      style: {
        width: size + 8
      }
    }, React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 50 50"
    }, b.shape === 'diamond' && React.createElement("path", {
      d: "M22.2 4.8 Q25 2 27.8 4.8 L45.2 22.2 Q48 25 45.2 27.8 L27.8 45.2 Q25 48 22.2 45.2 L4.8 27.8 Q2 25 4.8 22.2 Z",
      fill: c
    }), b.shape === 'square' && React.createElement("rect", {
      x: "5",
      y: "5",
      width: "40",
      height: "40",
      rx: "12",
      fill: c
    }), b.shape === 'triangle' && React.createElement("path", {
      d: "M22.3 7 Q25 2.5 27.7 7 L46 39.5 Q48 44 43 44 H7 Q2 44 4 39.5 Z",
      fill: c
    }), b.shape === 'circle' && React.createElement("circle", {
      cx: "25",
      cy: "25",
      r: "21",
      fill: c
    }), React.createElement("text", {
      x: "25",
      y: b.shape === 'triangle' ? 36 : 25 + mfs * 0.36,
      textAnchor: "middle",
      fontSize: mfs,
      fontWeight: "700",
      fill: ink,
      fontFamily: "Unbounded, Inter, sans-serif"
    }, t)));
  }
  return React.createElement("div", {
    className: "shrink-0 flex flex-col items-center",
    style: {
      width: size + 8
    }
  }, React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 50 50",
    style: {
      filter: 'drop-shadow(0 0 3px rgba(0,0,0,.6))'
    }
  }, b.shape === 'diamond' && React.createElement(React.Fragment, null, React.createElement("polygon", {
    points: "25,2 48,25 25,48 2,25",
    fill: "#0d0d10",
    stroke: "#fff",
    strokeWidth: "1.6"
  }), React.createElement("polygon", {
    points: "25,4.5 45.5,25 4.5,25",
    fill: c
  }), [[17, 15, 3, 10], [21, 11, 3, 14], [25, 9, 3, 16], [29, 12, 3, 13], [33, 16, 3, 9]].map(([x, y, w, h], i) => React.createElement("rect", {
    key: i,
    x: x - 1.5,
    y: y,
    width: w,
    height: h,
    fill: "#fff",
    opacity: ".9"
  })), React.createElement("text", {
    x: "25",
    y: "37",
    textAnchor: "middle",
    fontSize: fs,
    fontWeight: "800",
    fill: "#fff",
    fontFamily: "Rajdhani, sans-serif"
  }, t)), b.shape === 'square' && React.createElement(React.Fragment, null, React.createElement("rect", {
    x: "3",
    y: "3",
    width: "44",
    height: "44",
    fill: "#0d0d10",
    stroke: "#fff",
    strokeWidth: "1.6"
  }), React.createElement("rect", {
    x: "5",
    y: "5",
    width: "40",
    height: "11",
    fill: c
  }), React.createElement("text", {
    x: "25",
    y: "13.6",
    textAnchor: "middle",
    fontSize: fs,
    fontWeight: "800",
    fill: "#fff",
    fontFamily: "Rajdhani, sans-serif"
  }, t), [[9, 20, 8, 6], [19, 20, 12, 6], [33, 20, 8, 6], [9, 29, 14, 7], [25, 29, 16, 7], [9, 39, 32, 4]].map(([x, y, w, h], i) => React.createElement("rect", {
    key: i,
    x: x,
    y: y,
    width: w,
    height: h,
    fill: "#fff",
    opacity: i % 2 ? 0.85 : 0.55
  }))), b.shape === 'triangle' && React.createElement(React.Fragment, null, React.createElement("polygon", {
    points: "25,4 47,44 3,44",
    fill: c,
    stroke: "#111",
    strokeWidth: "2"
  }), React.createElement("polygon", {
    points: "25,13 39,39 11,39",
    fill: "#0d0d10"
  }), React.createElement("text", {
    x: "25",
    y: "35",
    textAnchor: "middle",
    fontSize: fs,
    fontWeight: "800",
    fill: "#fff",
    fontFamily: "Rajdhani, sans-serif"
  }, t)), b.shape === 'circle' && React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "25",
    cy: "25",
    r: "21",
    fill: "#0d0d10",
    stroke: c,
    strokeWidth: "3"
  }), React.createElement("circle", {
    cx: "25",
    cy: "25",
    r: "16",
    fill: "none",
    stroke: c,
    strokeWidth: "1",
    strokeDasharray: "3 2"
  }), React.createElement("text", {
    x: "25",
    y: 25 + fs * 0.36,
    textAnchor: "middle",
    fontSize: fs,
    fontWeight: "800",
    fill: c,
    fontFamily: "Rajdhani, sans-serif"
  }, t))), React.createElement("div", {
    className: "f-mono text-center leading-[1.05] mt-0.5",
    style: {
      fontSize: 4.6,
      letterSpacing: '.04em',
      color: 'rgba(255,255,255,.55)'
    }
  }, "CERTIFIED TO ACCESS", React.createElement("br", null), "OR DISABLE THIS ITEM"));
}
function Ring({
  avg,
  color,
  size = 42,
  stroke = 2.8,
  dashed
}) {
  const r = size / 2 - stroke - 0.5,
    C = 2 * Math.PI * r,
    pct = avg == null ? 0 : clamp(avg / 5, 0, 1);
  return React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    className: "absolute inset-0 m-auto"
  }, React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: UI.mono ? '#2C2C2E' : 'rgba(255,255,255,.13)',
    strokeWidth: UI.mono ? stroke : stroke - 0.6,
    strokeDasharray: dashed ? '3 3' : undefined
  }), avg != null && React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeDasharray: `${C * pct} ${C}`,
    strokeLinecap: "round",
    transform: `rotate(-90 ${size / 2} ${size / 2})`,
    style: UI.mono ? undefined : {
      filter: `drop-shadow(0 0 3px ${color})`
    }
  }));
}
const AVATAR_PRESETS = ['preset:m', 'preset:optics', 'preset:chip', 'preset:eye'];
const isPresetAvatar = v => !v || String(v).startsWith('preset:');
function AvatarGlyph({
  id = 'preset:m'
}) {
  if (UI.mono) {
    const K = {
        fill: '#000'
      },
      L = {
        stroke: '#000',
        fill: 'none'
      };
    return React.createElement("svg", {
      viewBox: "0 0 64 64",
      className: "w-full h-full block"
    }, React.createElement("circle", {
      cx: "32",
      cy: "32",
      r: "32",
      style: {
        fill: 'var(--alt)'
      }
    }), React.createElement("g", {
      transform: "translate(32 32) scale(.66) translate(-32 -32)"
    }, id === 'preset:optics' ? React.createElement(React.Fragment, null, React.createElement("path", {
      d: "M14 22 L32 14 L50 22 L48 40 L32 52 L16 40 Z",
      style: L,
      strokeWidth: "5",
      strokeLinejoin: "round"
    }), React.createElement("path", {
      d: "M18 29 H29 L31 34 H20 Z M46 29 H35 L33 34 H44 Z",
      style: K
    })) : id === 'preset:chip' ? React.createElement(React.Fragment, null, React.createElement("rect", {
      x: "17",
      y: "17",
      width: "30",
      height: "30",
      rx: "5",
      style: L,
      strokeWidth: "5"
    }), React.createElement("rect", {
      x: "26",
      y: "26",
      width: "12",
      height: "12",
      rx: "2",
      style: K
    }), [24, 32, 40].map(p => React.createElement("path", {
      key: p,
      d: `M${p} 6 V15 M${p} 49 V58 M6 ${p} H15 M49 ${p} H58`,
      style: L,
      strokeWidth: "4",
      strokeLinecap: "round"
    }))) : id === 'preset:eye' ? React.createElement(React.Fragment, null, React.createElement("path", {
      d: "M6 32 Q32 8 58 32 Q32 56 6 32 Z",
      style: L,
      strokeWidth: "5",
      strokeLinejoin: "round"
    }), React.createElement("circle", {
      cx: "32",
      cy: "32",
      r: "9",
      style: K
    })) : React.createElement("path", {
      d: "M10 52 V12 L32 30 L54 12 V52 H44 V33 L32 43 L20 33 V52 Z",
      style: K
    })));
  }
  const M = {
      fill: 'var(--main)'
    },
    A = {
      stroke: 'var(--alt)'
    },
    S = {
      stroke: 'var(--main)'
    };
  return React.createElement("svg", {
    viewBox: "0 0 64 64",
    className: "w-full h-full block",
    style: {
      filter: 'drop-shadow(0 0 6px rgba(var(--main-rgb),.55))'
    }
  }, id === 'preset:optics' ? React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M14 22 L32 14 L50 22 L48 40 L32 52 L16 40 Z",
    fill: "none",
    style: S,
    strokeWidth: "2.5",
    strokeLinejoin: "round"
  }), React.createElement("path", {
    d: "M18 29 H29 L31 33 H20 Z M46 29 H35 L33 33 H44 Z",
    style: M
  }), React.createElement("path", {
    d: "M32 40 V47 M26 44 H38",
    fill: "none",
    style: A,
    strokeWidth: "2"
  }), React.createElement("path", {
    d: "M8 30 H13 M51 30 H56",
    fill: "none",
    style: A,
    strokeWidth: "2"
  })) : id === 'preset:chip' ? React.createElement(React.Fragment, null, React.createElement("rect", {
    x: "18",
    y: "18",
    width: "28",
    height: "28",
    fill: "none",
    style: S,
    strokeWidth: "2.5"
  }), React.createElement("rect", {
    x: "25",
    y: "25",
    width: "14",
    height: "14",
    style: M
  }), [22, 28, 34, 40].map(p => React.createElement("path", {
    key: p,
    d: `M${p} 10 V18 M${p} 46 V54 M10 ${p} H18 M46 ${p} H54`,
    fill: "none",
    style: A,
    strokeWidth: "2"
  }))) : id === 'preset:eye' ? React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M8 32 Q32 10 56 32 Q32 54 8 32 Z",
    fill: "none",
    style: S,
    strokeWidth: "2.5"
  }), React.createElement("circle", {
    cx: "32",
    cy: "32",
    r: "9",
    style: M
  }), React.createElement("circle", {
    cx: "32",
    cy: "32",
    r: "3.5",
    fill: "#07080A"
  }), React.createElement("path", {
    d: "M6 32 H58",
    fill: "none",
    style: A,
    strokeWidth: "1.2",
    strokeDasharray: "3 3"
  })) : React.createElement(React.Fragment, null, React.createElement("path", {
    d: "M14 48 V16 L32 31 L50 16 V48 H42 V33 L32 41 L22 33 V48 Z",
    style: M
  }), React.createElement("path", {
    d: "M10 10 H18 M10 10 V18 M54 54 H46 M54 54 V46",
    fill: "none",
    style: A,
    strokeWidth: "2"
  })));
}
function AvatarSlot({
  size = 84,
  onClick
}) {
  const {
    data
  } = useApp();
  const {
    avatar,
    avatarHolo
  } = data.settings;
  const img = !isPresetAvatar(avatar);
  if (UI.mono) return React.createElement("div", {
    className: "relative shrink-0",
    style: {
      width: size,
      height: size
    }
  }, React.createElement("button", {
    type: "button",
    onClick: onClick ? () => {
      sfx('open');
      onClick();
    } : undefined,
    "aria-label": "\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u0430\u0432\u0430\u0442\u0430\u0440",
    className: "block w-full h-full rounded-full overflow-hidden",
    style: {
      background: '#1C1C1E',
      cursor: onClick ? 'pointer' : 'default'
    }
  }, img ? React.createElement(Img, {
    src: avatar,
    thumb: size <= 120,
    className: "w-full h-full object-cover block"
  }) : React.createElement(AvatarGlyph, {
    id: avatar
  })), onClick && React.createElement("span", {
    className: "absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center pointer-events-none",
    style: {
      background: '#F2F2F7',
      color: '#000',
      boxShadow: '0 0 0 3px #000'
    }
  }, React.createElement(Pencil, {
    size: 12,
    strokeWidth: 2.6
  })));
  return React.createElement("div", {
    className: "relative shrink-0",
    style: {
      width: size,
      height: size
    }
  }, React.createElement("button", {
    type: "button",
    onClick: onClick ? () => {
      sfx('open');
      onClick();
    } : undefined,
    "aria-label": "\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u0430\u0432\u0430\u0442\u0430\u0440",
    className: "cut block w-full h-full",
    style: {
      '--cut': `${Math.round(size / 6)}px`,
      padding: 2,
      background: 'linear-gradient(135deg,var(--main),rgba(var(--main-rgb),.25) 45%,var(--alt))',
      cursor: onClick ? 'pointer' : 'default'
    }
  }, React.createElement("div", {
    className: `cut w-full h-full relative overflow-hidden ${img && avatarHolo ? 'holo' : ''}`,
    style: {
      '--cut': `${Math.round(size / 6) - 2}px`,
      background: 'radial-gradient(circle at 50% 35%,rgba(var(--main-rgb),.22),#08070c 70%)'
    }
  }, img ? React.createElement(Img, {
    src: avatar,
    thumb: size <= 120,
    className: "w-full h-full object-cover block"
  }) : React.createElement("div", {
    className: "w-full h-full",
    style: {
      padding: size * 0.14
    }
  }, React.createElement(AvatarGlyph, {
    id: avatar
  })))), onClick && React.createElement("span", {
    className: "absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center cut pointer-events-none",
    style: {
      '--cut': '5px',
      background: 'var(--alt)',
      color: '#06080a'
    }
  }, React.createElement(Pencil, {
    size: 12,
    strokeWidth: 2.6
  })));
}
function AvatarEditor({
  onClose
}) {
  const {
    data,
    up
  } = useApp();
  const s = data.settings;
  const set = p => up('settings', x => ({
    ...x,
    ...p
  }));
  return React.createElement(Modal, {
    title: "\u0410\u0432\u0430\u0442\u0430\u0440",
    code: "BIOMONITOR // AVATAR.SET",
    onClose: onClose,
    footer: React.createElement(Btn, {
      className: "flex-1",
      icon: Check,
      snd: "save",
      onClick: onClose
    }, "\u0413\u043E\u0442\u043E\u0432\u043E")
  }, React.createElement("div", {
    className: "flex justify-center mb-5"
  }, React.createElement(AvatarSlot, {
    size: 132
  })), React.createElement(Field, {
    label: "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0435 \u044D\u043C\u0431\u043B\u0435\u043C\u044B"
  }, React.createElement("div", {
    className: "grid grid-cols-4 gap-2"
  }, AVATAR_PRESETS.map(p => React.createElement("button", {
    key: p,
    type: "button",
    onClick: () => {
      sfx();
      set({
        avatar: p
      });
    },
    className: "cut aspect-square p-2.5",
    style: {
      '--cut': '10px',
      background: 'rgba(0,0,0,.45)',
      boxShadow: s.avatar === p ? 'inset 0 0 0 2px var(--alt)' : 'inset 0 0 0 1px rgba(var(--main-rgb),.35)'
    }
  }, React.createElement(AvatarGlyph, {
    id: p
  }))))), React.createElement(Field, {
    label: "\u0421\u0432\u043E\u0451 \u0444\u043E\u0442\u043E (\u0444\u0430\u0439\u043B \u0438\u043B\u0438 \u0441\u0441\u044B\u043B\u043A\u0430)"
  }, React.createElement(ImageInput, {
    noPreview: true,
    maxDim: 480,
    value: isPresetAvatar(s.avatar) ? '' : s.avatar,
    onChange: v => set({
      avatar: v || 'preset:m'
    })
  })), !isPresetAvatar(s.avatar) && React.createElement("div", {
    className: "px-3 py-1",
    style: {
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.1)'
    }
  }, React.createElement(Toggle, {
    on: s.avatarHolo,
    onChange: v => set({
      avatarHolo: v
    }),
    label: "\u0413\u043E\u043B\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0444\u0438\u043B\u044C\u0442\u0440",
    hint: "\u041E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u0435\u0442 \u0444\u043E\u0442\u043E \u0432 \u0446\u0432\u0435\u0442 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430 \u0441\u043E \u0441\u043A\u0430\u043D\u043B\u0430\u0439\u043D\u0430\u043C\u0438"
  })));
}
const TAG_COLORS = ['#FF4655', '#00F0FF', '#FCEE0A', '#59FF00', '#FF7A00', '#B98CF0', '#FF2E8C', '#FFFFFF'];
function useDirOps() {
  const {
    data,
    up,
    ask,
    toast,
    undoable
  } = useApp();
  const addSection = async () => {
    const name = await ask({
      title: 'Новый раздел',
      code: 'DIR.SECTIONS // ADD',
      input: true,
      placeholder: 'Например: САМОРАЗВИТИЕ',
      ok: 'Создать'
    });
    if (name && name.trim()) {
      up('sections', s => [...s, {
        id: uid('sec'),
        name: name.trim().toUpperCase(),
        collapsed: false
      }]);
      sfx('save');
    }
  };
  const renameSection = async id => {
    const s = data.sections.find(x => x.id === id);
    if (!s) return;
    const name = await ask({
      title: 'Переименовать раздел',
      code: 'DIR.SECTIONS // RENAME',
      input: true,
      value: s.name,
      ok: 'Сохранить'
    });
    if (name && name.trim()) up('sections', ss => ss.map(x => x.id === id ? {
      ...x,
      name: name.trim().toUpperCase()
    } : x));
  };
  const moveSection = (id, dir) => up('sections', ss => {
    const i = ss.findIndex(x => x.id === id),
      j = i + dir;
    if (i < 0 || j < 0 || j >= ss.length) return ss;
    const a = ss.slice();
    [a[i], a[j]] = [a[j], a[i]];
    return a;
  });
  const deleteSection = async id => {
    const s = data.sections.find(x => x.id === id);
    if (!s) return;
    const ids = data.missions.filter(m => m.sectionId === id).map(m => m.id);
    const other = data.sections.find(x => x.id !== id);
    const text = !ids.length ? `Раздел «${s.name}» пуст и будет удалён.` : other ? `В разделе «${s.name}» ${ids.length} ${plural(ids.length, 'миссия', 'миссии', 'миссий')}. Они будут перенесены в «${other.name}».` : `Вместе с разделом будут удалены ${ids.length} ${plural(ids.length, 'миссия', 'миссии', 'миссий')}.`;
    const ok = await ask({
      title: 'Удалить раздел?',
      code: 'DIR.SECTIONS // DELETE',
      text,
      ok: 'Удалить',
      danger: true
    });
    if (ok !== true) return;
    undoable('Раздел удалён', ['sections', 'missions', 'timers'], () => {
      if (other) up('missions', ms => ms.map(m => m.sectionId === id ? {
        ...m,
        sectionId: other.id
      } : m));else {
        up('missions', ms => ms.filter(m => m.sectionId !== id));
        up('timers', ts => ts.filter(t => !ids.includes(t.missionId)));
      }
      up('sections', ss => ss.filter(x => x.id !== id));
    });
  };
  const addTag = async () => {
    const name = await ask({
      title: 'Новый тег',
      code: 'DIR.TAGS // ADD',
      input: true,
      placeholder: 'например: работа',
      ok: 'Создать'
    });
    if (!name || !name.trim()) return null;
    const t = {
      id: uid('tg'),
      name: name.trim().replace(/^#+/, '').toLowerCase(),
      color: TAG_COLORS[data.tags.length % TAG_COLORS.length]
    };
    up('tags', ts => [...ts, t]);
    sfx('save');
    return t;
  };
  const renameTag = async id => {
    const t = data.tags.find(x => x.id === id);
    if (!t) return;
    const name = await ask({
      title: 'Переименовать тег',
      code: 'DIR.TAGS // RENAME',
      input: true,
      value: t.name,
      ok: 'Сохранить'
    });
    if (name && name.trim()) up('tags', ts => ts.map(x => x.id === id ? {
      ...x,
      name: name.trim().replace(/^#+/, '').toLowerCase()
    } : x));
  };
  const recolorTag = (id, color) => up('tags', ts => ts.map(x => x.id === id ? {
    ...x,
    color
  } : x));
  const deleteTag = async id => {
    const t = data.tags.find(x => x.id === id);
    if (!t) return;
    const ok = await ask({
      title: 'Удалить тег?',
      code: 'DIR.TAGS // DELETE',
      text: `Тег #${t.name} будет снят со всех записей дневника.`,
      ok: 'Удалить',
      danger: true
    });
    if (ok !== true) return;
    undoable('Тег удалён', ['shards', 'tags'], () => {
      up('shards', ss => ss.map(s => ({
        ...s,
        tags: s.tags.filter(x => x !== id)
      })));
      up('tags', ts => ts.filter(x => x.id !== id));
    });
  };
  return {
    addSection,
    renameSection,
    moveSection,
    deleteSection,
    addTag,
    renameTag,
    recolorTag,
    deleteTag
  };
}
function TriangleIcon({
  collapsed
}) {
  return React.createElement("svg", {
    width: "22",
    height: "18",
    viewBox: "0 0 22 18",
    style: {
      transform: collapsed ? 'rotate(-90deg)' : 'none',
      transition: 'transform .2s',
      filter: 'drop-shadow(0 0 4px var(--main))'
    }
  }, React.createElement("polygon", {
    points: "2,2 20,2 11,16",
    fill: "none",
    style: {
      stroke: 'var(--main)'
    },
    strokeWidth: "1.8",
    strokeLinejoin: "round"
  }));
}
function SectionHeader({
  name,
  count,
  collapsed,
  onToggle,
  onMenu
}) {
  if (UI.mono) return React.createElement("div", {
    className: "flex items-center gap-1 pt-1"
  }, React.createElement("button", {
    type: "button",
    onClick: onToggle,
    className: "flex-1 flex items-baseline gap-2 py-1.5 text-left min-w-0"
  }, React.createElement("span", {
    className: "sec-title truncate"
  }, nice(name)), React.createElement("span", {
    className: "text-[13px] font-semibold text-white/35 shrink-0"
  }, count)), onMenu && React.createElement("button", {
    type: "button",
    "aria-label": "\u041C\u0435\u043D\u044E \u0440\u0430\u0437\u0434\u0435\u043B\u0430",
    onClick: () => {
      sfx();
      onMenu();
    },
    className: "w-9 h-9 flex items-center justify-center text-white/45"
  }, React.createElement(MoreVertical, {
    size: 18
  })), onToggle && React.createElement("button", {
    type: "button",
    "aria-label": "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",
    onClick: onToggle,
    className: "w-9 h-9 flex items-center justify-center text-white/60"
  }, React.createElement(ChevronDown, {
    size: 20,
    style: {
      transform: collapsed ? 'rotate(-90deg)' : 'none',
      transition: 'transform .2s'
    }
  })));
  return React.createElement("div", {
    className: "flex items-stretch"
  }, React.createElement("div", {
    className: "w-[4px] mr-1.5 shrink-0",
    style: {
      background: 'rgba(var(--main-rgb),.6)',
      boxShadow: '0 0 8px rgba(var(--main-rgb),.5)'
    }
  }), React.createElement(Frame, {
    cut: 16,
    className: "flex-1 min-w-0",
    color: "rgba(var(--main-rgb),.6)",
    bg: "linear-gradient(90deg,rgba(42,20,46,.94),rgba(22,14,34,.94))"
  }, React.createElement("div", {
    className: "flex items-center"
  }, React.createElement("button", {
    type: "button",
    onClick: onToggle,
    className: "flex-1 flex items-center gap-2.5 pl-4 pr-2 py-3.5 text-left min-w-0"
  }, React.createElement("span", {
    className: "sec-title truncate"
  }, name), React.createElement("span", {
    className: "f-mono text-[11px] text-white/40 shrink-0"
  }, "[", count, "]")), onMenu && React.createElement("button", {
    type: "button",
    "aria-label": "\u041C\u0435\u043D\u044E \u0440\u0430\u0437\u0434\u0435\u043B\u0430",
    onClick: () => {
      sfx();
      onMenu();
    },
    className: "px-2 py-3 text-white/45"
  }, React.createElement(MoreVertical, {
    size: 18
  })), onToggle && React.createElement("button", {
    type: "button",
    "aria-label": "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",
    onClick: onToggle,
    className: "pr-4 pl-1 py-3"
  }, React.createElement(TriangleIcon, {
    collapsed: collapsed
  })))));
}
function ArchiveHeader({
  count,
  open,
  onToggle
}) {
  if (UI.mono) return React.createElement("button", {
    type: "button",
    onClick: onToggle,
    className: "mono-row w-full flex items-center gap-3 px-4 py-3.5 text-left"
  }, React.createElement(Archive, {
    size: 19,
    className: "shrink-0 text-white/60"
  }), React.createElement("span", {
    className: "flex-1 min-w-0 text-[16px] font-semibold text-white"
  }, "\u0410\u0440\u0445\u0438\u0432 \xB7 \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D\u043D\u044B\u0435"), React.createElement("span", {
    className: "mono-pill"
  }, count), React.createElement(ChevronDown, {
    size: 18,
    className: "shrink-0 text-white/50",
    style: {
      transform: open ? 'none' : 'rotate(-90deg)',
      transition: 'transform .2s'
    }
  }));
  return React.createElement("div", {
    className: "flex items-stretch"
  }, React.createElement("div", {
    className: "w-[4px] mr-1.5 shrink-0",
    style: {
      background: 'rgba(var(--alt-rgb),.55)',
      boxShadow: '0 0 8px rgba(var(--alt-rgb),.45)'
    }
  }), React.createElement(Frame, {
    cut: 16,
    className: "flex-1 min-w-0",
    color: "rgba(var(--alt-rgb),.55)",
    bg: "repeating-linear-gradient(135deg,rgba(10,18,24,.95) 0 10px,rgba(14,24,32,.95) 10px 20px)"
  }, React.createElement("button", {
    type: "button",
    onClick: onToggle,
    className: "w-full flex items-center gap-3 pl-4 pr-4 py-3 text-left"
  }, React.createElement(Database, {
    size: 18,
    className: "txt-alt shrink-0",
    style: {
      filter: 'drop-shadow(0 0 4px var(--alt))'
    }
  }), React.createElement("span", {
    className: "min-w-0 flex-1"
  }, React.createElement("span", {
    className: "block text-[17px] font-bold tracking-[.06em] uppercase txt-alt glow-alt leading-tight"
  }, "\u0410\u0440\u0445\u0438\u0432: \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044B\u0435 \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u044B"), React.createElement("span", {
    className: "block micro mt-1",
    style: {
      color: 'rgba(var(--alt-rgb),.6)'
    }
  }, "ARCHIVE // CLOSED.CONTRACTS")), React.createElement("span", {
    className: "cut shrink-0 f-orb font-black text-[14px] px-2 py-1",
    style: {
      '--cut': '5px',
      color: '#06080a',
      background: 'var(--alt)'
    }
  }, count), React.createElement("svg", {
    width: "20",
    height: "16",
    viewBox: "0 0 22 18",
    className: "shrink-0",
    style: {
      transform: open ? 'none' : 'rotate(-90deg)',
      transition: 'transform .2s',
      filter: 'drop-shadow(0 0 4px var(--alt))'
    }
  }, React.createElement("polygon", {
    points: "2,2 20,2 11,16",
    fill: "none",
    style: {
      stroke: 'var(--alt)'
    },
    strokeWidth: "1.8",
    strokeLinejoin: "round"
  })))));
}
function MissionRow({
  m,
  open,
  onToggle
}) {
  const done = m.steps.filter(s => s.done).length;
  return React.createElement("div", {
    className: `flex items-stretch gap-1.5 ${m.done && !open ? 'opacity-75' : ''}`
  }, React.createElement("div", {
    className: "w-8 shrink-0 flex items-center justify-center"
  }, React.createElement(ChipIcon, {
    active: open,
    dim: m.done && !open
  })), React.createElement("div", {
    className: "relative flex-1 min-w-0"
  }, m.alert && !m.done && React.createElement("span", {
    className: "alert-tag"
  }, "!"), React.createElement("button", {
    type: "button",
    onClick: onToggle,
    className: "block w-full text-left"
  }, React.createElement(Frame, {
    cut: 14,
    color: open ? 'var(--sel2)' : m.done ? 'rgba(var(--alt-rgb),.3)' : 'rgba(var(--main-rgb),.42)',
    bg: open ? 'linear-gradient(90deg,var(--sel1),var(--sel2))' : m.done ? 'repeating-linear-gradient(135deg,rgba(14,12,20,.96) 0 8px,rgba(20,17,28,.96) 8px 16px)' : undefined,
    mc: open ? 'rgba(var(--alt-rgb),.55)' : undefined,
    mb: open ? '#1C1C1E' : undefined
  }, React.createElement("div", {
    className: "flex items-center gap-2 pl-2.5 pr-3 py-3"
  }, React.createElement(MissionBadge, {
    badge: m.badge
  }), React.createElement("div", {
    className: "min-w-0 flex-1"
  }, React.createElement("div", {
    className: "m-title",
    style: open ? {
      color: 'var(--sel-fg, var(--alt))',
      textShadow: 'var(--sel-shadow)'
    } : undefined
  }, nice(m.title || 'БЕЗ НАЗВАНИЯ')), React.createElement("div", {
    className: "m-status",
    style: {
      color: open ? `var(--sel-sub, ${m.statusColor || 'var(--warn)'})` : m.statusColor || 'var(--warn)',
      textShadow: open ? 'var(--sel-shadow)' : 'none'
    }
  }, nice(m.status))), React.createElement("div", {
    className: "flex flex-col items-end gap-1.5 shrink-0 self-stretch justify-between"
  }, m.done ? React.createElement("span", {
    className: "done-stamp"
  }, "DONE") : m.isNew ? React.createElement("span", {
    className: "new-tag"
  }, "NEW") : React.createElement("span", null), m.steps.length > 0 && React.createElement("span", {
    className: "f-mono text-[11px]",
    style: {
      color: open && !UI.mono ? 'rgba(0,0,0,.6)' : 'rgba(255,255,255,.5)'
    }
  }, done, "/", m.steps.length)))))));
}
function MissionDetail({
  m,
  archived,
  sectionName,
  onEdit,
  onMove,
  onDelete,
  onToggleStep,
  onToggleDone,
  onResume
}) {
  const {
    data,
    openFocus
  } = useApp();
  const fSessions = data.focus.sessions.filter(s => s.missionId === m.id);
  const fMin = fSessions.reduce((x, s) => x + focusMin(s), 0);
  const firstOpen = archived ? -1 : m.steps.findIndex(s => !s.done && !s.optional);
  const dl = parseLocal(m.deadline);
  const left = dl ? Math.ceil((dl - Date.now()) / 864e5) : null;
  return React.createElement("div", {
    className: "ml-[38px] mt-1.5 mb-1"
  }, React.createElement(Frame, {
    cut: 14,
    color: "rgba(var(--main-rgb),.35)",
    bg: "linear-gradient(180deg,rgba(16,8,14,.97),rgba(8,6,12,.97))"
  }, React.createElement("div", {
    className: "p-4"
  }, React.createElement("div", {
    className: "micro deco mb-1"
  }, archived ? 'ARCHIVE.RECORD' : 'MISSION.DATA', " // ", m.id.slice(-6).toUpperCase()), React.createElement("div", {
    className: "text-[22px] font-semibold tracking-wider uppercase txt-main glow-main leading-tight"
  }, nice(m.title)), archived && React.createElement("div", {
    className: "mt-2 flex flex-wrap items-center gap-2"
  }, React.createElement("span", {
    className: "done-stamp"
  }, "CONTRACT CLOSED"), React.createElement("span", {
    className: "f-mono text-[11px] tracking-wider text-white/55"
  }, m.completedAt ? fmtDT(m.completedAt) : '—', sectionName ? ` · ${sectionName}` : '')), m.steps.length > 0 && React.createElement("div", {
    className: "mt-3 space-y-2.5"
  }, m.steps.map((s, i) => React.createElement("button", {
    key: s.id,
    type: "button",
    disabled: archived,
    onClick: () => onToggleStep(s.id, !s.done),
    className: "flex items-start gap-3 w-full text-left"
  }, React.createElement("span", {
    className: `step-box ${s.done ? 'done' : i === firstOpen ? 'cur' : ''}`
  }, s.done ? React.createElement(Check, {
    size: 15,
    strokeWidth: 3
  }) : i === firstOpen ? '!' : ''), React.createElement("span", {
    className: `text-[16px] font-semibold uppercase tracking-wide leading-snug ${s.done ? 'line-through text-white/35' : archived ? 'text-white/55' : 'txt-alt glow-alt'}`
  }, s.text, s.optional && React.createElement("span", {
    className: "opacity-75"
  }, " [OPTIONAL]"))))), m.image && React.createElement("div", {
    className: "mt-4"
  }, React.createElement("div", {
    className: `cut ${m.holo ? 'holo' : ''}`,
    style: {
      '--cut': '14px',
      background: 'rgba(var(--main-rgb),.5)',
      padding: 1
    }
  }, React.createElement(Img, {
    src: m.image,
    className: "w-full h-44 object-cover block cut",
    style: {
      '--cut': '13px'
    }
  })), m.imageCaption && React.createElement("div", {
    className: "flex items-center gap-1.5 mt-1.5 txt-main text-sm font-semibold tracking-widest uppercase"
  }, React.createElement(Link, {
    size: 13
  }), m.imageCaption)), m.description && React.createElement("div", {
    className: "mt-4 pt-3",
    style: {
      borderTop: '1px solid rgba(var(--main-rgb),.25)'
    }
  }, React.createElement(NeonScroll, {
    maxH: 220
  }, React.createElement("div", {
    className: "desc"
  }, m.description))), dl && React.createElement("div", {
    className: "mt-4 flex flex-wrap items-center gap-2 text-[12px] f-mono tracking-wider",
    style: {
      color: left < 0 ? '#FF5A5A' : 'var(--warn)'
    }
  }, React.createElement(Clock, {
    size: 14
  }), " \u0414\u0415\u0414\u041B\u0410\u0419\u041D: ", fmtDT(dl), " \xB7 ", left > 0 ? `${left} ДН.` : left === 0 ? 'СЕГОДНЯ' : 'ПРОСРОЧЕНО', m.countdown && React.createElement("span", {
    className: "done-stamp"
  }, "\u041E\u0422\u0421\u0427\u0401\u0422 \u2713")), fSessions.length > 0 && React.createElement("div", {
    className: "mt-3 flex items-center gap-2 text-[12px] f-mono tracking-wider txt-alt"
  }, React.createElement(Brain, {
    size: 14
  }), " \u0424\u041E\u041A\u0423\u0421: ", fmtMin(fMin).toUpperCase(), " \xB7 ", fSessions.length, " ", plural(fSessions.length, 'СЕССИЯ', 'СЕССИИ', 'СЕССИЙ')), archived ? React.createElement("div", {
    className: "grid grid-cols-1 gap-2 mt-4"
  }, React.createElement(Btn, {
    small: true,
    variant: "alt",
    icon: RotateCcw,
    snd: "none",
    onClick: onResume
  }, "\u0412\u043E\u0437\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442"), React.createElement(Btn, {
    small: true,
    variant: "dangerGhost",
    icon: Trash2,
    onClick: onDelete
  }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430")) : React.createElement("div", {
    className: "grid grid-cols-2 gap-2 mt-4"
  }, React.createElement(Btn, {
    small: true,
    className: "col-span-2",
    icon: Brain,
    snd: "open",
    onClick: () => openFocus(m.id)
  }, "\u0424\u043E\u043A\u0443\u0441-\u0441\u0435\u0441\u0441\u0438\u044F"), React.createElement(Btn, {
    small: true,
    variant: "ghost",
    icon: Pencil,
    onClick: onEdit
  }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"), React.createElement(Btn, {
    small: true,
    variant: "ghost",
    icon: FolderInput,
    onClick: onMove
  }, "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C"), React.createElement(Btn, {
    small: true,
    variant: "alt",
    icon: Check,
    snd: "none",
    onClick: onToggleDone
  }, "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C"), React.createElement(Btn, {
    small: true,
    variant: "dangerGhost",
    icon: Trash2,
    onClick: onDelete
  }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")))));
}
const DANGER_LEVELS = [{
  status: 'DANGER: LOW',
  color: '#00F0FF'
}, {
  status: 'DANGER: MODERATE',
  color: ''
}, {
  status: 'DANGER: HIGH',
  color: '#FF8A3D'
}, {
  status: 'DANGER: VERY HIGH',
  color: '#FF2A2A'
}];
function DangerIcon({
  level,
  color
}) {
  return React.createElement("svg", {
    width: "34",
    height: "24",
    viewBox: "0 0 34 24",
    "aria-hidden": "true"
  }, [0, 1, 2, 3].map(i => {
    const h = 6 + i * 5,
      x = 2 + i * 8;
    const on = i < level;
    if (UI.mono) return React.createElement("rect", {
      key: i,
      x: x + 0.5,
      y: 24 - h + 0.5,
      width: "6",
      height: h - 1,
      rx: "2",
      strokeOpacity: on ? 1 : 0.35,
      strokeWidth: "1",
      style: {
        fill: on ? color : 'none',
        stroke: color
      }
    });
    return React.createElement("polygon", {
      key: i,
      points: `${x + 3},${24 - h} ${x + 7},${24 - h} ${x + 4},24 ${x},24`,
      strokeOpacity: on ? 1 : 0.35,
      strokeWidth: "1",
      style: {
        fill: on ? color : 'none',
        stroke: color,
        filter: on ? `drop-shadow(0 0 3px ${color})` : 'none'
      }
    });
  }));
}
const BADGE_SHAPES = [['diamond', 'Ромб'], ['square', 'Квадрат'], ['triangle', 'Треугольник'], ['circle', 'Круг'], ['none', 'Нет']];
function MissionEditor({
  initial,
  onSave,
  onClose
}) {
  const {
    data,
    toast
  } = useApp();
  const [m, setM] = useState(() => JSON.parse(JSON.stringify(initial)));
  const set = patch => setM(x => ({
    ...x,
    ...patch
  }));
  const setBadge = patch => setM(x => ({
    ...x,
    badge: {
      ...x.badge,
      ...patch
    }
  }));
  const setStep = (id, patch) => setM(x => ({
    ...x,
    steps: x.steps.map(s => s.id === id ? {
      ...s,
      ...patch
    } : s)
  }));
  const moveStepUp = i => setM(x => {
    if (i < 1) return x;
    const a = x.steps.slice();
    [a[i - 1], a[i]] = [a[i], a[i - 1]];
    return {
      ...x,
      steps: a
    };
  });
  const isNew = !data.missions.some(x => x.id === m.id);
  const save = () => {
    if (!m.title.trim()) {
      sfx('error');
      toast('Укажи название миссии');
      return;
    }
    onSave(m);
  };
  return React.createElement(Modal, {
    full: true,
    title: isNew ? 'Новая миссия' : 'Редактор миссии',
    code: "JOURNAL // MISSION.EDIT",
    onClose: onClose,
    footer: React.createElement(React.Fragment, null, React.createElement(Btn, {
      variant: "ghost",
      className: "flex-1",
      onClick: onClose
    }, "\u041E\u0442\u043C\u0435\u043D\u0430"), React.createElement(Btn, {
      className: "flex-[2]",
      icon: Save,
      snd: "none",
      onClick: save
    }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))
  }, React.createElement("div", {
    className: "mb-5 pointer-events-none"
  }, React.createElement(MissionRow, {
    m: {
      ...m,
      title: m.title || 'НАЗВАНИЕ МИССИИ'
    },
    open: false,
    onToggle: () => {}
  })), React.createElement(Field, {
    label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u0438\u0441\u0441\u0438\u0438"
  }, React.createElement("input", {
    className: "inp uppercase",
    value: m.title,
    placeholder: "THE HEIST",
    onChange: e => set({
      title: e.target.value
    })
  })), React.createElement(Field, {
    label: "\u0420\u0430\u0437\u0434\u0435\u043B (\u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435)"
  }, React.createElement("select", {
    className: "inp",
    value: m.sectionId,
    onChange: e => set({
      sectionId: e.target.value
    })
  }, data.sections.map(s => React.createElement("option", {
    key: s.id,
    value: s.id
  }, s.name)))), React.createElement(Field, {
    label: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C \u0441\u0442\u0430\u0442\u0443\u0441\u0430 / \u0432\u0430\u0436\u043D\u043E\u0441\u0442\u0438"
  }, React.createElement("input", {
    className: "inp uppercase",
    value: m.status,
    onChange: e => set({
      status: e.target.value
    }),
    placeholder: "DANGER: MODERATE"
  }), React.createElement("div", {
    className: "flex gap-2 mt-2"
  }, DANGER_LEVELS.map((d, i) => {
    const col = d.color || 'var(--warn)',
      active = m.status === d.status;
    return React.createElement("button", {
      key: d.status,
      type: "button",
      title: d.status,
      "aria-label": d.status,
      "aria-pressed": active,
      className: "cut flex-1 flex items-center justify-center py-2",
      style: {
        '--cut': '7px',
        background: active ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.35)',
        boxShadow: `inset 0 0 0 1px ${active ? col : 'rgba(255,255,255,.14)'}`
      },
      onClick: () => {
        sfx();
        set({
          status: d.status,
          statusColor: d.color
        });
      }
    }, React.createElement(DangerIcon, {
      level: i + 1,
      color: col
    }));
  }))), React.createElement(Field, {
    label: "\u0426\u0432\u0435\u0442 \u043F\u043E\u0434\u043F\u0438\u0441\u0438"
  }, React.createElement(ColorRow, {
    value: m.statusColor,
    onChange: c => set({
      statusColor: c
    }),
    presets: ['#FCEE0A', '#FFB547', '#FF8A3D', '#FF2A2A', '#00F0FF', '#59FF00', '#FFFFFF']
  })), React.createElement("div", {
    className: "mb-4 px-3 py-1",
    style: {
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.1)'
    }
  }, React.createElement(Toggle, {
    on: m.alert,
    onChange: v => set({
      alert: v
    }),
    label: "\u0418\u043D\u0434\u0438\u043A\u0430\u0442\u043E\u0440 \xAB!\xBB",
    hint: "\u0416\u0451\u043B\u0442\u044B\u0439 \u0444\u043B\u0430\u0436\u043E\u043A \u0432\u0430\u0436\u043D\u043E\u0441\u0442\u0438 \u0443 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438"
  }), React.createElement(Toggle, {
    on: m.isNew,
    onChange: v => set({
      isNew: v
    }),
    label: "\u041C\u0435\u0442\u043A\u0430 NEW"
  })), React.createElement(Field, {
    label: "\u0417\u043D\u0430\u0447\u043E\u043A / \u0448\u0442\u0430\u043C\u043F"
  }, React.createElement("div", {
    className: "flex items-center gap-3 mb-2"
  }, React.createElement("div", {
    className: "p-2",
    style: {
      background: 'rgba(0,0,0,.4)',
      minWidth: 62,
      minHeight: 62
    }
  }, React.createElement(MissionBadge, {
    badge: m.badge
  })), React.createElement("input", {
    className: "inp flex-1 min-w-0 uppercase",
    maxLength: 7,
    value: m.badge.text,
    onChange: e => setBadge({
      text: e.target.value.toUpperCase()
    }),
    placeholder: "\u0422\u0435\u043A\u0441\u0442 (WB, EDU\u2026)"
  })), React.createElement("div", {
    className: "flex flex-wrap gap-1.5 mb-2"
  }, BADGE_SHAPES.map(([v, l]) => React.createElement("button", {
    key: v,
    type: "button",
    onClick: () => {
      sfx();
      setBadge({
        shape: v
      });
    },
    className: `tag cut ${m.badge.shape === v ? 'on' : ''}`,
    style: {
      '--tc': 'var(--alt)',
      '--cut': '5px'
    }
  }, l))), React.createElement(ColorRow, {
    value: m.badge.color,
    onChange: c => setBadge({
      color: c
    }),
    presets: ['#F5B83D', '#E0262E', '#00A8C6', '#59FF00', '#FFFFFF', '#B98CF0']
  })), React.createElement(Field, {
    label: "\u0428\u0430\u0433\u0438 \u043C\u0438\u0441\u0441\u0438\u0438 (\u0447\u0435\u043A-\u0431\u043E\u043A\u0441\u044B)"
  }, m.steps.map((s, i) => React.createElement("div", {
    key: s.id,
    className: "flex gap-1.5 items-center mb-2"
  }, React.createElement("span", {
    className: `step-box ${s.done ? 'done' : ''}`,
    onClick: () => setStep(s.id, {
      done: !s.done
    })
  }, s.done && React.createElement(Check, {
    size: 14,
    strokeWidth: 3
  })), React.createElement("input", {
    className: "inp flex-1 min-w-0",
    value: s.text,
    placeholder: `Шаг ${i + 1}`,
    onChange: e => setStep(s.id, {
      text: e.target.value
    })
  }), React.createElement("button", {
    type: "button",
    onClick: () => {
      sfx();
      setStep(s.id, {
        optional: !s.optional
      });
    },
    className: `tag cut ${s.optional ? 'on' : ''}`,
    style: {
      '--tc': 'var(--warn)',
      '--cut': '5px',
      padding: '9px 6px'
    }
  }, "OPT"), i > 0 && React.createElement(IconBtn, {
    sm: true,
    icon: ArrowUp,
    onClick: () => moveStepUp(i),
    title: "\u0412\u044B\u0448\u0435"
  }), React.createElement(IconBtn, {
    sm: true,
    red: true,
    icon: X,
    onClick: () => setM(x => ({
      ...x,
      steps: x.steps.filter(y => y.id !== s.id)
    })),
    title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0448\u0430\u0433"
  }))), React.createElement(Btn, {
    small: true,
    variant: "ghost",
    icon: Plus,
    onClick: () => setM(x => ({
      ...x,
      steps: [...x.steps, step('')]
    }))
  }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0448\u0430\u0433"), React.createElement("div", {
    className: "text-[11px] text-white/40 mt-1.5 f-read"
  }, "OPT \u2014 \u043F\u043E\u043C\u0435\u0442\u043A\u0430 [OPTIONAL] \u0434\u043B\u044F \u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u043F\u0443\u043D\u043A\u0442\u0430.")), React.createElement(Field, {
    label: "\u0424\u043E\u0442\u043E \u043C\u0438\u0441\u0441\u0438\u0438 (URL \u0438\u043B\u0438 \u0444\u0430\u0439\u043B)"
  }, React.createElement(ImageInput, {
    value: m.image,
    onChange: v => set({
      image: v
    })
  })), m.image && React.createElement(React.Fragment, null, React.createElement(Field, {
    label: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C \u043A \u0444\u043E\u0442\u043E"
  }, React.createElement("input", {
    className: "inp uppercase",
    value: m.imageCaption,
    onChange: e => set({
      imageCaption: e.target.value
    }),
    placeholder: "AV"
  })), React.createElement("div", {
    className: "mb-4 px-3 py-1",
    style: {
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.1)'
    }
  }, React.createElement(Toggle, {
    on: m.holo,
    onChange: v => set({
      holo: v
    }),
    label: "\u0413\u043E\u043B\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043A\u0440\u0430\u0441\u043D\u044B\u0439 \u0444\u0438\u043B\u044C\u0442\u0440"
  }))), React.createElement(Field, {
    label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"
  }, React.createElement("textarea", {
    className: "inp",
    rows: 7,
    value: m.description,
    onChange: e => set({
      description: e.target.value
    }),
    placeholder: "\u0411\u0440\u0438\u0444\u0438\u043D\u0433 \u043C\u0438\u0441\u0441\u0438\u0438\u2026"
  })), React.createElement(Field, {
    label: "\u0414\u0435\u0434\u043B\u0430\u0439\u043D (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)"
  }, React.createElement("div", {
    className: "flex gap-2"
  }, React.createElement("input", {
    type: "datetime-local",
    className: "inp flex-1 min-w-0",
    value: m.deadline,
    onChange: e => set({
      deadline: e.target.value
    })
  }), m.deadline && React.createElement(IconBtn, {
    icon: X,
    onClick: () => set({
      deadline: '',
      countdown: false
    }),
    title: "\u0423\u0431\u0440\u0430\u0442\u044C \u0434\u0435\u0434\u043B\u0430\u0439\u043D"
  }))), m.deadline && React.createElement("div", {
    className: "mb-4 px-3 py-1",
    style: {
      boxShadow: 'inset 0 0 0 1px rgba(var(--alt-rgb),.3)'
    }
  }, React.createElement(Toggle, {
    on: m.countdown,
    onChange: v => set({
      countdown: v
    }),
    label: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u043E\u0442\u0441\u0447\u0451\u0442\u0430 \u043D\u0430 3-\u043C \u044D\u043A\u0440\u0430\u043D\u0435",
    hint: "\u0422\u0430\u0439\u043C\u0435\u0440 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0432 \u043B\u0435\u043D\u0442\u0435 \xAB\u041E\u0442\u0441\u0447\u0451\u0442 \u0432\u0440\u0435\u043C\u0435\u043D\u0438\xBB \u0438 \u0431\u0443\u0434\u0435\u0442 \u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u0437\u0430 \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u043E\u043C"
  })));
}
function ShardItem({
  s,
  tagById,
  onOpen
}) {
  return React.createElement("button", {
    type: "button",
    onClick: onOpen,
    className: "block w-full text-left"
  }, React.createElement("div", {
    className: "flex items-stretch gap-1.5"
  }, React.createElement("div", {
    className: "w-8 shrink-0 flex items-center justify-center"
  }, React.createElement(ChipIcon, {
    kind: "shard"
  })), React.createElement(Frame, {
    cut: 14,
    className: "flex-1 min-w-0",
    color: "rgba(var(--main-rgb),.4)"
  }, React.createElement("div", {
    className: "p-3 flex gap-3"
  }, s.image && React.createElement(Img, {
    src: s.image,
    thumb: true,
    loading: "lazy",
    className: "w-14 h-14 object-cover shrink-0 cut",
    style: {
      '--cut': '6px'
    }
  }), React.createElement("div", {
    className: "min-w-0 flex-1"
  }, React.createElement("div", {
    className: "m-title text-[17px] truncate"
  }, s.title || 'Без названия'), React.createElement("div", {
    className: "micro mt-1",
    style: {
      color: 'rgba(var(--alt-rgb),.6)'
    }
  }, fmtDT(s.createdAt), s.updatedAt && s.updatedAt !== s.createdAt ? ' · ИЗМ.' : ''), s.body && React.createElement("div", {
    className: "text-[13.5px] text-white/60 mt-1.5 f-read leading-snug",
    style: {
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, s.body), s.tags.length > 0 && React.createElement("div", {
    className: "flex flex-wrap gap-1 mt-2"
  }, s.tags.map(id => React.createElement(TagChip, {
    key: id,
    tag: tagById[id],
    small: true
  }))))))));
}
function ShardReader({
  s,
  tagById,
  onEdit,
  onDelete,
  onClose
}) {
  const words = (s.body || '').trim().split(/\s+/).filter(Boolean).length;
  return React.createElement(Modal, {
    full: true,
    title: s.title || 'Без названия',
    code: "DATA SHARD // READ MODE",
    onClose: onClose,
    footer: React.createElement(React.Fragment, null, React.createElement(Btn, {
      variant: "dangerGhost",
      icon: Trash2,
      onClick: onDelete
    }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"), React.createElement(Btn, {
      className: "flex-1",
      icon: Pencil,
      onClick: onEdit
    }, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"))
  }, s.tags.length > 0 && React.createElement("div", {
    className: "flex flex-wrap gap-1.5 mb-3"
  }, s.tags.map(id => React.createElement(TagChip, {
    key: id,
    tag: tagById[id]
  }))), React.createElement("div", {
    className: "micro mb-4",
    style: {
      color: 'rgba(var(--alt-rgb),.6)'
    }
  }, "\u0421\u041E\u0417\u0414\u0410\u041D\u041E: ", fmtDT(s.createdAt), s.updatedAt && s.updatedAt !== s.createdAt ? ` · ИЗМЕНЕНО: ${fmtDT(s.updatedAt)}` : ''), s.image && React.createElement(Img, {
    src: s.image,
    className: "w-full min-h-[120px] mb-4 cut",
    style: {
      '--cut': '14px'
    }
  }), React.createElement("div", {
    className: "f-read text-[17px] leading-[1.75] text-white/90 whitespace-pre-wrap break-words"
  }, s.body || React.createElement("span", {
    className: "text-white/35"
  }, "\u041F\u0443\u0441\u0442\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C")), React.createElement("div", {
    className: "micro mt-8"
  }, UI.mono ? '' : '// END OF SHARD · ', words, " ", plural(words, 'слово', 'слова', 'слов')));
}
function ShardEditor({
  initial,
  onSave,
  onClose
}) {
  const {
    data,
    toast
  } = useApp();
  const ops = useDirOps();
  const [s, setS] = useState(() => ({
    ...initial,
    tags: [...initial.tags]
  }));
  const isNew = !data.shards.some(x => x.id === s.id);
  const toggleTag = id => setS(x => ({
    ...x,
    tags: x.tags.includes(id) ? x.tags.filter(t => t !== id) : [...x.tags, id]
  }));
  const save = () => {
    if (!s.title.trim() && !s.body.trim()) {
      sfx('error');
      toast('Пустую запись не сохранить');
      return;
    }
    const title = s.title.trim() || s.body.trim().split('\n')[0].slice(0, 48);
    onSave({
      ...s,
      title,
      updatedAt: new Date().toISOString()
    });
  };
  return React.createElement(Modal, {
    full: true,
    title: isNew ? 'Новый чип данных' : 'Редактор чипа',
    code: "DATA SHARD // WRITE",
    onClose: onClose,
    footer: React.createElement(React.Fragment, null, React.createElement(Btn, {
      variant: "ghost",
      className: "flex-1",
      onClick: onClose
    }, "\u041E\u0442\u043C\u0435\u043D\u0430"), React.createElement(Btn, {
      className: "flex-[2]",
      icon: Save,
      snd: "none",
      onClick: save
    }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))
  }, React.createElement("div", {
    className: "micro mb-4",
    style: {
      color: 'rgba(var(--alt-rgb),.6)'
    }
  }, "\u0412\u0420\u0415\u041C\u042F \u0417\u0410\u041F\u0418\u0421\u0418: ", fmtDT(s.createdAt), " \xB7 \u0424\u0418\u041A\u0421\u0418\u0420\u0423\u0415\u0422\u0421\u042F \u0410\u0412\u0422\u041E\u041C\u0410\u0422\u0418\u0427\u0415\u0421\u041A\u0418"), React.createElement(Field, {
    label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A"
  }, React.createElement("input", {
    className: "inp",
    value: s.title,
    onChange: e => setS({
      ...s,
      title: e.target.value
    }),
    placeholder: "\u041E \u0447\u0451\u043C \u044D\u0442\u0430 \u0437\u0430\u043F\u0438\u0441\u044C?"
  })), React.createElement(Field, {
    label: "\u0422\u0435\u043A\u0441\u0442 \u0437\u0430\u043F\u0438\u0441\u0438"
  }, React.createElement("textarea", {
    className: "inp f-read",
    rows: 14,
    style: {
      minHeight: '38vh',
      fontSize: 16,
      lineHeight: 1.65
    },
    value: s.body,
    onChange: e => setS({
      ...s,
      body: e.target.value
    }),
    placeholder: "\u041C\u044B\u0441\u043B\u0438, \u043A\u043E\u043D\u0441\u043F\u0435\u043A\u0442, \u0440\u0435\u0444\u043B\u0435\u043A\u0441\u0438\u044F \u0434\u043D\u044F\u2026"
  })), React.createElement(Field, {
    label: "\u0422\u0435\u0433\u0438"
  }, React.createElement("div", {
    className: "flex flex-wrap gap-1.5"
  }, data.tags.map(t => React.createElement(TagChip, {
    key: t.id,
    tag: t,
    on: s.tags.includes(t.id),
    onClick: () => toggleTag(t.id)
  })), React.createElement("button", {
    type: "button",
    className: "tag cut",
    style: {
      '--tc': 'rgba(255,255,255,.55)',
      '--cut': '5px'
    },
    onClick: async () => {
      const t = await ops.addTag();
      if (t) setS(x => ({
        ...x,
        tags: [...x.tags, t.id]
      }));
    }
  }, "+ \u043D\u043E\u0432\u044B\u0439 \u0442\u0435\u0433"))), React.createElement(Field, {
    label: "\u0424\u043E\u0442\u043E"
  }, React.createElement(ImageInput, {
    value: s.image,
    onChange: v => setS({
      ...s,
      image: v
    })
  })));
}
function MissionsScreen() {
  const {
    data,
    up,
    ask,
    toast,
    undoable
  } = useApp();
  const ops = useDirOps();
  const [mode, setModeRaw] = useState(() => {
    try {
      return sessionStorage.getItem('cj.mmode') || 'missions';
    } catch (e) {
      return 'missions';
    }
  });
  const setMode = v => {
    setModeRaw(v);
    try {
      sessionStorage.setItem('cj.mmode', v);
    } catch (e) {}
  };
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState(null);
  const [editM, setEditM] = useState(null);
  const [editS, setEditS] = useState(null);
  const [readId, setReadId] = useState(null);
  const [tagF, setTagF] = useState(null);
  const [sheet, setSheet] = useState(null);
  const ql = q.trim().toLowerCase();
  const tagById = useMemo(() => Object.fromEntries(data.tags.map(t => [t.id, t])), [data.tags]);
  const matchM = m => !ql || [m.title, m.status, m.description, ...m.steps.map(s => s.text)].join(' ').toLowerCase().includes(ql);
  const matchS = s => (!tagF || s.tags.includes(tagF)) && (!ql || [s.title, s.body, ...s.tags.map(t => tagById[t] ? tagById[t].name : '')].join(' ').toLowerCase().includes(ql));
  const saveMission = m => {
    const clean = {
      ...m,
      title: m.title.trim(),
      steps: m.steps.filter(s => s.text.trim())
    };
    up('missions', ms => ms.some(x => x.id === clean.id) ? ms.map(x => x.id === clean.id ? clean : x) : [...ms, clean]);
    up('timers', ts => {
      const linked = ts.find(t => t.missionId === clean.id);
      if (clean.countdown && clean.deadline) {
        if (linked) return ts.map(t => t.missionId === clean.id ? {
          ...t,
          title: clean.title,
          target: clean.deadline
        } : t);
        return [...ts, {
          ...blankTimer(),
          title: clean.title,
          sub: 'ДЕДЛАЙН МИССИИ',
          target: clean.deadline,
          bg: 'grid',
          font: 'orbitron',
          accent: '#00F0FF',
          missionId: clean.id
        }];
      }
      return linked ? ts.filter(t => t.missionId !== clean.id) : ts;
    });
    sfx('save');
    toast(clean.countdown && clean.deadline ? 'Миссия сохранена · отсчёт создан' : 'Миссия сохранена');
    setEditM(null);
    setOpenId(clean.id);
    up('sections', ss => ss.map(x => x.id === clean.sectionId ? {
      ...x,
      collapsed: false
    } : x));
  };
  const deleteMission = async m => {
    const ok = await ask({
      title: 'Удалить миссию?',
      code: 'JOURNAL // DELETE',
      text: `«${m.title}» будет удалена вместе с привязанным таймером.`,
      ok: 'Удалить',
      danger: true
    });
    if (ok !== true) return;
    undoable('Миссия удалена', ['missions', 'timers'], () => {
      up('missions', ms => ms.filter(x => x.id !== m.id));
      up('timers', ts => ts.filter(t => t.missionId !== m.id));
    });
    setOpenId(null);
  };
  const toggleStep = (m, sid, v) => {
    sfx(v ? 'check' : 'uncheck');
    up('missions', ms => ms.map(x => x.id === m.id ? {
      ...x,
      isNew: false,
      steps: x.steps.map(s => s.id === sid ? {
        ...s,
        done: v
      } : s)
    } : x));
    const req = m.steps.filter(s => !s.optional);
    if (v && req.length && req.every(s => s.id === sid || s.done)) toast('Все обязательные цели выполнены');
  };
  const toggleDone = m => {
    sfx('save');
    up('missions', ms => ms.map(x => x.id === m.id ? {
      ...x,
      done: true,
      isNew: false,
      alert: false,
      completedAt: new Date().toISOString()
    } : x));
    setOpenId(null);
    toast('MISSION COMPLETE · контракт в архиве');
  };
  const resumeMission = m => {
    sfx('open');
    const secId = data.sections.some(s => s.id === m.sectionId) ? m.sectionId : (data.sections[0] || {}).id;
    up('missions', ms => ms.map(x => x.id === m.id ? {
      ...x,
      done: false,
      completedAt: '',
      sectionId: secId
    } : x));
    up('sections', ss => ss.map(x => x.id === secId ? {
      ...x,
      collapsed: false
    } : x));
    setOpenId(m.id);
    const sec = data.sections.find(s => s.id === secId);
    toast(`Контракт возобновлён${sec ? ` · ${sec.name}` : ''}`);
  };
  const purgeMission = async m => {
    const ok = await ask({
      title: 'Удалить навсегда?',
      code: 'ARCHIVE // PURGE',
      text: `Запись о контракте «${m.title}» будет стёрта из архива.`,
      ok: 'Удалить навсегда',
      danger: true
    });
    if (ok !== true) return;
    undoable('Запись стёрта из архива', ['missions', 'timers'], () => {
      up('missions', ms => ms.filter(x => x.id !== m.id));
      up('timers', ts => ts.filter(t => t.missionId !== m.id));
    });
    setOpenId(null);
  };
  const saveShard = s => {
    up('shards', ss => ss.some(x => x.id === s.id) ? ss.map(x => x.id === s.id ? s : x) : [s, ...ss]);
    sfx('save');
    toast('Чип данных записан');
    setEditS(null);
    setReadId(s.id);
  };
  const deleteShard = async s => {
    const ok = await ask({
      title: 'Стереть чип данных?',
      code: 'DATA SHARD // ERASE',
      text: `«${s.title || 'Без названия'}» будет удалён.`,
      ok: 'Стереть',
      danger: true
    });
    if (ok !== true) return;
    undoable('Чип стёрт', ['shards'], () => up('shards', ss => ss.filter(x => x.id !== s.id)));
    setReadId(null);
  };
  const shards = data.shards.filter(matchS).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  const reading = readId && data.shards.find(x => x.id === readId);
  const sheetMission = sheet && sheet.type === 'move' && data.missions.find(x => x.id === sheet.id);
  const sheetSection = sheet && sheet.type === 'section' && data.sections.find(x => x.id === sheet.id);
  const secIndex = sheetSection ? data.sections.indexOf(sheetSection) : -1;
  return React.createElement("div", {
    className: "pb-8"
  }, React.createElement(ScreenHeader, {
    code: "PROTOCOL 4520-A48 // JOURNAL.EXE",
    title: mode === 'missions' ? 'Журнал миссий' : 'Чипы данных',
    sub: mode === 'missions' ? `${data.missions.filter(m => !m.done).length} активных · ${data.missions.filter(m => m.done).length} завершено` : `${data.shards.length} ${plural(data.shards.length, 'запись', 'записи', 'записей')} в дневнике`
  }), React.createElement("div", {
    className: "px-4 mt-3"
  }, React.createElement(Segmented, {
    value: mode,
    onChange: v => {
      setMode(v);
      setQ('');
    },
    options: [{
      v: 'missions',
      l: 'Миссии',
      i: UI.mono ? Flag : Crosshair
    }, {
      v: 'shards',
      l: 'Чипы данных',
      i: UI.mono ? FileText : Cpu
    }]
  }), React.createElement("div", {
    className: "flex gap-2 mt-3"
  }, React.createElement("div", {
    className: "relative flex-1 min-w-0"
  }, React.createElement(Search, {
    size: 16,
    className: "absolute left-3 top-1/2 -translate-y-1/2 txt-alt opacity-70"
  }), React.createElement("input", {
    className: "inp",
    style: {
      paddingLeft: 36
    },
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: mode === 'missions' ? 'Поиск по миссиям…' : 'Поиск по записям и тегам…'
  }), q && React.createElement("button", {
    type: "button",
    onClick: () => setQ(''),
    className: "absolute right-2 top-1/2 -translate-y-1/2 text-white/50 p-1"
  }, React.createElement(X, {
    size: 16
  }))), React.createElement("button", {
    type: "button",
    "aria-label": "\u0421\u043E\u0437\u0434\u0430\u0442\u044C",
    className: "plus-btn cut",
    onClick: () => {
      sfx('open');
      if (mode === 'missions') setEditM(blankMission((data.sections[0] || {}).id));else setEditS(blankShard());
    }
  }, React.createElement(Plus, {
    size: 24,
    strokeWidth: 2.6
  })))), mode === 'missions' ? React.createElement("div", {
    className: "px-4 mt-4 space-y-3"
  }, data.sections.map(sec => {
    const list = data.missions.filter(m => !m.done && m.sectionId === sec.id && matchM(m));
    if (ql && !list.length) return null;
    const collapsed = sec.collapsed && !ql;
    return React.createElement("div", {
      key: sec.id
    }, React.createElement(SectionHeader, {
      name: sec.name,
      count: list.length,
      collapsed: collapsed,
      onToggle: () => {
        sfx(collapsed ? 'open' : 'close');
        up('sections', ss => ss.map(s => s.id === sec.id ? {
          ...s,
          collapsed: !s.collapsed
        } : s));
      },
      onMenu: () => setSheet({
        type: 'section',
        id: sec.id
      })
    }), !collapsed && React.createElement("div", {
      className: "mt-2.5 space-y-2.5"
    }, list.length ? list.map(m => React.createElement("div", {
      key: m.id
    }, React.createElement(MissionRow, {
      m: m,
      open: openId === m.id,
      onToggle: () => {
        sfx(openId === m.id ? 'close' : 'open');
        setOpenId(openId === m.id ? null : m.id);
      }
    }), openId === m.id && React.createElement(MissionDetail, {
      m: m,
      onEdit: () => setEditM(m),
      onMove: () => setSheet({
        type: 'move',
        id: m.id
      }),
      onDelete: () => deleteMission(m),
      onToggleStep: (sid, v) => toggleStep(m, sid, v),
      onToggleDone: () => toggleDone(m)
    }))) : React.createElement("button", {
      type: "button",
      onClick: () => {
        sfx('open');
        setEditM(blankMission(sec.id));
      },
      className: "ml-[38px] w-[calc(100%-38px)] py-3 text-[13px] tracking-widest uppercase text-white/35 f-mono",
      style: {
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.1)'
      }
    }, "+ \u041F\u0443\u0441\u0442\u043E. \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u0438\u0441\u0441\u0438\u044E")));
  }), ql && !data.missions.some(matchM) && React.createElement(Empty, {
    icon: Search,
    title: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E",
    text: "\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439 \u0434\u0440\u0443\u0433\u043E\u0439 \u0437\u0430\u043F\u0440\u043E\u0441"
  }), !ql && React.createElement(Btn, {
    variant: "ghostMain",
    className: "w-full mt-2",
    icon: Plus,
    onClick: ops.addSection
  }, "\u041D\u043E\u0432\u044B\u0439 \u0440\u0430\u0437\u0434\u0435\u043B"), (() => {
    const all = data.missions.filter(m => m.done);
    const list = all.filter(matchM).sort((a, b) => String(b.completedAt || '').localeCompare(String(a.completedAt || '')));
    if (ql && !list.length) return null;
    const open = !!data.meta.archiveOpen || !!ql;
    const secName = id => (data.sections.find(s => s.id === id) || {}).name || '';
    return React.createElement("div", {
      className: "pt-4"
    }, React.createElement(ArchiveHeader, {
      count: all.length,
      open: open,
      onToggle: () => {
        sfx(open ? 'close' : 'open');
        up('meta', mt => ({
          ...mt,
          archiveOpen: !mt.archiveOpen
        }));
      }
    }), open && React.createElement("div", {
      className: "mt-2.5 space-y-2.5"
    }, list.length ? list.map(m => React.createElement("div", {
      key: m.id
    }, React.createElement(MissionRow, {
      m: m,
      open: openId === m.id,
      onToggle: () => {
        sfx(openId === m.id ? 'close' : 'open');
        setOpenId(openId === m.id ? null : m.id);
      }
    }), openId === m.id && React.createElement(MissionDetail, {
      m: m,
      archived: true,
      sectionName: secName(m.sectionId),
      onResume: () => resumeMission(m),
      onDelete: () => purgeMission(m)
    }))) : React.createElement("div", {
      className: "ml-[38px] py-4 px-3 text-center text-[13px] tracking-widest uppercase text-white/35 f-mono",
      style: {
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.08)'
      }
    }, "\u0410\u0440\u0445\u0438\u0432 \u043F\u0443\u0441\u0442. \u0417\u0430\u0432\u0435\u0440\u0448\u0438 \u043C\u0438\u0441\u0441\u0438\u044E \u2014 \u043E\u043D\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C")));
  })()) : React.createElement("div", {
    className: "px-4 mt-4"
  }, React.createElement("div", {
    className: "flex gap-1.5 overflow-x-auto noscb pb-1 -mx-4 px-4"
  }, React.createElement("button", {
    type: "button",
    onClick: () => {
      sfx('tab');
      setTagF(null);
    },
    className: `tag cut ${!tagF ? 'on' : ''}`,
    style: {
      '--tc': 'var(--alt)',
      '--cut': '5px'
    }
  }, "\u0412\u0421\u0415"), data.tags.map(t => React.createElement(TagChip, {
    key: t.id,
    tag: t,
    on: tagF === t.id,
    onClick: () => setTagF(tagF === t.id ? null : t.id)
  }))), React.createElement("div", {
    className: "mt-3"
  }, React.createElement(SectionHeader, {
    name: "DATA SHARDS",
    count: shards.length
  })), React.createElement("div", {
    className: "mt-2.5 space-y-2.5"
  }, shards.map(s => React.createElement(ShardItem, {
    key: s.id,
    s: s,
    tagById: tagById,
    onOpen: () => {
      setReadId(s.id);
    }
  }))), !shards.length && React.createElement(Empty, {
    icon: Cpu,
    title: ql || tagF ? 'Нет совпадений' : 'Чипов пока нет',
    text: ql || tagF ? 'Сбрось фильтр или измени запрос' : 'Запиши первую мысль дня'
  }, !ql && !tagF && React.createElement(Btn, {
    icon: Plus,
    onClick: () => setEditS(blankShard())
  }, "\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C"))), sheetSection && React.createElement(Sheet, {
    title: `РАЗДЕЛ // ${sheetSection.name}`,
    onClose: () => setSheet(null),
    items: [{
      label: 'Добавить миссию сюда',
      icon: Plus,
      on: () => setEditM(blankMission(sheetSection.id))
    }, {
      label: 'Переименовать',
      icon: Pencil,
      on: () => ops.renameSection(sheetSection.id)
    }, {
      label: 'Переместить выше',
      icon: ArrowUp,
      disabled: secIndex <= 0,
      on: () => ops.moveSection(sheetSection.id, -1)
    }, {
      label: 'Переместить ниже',
      icon: ArrowDown,
      disabled: secIndex >= data.sections.length - 1,
      on: () => ops.moveSection(sheetSection.id, 1)
    }, {
      label: 'Удалить раздел',
      icon: Trash2,
      danger: true,
      on: () => ops.deleteSection(sheetSection.id)
    }]
  }), sheetMission && React.createElement(Sheet, {
    title: `ПЕРЕМЕСТИТЬ // ${sheetMission.title}`,
    onClose: () => setSheet(null),
    items: data.sections.map(s => ({
      label: s.id === sheetMission.sectionId ? `${s.name}  (текущий)` : s.name,
      icon: FolderInput,
      disabled: s.id === sheetMission.sectionId,
      on: () => {
        up('missions', ms => ms.map(x => x.id === sheetMission.id ? {
          ...x,
          sectionId: s.id
        } : x));
        up('sections', ss => ss.map(x => x.id === s.id ? {
          ...x,
          collapsed: false
        } : x));
        toast(`Перемещено в ${s.name}`);
      }
    }))
  }), editM && React.createElement(MissionEditor, {
    initial: editM,
    onSave: saveMission,
    onClose: () => setEditM(null)
  }), reading && !editS && React.createElement(ShardReader, {
    s: reading,
    tagById: tagById,
    onClose: () => setReadId(null),
    onEdit: () => setEditS(reading),
    onDelete: () => deleteShard(reading)
  }), editS && React.createElement(ShardEditor, {
    initial: editS,
    onSave: saveShard,
    onClose: () => setEditS(null)
  }));
}
const fmtShort = k => {
  const d = parseKey(k);
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
};
const dayStatus = (avg, thr) => avg == null ? 'НЕТ ДАННЫХ' : avg >= thr.g ? 'ОПТИМАЛЬНО' : avg >= thr.l ? 'СТАБИЛЬНО' : avg >= thr.y ? 'НЕСТАБИЛЬНО' : 'КРИТИЧНО';
function ScoreBox({
  score,
  size = 38
}) {
  const has = typeof score === 'number';
  const c = has ? SCORE_COLOR[score] : '#6a6a72';
  if (UI.mono) return React.createElement("span", {
    className: "shrink-0 flex items-center justify-center st-score",
    style: {
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.32),
      fontSize: Math.round(size * 0.42),
      color: c,
      background: has ? alpha(c, 0.14) : 'rgba(255,255,255,.06)'
    }
  }, has ? score : '—');
  return React.createElement("span", {
    className: "cut shrink-0 flex items-center justify-center f-orb font-black",
    style: {
      '--cut': `${Math.round(size / 5)}px`,
      width: size,
      height: size,
      fontSize: Math.round(size * 0.46),
      color: c,
      background: has ? alpha(c, 0.12) : 'rgba(255,255,255,.04)',
      boxShadow: `inset 0 0 0 1.5px ${has ? c : 'rgba(255,255,255,.2)'}`,
      textShadow: has ? `0 0 10px ${alpha(c, 0.6)}` : 'none'
    }
  }, has ? score : '—');
}
function SegBar({
  avg,
  color
}) {
  const on = avg == null ? 0 : Math.round(avg * 2);
  return React.createElement("div", {
    className: "seg-bar"
  }, Array.from({
    length: 10
  }, (_, i) => React.createElement("i", {
    key: i,
    style: i < on ? {
      background: color,
      boxShadow: UI.mono ? 'none' : `0 0 6px ${color}`
    } : undefined
  })));
}
function CalendarView({
  sel,
  setSel,
  openRate
}) {
  const {
    data
  } = useApp();
  const s = data.settings;
  const todayK = dKey(new Date());
  const [avEdit, setAvEdit] = useState(false);
  const [ym, setYm] = useState(() => {
    const d = parseKey(sel);
    return {
      y: d.getFullYear(),
      m: d.getMonth()
    };
  });
  const rec = data.ratings[sel];
  const avg = rec ? rec.avg : null;
  const first = new Date(ym.y, ym.m, 1);
  const daysIn = new Date(ym.y, ym.m + 1, 0).getDate();
  const offset = (first.getDay() - s.weekStart + 7) % 7;
  const wd = s.weekStart === 1 ? WD : ['Вс', ...WD.slice(0, 6)];
  const cells = [...Array(offset).fill(null), ...Array.from({
    length: daysIn
  }, (_, i) => i + 1)];
  const shift = dm => {
    sfx('tab');
    setYm(({
      y,
      m
    }) => {
      const d = new Date(y, m + dm, 1);
      return {
        y: d.getFullYear(),
        m: d.getMonth()
      };
    });
  };
  const mAvg = calcAvg(Array.from({
    length: daysIn
  }, (_, i) => data.ratings[dKey(new Date(ym.y, ym.m, i + 1))]).map(r => r ? r.avg : null));
  const todayRated = !!data.ratings[todayK];
  const col = avg != null ? ringColor(avg, s.thr) : '#6a6a72';
  const scored = rec ? Object.values(rec.scores).filter(v => typeof v.score === 'number').length : 0;
  return React.createElement("div", null, UI.mono ? React.createElement("div", {
    className: "px-4 mt-6 flex flex-col items-center text-center"
  }, React.createElement(AvatarSlot, {
    size: 84,
    onClick: () => setAvEdit(true)
  }), React.createElement("div", {
    className: "text-[28px] font-bold mt-4 text-white leading-tight tracking-[-.02em]"
  }, "\u0418\u0442\u043E\u0433\u0438 \u0434\u043D\u044F"), React.createElement("div", {
    className: "mono-score mt-4"
  }, React.createElement("span", {
    className: "st-score text-[42px] leading-none",
    style: {
      color: col
    }
  }, avg != null ? avg.toFixed(1) : '–'), React.createElement("span", {
    className: "st-score text-[18px]",
    style: {
      color: '#636366'
    }
  }, "/ 5")), React.createElement("div", {
    className: "text-[13.5px] font-semibold mt-3",
    style: {
      color: col
    }
  }, cap(dayStatus(avg, s.thr))), React.createElement("div", {
    className: "text-[12.5px] text-white/45 mt-0.5"
  }, sel === todayK ? 'Сегодня · ' : '', fmtDay(sel), " \xB7 ", rec ? `${scored} ${plural(scored, 'оценка', 'оценки', 'оценок')}` : 'не оценён')) : React.createElement("div", {
    className: "px-4 mt-4"
  }, React.createElement(Frame, {
    cut: 18,
    color: "rgba(var(--main-rgb),.55)"
  }, React.createElement("div", {
    className: "p-4 flex items-center gap-4"
  }, React.createElement(AvatarSlot, {
    size: 88,
    onClick: () => setAvEdit(true)
  }), React.createElement("div", {
    className: "min-w-0 flex-1"
  }, React.createElement("div", {
    className: "sec-title text-[18px]"
  }, "\u0418\u0442\u043E\u0433\u0438 \u0434\u043D\u044F"), React.createElement("div", {
    className: "flex items-baseline gap-1.5 mt-2"
  }, React.createElement("span", {
    className: "st-score text-[42px]",
    style: {
      color: col,
      textShadow: avg != null ? `0 0 18px ${alpha(col, 0.55)}` : 'none'
    }
  }, avg != null ? avg.toFixed(1) : '—'), React.createElement("span", {
    className: "st-score text-[17px] text-white/35"
  }, "/ 5")), React.createElement("div", {
    className: "f-mono text-[11px] tracking-[.14em] mt-1.5",
    style: {
      color: col
    }
  }, "\u0421\u0422\u0410\u0422\u0423\u0421: ", dayStatus(avg, s.thr)))), React.createElement("div", {
    className: "px-4 pb-4"
  }, React.createElement(SegBar, {
    avg: avg,
    color: col
  }), React.createElement("div", {
    className: "flex justify-between gap-2 mt-2 f-mono text-[10px] tracking-wider text-white/50"
  }, React.createElement("span", null, sel === todayK ? 'СЕГОДНЯ · ' : '', fmtShort(sel)), React.createElement("span", null, rec ? `${scored} ${plural(scored, 'ОЦЕНКА', 'ОЦЕНКИ', 'ОЦЕНОК')}` : 'НЕ ОЦЕНЁН'))))), React.createElement("div", {
    className: "px-4 mt-4"
  }, React.createElement(Frame, {
    cut: 16,
    color: "rgba(var(--main-rgb),.4)",
    mc: "transparent",
    mb: "transparent"
  }, React.createElement("div", {
    className: UI.mono ? 'py-3' : 'p-3'
  }, React.createElement("div", {
    className: "flex items-center justify-between gap-1 mb-3"
  }, React.createElement("div", {
    className: "flex gap-1"
  }, React.createElement(IconBtn, {
    sm: true,
    icon: ChevronsLeft,
    onClick: () => shift(-12),
    title: "\u0413\u043E\u0434 \u043D\u0430\u0437\u0430\u0434"
  }), React.createElement(IconBtn, {
    sm: true,
    icon: ChevronLeft,
    onClick: () => shift(-1),
    title: "\u041C\u0435\u0441\u044F\u0446 \u043D\u0430\u0437\u0430\u0434"
  })), React.createElement("button", {
    type: "button",
    className: "text-center min-w-0",
    onClick: () => {
      sfx('tab');
      const d = new Date();
      setYm({
        y: d.getFullYear(),
        m: d.getMonth()
      });
      setSel(todayK);
    }
  }, React.createElement("div", {
    className: "sec-title text-[18px] truncate"
  }, MONTHS[ym.m], " ", ym.y), React.createElement("div", {
    className: "micro mt-1",
    style: {
      color: UI.mono ? '#8E8E93' : 'rgba(var(--alt-rgb),.7)'
    }
  }, mAvg != null ? `СРЕДНЕЕ ЗА МЕСЯЦ · ${mAvg.toFixed(1)}` : 'НЕТ ОЦЕНОК')), React.createElement("div", {
    className: "flex gap-1"
  }, React.createElement(IconBtn, {
    sm: true,
    icon: ChevronRight,
    onClick: () => shift(1),
    title: "\u041C\u0435\u0441\u044F\u0446 \u0432\u043F\u0435\u0440\u0451\u0434"
  }), React.createElement(IconBtn, {
    sm: true,
    icon: ChevronsRight,
    onClick: () => shift(12),
    title: "\u0413\u043E\u0434 \u0432\u043F\u0435\u0440\u0451\u0434"
  }))), React.createElement("div", {
    className: "grid grid-cols-7 gap-y-2 text-center"
  }, wd.map(w => React.createElement("div", {
    key: w,
    className: "f-mono text-[10px] tracking-widest uppercase pb-1",
    style: {
      color: UI.mono ? '#636366' : 'rgba(var(--main-rgb),.65)'
    }
  }, w)), cells.map((d, i) => {
    if (!d) return React.createElement("div", {
      key: `e${i}`
    });
    const k = dKey(new Date(ym.y, ym.m, d));
    const r = data.ratings[k];
    const future = k > todayK,
      isSel = k === sel,
      isToday = k === todayK;
    return React.createElement("button", {
      key: k,
      type: "button",
      onClick: () => {
        sfx();
        setSel(k);
      },
      className: "day-cell",
      "aria-label": fmtDay(k)
    }, isSel && React.createElement("span", {
      className: "day-sel cut"
    }), React.createElement(Ring, {
      avg: r ? r.avg : null,
      color: ringColor(r ? r.avg : null, s.thr),
      size: UI.mono ? 40 : 38,
      stroke: UI.mono ? 2.6 : 2.8,
      dashed: !!r && r.avg == null
    }), React.createElement("span", {
      className: "relative text-[15px] font-bold day-n",
      style: {
        color: UI.mono ? future ? '#48484A' : r || isSel ? '#fff' : '#8E8E93' : future ? 'rgba(255,255,255,.22)' : isSel ? 'var(--main)' : r ? '#fff' : 'rgba(255,255,255,.6)'
      }
    }, d), isToday && React.createElement("span", {
      className: "day-today"
    }));
  })), React.createElement("div", {
    className: "flex justify-center flex-wrap gap-x-3 gap-y-1 mt-3 f-mono text-[10px] text-white/50"
  }, [[s.thr.g, '#59FF00'], [s.thr.l, '#B8FF00'], [s.thr.y, '#FFD600'], [1, '#FF4D1A']].map(([v, c]) => React.createElement("span", {
    key: c,
    className: "flex items-center gap-1"
  }, React.createElement("i", {
    className: UI.mono ? 'w-2 h-2 rounded-full inline-block' : 'w-2.5 h-1.5 inline-block',
    style: {
      background: c,
      boxShadow: UI.mono ? 'none' : `0 0 6px ${c}`
    }
  }), "\u2265", Number(v).toFixed(1))))))), React.createElement("div", {
    className: "px-4 mt-4"
  }, React.createElement(Btn, {
    className: "w-full",
    icon: Zap,
    snd: "open",
    onClick: () => openRate(todayK, 'manual')
  }, todayRated ? 'Изменить оценку за сегодня' : 'Оценить сегодня')), React.createElement(DayDetail, {
    k: sel,
    openRate: openRate
  }), avEdit && React.createElement(AvatarEditor, {
    onClose: () => setAvEdit(false)
  }));
}
function DayDetail({
  k,
  openRate
}) {
  const {
    data
  } = useApp();
  const todayK = dKey(new Date());
  const r = data.ratings[k];
  const future = k > todayK;
  const cardsById = Object.fromEntries(data.cards.map(c => [c.id, c]));
  const planned = activeCards(data.cards, k);
  const entries = r ? Object.entries(r.scores) : [];
  const fDay = data.focus.sessions.filter(s => dKey(new Date(s.start)) === k);
  const fAvg = calcAvg(fDay.map(s => s.score));
  return React.createElement("div", {
    className: "px-4 mt-5"
  }, React.createElement(SectionHeader, {
    name: `Сводка · ${fmtShort(k)}`,
    count: entries.length
  }), fDay.length > 0 && React.createElement(Frame, {
    cut: 12,
    className: "mt-2.5",
    color: "rgba(var(--alt-rgb),.35)"
  }, React.createElement("div", {
    className: "flex items-center gap-3 p-3"
  }, React.createElement(Brain, {
    size: 22,
    className: "txt-alt shrink-0"
  }), React.createElement("div", {
    className: "flex-1 min-w-0"
  }, React.createElement("div", {
    className: "m-title text-[16px]"
  }, "\u0424\u043E\u043A\u0443\u0441 \xB7 ", fmtMin(fDay.reduce((x, s) => x + focusMin(s), 0))), React.createElement("div", {
    className: "text-[12px] text-white/50 f-read mt-0.5"
  }, fDay.length, " ", plural(fDay.length, 'сессия', 'сессии', 'сессий'), " \xB7 ", fDay.reduce((x, s) => x + s.distractions, 0), " \u043E\u0442\u0432\u043B\u0435\u0447.", fAvg != null ? ` · оценка ${fAvg.toFixed(1)}` : '')))), React.createElement("div", {
    className: "mt-2.5 space-y-2"
  }, future ? React.createElement(Empty, {
    icon: Clock,
    title: "\u0414\u0435\u043D\u044C \u0435\u0449\u0451 \u043D\u0435 \u043D\u0430\u0441\u0442\u0443\u043F\u0438\u043B"
  }) : r ? React.createElement(React.Fragment, null, entries.map(([cid, v]) => {
    const c = cardsById[cid];
    return React.createElement(Frame, {
      key: cid,
      cut: 12,
      color: "rgba(var(--main-rgb),.35)"
    }, React.createElement("div", {
      className: "flex items-center gap-3 p-3"
    }, React.createElement("div", {
      className: "shrink-0"
    }, c ? React.createElement(Sticker, {
      icon: c.icon,
      color: c.iconColor,
      frame: c.iconFrame,
      size: 38
    }) : React.createElement("div", {
      className: "w-[38px] h-[38px] bg-white/10"
    })), React.createElement("div", {
      className: "flex-1 min-w-0"
    }, React.createElement("div", {
      className: "m-title text-[16px] truncate"
    }, c ? c.name : v.name), React.createElement("div", {
      className: "text-[12px] text-white/50 leading-snug f-read mt-0.5"
    }, v.score == null ? 'Пропущено — не учитывается в среднем' : c ? c.criteria[v.score] : '')), React.createElement(ScoreBox, {
      score: v.score == null ? undefined : v.score
    })));
  }), !entries.length && React.createElement(Empty, {
    icon: Layers,
    title: "\u041D\u0435\u0442 \u043E\u0446\u0435\u043D\u043E\u043A"
  }), r.note && React.createElement(Frame, {
    cut: 12,
    color: "rgba(var(--alt-rgb),.35)"
  }, React.createElement("div", {
    className: "p-3"
  }, React.createElement("div", {
    className: "lbl"
  }, "\u0418\u0442\u043E\u0433 \u0434\u043D\u044F"), React.createElement("div", {
    className: "text-[14px] text-white/80 whitespace-pre-wrap leading-relaxed f-read"
  }, r.note)))) : React.createElement(Empty, {
    icon: Activity,
    title: "\u0414\u0435\u043D\u044C \u043D\u0435 \u043E\u0446\u0435\u043D\u0451\u043D",
    text: planned.length ? `Карточек на этот день: ${planned.length}` : 'На этот день нет активных карточек'
  })), !future && (planned.length > 0 || r) && React.createElement(Btn, {
    variant: "ghost",
    className: "w-full mt-3",
    icon: Pencil,
    snd: "open",
    onClick: () => openRate(k, 'manual')
  }, r ? 'Редактировать оценки за этот день' : 'Оценить этот день'));
}
function HabitCardView({
  card,
  score,
  onEdit,
  onDelete
}) {
  if (UI.mono) {
    const has = typeof score === 'number';
    return React.createElement("div", {
      className: "mono-card",
      style: {
        background: `linear-gradient(180deg, ${alpha(card.glow, 1)} 0%, ${alpha(card.glow, 0.45)} 30%, #000 62%)`
      }
    }, React.createElement("div", {
      className: "flex justify-end gap-2 px-4 pt-4"
    }, React.createElement(IconBtn, {
      sm: true,
      icon: Pencil,
      onClick: onEdit,
      title: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"
    }), React.createElement(IconBtn, {
      sm: true,
      red: true,
      icon: Trash2,
      onClick: onDelete,
      title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"
    })), React.createElement("div", {
      className: "flex justify-center -mt-3"
    }, React.createElement(Sticker, {
      icon: card.icon,
      color: card.iconColor,
      frame: card.iconFrame,
      size: 150
    })), React.createElement("h3", {
      className: "text-[30px] font-bold text-center mt-6 leading-tight px-4 text-white tracking-[-.02em]"
    }, card.name), React.createElement("div", {
      className: "text-center text-[12.5px] text-white/45 mt-1 px-4"
    }, cap(schedText(card))), React.createElement("div", {
      className: "mono-score mx-auto mt-4"
    }, React.createElement("span", {
      className: "st-score text-[44px] leading-none",
      style: {
        color: has ? SCORE_COLOR[score] : '#636366'
      }
    }, has ? score : '–'), React.createElement("span", {
      className: "st-score text-[18px]",
      style: {
        color: '#636366'
      }
    }, "/ 5")), score === null && React.createElement("div", {
      className: "text-center text-[12.5px] text-white/45 mt-2"
    }, "\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043E \u0432 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u0434\u0435\u043D\u044C"), React.createElement("div", {
      className: "px-5 mt-6 pb-6"
    }, React.createElement("div", {
      className: "mono-crit head"
    }, React.createElement("span", null, "\u041E\u0446\u0435\u043D\u043A\u0430"), React.createElement("span", null, "\u041A\u0440\u0438\u0442\u0435\u0440\u0438\u0438")), [5, 4, 3, 2, 1].map(n => React.createElement("div", {
      key: n,
      className: "mono-crit",
      style: score === n ? {
        background: alpha(SCORE_COLOR[n], 0.1),
        borderRadius: 14
      } : undefined
    }, React.createElement("span", {
      className: "st-score text-[24px]",
      style: {
        color: SCORE_COLOR[n]
      }
    }, n), React.createElement("span", {
      className: "text-[14.5px] leading-snug px-1",
      style: {
        color: '#9A9AA0'
      }
    }, card.criteria[n] || '—')))));
  }
  return React.createElement(Frame, {
    cut: 20,
    color: alpha(card.glow, 1),
    bg: `linear-gradient(180deg, ${alpha(card.glow, 0.95)} 0%, rgba(16,10,20,.97) 46%, rgba(8,7,12,.98) 100%)`
  }, React.createElement("div", {
    className: "relative"
  }, React.createElement("div", {
    className: "flex items-center justify-between px-4 pt-3"
  }, React.createElement("span", {
    className: "micro",
    style: {
      color: 'rgba(255,255,255,.55)'
    }
  }, "CARD // ", card.id.slice(-6).toUpperCase()), React.createElement("div", {
    className: "flex gap-2"
  }, React.createElement(IconBtn, {
    sm: true,
    icon: Pencil,
    onClick: onEdit,
    title: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"
  }), React.createElement(IconBtn, {
    sm: true,
    red: true,
    icon: Trash2,
    onClick: onDelete,
    title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"
  }))), React.createElement("div", {
    className: "flex justify-center pt-3"
  }, React.createElement(Sticker, {
    icon: card.icon,
    color: card.iconColor,
    frame: card.iconFrame,
    size: 118
  })), React.createElement("h3", {
    className: "text-[30px] font-bold text-center mt-4 leading-tight px-4 uppercase tracking-wide txt-main glow-main"
  }, card.name), React.createElement("div", {
    className: "text-center micro mt-1.5 px-4",
    style: {
      color: 'rgba(var(--alt-rgb),.75)'
    }
  }, schedText(card)), React.createElement("div", {
    className: "flex justify-center mt-4"
  }, React.createElement("div", {
    className: "cut flex items-baseline justify-center gap-1.5 px-8 py-3",
    style: {
      '--cut': '12px',
      background: 'rgba(0,0,0,.5)',
      boxShadow: 'inset 0 0 0 1px rgba(var(--main-rgb),.45)'
    }
  }, React.createElement("span", {
    className: "st-score text-[40px]",
    style: {
      color: typeof score === 'number' ? SCORE_COLOR[score] : '#6a6a72',
      textShadow: typeof score === 'number' ? `0 0 16px ${alpha(SCORE_COLOR[score], 0.5)}` : 'none'
    }
  }, typeof score === 'number' ? score : '—'), React.createElement("span", {
    className: "st-score text-[16px] text-white/35"
  }, "/ 5"))), score === null && React.createElement("div", {
    className: "text-center micro mt-2"
  }, "\u041F\u0420\u041E\u041F\u0423\u0429\u0415\u041D\u041E \u0412 \u0412\u042B\u0411\u0420\u0410\u041D\u041D\u042B\u0419 \u0414\u0415\u041D\u042C"), React.createElement("div", {
    className: "px-4 mt-5 pb-5"
  }, React.createElement("div", {
    className: "crit-row",
    style: {
      paddingTop: 0
    }
  }, React.createElement("span", {
    className: "lbl text-center",
    style: {
      marginBottom: 0
    }
  }, "\u041E\u0446\u0435\u043D\u043A\u0430"), React.createElement("span", {
    className: "lbl",
    style: {
      marginBottom: 0
    }
  }, "\u041A\u0440\u0438\u0442\u0435\u0440\u0438\u0438")), [5, 4, 3, 2, 1].map(n => React.createElement("div", {
    key: n,
    className: "crit-row",
    style: score === n ? {
      background: alpha(SCORE_COLOR[n], 0.09),
      boxShadow: `inset 3px 0 0 ${SCORE_COLOR[n]}`
    } : undefined
  }, React.createElement("div", {
    className: "flex justify-center"
  }, React.createElement(ScoreBox, {
    score: n,
    size: 34
  })), React.createElement("div", {
    className: "text-[14px] text-white/70 leading-snug pr-1 f-read"
  }, card.criteria[n] || '—'))))));
}
const CRIT_PH = {
  5: 'Идеальное выполнение',
  4: 'Хорошо, с небольшими отступлениями',
  3: 'Средне',
  2: 'Слабо',
  1: 'Провал'
};
function CardEditor({
  initial,
  onSave,
  onClose
}) {
  const {
    data,
    toast
  } = useApp();
  const [c, setC] = useState(() => JSON.parse(JSON.stringify(initial)));
  const [emoji, setEmoji] = useState('');
  const set = p => setC(x => ({
    ...x,
    ...p
  }));
  const isNew = !data.cards.some(x => x.id === c.id);
  const order = data.settings.weekStart === 1 ? [0, 1, 2, 3, 4, 5, 6] : [6, 0, 1, 2, 3, 4, 5];
  const toggleDay = d => set({
    days: c.days.includes(d) ? c.days.filter(x => x !== d) : [...c.days, d].sort((a, b) => a - b)
  });
  const save = () => {
    if (!c.name.trim()) {
      sfx('error');
      toast('Укажи название карточки');
      return;
    }
    if (c.type === 'habit' && !c.days.length) {
      sfx('error');
      toast('Выбери хотя бы один день');
      return;
    }
    onSave({
      ...c,
      name: c.name.trim()
    });
  };
  return React.createElement(Modal, {
    full: true,
    title: isNew ? 'Новая карточка' : 'Редактор карточки',
    code: "CATALOG // CARD.EDIT",
    onClose: onClose,
    footer: React.createElement(React.Fragment, null, React.createElement(Btn, {
      variant: "ghost",
      className: "flex-1",
      onClick: onClose
    }, "\u041E\u0442\u043C\u0435\u043D\u0430"), React.createElement(Btn, {
      className: "flex-[2]",
      icon: Save,
      snd: "none",
      onClick: save
    }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))
  }, React.createElement(Frame, {
    cut: 14,
    className: "mb-5",
    color: alpha(c.glow, 1),
    bg: `linear-gradient(180deg, ${alpha(c.glow, 0.95)}, rgba(8,7,12,.97))`,
    mc: "transparent",
    mb: `linear-gradient(180deg, ${alpha(c.glow, 1)}, #000)`
  }, React.createElement("div", {
    className: "flex items-center gap-4 p-4"
  }, React.createElement(Sticker, {
    icon: c.icon,
    color: c.iconColor,
    frame: c.iconFrame,
    size: 64
  }), React.createElement("div", {
    className: "min-w-0"
  }, React.createElement("div", {
    className: "text-[22px] font-bold uppercase tracking-wide txt-main truncate"
  }, c.name || 'Название'), React.createElement("div", {
    className: "micro",
    style: {
      color: 'rgba(var(--alt-rgb),.75)'
    }
  }, schedText(c))))), React.createElement(Field, {
    label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435"
  }, React.createElement("input", {
    className: "inp",
    value: c.name,
    onChange: e => set({
      name: e.target.value
    }),
    placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0412\u043E\u0434\u0430"
  })), React.createElement(Field, {
    label: "\u0424\u043E\u0440\u043C\u0430 \u0440\u0430\u043C\u043A\u0438"
  }, React.createElement("div", {
    className: "grid grid-cols-6 gap-1.5"
  }, STICKER_FRAMES.map(([v, l]) => React.createElement("button", {
    key: v,
    type: "button",
    onClick: () => {
      sfx();
      set({
        iconFrame: v
      });
    },
    className: "cut flex flex-col items-center gap-1 py-2",
    style: {
      '--cut': '6px',
      background: (c.iconFrame || 'oct') === v ? 'rgba(var(--alt-rgb),.16)' : 'rgba(255,255,255,.04)',
      boxShadow: (c.iconFrame || 'oct') === v ? 'inset 0 0 0 1.5px var(--alt)' : 'inset 0 0 0 1px rgba(255,255,255,.1)'
    }
  }, React.createElement(Sticker, {
    icon: c.icon,
    color: c.iconColor,
    frame: v,
    size: 30
  }), React.createElement("span", {
    className: "f-mono text-[9px] text-white/55 uppercase"
  }, UI.mono ? TOON_FRAME_NAMES[v] : l))))), React.createElement(Field, {
    label: `Иконка · ${stickerLabel(c.icon)}`
  }, React.createElement("div", {
    className: "grid grid-cols-6 gap-1.5"
  }, STICKERS.map(st => React.createElement("button", {
    key: st,
    type: "button",
    onClick: () => {
      sfx();
      set({
        icon: st
      });
    },
    className: "aspect-square flex items-center justify-center cut",
    style: {
      '--cut': '6px',
      background: c.icon === st ? 'rgba(var(--alt-rgb),.18)' : 'rgba(255,255,255,.04)',
      boxShadow: c.icon === st ? 'inset 0 0 0 1.5px var(--alt)' : 'inset 0 0 0 1px rgba(255,255,255,.1)'
    }
  }, React.createElement(Sticker, {
    icon: st,
    color: c.iconColor,
    frame: c.iconFrame,
    size: 38
  })))), React.createElement("div", {
    className: "micro mt-2",
    style: {
      color: UI.mono ? '#8E8E93' : 'rgba(var(--alt-rgb),.7)'
    }
  }, STICKERS.length, " \u0418\u041A\u041E\u041D\u041E\u041A \xB7 6 \u0420\u0410\u041C\u041E\u041A \xB7 \u041B\u042E\u0411\u041E\u0419 ", UI.mono ? '' : 'НЕОНОВЫЙ ', "\u0426\u0412\u0415\u0422"), React.createElement("div", {
    className: "flex gap-2 mt-2"
  }, React.createElement("input", {
    className: "inp flex-1 min-w-0",
    maxLength: 8,
    value: emoji,
    onChange: e => setEmoji(e.target.value),
    placeholder: "\u0421\u0432\u043E\u0439 \u044D\u043C\u043E\u0434\u0437\u0438, \u043D\u0430\u043F\u0440. \uD83D\uDD25"
  }), React.createElement(Btn, {
    small: true,
    variant: "ghost",
    onClick: () => {
      if (emoji.trim()) set({
        icon: `em:${emoji.trim()}`
      });
    }
  }, "OK")), React.createElement("div", {
    className: "mt-3"
  }, React.createElement("span", {
    className: "lbl"
  }, "\u0421\u0432\u043E\u044F \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0430-\u0441\u0442\u0438\u043A\u0435\u0440"), React.createElement(ImageInput, {
    maxDim: 360,
    value: c.icon.startsWith('url:') ? c.icon.slice(4) : '',
    onChange: v => set({
      icon: v ? `url:${v}` : 'st:star'
    })
  }))), React.createElement(Field, {
    label: UI.mono ? 'Цвет стикера' : 'Неоновый цвет стикера'
  }, React.createElement(ColorRow, {
    value: c.iconColor,
    onChange: v => set({
      iconColor: v
    }),
    presets: ['#FCEE0A', '#00F0FF', '#FF4655', '#B98CF0', '#59FF00', '#FF7A00', '#FF2E8C', '#FFFFFF']
  })), React.createElement(Field, {
    label: UI.mono ? 'Цвет фона карточки' : 'Цвет свечения карточки'
  }, React.createElement(ColorRow, {
    value: c.glow,
    onChange: v => set({
      glow: v
    }),
    presets: ['#5E4A00', '#0F3B52', '#3A1052', '#4A0E14', '#0E4A2A', '#4A2A0E', '#262626']
  })), React.createElement(Field, {
    label: "\u0422\u0438\u043F \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044F"
  }, React.createElement(Segmented, {
    value: c.type,
    onChange: v => set({
      type: v
    }),
    accent: "var(--alt)",
    options: [{
      v: 'habit',
      l: 'Привычка'
    }, {
      v: 'once',
      l: 'Разовая'
    }]
  })), c.type === 'habit' ? React.createElement(Field, {
    label: "\u0410\u043A\u0442\u0438\u0432\u043D\u0430 \u043F\u043E \u0434\u043D\u044F\u043C \u043D\u0435\u0434\u0435\u043B\u0438"
  }, React.createElement("div", {
    className: "flex gap-1.5 flex-wrap"
  }, order.map(d => React.createElement("button", {
    key: d,
    type: "button",
    onClick: () => {
      sfx();
      toggleDay(d);
    },
    className: `wd-chip cut ${c.days.includes(d) ? 'on' : ''}`
  }, WD[d]))), React.createElement("div", {
    className: "flex flex-wrap gap-2 mt-2"
  }, React.createElement(Btn, {
    small: true,
    variant: "dark",
    onClick: () => set({
      days: [0, 1, 2, 3, 4, 5, 6]
    })
  }, "\u041A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C"), React.createElement(Btn, {
    small: true,
    variant: "dark",
    onClick: () => set({
      days: [0, 1, 2, 3, 4]
    })
  }, "\u0411\u0443\u0434\u043D\u0438"), React.createElement(Btn, {
    small: true,
    variant: "dark",
    onClick: () => set({
      days: [5, 6]
    })
  }, "\u0412\u044B\u0445\u043E\u0434\u043D\u044B\u0435"))) : React.createElement(Field, {
    label: "\u0414\u0430\u0442\u0430 \u0441\u043F\u0435\u0446-\u0437\u0430\u0434\u0430\u0447\u0438"
  }, React.createElement("input", {
    type: "date",
    className: "inp",
    value: c.date,
    onChange: e => set({
      date: e.target.value
    })
  })), React.createElement(Field, {
    label: "\u0422\u0430\u0431\u043B\u0438\u0446\u0430 \u043A\u0440\u0438\u0442\u0435\u0440\u0438\u0435\u0432 (5 \u2192 1)"
  }, [5, 4, 3, 2, 1].map(n => React.createElement("div", {
    key: n,
    className: "flex gap-2 items-start mb-2"
  }, React.createElement("div", {
    className: "pt-1"
  }, React.createElement(ScoreBox, {
    score: n,
    size: 34
  })), React.createElement("textarea", {
    className: "inp flex-1",
    rows: 2,
    value: c.criteria[n],
    placeholder: CRIT_PH[n],
    onChange: e => {
      const v = e.target.value;
      setC(x => ({
        ...x,
        criteria: {
          ...x.criteria,
          [n]: v
        }
      }));
    }
  })))));
}
function CardCatalog({
  sel
}) {
  const {
    data,
    up,
    ask,
    toast,
    undoable
  } = useApp();
  const [edit, setEdit] = useState(null);
  const [idx, setIdx] = useState(0);
  const sc = useRef(null);
  const cards = data.cards;
  const r = data.ratings[sel];
  const go = i => {
    const el = sc.current;
    if (el) el.scrollTo({
      left: i * el.clientWidth,
      behavior: 'smooth'
    });
  };
  const onScroll = () => {
    const el = sc.current;
    if (el) setIdx(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
  };
  const saveCard = c => {
    const exists = cards.some(x => x.id === c.id);
    up('cards', cs => exists ? cs.map(x => x.id === c.id ? c : x) : [...cs, c]);
    sfx('save');
    toast('Карточка сохранена');
    setEdit(null);
    if (!exists) setTimeout(() => go(cards.length), 120);
  };
  const del = async c => {
    const ok = await ask({
      title: 'Удалить карточку?',
      code: 'CATALOG // DELETE',
      text: `«${c.name}» исчезнет из каталога. Прошлые оценки останутся в календаре.`,
      ok: 'Удалить',
      danger: true
    });
    if (ok !== true) return;
    undoable('Карточка удалена', ['cards'], () => up('cards', cs => cs.filter(x => x.id !== c.id)));
  };
  return React.createElement("div", {
    className: "pt-4"
  }, React.createElement("div", {
    className: "flex items-center justify-between px-4 gap-3"
  }, React.createElement("div", {
    className: "min-w-0"
  }, React.createElement("div", {
    className: "sec-title text-[18px]"
  }, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A"), React.createElement("div", {
    className: "micro mt-1",
    style: {
      color: UI.mono ? '#8E8E93' : 'rgba(var(--alt-rgb),.7)'
    }
  }, cards.length, " ", plural(cards.length, 'КАРТОЧКА', 'КАРТОЧКИ', 'КАРТОЧЕК'), " \xB7 \u0411\u0410\u041B\u041B\u042B \u0417\u0410 ", fmtShort(sel))), React.createElement(Btn, {
    small: true,
    icon: Plus,
    snd: "open",
    onClick: () => setEdit(blankCard())
  }, "\u041D\u043E\u0432\u0430\u044F")), cards.length ? React.createElement(React.Fragment, null, React.createElement("div", {
    ref: sc,
    onScroll: onScroll,
    className: "flex overflow-x-auto noscb mt-4",
    style: {
      scrollSnapType: 'x mandatory'
    }
  }, cards.map(c => React.createElement("div", {
    key: c.id,
    className: "w-full shrink-0 px-4",
    style: {
      scrollSnapAlign: 'center'
    }
  }, React.createElement(HabitCardView, {
    card: c,
    score: r && r.scores[c.id] ? r.scores[c.id].score : undefined,
    onEdit: () => setEdit(c),
    onDelete: () => del(c)
  })))), React.createElement("div", {
    className: "flex justify-center gap-2 mt-4 px-4 pt-1 overflow-x-auto noscb"
  }, cards.map((c, i) => React.createElement("button", {
    key: c.id,
    type: "button",
    "aria-label": c.name,
    onClick: () => {
      sfx('tab');
      go(i);
    },
    className: `thumb cut ${i === idx ? 'on' : ''}`,
    style: {
      background: `linear-gradient(180deg, ${c.glow}, #050407 85%)`
    }
  }, React.createElement(Sticker, {
    icon: c.icon,
    color: c.iconColor,
    frame: c.iconFrame,
    size: 24
  }))))) : React.createElement(Empty, {
    icon: Layers,
    title: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043F\u0443\u0441\u0442",
    text: "\u0421\u043E\u0437\u0434\u0430\u0439 \u043F\u0435\u0440\u0432\u0443\u044E \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u043F\u0440\u0438\u0432\u044B\u0447\u043A\u0438 \u0438\u043B\u0438 \u0441\u043F\u0435\u0446-\u0437\u0430\u0434\u0430\u0447\u0438"
  }), edit && React.createElement(CardEditor, {
    initial: edit,
    onSave: saveCard,
    onClose: () => setEdit(null)
  }));
}
function StatsScreen({
  openRate
}) {
  const [tab, setTab] = useState(() => {
    try {
      return sessionStorage.getItem('cj.stab') || 'cal';
    } catch (e) {
      return 'cal';
    }
  });
  const [sel, setSel] = useState(() => dKey(new Date()));
  const pick = v => {
    setTab(v);
    try {
      sessionStorage.setItem('cj.stab', v);
    } catch (e) {}
  };
  return React.createElement("div", {
    className: "pb-8"
  }, React.createElement(ScreenHeader, {
    code: "BIOMONITOR 7.2 // DAILY.LOG",
    title: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u0434\u043D\u044F",
    sub: "\u0418\u0442\u043E\u0433\u0438, \u043A\u043E\u043B\u044C\u0446\u0430 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430 \u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u043F\u0440\u0438\u0432\u044B\u0447\u0435\u043A"
  }), React.createElement("div", {
    className: "px-4 mt-3"
  }, React.createElement(Segmented, {
    value: tab,
    onChange: pick,
    options: [{
      v: 'cal',
      l: 'Календарь',
      i: CalendarDays
    }, {
      v: 'cards',
      l: 'Каталог',
      i: Layers
    }]
  })), tab === 'cal' ? React.createElement(CalendarView, {
    sel: sel,
    setSel: setSel,
    openRate: openRate
  }) : React.createElement(CardCatalog, {
    sel: sel
  }));
}
function RateModal({
  date,
  source,
  onClose
}) {
  const {
    data,
    up,
    ask,
    toast
  } = useApp();
  const prev = data.ratings[date];
  const cards = useMemo(() => {
    const act = activeCards(data.cards, date);
    const extra = prev ? data.cards.filter(c => prev.scores[c.id] && !act.includes(c)) : [];
    return [...act, ...extra];
  }, []);
  const [scores, setScores] = useState(() => {
    const o = {};
    cards.forEach(c => {
      const p = prev && prev.scores[c.id];
      if (p) o[c.id] = p.score == null ? 'skip' : p.score;
    });
    return o;
  });
  const [note, setNote] = useState(prev ? prev.note || '' : '');
  const [toDiary, setToDiary] = useState(true);
  const thr = data.settings.thr;
  const avg = calcAvg(Object.values(scores));
  const col = avg != null ? ringColor(avg, thr) : '#6a6a72';
  const pending = cards.filter(c => scores[c.id] === undefined).length;
  const setScore = (id, v) => {
    sfx(v === 'skip' ? 'uncheck' : 'score');
    setScores(s => ({
      ...s,
      [id]: s[id] === v ? undefined : v
    }));
  };
  const save = async () => {
    if (pending) {
      const ok = await ask({
        title: 'Не все карточки оценены',
        code: 'PROTOCOL // CHECK',
        text: `Без оценки: ${pending}. Они не попадут в средний балл.`,
        ok: 'Сохранить так'
      });
      if (ok !== true) return;
    }
    const sc = {};
    cards.forEach(c => {
      const v = scores[c.id];
      if (v !== undefined) sc[c.id] = {
        score: v === 'skip' ? null : v,
        name: c.name
      };
    });
    const rec = {
      scores: sc,
      note: note.trim(),
      avg: calcAvg(Object.values(sc).map(x => x.score)),
      at: new Date().toISOString()
    };
    up('ratings', r => ({
      ...r,
      [date]: rec
    }));
    if (toDiary && note.trim()) {
      let tag = data.tags.find(t => t.name === 'итоги');
      if (!tag) {
        tag = {
          id: uid('tg'),
          name: 'итоги',
          color: '#59FF00'
        };
        const nt = tag;
        up('tags', ts => [...ts, nt]);
      }
      const body = `${note.trim()}\n\nСредний балл: ${rec.avg != null ? rec.avg.toFixed(1) : '—'} / 5`;
      const tagId = tag.id;
      up('shards', ss => {
        const nowIso = new Date().toISOString();
        if (ss.some(s => s.dayKey === date)) return ss.map(s => s.dayKey === date ? {
          ...s,
          body,
          updatedAt: nowIso
        } : s);
        return [{
          ...blankShard(),
          title: `Итог дня — ${fmtDay(date)}`,
          body,
          tags: [tagId],
          dayKey: date,
          createdAt: nowIso,
          updatedAt: nowIso
        }, ...ss];
      });
    }
    sfx('save');
    toast(`День оценён: ${rec.avg != null ? rec.avg.toFixed(1) : '—'} / 5`);
    onClose();
  };
  const head = source === 'evening' ? 'ВЕЧЕРНЕЕ ОКНО ОЦЕНКИ' : source === 'retro' ? 'РЕТРОСПЕКТИВНАЯ ОЦЕНКА' : 'ПРОТОКОЛ ОЦЕНКИ ДНЯ';
  return React.createElement(Modal, {
    full: true,
    title: `Итоги · ${fmtDay(date)}`,
    code: `${head} // ${date}`,
    onClose: onClose,
    footer: cards.length ? React.createElement(React.Fragment, null, React.createElement(Btn, {
      variant: "ghost",
      className: "flex-1",
      onClick: onClose
    }, "\u041F\u043E\u0437\u0436\u0435"), React.createElement(Btn, {
      className: "flex-[2]",
      icon: Save,
      snd: "none",
      onClick: save
    }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0442\u043E\u0433")) : React.createElement(Btn, {
      className: "flex-1",
      onClick: onClose
    }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C")
  }, cards.length ? React.createElement(React.Fragment, null, React.createElement(Frame, {
    cut: 14,
    className: "mb-4",
    color: "rgba(var(--main-rgb),.5)"
  }, React.createElement("div", {
    className: "p-3"
  }, React.createElement("div", {
    className: "flex items-center gap-4"
  }, React.createElement("div", {
    className: "relative w-16 h-16 shrink-0"
  }, React.createElement(Ring, {
    avg: avg,
    color: col,
    size: 64,
    stroke: 4
  }), React.createElement("span", {
    className: "absolute inset-0 flex items-center justify-center st-score text-[15px]",
    style: {
      color: col
    }
  }, avg != null ? avg.toFixed(1) : '—')), React.createElement("div", {
    className: "min-w-0"
  }, React.createElement("div", {
    className: "sec-title text-[16px]"
  }, "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B \u0434\u043D\u044F"), React.createElement("div", {
    className: "f-mono text-[11px] tracking-[.12em] mt-1",
    style: {
      color: col
    }
  }, "\u0421\u0422\u0410\u0422\u0423\u0421: ", dayStatus(avg, thr)), React.createElement("div", {
    className: "micro mt-1"
  }, "\u041E\u0421\u0422\u0410\u041B\u041E\u0421\u042C \u041E\u0426\u0415\u041D\u0418\u0422\u042C: ", pending))), React.createElement("div", {
    className: "text-[12px] text-white/50 f-read leading-snug mt-3"
  }, "\u0412\u044B\u0431\u0435\u0440\u0438 \u043A\u0440\u0438\u0442\u0435\u0440\u0438\u0439, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043B\u0443\u0447\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u043E\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442 \u0434\u0435\u043D\u044C. \xAB\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C\xBB \u0438\u0441\u043A\u043B\u044E\u0447\u0430\u0435\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0438\u0437 \u0440\u0430\u0441\u0447\u0451\u0442\u0430."))), cards.map(c => {
    const v = scores[c.id];
    return React.createElement(Frame, {
      key: c.id,
      cut: 16,
      className: "mb-4",
      color: alpha(c.glow, 1),
      bg: `linear-gradient(180deg, ${alpha(c.glow, 0.75)}, rgba(10,8,14,.96) 62%)`,
      mc: "transparent",
      mb: `linear-gradient(180deg, ${alpha(c.glow, 0.95)}, #111113 55%)`
    }, React.createElement("div", {
      className: "flex items-center gap-3 p-3"
    }, React.createElement(Sticker, {
      icon: c.icon,
      color: c.iconColor,
      frame: c.iconFrame,
      size: 46
    }), React.createElement("div", {
      className: "flex-1 min-w-0"
    }, React.createElement("div", {
      className: "m-title text-[18px] truncate"
    }, c.name), React.createElement("div", {
      className: "micro mt-1",
      style: {
        color: 'rgba(255,255,255,.55)'
      }
    }, schedText(c))), React.createElement("button", {
      type: "button",
      onClick: () => setScore(c.id, 'skip'),
      className: `tag cut shrink-0 ${v === 'skip' ? 'on' : ''}`,
      style: {
        '--tc': 'var(--warn)',
        '--cut': '6px',
        padding: '8px 9px'
      }
    }, React.createElement(SkipForward, {
      size: 12
    }), "\u041F\u0420\u041E\u041F\u0423\u0421\u041A")), React.createElement("div", {
      className: "px-2 pb-2"
    }, [5, 4, 3, 2, 1].map(n => {
      const on = v === n;
      return React.createElement("button", {
        key: n,
        type: "button",
        onClick: () => setScore(c.id, n),
        className: "cut w-full flex items-center gap-3 text-left px-2 py-2 mb-1.5 transition-all",
        style: {
          '--cut': '9px',
          background: on ? alpha(SCORE_COLOR[n], 0.14) : 'rgba(0,0,0,.35)',
          boxShadow: on ? `inset 0 0 0 1.5px ${SCORE_COLOR[n]}` : 'inset 0 0 0 1px rgba(255,255,255,.07)',
          opacity: typeof v === 'number' && !on ? 0.5 : v === 'skip' ? 0.35 : 1
        }
      }, React.createElement(ScoreBox, {
        score: n,
        size: 32
      }), React.createElement("span", {
        className: "f-read text-[13.5px] text-white/85 leading-snug flex-1"
      }, c.criteria[n] || '—'), on && React.createElement(Check, {
        size: 18,
        style: {
          color: SCORE_COLOR[n]
        }
      }));
    })));
  }), React.createElement(Field, {
    label: "\u0418\u0442\u043E\u0433 \u0434\u043D\u044F (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)"
  }, React.createElement("textarea", {
    className: "inp f-read",
    rows: 4,
    value: note,
    onChange: e => setNote(e.target.value),
    placeholder: "\u0427\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C, \u0447\u0442\u043E \u043D\u0435\u0442, \u0447\u0442\u043E \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u0432\u0442\u0440\u0430\u2026"
  })), React.createElement("div", {
    className: "px-3 py-1 mb-2",
    style: {
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.1)'
    }
  }, React.createElement(Toggle, {
    on: toDiary,
    onChange: setToDiary,
    label: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0438\u0442\u043E\u0433 \u0432 \u0427\u0438\u043F\u044B \u0434\u0430\u043D\u043D\u044B\u0445",
    hint: "\u041F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0430\u043F\u0438\u0441\u044C \u0441 \u0442\u0435\u0433\u043E\u043C #\u0438\u0442\u043E\u0433\u0438"
  }))) : React.createElement(Empty, {
    icon: Layers,
    title: "\u041D\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
    text: "\u041D\u0430 \u044D\u0442\u043E\u0442 \u0434\u0435\u043D\u044C \u043D\u0435 \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u043D\u0438 \u043E\u0434\u043D\u043E\u0439 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438. \u0414\u043E\u0431\u0430\u0432\u044C \u0438\u0445 \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0435 \u043D\u0430 \u044D\u043A\u0440\u0430\u043D\u0435 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0438."
  }));
}
const TIMER_FONTS = {
  bebas: ["'Bebas Neue','Oswald',sans-serif", 'Bebas'],
  oswald: ["'Oswald',sans-serif", 'Oswald'],
  orbitron: ["'Orbitron','Russo One',sans-serif", 'Orbitron'],
  rajdhani: ["'Rajdhani','Exo 2',sans-serif", 'Rajdhani'],
  mono: ["'Share Tech Mono','JetBrains Mono',monospace", 'Mono']
};
const TIMER_BGS = [['smoke', 'Багровый дым', 'radial-gradient(circle at 30% 30%,#c0134f,#3a0a2e 55%,#120818)'], ['grid', 'Кибер-сетка', 'linear-gradient(180deg,#12021f,#4a0a4f 55%,#00444d)'], ['city', 'Неоновый город', 'linear-gradient(180deg,#0b0221,#3a0a3f 60%,#ff4655)'], ['matrix', 'Матрица', 'linear-gradient(180deg,#020a04,#0a3a14)'], ['custom', 'Своё фото', 'repeating-linear-gradient(45deg,#1c1c1c 0 6px,#2c2c2c 6px 12px)']];
const MILESTONES = [7, 14, 30, 60, 90, 100, 180, 365, 500, 730, 1000, 1500, 2000, 3650];
const MATRIX_CHARS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎ0123456789Z:=*+<>';
function SmokeBG({
  seed = 4
}) {
  const id = useMemo(() => uid('smk'), []);
  return React.createElement("div", {
    className: "absolute inset-0 overflow-hidden",
    style: {
      background: '#140818'
    }
  }, React.createElement("svg", {
    className: "absolute inset-0 w-full h-full smoke-drift",
    viewBox: "0 0 400 720",
    preserveAspectRatio: "xMidYMid slice"
  }, React.createElement("filter", {
    id: id,
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    colorInterpolationFilters: "sRGB"
  }, React.createElement("feTurbulence", {
    type: "fractalNoise",
    baseFrequency: "0.0055 0.008",
    numOctaves: "5",
    seed: seed
  }), React.createElement("feColorMatrix", {
    type: "matrix",
    values: "2.6 0 0 0 -0.92  0.2 0 0 0 -0.06  0.8 0 0 0 -0.16  0 0 0 0 1"
  })), React.createElement("rect", {
    width: "400",
    height: "720",
    filter: `url(#${id})`
  })), React.createElement("div", {
    className: "absolute inset-0",
    style: {
      background: 'radial-gradient(ellipse at 50% 45%,transparent 30%,rgba(10,4,20,.55) 100%)'
    }
  }));
}
function GridBG() {
  return React.createElement("div", {
    className: "absolute inset-0 overflow-hidden",
    style: {
      background: 'linear-gradient(180deg,#07010f 0%,#1d0330 38%,#3d0748 57%,#07010d 100%)'
    }
  }, React.createElement("div", {
    className: "grid-sun"
  }), React.createElement("div", {
    className: "absolute left-0 right-0",
    style: {
      top: '57%',
      height: 2,
      background: '#ff2e8c',
      boxShadow: '0 0 22px 2px #ff2e8c'
    }
  }), React.createElement("div", {
    className: "grid-floor",
    style: {
      top: '57%',
      bottom: 'auto',
      height: '62%'
    }
  }));
}
function CityBG() {
  const g = useMemo(() => {
    const R = rng(77),
      back = [],
      front = [],
      wins = [];
    let x = -5;
    while (x < 405) {
      const w = 18 + R() * 40,
        h = 160 + R() * 280;
      back.push(React.createElement("rect", {
        key: `b${back.length}`,
        x: x,
        y: 720 - h - 70,
        width: w,
        height: h + 70,
        fill: "#1f0b35"
      }));
      x += w + 2;
    }
    x = -10;
    while (x < 410) {
      const w = 28 + R() * 50,
        h = 90 + R() * 230;
      front.push(React.createElement("rect", {
        key: `f${front.length}`,
        x: x,
        y: 720 - h,
        width: w,
        height: h,
        fill: "#06030c"
      }));
      for (let wy = 720 - h + 10; wy < 712; wy += 12) for (let wx = x + 5; wx < x + w - 6; wx += 9) {
        if (R() > 0.74) wins.push(React.createElement("rect", {
          key: `w${wins.length}`,
          x: wx,
          y: wy,
          width: "4",
          height: "5",
          fill: R() > 0.5 ? '#FCEE0A' : '#00F0FF',
          opacity: (0.4 + R() * 0.55).toFixed(2)
        }));
      }
      x += w + 3;
    }
    return {
      back,
      front,
      wins
    };
  }, []);
  return React.createElement("div", {
    className: "absolute inset-0 overflow-hidden",
    style: {
      background: 'linear-gradient(180deg,#05010f 0%,#1c0631 42%,#5a0d3d 72%,#ff4655 100%)'
    }
  }, React.createElement("svg", {
    className: "absolute inset-0 w-full h-full",
    viewBox: "0 0 400 720",
    preserveAspectRatio: "xMidYMax slice"
  }, React.createElement("circle", {
    cx: "300",
    cy: "170",
    r: "50",
    fill: "#ff2e8c",
    opacity: ".3"
  }), g.back, g.front, g.wins), React.createElement("div", {
    className: "rain"
  }));
}
function MatrixBG() {
  const cols = useMemo(() => Array.from({
    length: 16
  }, (_, i) => ({
    x: i / 16 * 100 + 1,
    dur: 5 + i * 37 % 7,
    delay: -(i * 53 % 9),
    chars: Array.from({
      length: 30
    }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]).join('')
  })), []);
  return React.createElement("div", {
    className: "absolute inset-0 overflow-hidden",
    style: {
      background: 'radial-gradient(ellipse at 50% 40%,#06200d,#010603 75%)'
    }
  }, cols.map((c, i) => React.createElement("div", {
    key: i,
    className: "mx-col f-mono",
    style: {
      left: `${c.x}%`,
      animationDuration: `${c.dur}s`,
      animationDelay: `${c.delay}s`
    }
  }, c.chars)));
}
const MONO_TBG = {
  smoke: ['Гранат', '#C2185B', 'linear-gradient(180deg,#5A0F2B 0%,#1E0610 45%,#000 85%)'],
  grid: ['Океан', '#2F6BFF', 'linear-gradient(180deg,#0F2A6B 0%,#081330 45%,#000 85%)'],
  city: ['Закат', '#FF7A1A', 'linear-gradient(180deg,#6B2A06 0%,#2A1003 45%,#000 85%)'],
  matrix: ['Лес', '#2BD46A', 'linear-gradient(180deg,#0B4A26 0%,#04200F 45%,#000 85%)'],
  custom: ['Своё фото', '#888', 'repeating-linear-gradient(45deg,#1c1c1e 0 6px,#2c2c2e 6px 12px)']
};
function MonoTimerBg({
  k,
  live
}) {
  const p = MONO_TBG[k] || MONO_TBG.smoke;
  return React.createElement("div", {
    className: "absolute inset-0 overflow-hidden",
    style: {
      background: p[2]
    }
  }, live && React.createElement("div", {
    className: "mono-blob",
    style: {
      background: `radial-gradient(circle, ${alpha(p[1], 0.55)} 0%, transparent 62%)`
    }
  }));
}
function TimerBg({
  t,
  live
}) {
  if (UI.mono && !(t.bg === 'custom' && t.bgUrl && live)) return React.createElement(MonoTimerBg, {
    k: t.bg,
    live: live
  });
  const preset = TIMER_BGS.find(b => b[0] === t.bg) || TIMER_BGS[0];
  if (!live) return React.createElement("div", {
    className: "absolute inset-0",
    style: {
      background: preset[2]
    }
  });
  if (t.bg === 'custom' && t.bgUrl) return React.createElement(React.Fragment, null, React.createElement(Img, {
    src: t.bgUrl,
    className: "absolute inset-0 w-full h-full object-cover"
  }), React.createElement("div", {
    className: "absolute inset-0 bg-black/40"
  }));
  if (t.bg === 'grid') return React.createElement(GridBG, null);
  if (t.bg === 'city') return React.createElement(CityBG, null);
  if (t.bg === 'matrix') return React.createElement(MatrixBG, null);
  return React.createElement(SmokeBG, null);
}
function timerState(t, now) {
  const target = parseLocal(t.target) || new Date(now);
  if (t.mode === 'since') {
    const diff = Math.max(0, now - target),
      daysF = diff / 864e5,
      days = Math.floor(daysF);
    const next = MILESTONES.find(m => m > days) || (Math.floor(days / 1000) + 1) * 1000;
    const prev = [0, ...MILESTONES].filter(m => m <= days).pop();
    return {
      days,
      hms: fmtTotalHMS(diff),
      cap: 'ВСЕГО ПРОШЛО · Ч:М:С',
      pct: clamp((daysF - prev) / (next - prev), 0, 1),
      l2: 'SINCE',
      left: `${prev} ДН.`,
      right: `РУБЕЖ ${next} ДН.`,
      done: false
    };
  }
  const start = parseLocal(t.start) || new Date(target.getTime() - 864e5);
  const diff = target - now,
    done = diff <= 0,
    d = Math.max(0, diff),
    days = Math.floor(d / 864e5);
  const span = Math.max(1, target - start);
  const sh = x => `${pad(x.getDate())}.${pad(x.getMonth() + 1)}.${String(x.getFullYear()).slice(2)}`;
  return {
    days,
    hms: fmtTotalHMS(d),
    cap: 'ВСЕГО ОСТАЛОСЬ · Ч:М:С',
    pct: clamp((now - start) / span, 0, 1),
    l2: done ? 'DONE' : 'TO GO',
    left: sh(start),
    right: `${sh(target)} ${pad(target.getHours())}:${pad(target.getMinutes())}`,
    done
  };
}
function TimerCard({
  t,
  now,
  live,
  index,
  total,
  onEdit,
  onAdd,
  onDelete
}) {
  const st = timerState(t, now);
  const font = (TIMER_FONTS[t.font] || TIMER_FONTS.bebas)[0];
  const accent = t.accent || '#FF4655';
  return React.createElement("section", {
    className: "tk"
  }, React.createElement(TimerBg, {
    t: t,
    live: live
  }), React.createElement("div", {
    className: "absolute inset-0",
    style: {
      background: 'linear-gradient(180deg,rgba(0,0,0,.25),transparent 25%,transparent 70%,rgba(0,0,0,.55))'
    }
  }), React.createElement("div", {
    className: "absolute top-4 left-4 micro deco",
    style: {
      color: 'rgba(255,255,255,.65)'
    }
  }, "COUNTDOWN.FEED // ", pad(index + 1), "/", pad(total)), UI.mono ? React.createElement("div", {
    className: "absolute right-3 top-5 flex flex-col items-center gap-3 z-10"
  }, React.createElement("button", {
    type: "button",
    "aria-label": "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
    className: "mono-rail",
    onClick: () => {
      sfx('open');
      onEdit();
    }
  }, React.createElement(Pencil, {
    size: 19
  })), React.createElement("button", {
    type: "button",
    "aria-label": "\u041D\u043E\u0432\u044B\u0439 \u0442\u0430\u0439\u043C\u0435\u0440",
    className: "mono-rail",
    onClick: () => {
      sfx('open');
      onAdd();
    }
  }, React.createElement(Plus, {
    size: 22
  })), React.createElement("button", {
    type: "button",
    "aria-label": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
    className: "mono-rail",
    onClick: () => {
      sfx();
      onDelete();
    }
  }, React.createElement(Trash2, {
    size: 18
  }))) : React.createElement("div", {
    className: "absolute right-3 top-14 flex flex-col items-center gap-6 z-10"
  }, React.createElement("button", {
    type: "button",
    className: "rail-b",
    onClick: () => {
      sfx('open');
      onEdit();
    }
  }, React.createElement(Pencil, {
    size: 22
  }), React.createElement("span", null, "EDIT")), React.createElement("button", {
    type: "button",
    className: "rail-b",
    onClick: () => {
      sfx('open');
      onAdd();
    }
  }, React.createElement(Plus, {
    size: 24
  }), React.createElement("span", null, "NEW")), React.createElement("button", {
    type: "button",
    className: "rail-b",
    onClick: () => {
      sfx();
      onDelete();
    }
  }, React.createElement(Trash2, {
    size: 20
  }), React.createElement("span", null, "DEL"))), React.createElement("div", {
    className: "absolute inset-0 flex flex-col items-center justify-center px-12 text-center",
    style: {
      fontFamily: font
    }
  }, React.createElement("div", {
    className: "tk-num",
    style: {
      fontWeight: t.font === 'mono' ? 400 : 700,
      fontSize: String(st.days).length > 3 ? 'min(40vw,190px)' : undefined
    }
  }, st.days), React.createElement("div", {
    className: "tk-lbl",
    style: {
      fontWeight: 600
    }
  }, st.days === 1 ? 'DAY' : 'DAYS', React.createElement("br", null), st.l2), React.createElement("div", {
    className: "tk-title",
    style: {
      fontWeight: 600
    }
  }, t.title), t.sub && React.createElement("div", {
    className: "tk-sub"
  }, t.sub), React.createElement("div", {
    className: "tk-hms cut",
    style: {
      '--cut': '6px',
      color: st.done ? accent : '#fff'
    }
  }, st.done ? 'COMPLETE' : st.hms), !st.done && React.createElement("div", {
    className: "micro mt-1.5",
    style: {
      color: 'rgba(255,255,255,.55)'
    }
  }, st.cap)), React.createElement("div", {
    className: "absolute left-5 right-5 bottom-6 z-10"
  }, React.createElement("div", {
    className: "flex justify-between items-end f-mono text-[10px] tracking-widest text-white/75 mb-1.5"
  }, React.createElement("span", null, st.left), React.createElement("span", {
    className: "text-[13px]",
    style: {
      color: accent,
      textShadow: UI.mono ? 'none' : `0 0 10px ${accent}`
    }
  }, (st.pct * 100).toFixed(1), "%"), React.createElement("span", null, st.right)), UI.mono ? React.createElement("div", {
    className: "relative h-[8px] rounded-full overflow-hidden",
    style: {
      background: 'rgba(255,255,255,.16)'
    }
  }, React.createElement("div", {
    className: "absolute left-0 top-0 bottom-0 rounded-full",
    style: {
      width: `${st.pct * 100}%`,
      background: accent,
      transition: 'width 1s linear'
    }
  })) : React.createElement("div", {
    className: "relative h-[7px]",
    style: {
      background: 'rgba(255,255,255,.12)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.18)'
    }
  }, React.createElement("div", {
    className: "absolute left-0 top-0 bottom-0",
    style: {
      width: `${st.pct * 100}%`,
      background: accent,
      boxShadow: `0 0 12px ${accent}, 0 0 26px ${accent}`,
      transition: 'width 1s linear'
    }
  }), [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => React.createElement("i", {
    key: i,
    className: "absolute top-0 bottom-0 w-px bg-black/50",
    style: {
      left: `${i * 10}%`
    }
  })))));
}
function TimerEditor({
  initial,
  onSave,
  onClose,
  onDelete
}) {
  const {
    data,
    toast
  } = useApp();
  const [t, setT] = useState(() => ({
    ...initial
  }));
  const set = p => setT(x => ({
    ...x,
    ...p
  }));
  const isNew = !data.timers.some(x => x.id === t.id);
  const linked = t.missionId && data.missions.find(m => m.id === t.missionId);
  const save = () => {
    if (!t.title.trim()) {
      sfx('error');
      toast('Укажи название события');
      return;
    }
    const tg = parseLocal(t.target);
    if (!tg) {
      sfx('error');
      toast('Укажи дату');
      return;
    }
    if (t.mode === 'to') {
      const s = parseLocal(t.start);
      if (s && s >= tg) {
        sfx('error');
        toast('Старт должен быть раньше цели');
        return;
      }
    }
    onSave({
      ...t,
      title: t.title.trim(),
      bg: t.bg === 'custom' && !t.bgUrl ? 'smoke' : t.bg
    });
  };
  return React.createElement(Modal, {
    full: true,
    title: isNew ? 'Новый таймер' : 'Редактор таймера',
    code: "COUNTDOWN // EDIT",
    onClose: onClose,
    footer: React.createElement(React.Fragment, null, React.createElement(Btn, {
      variant: "ghost",
      className: "flex-1",
      onClick: onClose
    }, "\u041E\u0442\u043C\u0435\u043D\u0430"), React.createElement(Btn, {
      className: "flex-[2]",
      icon: Save,
      snd: "none",
      onClick: save
    }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))
  }, linked && React.createElement("div", {
    className: "mb-4 p-3 text-[13px] f-read txt-alt",
    style: {
      boxShadow: 'inset 0 0 0 1px rgba(var(--alt-rgb),.35)'
    }
  }, "\u0421\u0432\u044F\u0437\u0430\u043D \u0441 \u043C\u0438\u0441\u0441\u0438\u0435\u0439 \xAB", linked.title, "\xBB. \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0446\u0435\u043B\u0435\u0432\u043E\u0439 \u0434\u0430\u0442\u044B \u043E\u0431\u043D\u043E\u0432\u0438\u0442 \u0435\u0451 \u0434\u0435\u0434\u043B\u0430\u0439\u043D."), React.createElement(Field, {
    label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F"
  }, React.createElement("input", {
    className: "inp uppercase",
    value: t.title,
    onChange: e => set({
      title: e.target.value
    }),
    placeholder: "\u0420\u0415\u041B\u0418\u0417 \u0410\u041B\u042C\u0411\u041E\u041C\u0410"
  })), React.createElement(Field, {
    label: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C (\u043C\u0435\u043B\u043A\u0438\u0439 \u0442\u0435\u043A\u0441\u0442)"
  }, React.createElement("input", {
    className: "inp uppercase",
    value: t.sub,
    onChange: e => set({
      sub: e.target.value
    }),
    placeholder: "NIGHT CITY RECORDS"
  })), React.createElement(Field, {
    label: "\u0420\u0435\u0436\u0438\u043C"
  }, React.createElement(Segmented, {
    value: t.mode,
    onChange: v => set({
      mode: v
    }),
    accent: "var(--alt)",
    options: [{
      v: 'to',
      l: 'Days to go'
    }, {
      v: 'since',
      l: 'Days since'
    }]
  })), t.mode === 'to' && React.createElement(Field, {
    label: "\u0414\u0430\u0442\u0430 \u0441\u0442\u0430\u0440\u0442\u0430 (\u043D\u0430\u0447\u0430\u043B\u043E \u043F\u043E\u043B\u043E\u0441\u043A\u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430)"
  }, React.createElement("input", {
    type: "datetime-local",
    className: "inp",
    value: t.start,
    onChange: e => set({
      start: e.target.value
    })
  })), React.createElement(Field, {
    label: t.mode === 'to' ? 'Целевая дата' : 'Дата события (отсчёт идёт от неё)'
  }, React.createElement("input", {
    type: "datetime-local",
    className: "inp",
    value: t.target,
    onChange: e => set({
      target: e.target.value
    })
  })), t.mode === 'since' && React.createElement("div", {
    className: "text-[12px] text-white/45 f-read -mt-2 mb-4"
  }, "\u041F\u043E\u043B\u043E\u0441\u043A\u0430 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430 \u043F\u043E\u043A\u0430\u0436\u0435\u0442 \u043F\u0443\u0442\u044C \u0434\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0433\u043E \u0440\u0443\u0431\u0435\u0436\u0430: 7, 14, 30, 60, 90, 100, 180, 365\u2026 \u0434\u043D\u0435\u0439."), React.createElement(Field, {
    label: "\u0428\u0440\u0438\u0444\u0442"
  }, React.createElement("div", {
    className: "grid grid-cols-5 gap-1.5"
  }, Object.entries(TIMER_FONTS).map(([k, [ff, name]]) => React.createElement("button", {
    key: k,
    type: "button",
    onClick: () => {
      sfx();
      set({
        font: k
      });
    },
    className: "cut py-2 flex flex-col items-center",
    style: {
      '--cut': '6px',
      background: t.font === k ? 'rgba(var(--alt-rgb),.16)' : 'rgba(255,255,255,.04)',
      boxShadow: t.font === k ? 'inset 0 0 0 1.5px var(--alt)' : 'inset 0 0 0 1px rgba(255,255,255,.12)'
    }
  }, React.createElement("span", {
    style: {
      fontFamily: ff,
      fontSize: 28,
      lineHeight: 1,
      fontWeight: 700
    }
  }, "2"), React.createElement("span", {
    className: "f-mono text-[9px] text-white/55 mt-1"
  }, name))))), React.createElement(Field, {
    label: "\u0424\u043E\u043D \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438"
  }, React.createElement("div", {
    className: "grid grid-cols-3 gap-2"
  }, TIMER_BGS.map(([k, name, css]) => React.createElement("button", {
    key: k,
    type: "button",
    onClick: () => {
      sfx();
      set({
        bg: k
      });
    },
    className: "cut h-20 flex items-end p-2 text-left",
    style: {
      '--cut': '8px',
      background: UI.mono ? MONO_TBG[k][2] : css,
      boxShadow: t.bg === k ? 'inset 0 0 0 2px var(--alt)' : 'inset 0 0 0 1px rgba(255,255,255,.15)'
    }
  }, React.createElement("span", {
    className: "text-[12px] font-semibold leading-tight text-white",
    style: {
      textShadow: '0 1px 3px #000'
    }
  }, UI.mono ? MONO_TBG[k][0] : name))))), t.bg === 'custom' && React.createElement(Field, {
    label: "\u0421\u0432\u043E\u0451 \u0444\u043E\u0442\u043E \u0444\u043E\u043D\u0430"
  }, React.createElement(ImageInput, {
    value: t.bgUrl,
    onChange: v => set({
      bgUrl: v
    }),
    maxDim: 2560,
    quality: 0.92
  })), React.createElement(Field, {
    label: "\u0426\u0432\u0435\u0442 \u043F\u043E\u043B\u043E\u0441\u043A\u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430"
  }, React.createElement(ColorRow, {
    value: t.accent,
    onChange: v => set({
      accent: v
    }),
    presets: ['#FF2E63', '#FF4655', '#00F0FF', '#FCEE0A', '#39FF6A', '#B98CF0', '#FFFFFF']
  })), !isNew && React.createElement(Btn, {
    variant: "dangerGhost",
    className: "w-full mt-2",
    icon: Trash2,
    onClick: onDelete
  }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u0430\u0439\u043C\u0435\u0440"));
}
function CountdownScreen() {
  const {
    data,
    up,
    ask,
    toast,
    undoable
  } = useApp();
  const now = useNow(1000);
  const [edit, setEdit] = useState(null);
  const [page, setPage] = useState(0);
  const feedRef = useRef(null);
  const minute = Math.floor(now / 60000);
  const list = useMemo(() => {
    const n = Date.now();
    const dist = t => {
      const d = parseLocal(t.target);
      return d ? Math.abs(d - n) : Infinity;
    };
    return [...data.timers].sort((a, b) => dist(a) - dist(b));
  }, [data.timers, minute]);
  const onScroll = () => {
    const el = feedRef.current;
    if (el) setPage(Math.round(el.scrollTop / Math.max(1, el.clientHeight)));
  };
  const saveTimer = t => {
    const exists = data.timers.some(x => x.id === t.id);
    up('timers', ts => exists ? ts.map(x => x.id === t.id ? t : x) : [...ts, t]);
    if (t.missionId) up('missions', ms => ms.map(m => m.id === t.missionId ? {
      ...m,
      deadline: t.target,
      countdown: true
    } : m));
    sfx('save');
    toast('Таймер сохранён');
    setEdit(null);
  };
  const delTimer = async t => {
    const ok = await ask({
      title: 'Удалить таймер?',
      code: 'COUNTDOWN // DELETE',
      text: `«${t.title}» исчезнет из ленты.${t.missionId ? ' Дедлайн миссии останется.' : ''}`,
      ok: 'Удалить',
      danger: true
    });
    if (ok !== true) return;
    undoable('Таймер удалён', ['timers', 'missions'], () => {
      up('timers', ts => ts.filter(x => x.id !== t.id));
      if (t.missionId) up('missions', ms => ms.map(m => m.id === t.missionId ? {
        ...m,
        countdown: false
      } : m));
    });
    setEdit(null);
  };
  return React.createElement("div", {
    className: "relative h-full"
  }, React.createElement("div", {
    ref: feedRef,
    onScroll: onScroll,
    className: "feed noscb"
  }, list.length ? list.map((t, i) => React.createElement(TimerCard, {
    key: t.id,
    t: t,
    now: now,
    live: Math.abs(i - page) <= 1,
    index: i,
    total: list.length,
    onEdit: () => setEdit(t),
    onAdd: () => setEdit(blankTimer()),
    onDelete: () => delTimer(t)
  })) : React.createElement("section", {
    className: "tk flex items-center justify-center"
  }, UI.mono ? React.createElement(MonoTimerBg, {
    k: "smoke",
    live: true
  }) : React.createElement(SmokeBG, null), React.createElement("div", {
    className: "relative"
  }, React.createElement(Empty, {
    icon: Hourglass,
    title: "\u041B\u0435\u043D\u0442\u0430 \u043F\u0443\u0441\u0442\u0430",
    text: "\u0414\u043E\u0431\u0430\u0432\u044C \u0441\u043E\u0431\u044B\u0442\u0438\u0435, \u0434\u043E \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E \u0441\u0447\u0438\u0442\u0430\u0435\u0448\u044C \u0434\u043D\u0438"
  }, React.createElement(Btn, {
    icon: Plus,
    onClick: () => setEdit(blankTimer())
  }, "\u041D\u043E\u0432\u044B\u0439 \u0442\u0430\u0439\u043C\u0435\u0440"))))), list.length > 1 && React.createElement("div", {
    className: "absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 pointer-events-none"
  }, list.map((t, i) => React.createElement("i", {
    key: t.id,
    className: "block w-[3px]",
    style: {
      height: i === page ? 22 : 8,
      background: i === page ? '#fff' : 'rgba(255,255,255,.35)',
      transition: 'height .2s',
      boxShadow: i === page ? '0 0 8px #fff' : 'none'
    }
  }))), edit && React.createElement(TimerEditor, {
    initial: edit,
    onSave: saveTimer,
    onClose: () => setEdit(null),
    onDelete: () => delTimer(edit)
  }));
}
const FOCUS_REASONS = [['phone', 'Телефон'], ['mind', 'Мысли'], ['noise', 'Шум'], ['tired', 'Усталость'], ['other', 'Другое']];
const REASON_NAME = Object.fromEntries(FOCUS_REASONS);
const FOCUS_DURS = [10, 15, 20, 25, 30, 45, 60, 90];
const FOCUS_SCORE = {
  5: 'Поток',
  4: 'Собран',
  3: 'Средне',
  2: 'Рассеян',
  1: 'Провал'
};
const GOAL_MIN = 5,
  GOAL_MAX = 480,
  GOAL_STEP = 5;
const FREEZE_EVERY = 7,
  FREEZE_MAX = 2;
const BG_DIM = {
  low: 0.35,
  mid: 0.55,
  high: 0.75
};
const FOCUS_LEFT_KEY = `${LS_KEY}.focusLeft`;
const readLeft = () => {
  try {
    const v = Number(localStorage.getItem(FOCUS_LEFT_KEY)) || 0;
    localStorage.removeItem(FOCUS_LEFT_KEY);
    return v;
  } catch (e) {
    return 0;
  }
};
const focusMin = s => Math.max(0, ((s.ms || 0) - (s.away || 0)) / 60e3);
const fmtMin = m => {
  const r = Math.round(m);
  return r >= 60 ? `${Math.floor(r / 60)} ч ${r % 60 ? `${r % 60} мин` : ''}`.trim() : `${r} мин`;
};
const fmtClock = ms => {
  const s = Math.max(0, Math.ceil(ms / 1000)),
    h = Math.floor(s / 3600);
  return h ? `${h}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}` : `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
};
function focusStreak(focus, todayK = dKey(new Date())) {
  const goals = [...focus.goals].sort((a, b) => String(a.from).localeCompare(String(b.from)));
  const goalOf = k => {
    let g = FOCUS_GOAL;
    for (const x of goals) {
      if (x.from <= k) g = x.min;else break;
    }
    return g;
  };
  const mins = {};
  focus.sessions.forEach(s => {
    const k = dKey(new Date(s.start));
    mins[k] = (mins[k] || 0) + focusMin(s);
  });
  const met = k => Math.round(mins[k] || 0) >= goalOf(k);
  const first = Object.keys(mins).sort()[0];
  let n = 0,
    best = 0,
    freezes = 0;
  const frozen = new Set();
  const take = () => {
    n += 1;
    if (n % FREEZE_EVERY === 0) freezes = Math.min(FREEZE_MAX, freezes + 1);
    best = Math.max(best, n);
  };
  if (first) {
    for (let d = parseKey(first); dKey(d) < todayK; d = addDays(d, 1)) {
      const k = dKey(d);
      if (met(k)) take();else if (n > 0 && freezes > 0) {
        freezes -= 1;
        frozen.add(k);
      } else n = 0;
    }
  }
  const todayDone = met(todayK);
  if (todayDone) take();
  return {
    n,
    best,
    freezes,
    frozen,
    mins,
    goalOf,
    todayDone,
    todayMin: mins[todayK] || 0,
    goal: goalOf(todayK)
  };
}
const dayWord = n => plural(n, 'день', 'дня', 'дней');
const topReason = sessions => {
  const sum = {};
  sessions.forEach(s => Object.entries(s.reasons || {}).forEach(([k, v]) => {
    sum[k] = (sum[k] || 0) + v;
  }));
  const best = Object.entries(sum).sort((a, b) => b[1] - a[1])[0];
  return best && best[1] > 0 ? best[0] : null;
};
function useParkOps() {
  const {
    data,
    up,
    toast
  } = useApp();
  return {
    toMission: text => {
      const sec = data.sections[0];
      if (!sec) {
        sfx('error');
        toast('Сначала создай раздел миссий');
        return false;
      }
      up('missions', ms => [...ms, {
        ...blankMission(sec.id),
        title: text,
        steps: []
      }]);
      up('sections', ss => ss.map(x => x.id === sec.id ? {
        ...x,
        collapsed: false
      } : x));
      sfx('save');
      toast(`Миссия добавлена · ${nice(sec.name)}`);
      return true;
    },
    toShard: text => {
      up('shards', ss => [{
        ...blankShard(),
        title: text.slice(0, 80),
        body: text
      }, ...ss]);
      sfx('save');
      toast('Чип данных записан');
      return true;
    }
  };
}
function ParkedRow({
  p,
  onDone
}) {
  const ops = useParkOps();
  return React.createElement(Frame, {
    cut: 10,
    color: "rgba(var(--alt-rgb),.3)"
  }, React.createElement("div", {
    className: "flex items-center gap-2 pl-3 pr-2 py-2"
  }, React.createElement(StickyNote, {
    size: 16,
    className: "txt-alt shrink-0"
  }), React.createElement("div", {
    className: "flex-1 min-w-0 text-[14.5px] text-white/85 leading-snug f-read break-words"
  }, p.text), React.createElement(IconBtn, {
    sm: true,
    icon: Flag,
    title: "\u0412 \u043C\u0438\u0441\u0441\u0438\u044E",
    onClick: () => {
      if (ops.toMission(p.text)) onDone();
    }
  }), React.createElement(IconBtn, {
    sm: true,
    icon: FileText,
    title: "\u0412 \u0447\u0438\u043F \u0434\u0430\u043D\u043D\u044B\u0445",
    onClick: () => {
      if (ops.toShard(p.text)) onDone();
    }
  }), React.createElement(IconBtn, {
    sm: true,
    red: true,
    icon: X,
    title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
    onClick: onDone
  })));
}
function FocusSetup({
  missionId,
  onClose
}) {
  const {
    data,
    up
  } = useApp();
  const st = focusStreak(data.focus);
  const left = Math.max(0, st.goal - Math.round(st.todayMin));
  const missions = data.missions.filter(m => !m.done);
  const stepOf = id => {
    const m = data.missions.find(x => x.id === id);
    const s = m && m.steps.find(x => !x.done && x.text.trim());
    return s ? s.text : '';
  };
  const [mid, setMid] = useState(missions.some(m => m.id === missionId) ? missionId : '');
  const [goal, setGoal] = useState(() => stepOf(missionId));
  const [dur, setDur] = useState(data.focus.lastMin || 25);
  const durs = [...new Set([...FOCUS_DURS, dur])].sort((a, b) => a - b);
  const pickMission = id => {
    if (!goal.trim() || goal === stepOf(mid)) setGoal(stepOf(id));
    setMid(id);
  };
  const start = () => {
    const m = data.missions.find(x => x.id === mid),
      n = Date.now();
    readLeft();
    up('focus', f => ({
      ...f,
      lastMin: dur,
      active: {
        id: uid('fs'),
        missionId: mid,
        title: m ? m.title : '',
        goal: goal.trim(),
        planMin: dur,
        startAt: n,
        endAt: n + dur * 60e3,
        distractions: 0,
        reasons: {},
        leaves: 0,
        away: 0,
        parked: [],
        stoppedAt: 0
      }
    }));
    onClose();
  };
  return React.createElement(Modal, {
    onClose: onClose,
    title: "\u041D\u043E\u0432\u0430\u044F \u0441\u0435\u0441\u0441\u0438\u044F",
    code: "NEURAL LINK // CALIBRATE",
    footer: React.createElement(Btn, {
      className: "flex-1",
      icon: Play,
      snd: "open",
      onClick: start
    }, UI.mono ? 'Начать' : 'Подключиться', " \xB7 ", dur, " \u043C\u0438\u043D")
  }, React.createElement(Field, {
    label: "\u041C\u0438\u0441\u0441\u0438\u044F"
  }, React.createElement("select", {
    className: "inp",
    value: mid,
    onChange: e => pickMission(e.target.value)
  }, React.createElement("option", {
    value: ""
  }, "\u0411\u0435\u0437 \u043C\u0438\u0441\u0441\u0438\u0438"), missions.map(m => React.createElement("option", {
    key: m.id,
    value: m.id
  }, nice(m.title || 'БЕЗ НАЗВАНИЯ'))))), React.createElement(Field, {
    label: "\u0427\u0442\u043E \u0431\u0443\u0434\u0435\u0442 \u0441\u0434\u0435\u043B\u0430\u043D\u043E \u043A \u043A\u043E\u043D\u0446\u0443 \u0441\u0435\u0441\u0441\u0438\u0438"
  }, React.createElement("input", {
    className: "inp",
    value: goal,
    maxLength: 140,
    onChange: e => setGoal(e.target.value),
    placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u043F\u0435\u0440\u0432\u043E\u0439 \u0433\u043B\u0430\u0432\u044B"
  }), React.createElement("div", {
    className: "text-[12px] text-white/40 f-read mt-1.5 leading-snug"
  }, "\u041E\u0434\u043D\u0430 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u0430\u044F \u0446\u0435\u043B\u044C. \u0421 \u043D\u0435\u0439 \u043B\u0435\u0433\u0447\u0435 \u0437\u0430\u043C\u0435\u0442\u0438\u0442\u044C, \u0447\u0442\u043E \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u0443\u0448\u043B\u043E \u0432 \u0441\u0442\u043E\u0440\u043E\u043D\u0443.")), React.createElement(Field, {
    label: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C, \u043C\u0438\u043D"
  }, React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, durs.map(v => React.createElement("button", {
    key: v,
    type: "button",
    onClick: () => {
      sfx('tab');
      setDur(v);
    },
    className: `wd-chip cut ${dur === v ? 'on' : ''}`,
    style: {
      minWidth: 52
    }
  }, v))), React.createElement("div", {
    className: "text-[12px] text-white/40 f-read mt-2 leading-snug"
  }, st.todayDone ? `Цель дня (${st.goal} мин) уже выполнена.` : dur >= left ? `Этой сессии хватит, чтобы закрыть цель дня (осталось ${left} мин).` : `До цели дня осталось ${left} мин.`)));
}
function FocusRing({
  p,
  size = 260
}) {
  const r = size / 2 - 10,
    c = 2 * Math.PI * r;
  return React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    className: "absolute inset-0",
    style: {
      transform: 'rotate(-90deg)'
    }
  }, React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "rgba(255,255,255,.08)",
    strokeWidth: UI.mono ? 10 : 6
  }), !UI.mono && React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r + 8,
    fill: "none",
    stroke: "rgba(var(--main-rgb),.35)",
    strokeWidth: "1",
    strokeDasharray: "2 6"
  }), React.createElement("circle", {
    className: "f-ring",
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--alt)",
    strokeWidth: UI.mono ? 10 : 6,
    strokeLinecap: UI.mono ? 'round' : 'butt',
    strokeDasharray: c,
    strokeDashoffset: c * (1 - clamp(p, 0, 1)),
    style: {
      transition: 'stroke-dashoffset 1s linear'
    }
  }));
}
function FocusBackdrop({
  bg,
  dim,
  extra = 0
}) {
  if (!bg) return null;
  return React.createElement(React.Fragment, null, React.createElement(Img, {
    src: bg,
    className: "absolute inset-0 w-full h-full object-cover"
  }), React.createElement("div", {
    className: "absolute inset-0",
    style: {
      background: `linear-gradient(180deg,rgba(0,0,0,${Math.min(0.92, (BG_DIM[dim] || BG_DIM.mid) + extra)}),rgba(0,0,0,${Math.min(0.95, (BG_DIM[dim] || BG_DIM.mid) + extra + 0.15)}))`
    }
  }));
}
function FocusSession() {
  const {
    data,
    up,
    ask,
    toast
  } = useApp();
  const a = data.focus.active;
  const aRef = useRef(a);
  aRef.current = a;
  const live = !a.stoppedAt && Date.now() < a.endAt;
  const now = useNow(1000, live);
  const over = !!a.stoppedAt || now >= a.endAt;
  const [flash, setFlash] = useState(null);
  const [reasonTill, setReasonTill] = useState(0);
  const [thought, setThought] = useState(null);
  const [score, setScore] = useState(null);
  const [goalDone, setGoalDone] = useState(null);
  useEffect(() => {
    const settle = () => {
      const left = readLeft(),
        x = aRef.current;
      if (!left || !x || x.stoppedAt || left < x.startAt || left >= x.endAt) return;
      const away = Math.min(Date.now(), x.endAt) - left;
      if (away < 3000) return;
      up('focus', f => f.active && f.active.id === x.id ? {
        ...f,
        active: {
          ...f.active,
          leaves: f.active.leaves + 1,
          away: f.active.away + away
        }
      } : f);
      if (Date.now() < x.endAt) {
        sfx('error');
        setFlash({
          away,
          n: x.leaves + 1,
          k: Date.now()
        });
      }
    };
    const onVis = () => {
      if (document.visibilityState === 'hidden') {
        const x = aRef.current;
        if (x && !x.stoppedAt && Date.now() < x.endAt) {
          try {
            localStorage.setItem(FOCUS_LEFT_KEY, String(Date.now()));
          } catch (e) {}
        }
      } else settle();
    };
    settle();
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [up]);
  useEffect(() => {
    if (!flash) return undefined;
    const t = setTimeout(() => setFlash(null), 5000);
    return () => clearTimeout(t);
  }, [flash]);
  useEffect(() => {
    if (over) return undefined;
    let lock = null,
      dead = false;
    const req = async () => {
      try {
        if (!navigator.wakeLock || document.visibilityState !== 'visible') return;
        const l = await navigator.wakeLock.request('screen');
        if (dead) l.release();else lock = l;
      } catch (e) {}
    };
    const onVis = () => {
      if (document.visibilityState === 'visible') req();
    };
    req();
    document.addEventListener('visibilitychange', onVis);
    return () => {
      dead = true;
      document.removeEventListener('visibilitychange', onVis);
      try {
        if (lock) lock.release();
      } catch (e) {}
    };
  }, [over]);
  const wasOver = useRef(over);
  useEffect(() => {
    if (over && !wasOver.current && !a.stoppedAt) sfx('save');
    wasOver.current = over;
  }, [over, a.stoppedAt]);
  const patch = fn => up('focus', f => f.active && f.active.id === a.id ? {
    ...f,
    active: fn(f.active)
  } : f);
  const distract = () => {
    sfx('uncheck');
    patch(x => ({
      ...x,
      distractions: x.distractions + 1
    }));
    setReasonTill(Date.now() + 6000);
  };
  const pickReason = r => {
    sfx('tab');
    patch(x => ({
      ...x,
      reasons: {
        ...x.reasons,
        [r]: (x.reasons[r] || 0) + 1
      }
    }));
    setReasonTill(0);
  };
  const park = () => {
    const t = (thought || '').trim();
    if (t) {
      patch(x => ({
        ...x,
        parked: [...x.parked, {
          id: uid('fi'),
          text: t
        }]
      }));
      sfx('check');
      toast('Мысль отложена на потом');
    }
    setThought(null);
  };
  const stop = async () => {
    const done = Math.floor((Date.now() - a.startAt) / 60e3);
    const ans = await ask({
      title: 'Завершить сессию?',
      code: 'NEURAL LINK // DISCONNECT',
      text: `Прошло ${done} из ${a.planMin} мин. Сессия будет записана как прерванная.`,
      ok: 'Завершить',
      cancel: 'Продолжить',
      extra: 'Удалить без записи'
    });
    if (ans === true) patch(x => ({
      ...x,
      stoppedAt: Date.now()
    }));
    if (ans === 'extra') {
      readLeft();
      up('focus', f => ({
        ...f,
        active: null
      }));
      toast('Сессия удалена');
    }
  };
  const record = () => {
    const mm = data.missions.find(x => x.id === a.missionId);
    return {
      id: a.id,
      missionId: a.missionId || '',
      title: mm ? mm.title : a.title || '',
      goal: a.goal,
      start: new Date(a.startAt).toISOString(),
      planMin: a.planMin,
      ms: Math.max(0, (a.stoppedAt || a.endAt) - a.startAt),
      away: a.away,
      distractions: a.distractions,
      reasons: a.reasons,
      leaves: a.leaves,
      score,
      completed: !a.stoppedAt,
      goalDone
    };
  };
  const streakNow = () => {
    const s = record(),
      day = dKey(new Date(a.startAt));
    return [focusStreak(data.focus, day), focusStreak({
      ...data.focus,
      sessions: [...data.focus.sessions, s]
    }, day), s];
  };
  const save = () => {
    const [before, after, s] = streakNow();
    const at = new Date().toISOString();
    readLeft();
    up('focus', f => ({
      ...f,
      sessions: [...f.sessions, s],
      inbox: [...f.inbox, ...a.parked.map(p => ({
        ...p,
        at
      }))],
      active: null
    }));
    sfx('save');
    toast(after.todayDone && !before.todayDone ? `Цель дня выполнена · серия ${after.n} ${dayWord(after.n)}` : a.parked.length ? 'Сессия записана · мысли во вкладке «Фокус»' : 'Сессия записана');
  };
  const discard = async () => {
    const ok = await ask({
      title: 'Не сохранять сессию?',
      code: 'NEURAL LINK // PURGE',
      text: 'Сессия и отложенные мысли будут удалены.',
      ok: 'Удалить',
      danger: true
    });
    if (ok === true) {
      readLeft();
      up('focus', f => ({
        ...f,
        active: null
      }));
    }
  };
  const m = data.missions.find(x => x.id === a.missionId);
  const title = m ? m.title : a.title;
  const end = a.stoppedAt || a.endAt;
  const elapsed = Math.max(0, Math.min(now, end) - a.startAt);
  const plan = a.planMin * 60e3;
  const reasonsSet = Object.values(a.reasons).reduce((x, y) => x + y, 0);
  const wrap = 'relative w-full max-w-[480px] h-full flex flex-col px-5';
  const pads = {
    paddingTop: 'calc(16px + env(safe-area-inset-top))',
    paddingBottom: 'calc(16px + env(safe-area-inset-bottom))'
  };
  if (over) {
    const [before, after] = streakNow();
    const mins = Math.max(0, (end - a.startAt - a.away) / 60e3);
    return React.createElement("div", {
      className: "fixed inset-0 z-[80] focus-bg flex justify-center"
    }, React.createElement(FocusBackdrop, {
      bg: data.focus.bg,
      dim: data.focus.bgDim,
      extra: over ? 0.15 : 0
    }), React.createElement("div", {
      className: wrap,
      style: pads
    }, React.createElement("div", {
      className: "flex-1 overflow-y-auto noscb -mx-5 px-5"
    }, React.createElement("div", {
      className: "micro deco"
    }, "NEURAL LINK // DEBRIEF"), React.createElement("div", {
      className: "h1 mt-1"
    }, a.stoppedAt ? 'Сессия прервана' : 'Сессия завершена'), (title || a.goal) && React.createElement("div", {
      className: "mt-2 text-[14px] text-white/60 f-read leading-snug"
    }, title && React.createElement("span", {
      className: "font-semibold text-white/80"
    }, nice(title)), title && a.goal ? ' · ' : '', a.goal), React.createElement("div", {
      className: "grid grid-cols-3 gap-2 mt-4"
    }, [[fmtMin(mins), `Фокус из ${a.planMin}`], [a.distractions, plural(a.distractions, 'Отвлечение', 'Отвлечения', 'Отвлечений')], [a.leaves, plural(a.leaves, 'Выход', 'Выхода', 'Выходов')]].map(([v, l]) => React.createElement("div", {
      key: l,
      className: "stat-cell cut"
    }, React.createElement("div", {
      className: "f-orb text-[18px] font-bold txt-alt glow-alt leading-none"
    }, v), React.createElement("div", {
      className: "f-mono text-[9.5px] tracking-widest text-white/50 uppercase mt-1.5"
    }, l)))), reasonsSet > 0 && React.createElement("div", {
      className: "flex flex-wrap gap-1.5 mt-2"
    }, FOCUS_REASONS.filter(([k]) => a.reasons[k]).map(([k, n]) => React.createElement("span", {
      key: k,
      className: "tag cut",
      style: {
        '--tc': 'var(--warn)',
        '--cut': '5px'
      }
    }, n, " \xD7 ", a.reasons[k]))), a.leaves > 0 && React.createElement("div", {
      className: "text-[12.5px] text-white/45 f-read mt-2"
    }, "\u0412\u043D\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F: ", fmtClock(a.away)), a.goal && React.createElement("div", {
      className: "mt-5"
    }, React.createElement("span", {
      className: "lbl"
    }, "\u0426\u0435\u043B\u044C \u0434\u043E\u0441\u0442\u0438\u0433\u043D\u0443\u0442\u0430?"), React.createElement(Segmented, {
      value: goalDone,
      onChange: setGoalDone,
      accent: "var(--alt)",
      options: [{
        v: true,
        l: 'Да',
        i: Check
      }, {
        v: false,
        l: 'Нет',
        i: X
      }]
    })), React.createElement("div", {
      className: "mt-5"
    }, React.createElement("span", {
      className: "lbl"
    }, "\u041A\u0430\u043A \u0434\u0435\u0440\u0436\u0430\u043B\u043E\u0441\u044C \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435"), React.createElement("div", {
      className: "grid grid-cols-5 gap-1.5"
    }, [5, 4, 3, 2, 1].map(n => React.createElement("button", {
      key: n,
      type: "button",
      onClick: () => {
        sfx('score');
        setScore(score === n ? null : n);
      },
      className: "flex flex-col items-center gap-1.5 py-1",
      style: {
        opacity: score == null || score === n ? 1 : 0.35,
        transition: 'opacity .15s'
      }
    }, React.createElement(ScoreBox, {
      score: n,
      size: 46
    }), React.createElement("span", {
      className: "text-[11.5px] font-semibold",
      style: {
        color: score === n ? SCORE_COLOR[n] : 'rgba(255,255,255,.55)'
      }
    }, FOCUS_SCORE[n]))))), a.parked.length > 0 && React.createElement("div", {
      className: "mt-5"
    }, React.createElement("span", {
      className: "lbl"
    }, "\u041C\u044B\u0441\u043B\u0438 \u043D\u0430 \u043F\u043E\u0442\u043E\u043C \xB7 ", a.parked.length), React.createElement("div", {
      className: "space-y-2"
    }, a.parked.map(p => React.createElement(ParkedRow, {
      key: p.id,
      p: p,
      onDone: () => patch(x => ({
        ...x,
        parked: x.parked.filter(y => y.id !== p.id)
      }))
    }))), React.createElement("div", {
      className: "text-[12px] text-white/40 f-read mt-1.5"
    }, "\u041D\u0435\u0440\u0430\u0437\u043E\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u043E\u0441\u0442\u0430\u043D\u0443\u0442\u0441\u044F \u0432\u043E \u0432\u043A\u043B\u0430\u0434\u043A\u0435 \xAB\u0424\u043E\u043A\u0443\u0441\xBB.")), React.createElement("div", {
      className: "mt-5 mb-2 p-3 flex items-center gap-3 text-[13px] leading-snug f-read",
      style: {
        boxShadow: 'inset 0 0 0 1px rgba(var(--alt-rgb),.3)',
        borderRadius: UI.mono ? 14 : 0,
        color: 'rgba(255,255,255,.75)'
      }
    }, React.createElement(Flame, {
      size: 22,
      className: "shrink-0",
      style: {
        color: after.todayDone ? 'var(--warn)' : 'rgba(255,255,255,.35)'
      }
    }), React.createElement("span", null, after.todayDone && !before.todayDone ? `Цель дня выполнена! Серия: ${after.n} ${dayWord(after.n)}.` : before.todayDone ? `Цель дня уже была выполнена. Сегодня ${fmtMin(after.todayMin)} фокуса, серия ${after.n} ${dayWord(after.n)}.` : `До цели дня осталось ${fmtMin(Math.max(0, after.goal - Math.round(after.todayMin)))}: сегодня ${Math.round(after.todayMin)} из ${after.goal} мин.`))), React.createElement("div", {
      className: "grid grid-cols-[1fr_2fr] gap-2 pt-3"
    }, React.createElement(Btn, {
      variant: "dark",
      snd: "none",
      onClick: discard
    }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"), React.createElement(Btn, {
      icon: Save,
      snd: "none",
      onClick: save
    }, "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C"))));
  }
  const showReasons = reasonTill > Date.now();
  return React.createElement("div", {
    className: "fixed inset-0 z-[80] focus-bg flex justify-center"
  }, React.createElement(FocusBackdrop, {
    bg: data.focus.bg,
    dim: data.focus.bgDim,
    extra: over ? 0.15 : 0
  }), React.createElement("div", {
    className: wrap,
    style: pads
  }, React.createElement("div", {
    className: "flex items-start gap-3"
  }, React.createElement("div", {
    className: "flex-1 min-w-0"
  }, React.createElement("div", {
    className: "micro deco"
  }, "NEURAL LINK // ACTIVE"), React.createElement("div", {
    className: "text-[15px] font-semibold uppercase tracking-wider txt-alt glow-alt truncate mt-0.5"
  }, nice(title || 'Фокус-сессия'))), React.createElement(IconBtn, {
    icon: X,
    title: "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C",
    onClick: stop
  })), a.goal && React.createElement("div", {
    className: "mt-3 text-[16px] text-white/85 f-read leading-snug",
    style: {
      borderLeft: '3px solid var(--alt)',
      paddingLeft: 10
    }
  }, a.goal), React.createElement("div", {
    className: "flex-1 flex flex-col items-center justify-center relative"
  }, flash && React.createElement("div", {
    key: flash.k,
    className: "f-alert cut absolute top-0 left-0 right-0 px-4 py-3 text-center z-10"
  }, React.createElement("div", {
    className: "font-bold tracking-[.12em] uppercase text-[15px]"
  }, UI.mono ? 'Ты выходил из приложения' : 'Связь прервана'), React.createElement("div", {
    className: "text-[12.5px] mt-0.5 opacity-80"
  }, "\u0412\u043D\u0435 \u0441\u0435\u0441\u0441\u0438\u0438 ", fmtClock(flash.away), " \xB7 \u0432\u044B\u0445\u043E\u0434 \u2116", flash.n)), React.createElement("div", {
    className: "relative",
    style: {
      width: 260,
      height: 260
    }
  }, React.createElement(FocusRing, {
    p: elapsed / plan
  }), React.createElement("div", {
    className: "absolute inset-0 flex flex-col items-center justify-center"
  }, React.createElement("div", {
    className: "f-time",
    style: {
      fontSize: plan - elapsed >= 3600e3 ? 44 : 58
    }
  }, fmtClock(plan - elapsed)), React.createElement("div", {
    className: "micro mt-3",
    style: {
      color: 'rgba(255,255,255,.45)'
    }
  }, "\u0418\u0417 ", a.planMin, " \u041C\u0418\u041D"))), React.createElement("div", {
    className: "flex gap-5 mt-5 f-mono text-[12px] tracking-wider text-white/55 uppercase"
  }, React.createElement("span", null, "\u041E\u0442\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0439: ", React.createElement("b", {
    className: "text-white/90"
  }, a.distractions)), React.createElement("span", null, "\u0412\u044B\u0445\u043E\u0434\u043E\u0432: ", React.createElement("b", {
    style: {
      color: a.leaves ? '#FF5A5A' : 'rgba(255,255,255,.9)'
    }
  }, a.leaves)))), React.createElement("div", {
    className: "min-h-[92px] flex items-end"
  }, thought != null ? React.createElement("div", {
    className: "flex gap-2 w-full"
  }, React.createElement("input", {
    autoFocus: true,
    className: "inp flex-1 min-w-0",
    value: thought,
    maxLength: 200,
    placeholder: "\u041C\u044B\u0441\u043B\u044C, \u043A \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u0432\u0435\u0440\u043D\u0451\u0448\u044C\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u0441\u0435\u0441\u0441\u0438\u0438",
    onChange: e => setThought(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') park();
      if (e.key === 'Escape') setThought(null);
    }
  }), React.createElement(Btn, {
    small: true,
    snd: "none",
    icon: Check,
    onClick: park
  }, "OK")) : showReasons ? React.createElement("div", {
    className: "w-full"
  }, React.createElement("div", {
    className: "micro mb-1.5",
    style: {
      color: 'rgba(255,255,255,.5)'
    }
  }, "\u0427\u0422\u041E \u041E\u0422\u0412\u041B\u0415\u041A\u041B\u041E?"), React.createElement("div", {
    className: "flex flex-wrap gap-1.5"
  }, FOCUS_REASONS.map(([k, n]) => React.createElement("button", {
    key: k,
    type: "button",
    className: "f-chip cut",
    onClick: () => pickReason(k)
  }, n)))) : React.createElement("div", {
    className: "w-full text-center text-[12.5px] text-white/35 f-read leading-snug pb-1"
  }, "\u041F\u043E\u0439\u043C\u0430\u043B \u0441\u0435\u0431\u044F \u043D\u0430 \u043F\u043E\u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0445 \u043C\u044B\u0441\u043B\u044F\u0445 \u2014 \u043D\u0430\u0436\u043C\u0438 \xAB\u041E\u0442\u0432\u043B\u0451\u043A\u0441\u044F\xBB \u0438 \u0432\u0435\u0440\u043D\u0438\u0441\u044C \u043A \u0446\u0435\u043B\u0438")), React.createElement("div", {
    className: "grid grid-cols-2 gap-2 mt-3"
  }, React.createElement(Btn, {
    variant: "ghost",
    icon: RotateCcw,
    snd: "none",
    onClick: distract,
    style: {
      paddingTop: 16,
      paddingBottom: 16
    }
  }, "\u041E\u0442\u0432\u043B\u0451\u043A\u0441\u044F"), React.createElement(Btn, {
    variant: "ghost",
    icon: StickyNote,
    onClick: () => setThought(thought == null ? '' : null),
    style: {
      paddingTop: 16,
      paddingBottom: 16
    }
  }, "\u041C\u044B\u0441\u043B\u044C"))));
}
function FocusBgModal({
  onClose
}) {
  const {
    data,
    up
  } = useApp();
  const f = data.focus;
  const set = p => up('focus', x => ({
    ...x,
    ...p
  }));
  return React.createElement(Modal, {
    onClose: onClose,
    title: "\u0424\u043E\u043D \u0441\u0435\u0441\u0441\u0438\u0438",
    code: "NEURAL LINK // BACKDROP",
    footer: React.createElement(Btn, {
      className: "flex-1",
      icon: Check,
      onClick: onClose
    }, "\u0413\u043E\u0442\u043E\u0432\u043E")
  }, React.createElement("div", {
    className: "relative h-[230px] overflow-hidden focus-bg cut mb-4 flex flex-col items-center justify-center",
    style: {
      '--cut': '14px',
      borderRadius: UI.mono ? 18 : 0,
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.12)'
    }
  }, React.createElement(FocusBackdrop, {
    bg: f.bg,
    dim: f.bgDim
  }), React.createElement("div", {
    className: "relative f-time",
    style: {
      fontSize: 48
    }
  }, "25:00"), React.createElement("div", {
    className: "relative micro mt-2",
    style: {
      color: 'rgba(255,255,255,.55)'
    }
  }, "\u041F\u0420\u0415\u0414\u041F\u0420\u041E\u0421\u041C\u041E\u0422\u0420")), React.createElement(Field, {
    label: "\u0424\u043E\u0442\u043E"
  }, React.createElement(ImageInput, {
    value: f.bg,
    onChange: v => set({
      bg: v
    }),
    maxDim: 2560,
    quality: 0.92,
    noPreview: true
  }), f.bg && React.createElement(Btn, {
    small: true,
    variant: "dangerGhost",
    icon: X,
    className: "w-full mt-2",
    onClick: () => set({
      bg: ''
    })
  }, "\u0423\u0431\u0440\u0430\u0442\u044C \u0444\u043E\u0442\u043E")), f.bg && React.createElement(Field, {
    label: "\u0417\u0430\u0442\u0435\u043C\u043D\u0435\u043D\u0438\u0435"
  }, React.createElement(Segmented, {
    value: f.bgDim,
    onChange: v => set({
      bgDim: v
    }),
    accent: "var(--alt)",
    options: [{
      v: 'low',
      l: 'Слабое'
    }, {
      v: 'mid',
      l: 'Среднее'
    }, {
      v: 'high',
      l: 'Сильное'
    }]
  })), React.createElement("div", {
    className: "text-[12px] text-white/40 f-read leading-snug"
  }, "\u0424\u043E\u0442\u043E \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u044D\u043A\u0440\u0430\u043D\u0435 \u0438\u0434\u0443\u0449\u0435\u0439 \u0441\u0435\u0441\u0441\u0438\u0438. \u0421\u043F\u043E\u043A\u043E\u0439\u043D\u0430\u044F \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0430 \u0431\u0435\u0437 \u043C\u0435\u043B\u043A\u0438\u0445 \u0434\u0435\u0442\u0430\u043B\u0435\u0439 \u043E\u0442\u0432\u043B\u0435\u043A\u0430\u0435\u0442 \u043C\u0435\u043D\u044C\u0448\u0435 \u0432\u0441\u0435\u0433\u043E."));
}
function FocusScreen() {
  const {
    data,
    up,
    openFocus,
    undoable
  } = useApp();
  const f = data.focus;
  const [sheet, setSheet] = useState(null);
  const [bgEdit, setBgEdit] = useState(false);
  const now = new Date(),
    todayK = dKey(now);
  const st = useMemo(() => focusStreak(f, todayK), [f, todayK]);
  const byDay = useMemo(() => {
    const o = {};
    f.sessions.forEach(s => {
      const k = dKey(new Date(s.start));
      (o[k] = o[k] || []).push(s);
    });
    return o;
  }, [f.sessions]);
  const days = Array.from({
    length: 7
  }, (_, i) => dKey(addDays(now, i - 6)));
  const week = days.flatMap(k => byDay[k] || []);
  const today = byDay[todayK] || [];
  const sum = list => list.reduce((x, s) => x + focusMin(s), 0);
  const ws = data.settings.weekStart;
  const gridStart = addDays(now, -((now.getDay() - ws + 7) % 7) - 28);
  const grid = Array.from({
    length: 35
  }, (_, i) => addDays(gridStart, i));
  const wdh = ws === 1 ? WD : ['Вс', ...WD.slice(0, 6)];
  const left = Math.max(0, st.goal - Math.round(st.todayMin));
  const setGoal = v => {
    const min = clamp(Math.round(v / GOAL_STEP) * GOAL_STEP, GOAL_MIN, GOAL_MAX);
    if (min !== st.goal) up('focus', x => ({
      ...x,
      goals: [...x.goals.filter(g => g.from !== todayK), {
        from: todayK,
        min
      }]
    }));
  };
  const goalPct = `${(clamp(st.goal, GOAL_MIN, GOAL_MAX) - GOAL_MIN) / (GOAL_MAX - GOAL_MIN) * 100}%`;
  const ICE = '#7FD4FF';
  const top = topReason(week);
  const record = f.sessions.reduce((x, s) => Math.max(x, focusMin(s)), 0);
  const recent = [...f.sessions].sort((x, y) => String(y.start).localeCompare(String(x.start))).slice(0, 15);
  const missionTitle = s => {
    const m = data.missions.find(x => x.id === s.missionId);
    return m ? m.title : s.title;
  };
  const sheetS = sheet && f.sessions.find(s => s.id === sheet);
  const cell = (v, l) => React.createElement("div", {
    key: l,
    className: "stat-cell cut"
  }, React.createElement("div", {
    className: "f-orb text-[18px] font-bold txt-alt glow-alt leading-none"
  }, v), React.createElement("div", {
    className: "f-mono text-[9.5px] tracking-widest text-white/50 uppercase mt-1.5"
  }, l));
  return React.createElement("div", {
    className: "pb-8"
  }, React.createElement(ScreenHeader, {
    code: "NEURAL LINK 2.0 // FOCUS.EXE",
    title: "\u0424\u043E\u043A\u0443\u0441",
    sub: "\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0430 \u043A\u043E\u043D\u0446\u0435\u043D\u0442\u0440\u0430\u0446\u0438\u0438: \u043E\u0434\u043D\u0430 \u0446\u0435\u043B\u044C, \u043D\u043E\u043B\u044C \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439"
  }), React.createElement("div", {
    className: "px-4 mt-4"
  }, React.createElement(Frame, {
    cut: 18,
    color: "rgba(var(--alt-rgb),.5)",
    mc: "transparent",
    mb: "#111113"
  }, React.createElement("div", {
    className: "p-4"
  }, React.createElement("div", {
    className: "flex items-center gap-4"
  }, React.createElement("div", {
    className: "w-[64px] h-[64px] shrink-0 flex items-center justify-center cut",
    style: {
      '--cut': '12px',
      background: st.n ? 'rgba(var(--warn-rgb),.12)' : 'rgba(255,255,255,.05)',
      boxShadow: UI.mono ? 'none' : `inset 0 0 0 1px ${st.n ? 'rgba(var(--warn-rgb),.55)' : 'rgba(255,255,255,.15)'}`,
      borderRadius: UI.mono ? 20 : 0
    }
  }, React.createElement(Flame, {
    size: 34,
    style: {
      color: st.n ? 'var(--warn)' : 'rgba(255,255,255,.3)',
      filter: UI.mono || !st.n ? 'none' : 'drop-shadow(0 0 6px var(--warn))'
    }
  })), React.createElement("div", {
    className: "min-w-0 flex-1"
  }, React.createElement("div", {
    className: "micro deco"
  }, "STREAK.PROTOCOL"), React.createElement("div", {
    className: "flex items-baseline gap-2"
  }, React.createElement("span", {
    className: "st-score text-[38px]",
    style: {
      color: st.n ? 'var(--warn)' : 'rgba(255,255,255,.4)',
      textShadow: UI.mono || !st.n ? 'none' : '0 0 14px rgba(var(--warn-rgb),.5)'
    }
  }, st.n), React.createElement("span", {
    className: "sec-title text-[17px]"
  }, dayWord(st.n), " \u043F\u043E\u0434\u0440\u044F\u0434")), React.createElement("div", {
    className: "text-[12.5px] text-white/50 f-read mt-0.5"
  }, "\u0420\u0435\u043A\u043E\u0440\u0434: ", st.best, " ", dayWord(st.best)))), React.createElement("div", {
    className: "flex items-baseline justify-between mt-4"
  }, React.createElement("span", {
    className: "lbl",
    style: {
      marginBottom: 0
    }
  }, "\u0421\u0435\u0433\u043E\u0434\u043D\u044F"), React.createElement("span", {
    className: "f-mono text-[13px] text-white/80"
  }, Math.round(st.todayMin), " / ", st.goal, " \u043C\u0438\u043D")), React.createElement("div", {
    className: "mt-1.5 h-2 overflow-hidden",
    style: {
      background: 'rgba(255,255,255,.08)',
      borderRadius: UI.mono ? 4 : 0
    }
  }, React.createElement("div", {
    className: "h-full",
    style: {
      width: `${Math.min(100, st.todayMin / st.goal * 100)}%`,
      background: st.todayDone ? 'var(--warn)' : 'var(--alt)',
      boxShadow: UI.mono ? 'none' : '0 0 8px var(--alt)',
      borderRadius: UI.mono ? 4 : 0,
      transition: 'width .3s'
    }
  })), React.createElement("div", {
    className: "text-[12.5px] f-read mt-1.5",
    style: {
      color: st.todayDone ? 'var(--warn)' : 'rgba(255,255,255,.55)'
    }
  }, st.todayDone ? 'Цель дня выполнена — серия продлена' : `Ещё ${left} мин сегодня, чтобы ${st.n ? 'продлить' : 'начать'} серию`, today.length > 0 && React.createElement("span", {
    className: "text-white/40"
  }, " \xB7 ", today.length, " ", plural(today.length, 'сессия', 'сессии', 'сессий'))), React.createElement("div", {
    className: "flex items-center gap-2 mt-3"
  }, Array.from({
    length: FREEZE_MAX
  }, (_, i) => React.createElement(Snowflake, {
    key: i,
    size: 18,
    style: {
      color: i < st.freezes ? ICE : 'rgba(255,255,255,.15)',
      filter: i < st.freezes && !UI.mono ? `drop-shadow(0 0 4px ${ICE})` : 'none'
    }
  })), React.createElement("span", {
    className: "text-[12.5px] text-white/55 f-read ml-1"
  }, "\u0417\u0430\u043C\u043E\u0440\u043E\u0437\u043A\u0438: ", st.freezes, " \u0438\u0437 ", FREEZE_MAX, st.freezes < FREEZE_MAX ? ` · ещё одна через ${FREEZE_EVERY - st.n % FREEZE_EVERY} ${dayWord(FREEZE_EVERY - st.n % FREEZE_EVERY)} серии` : '')), React.createElement("div", {
    className: "text-[12px] text-white/40 f-read mt-1 leading-snug"
  }, "\u0417\u0430\u043C\u043E\u0440\u043E\u0437\u043A\u0430 \u0442\u0440\u0430\u0442\u0438\u0442\u0441\u044F \u0441\u0430\u043C\u0430, \u0435\u0441\u043B\u0438 \u043F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0448\u044C \u0434\u0435\u043D\u044C, \u0438 \u0441\u0435\u0440\u0438\u044F \u043D\u0435 \u043F\u0440\u0435\u0440\u0432\u0451\u0442\u0441\u044F. \u0414\u0430\u0451\u0442\u0441\u044F \u0437\u0430 \u043A\u0430\u0436\u0434\u044B\u0435 ", FREEZE_EVERY, " \u0434\u043D\u0435\u0439 \u0441\u0435\u0440\u0438\u0438."), React.createElement("div", {
    className: "flex items-baseline justify-between mt-4"
  }, React.createElement("span", {
    className: "lbl",
    style: {
      marginBottom: 0
    }
  }, "\u0426\u0435\u043B\u044C \u0432 \u0434\u0435\u043D\u044C"), React.createElement("span", {
    className: "f-orb text-[17px] font-bold txt-alt glow-alt"
  }, fmtMin(st.goal))), React.createElement("div", {
    className: "flex items-center gap-2 mt-1.5"
  }, React.createElement(IconBtn, {
    sm: true,
    icon: Minus,
    title: "\u041C\u0435\u043D\u044C\u0448\u0435 \u043D\u0430 5 \u043C\u0438\u043D\u0443\u0442",
    onClick: () => setGoal(st.goal - GOAL_STEP)
  }), React.createElement("input", {
    type: "range",
    className: "f-range flex-1 min-w-0",
    "aria-label": "\u0426\u0435\u043B\u044C \u0432 \u0434\u0435\u043D\u044C, \u043C\u0438\u043D\u0443\u0442",
    min: GOAL_MIN,
    max: GOAL_MAX,
    step: GOAL_STEP,
    value: clamp(st.goal, GOAL_MIN, GOAL_MAX),
    style: {
      '--p': goalPct
    },
    onChange: e => setGoal(Number(e.target.value))
  }), React.createElement(IconBtn, {
    sm: true,
    icon: Plus,
    title: "\u0411\u043E\u043B\u044C\u0448\u0435 \u043D\u0430 5 \u043C\u0438\u043D\u0443\u0442",
    onClick: () => setGoal(st.goal + GOAL_STEP)
  })), React.createElement("div", {
    className: "flex justify-between f-mono text-[10px] text-white/35 mt-0.5",
    style: {
      padding: '0 42px'
    }
  }, React.createElement("span", null, GOAL_MIN, " \u043C\u0438\u043D"), React.createElement("span", null, GOAL_MAX / 60, " \u0447")), React.createElement("div", {
    className: "text-[12px] text-white/40 f-read mt-1 leading-snug"
  }, "\u041D\u043E\u0432\u0430\u044F \u0446\u0435\u043B\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0441 \u0441\u0435\u0433\u043E\u0434\u043D\u044F\u0448\u043D\u0435\u0433\u043E \u0434\u043D\u044F, \u043F\u0440\u043E\u0448\u043B\u044B\u0435 \u0434\u043D\u0438 \u043D\u0435 \u043F\u0435\u0440\u0435\u0441\u0447\u0438\u0442\u044B\u0432\u0430\u044E\u0442\u0441\u044F."), React.createElement(Btn, {
    className: "w-full mt-4",
    icon: Play,
    snd: "open",
    onClick: () => openFocus('')
  }, "\u041D\u0430\u0447\u0430\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E")))), React.createElement("div", {
    className: "px-4 mt-3"
  }, React.createElement("button", {
    type: "button",
    className: "block w-full text-left",
    onClick: () => {
      sfx('open');
      setBgEdit(true);
    }
  }, React.createElement(Frame, {
    cut: 12,
    color: "rgba(var(--main-rgb),.3)"
  }, React.createElement("div", {
    className: "flex items-center gap-3 p-2.5"
  }, f.bg ? React.createElement(Img, {
    src: f.bg,
    thumb: true,
    className: "w-11 h-11 object-cover cut shrink-0",
    style: {
      '--cut': '6px',
      borderRadius: UI.mono ? 10 : 0
    }
  }) : React.createElement("span", {
    className: "w-11 h-11 shrink-0 flex items-center justify-center cut txt-alt",
    style: {
      '--cut': '6px',
      background: 'rgba(var(--alt-rgb),.08)',
      borderRadius: UI.mono ? 10 : 0
    }
  }, React.createElement(ImagePlus, {
    size: 20
  })), React.createElement("span", {
    className: "flex-1 min-w-0"
  }, React.createElement("span", {
    className: "block text-[15px] font-semibold text-white/90"
  }, "\u0424\u043E\u043D \u044D\u043A\u0440\u0430\u043D\u0430 \u0441\u0435\u0441\u0441\u0438\u0438"), React.createElement("span", {
    className: "block text-[12px] text-white/45 f-read"
  }, f.bg ? 'Своё фото' : 'Стандартный · можно поставить своё фото')), React.createElement(ChevronRight, {
    size: 18,
    className: "text-white/40 shrink-0"
  }))))), React.createElement("div", {
    className: "px-4 mt-5"
  }, React.createElement(SectionHeader, {
    name: "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C \u0441\u0435\u0440\u0438\u0438",
    count: st.n
  }), React.createElement(Frame, {
    cut: 14,
    className: "mt-2.5",
    color: "rgba(var(--main-rgb),.35)"
  }, React.createElement("div", {
    className: "p-3"
  }, React.createElement("div", {
    className: "grid grid-cols-7 gap-1.5"
  }, wdh.map(w => React.createElement("div", {
    key: w,
    className: "text-center f-mono text-[10px] uppercase pb-0.5",
    style: {
      color: 'rgba(255,255,255,.4)'
    }
  }, w)), grid.map(d => {
    const k = dKey(d),
      m = st.mins[k] || 0,
      g = st.goalOf(k),
      done = Math.round(m) >= g,
      fz = st.frozen.has(k),
      fut = k > todayK;
    const bg = fut ? 'transparent' : done ? 'var(--alt)' : m > 0 ? `rgba(var(--alt-rgb),${(0.15 + 0.35 * Math.min(1, m / g)).toFixed(2)})` : fz ? 'rgba(127,212,255,.12)' : 'rgba(255,255,255,.05)';
    return React.createElement("div", {
      key: k,
      className: "relative aspect-square flex items-center justify-center cut",
      title: `${fmtDay(k)}: ${Math.round(m)} мин`,
      style: {
        '--cut': '5px',
        background: bg,
        borderRadius: UI.mono ? 7 : 0,
        boxShadow: k === todayK ? 'inset 0 0 0 1.5px var(--warn)' : fut ? 'inset 0 0 0 1px rgba(255,255,255,.06)' : 'none'
      }
    }, fz ? React.createElement(Snowflake, {
      size: 14,
      style: {
        color: ICE
      }
    }) : React.createElement("span", {
      className: "f-mono text-[10.5px]",
      style: {
        color: done ? '#000' : fut ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.55)'
      }
    }, d.getDate()));
  })), React.createElement("div", {
    className: "flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3 f-mono text-[10px] text-white/50"
  }, React.createElement("span", {
    className: "flex items-center gap-1"
  }, React.createElement("i", {
    className: "inline-block w-2.5 h-2.5",
    style: {
      background: 'var(--alt)',
      borderRadius: UI.mono ? 3 : 0
    }
  }), "\u0446\u0435\u043B\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430"), React.createElement("span", {
    className: "flex items-center gap-1"
  }, React.createElement("i", {
    className: "inline-block w-2.5 h-2.5",
    style: {
      background: 'rgba(var(--alt-rgb),.35)',
      borderRadius: UI.mono ? 3 : 0
    }
  }), "\u0447\u0430\u0441\u0442\u0438\u0447\u043D\u043E"), React.createElement("span", {
    className: "flex items-center gap-1"
  }, React.createElement(Snowflake, {
    size: 11,
    style: {
      color: ICE
    }
  }), "\u0437\u0430\u043C\u043E\u0440\u043E\u0437\u043A\u0430"))))), React.createElement("div", {
    className: "px-4 mt-5"
  }, React.createElement(SectionHeader, {
    name: "7 \u0434\u043D\u0435\u0439",
    count: week.length
  }), React.createElement("div", {
    className: "grid grid-cols-2 gap-2 mt-2.5"
  }, cell(fmtMin(sum(week)), 'Фокус за неделю'), cell(week.length ? round1(week.reduce((x, s) => x + s.distractions, 0) / week.length) : '—', 'Отвлечений за сессию'), cell(top ? REASON_NAME[top] : '—', 'Главный враг'), cell(record ? fmtMin(record) : '—', 'Рекорд сессии'))), f.inbox.length > 0 && React.createElement("div", {
    className: "px-4 mt-5"
  }, React.createElement(SectionHeader, {
    name: "\u041C\u044B\u0441\u043B\u0438 \u043D\u0430 \u043F\u043E\u0442\u043E\u043C",
    count: f.inbox.length
  }), React.createElement("div", {
    className: "space-y-2 mt-2.5"
  }, f.inbox.map(p => React.createElement(ParkedRow, {
    key: p.id,
    p: p,
    onDone: () => up('focus', x => ({
      ...x,
      inbox: x.inbox.filter(y => y.id !== p.id)
    }))
  })))), React.createElement("div", {
    className: "px-4 mt-5"
  }, React.createElement(SectionHeader, {
    name: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F",
    count: f.sessions.length
  }), React.createElement("div", {
    className: "space-y-2 mt-2.5"
  }, recent.map(s => {
    const t = missionTitle(s),
      d = new Date(s.start);
    return React.createElement("button", {
      key: s.id,
      type: "button",
      className: "block w-full text-left",
      onClick: () => {
        sfx();
        setSheet(s.id);
      }
    }, React.createElement(Frame, {
      cut: 12,
      color: "rgba(var(--main-rgb),.3)"
    }, React.createElement("div", {
      className: "flex items-center gap-3 p-3"
    }, React.createElement(ScoreBox, {
      score: typeof s.score === 'number' ? s.score : undefined
    }), React.createElement("div", {
      className: "flex-1 min-w-0"
    }, React.createElement("div", {
      className: "m-title text-[15px] truncate"
    }, nice(s.goal || t || 'Фокус-сессия')), React.createElement("div", {
      className: "text-[12px] text-white/50 f-read mt-0.5 truncate"
    }, d.getDate(), " ", MONTHS_GEN[d.getMonth()], " \xB7 ", pad(d.getHours()), ":", pad(d.getMinutes()), s.goal && t ? ` · ${nice(t)}` : '')), React.createElement("div", {
      className: "shrink-0 text-right"
    }, React.createElement("div", {
      className: "f-orb text-[14px] font-bold",
      style: {
        color: s.completed ? 'var(--alt)' : '#FF8A3D'
      }
    }, Math.round(focusMin(s)), React.createElement("span", {
      className: "text-white/40 text-[11px]"
    }, "/", s.planMin)), React.createElement("div", {
      className: "f-mono text-[10px] text-white/45 mt-0.5"
    }, s.completed ? `${s.distractions} ОТВЛ.` : 'ПРЕРВАНА', s.leaves ? ` · ${s.leaves} ВЫХ.` : '')))));
  }), !f.sessions.length && React.createElement(Empty, {
    icon: Brain,
    title: "\u0421\u0435\u0441\u0441\u0438\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442",
    text: "\u041D\u0430\u0447\u043D\u0438 \u0441 \u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0439: 10\u201315 \u043C\u0438\u043D\u0443\u0442 \u043D\u0430 \u043E\u0434\u043D\u0443 \u0437\u0430\u0434\u0430\u0447\u0443"
  }))), sheetS && React.createElement(Sheet, {
    title: `СЕССИЯ // ${fmtDT(sheetS.start)}`,
    onClose: () => setSheet(null),
    items: [sheetS.missionId && data.missions.some(m => m.id === sheetS.missionId && !m.done) && {
      label: 'Ещё сессия по этой миссии',
      icon: Play,
      on: () => openFocus(sheetS.missionId)
    }, {
      label: 'Удалить запись',
      icon: Trash2,
      danger: true,
      on: () => undoable('Сессия удалена', ['focus'], () => up('focus', x => ({
        ...x,
        sessions: x.sessions.filter(y => y.id !== sheetS.id)
      })))
    }]
  }), bgEdit && React.createElement(FocusBgModal, {
    onClose: () => setBgEdit(false)
  }));
}
function SetBlock({
  n,
  title,
  icon: Icon,
  children
}) {
  return React.createElement(Frame, {
    cut: 16,
    className: "mb-4",
    color: "rgba(var(--main-rgb),.45)",
    bg: "linear-gradient(180deg,rgba(18,10,20,.96),rgba(8,7,12,.96))"
  }, React.createElement("div", {
    className: "set-head"
  }, React.createElement("span", {
    className: "set-n"
  }, n), React.createElement(Icon, {
    size: 16,
    className: "txt-main"
  }), React.createElement("span", {
    className: "set-t"
  }, title)), React.createElement("div", {
    className: "p-4 term-bg"
  }, children));
}
const THR_OPTIONS = Array.from({
  length: 41
}, (_, i) => round1(1 + i * 0.1));
function SettingsScreen({
  forceEvening,
  simulateSkip
}) {
  const {
    data,
    up,
    ask,
    toast,
    replaceAll,
    undoable,
    markBackup,
    cloudOn
  } = useApp();
  const ops = useDirOps();
  const [avEdit, setAvEdit] = useState(false);
  const [persisted, setPersisted] = useState(null);
  useEffect(() => {
    storagePersisted(false).then(setPersisted);
  }, []);
  const [photoStat, setPhotoStat] = useState(null);
  useEffect(() => {
    imgList().then(rs => setPhotoStat({
      n: rs.filter(r => !String(r.id).endsWith('.t')).length,
      mb: rs.reduce((a, r) => a + r.size, 0) / 1048576
    })).catch(() => setPhotoStat(null));
  }, [data]);
  const s = data.settings;
  const set = p => up('settings', x => ({
    ...x,
    ...p
  }));
  const fileRef = useRef(null);
  const sizeKB = useMemo(() => {
    try {
      return Math.max(1, Math.round(new Blob([JSON.stringify(data)]).size / 1024));
    } catch (e) {
      return 0;
    }
  }, [data]);
  const winActive = inWindow(new Date(), s.winStart, s.winEnd);
  const secCount = useMemo(() => {
    const o = {};
    data.missions.forEach(m => {
      o[m.sectionId] = (o[m.sectionId] || 0) + 1;
    });
    return o;
  }, [data.missions]);
  const tagCount = useMemo(() => {
    const o = {};
    data.shards.forEach(sh => sh.tags.forEach(t => {
      o[t] = (o[t] || 0) + 1;
    }));
    return o;
  }, [data.shards]);
  const shareOK = useMemo(canShareFiles, []);
  const exportJSON = async share => {
    const res = share ? await sendBackup(data, ask) : await exportBackup(data);
    if (res === 'saved') {
      markBackup();
      sfx('save');
      toast(share ? 'Бэкап отправлен' : 'Бэкап выгружен в .json');
    } else if (res === 'declined') toast(share ? 'Отправка отменена' : 'Сохранение отменено');else {
      sfx('error');
      toast('Не удалось сохранить файл');
    }
  };
  const importFile = async f => {
    try {
      const j = JSON.parse(await f.text());
      const d = j && j.data ? j.data : j;
      if (!d || typeof d !== 'object' || !(Array.isArray(d.missions) || Array.isArray(d.cards) || Array.isArray(d.shards))) throw new Error('bad');
      let nd = normalize(d);
      const imgs = j && j.images && typeof j.images === 'object' ? Object.entries(j.images).filter(([, v]) => isInline(v)) : [];
      const photos = imgs.filter(([k]) => !k.endsWith('.t')).length + listImages(nd).filter(isInline).length;
      const ok = await ask({
        title: 'Импорт данных',
        code: 'SYS // RESTORE',
        text: `Файл: ${f.name}\nМиссий: ${nd.missions.length} · чипов: ${nd.shards.length} · оценённых дней: ${Object.keys(nd.ratings).length} · таймеров: ${nd.timers.length} · фото: ${photos}\n\nТекущие данные будут заменены.`,
        ok: 'Восстановить',
        danger: true
      });
      if (ok !== true) return;
      if (imgs.length) {
        try {
          await imgPut(imgs.map(([k, v]) => [k, dataURLToBlob(v)]));
        } catch (e) {
          const all = Object.fromEntries(imgs);
          nd = mapImages(nd, v => isIdb(v) && all[v.slice(4)] ? all[v.slice(4)] : undefined);
        }
      }
      undoable('Данные восстановлены', null, () => replaceAll(nd));
      sfx('save');
    } catch (e) {
      sfx('error');
      toast('Ошибка: неверный файл бэкапа');
    }
  };
  const resetDemo = async () => {
    const ok = await ask({
      title: 'Сбросить до демо?',
      code: 'SYS // RESET.DEMO',
      text: 'Все миссии, записи, карточки, оценки и таймеры будут заменены примерами со скриншотов. Настройки сохранятся.',
      ok: 'Сбросить',
      danger: true
    });
    if (ok !== true) return;
    const demo = makeDemo();
    undoable('Демо-данные восстановлены', null, () => replaceAll({
      ...demo,
      settings: s,
      meta: {
        ...demo.meta,
        lastBackupAt: data.meta.lastBackupAt
      }
    }));
  };
  const clearAll = async () => {
    const ok = await ask({
      title: 'Очистить все данные?',
      code: 'SYS // WIPE',
      text: 'Будут удалены ВСЕ миссии, чипы данных, карточки, оценки и таймеры. Останутся пустые разделы MAIN JOBS / SIDE JOBS / GIGS, базовые теги и настройки.\n\nСовет: сначала сделай экспорт бэкапа.',
      ok: 'Стереть всё',
      danger: true
    });
    if (ok === true) undoable('Память очищена · чистый лист', null, () => replaceAll({
      ...emptyState(),
      settings: s,
      meta: {
        ...emptyState().meta,
        lastBackupAt: data.meta.lastBackupAt
      }
    }));
  };
  const pullMain = async () => {
    let d = null;
    try {
      d = JSON.parse(localStorage.getItem(MAIN_KEY));
    } catch (e) {}
    if (!d) {
      sfx('error');
      toast('Основная версия ещё не сохраняла данные');
      return;
    }
    const ok = await ask({
      title: 'Взять данные из основной версии?',
      code: 'BETA // SYNC',
      text: 'Данные тестовой версии заменятся текущими данными основного приложения. Основное приложение не изменится.',
      ok: 'Заменить'
    });
    if (ok === true) undoable('Данные основной версии загружены', null, () => replaceAll({
      ...normalize(d),
      settings: s
    }));
  };
  return React.createElement("div", {
    className: "pb-8"
  }, React.createElement(ScreenHeader, {
    code: "SYS://ROOT/CONFIG \u2014 TERMINAL v1.0",
    title: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430",
    sub: "\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u044B, \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F, \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0438 \u0438 \u0440\u0435\u0437\u0435\u0440\u0432\u043D\u044B\u0435 \u043A\u043E\u043F\u0438\u0438"
  }), React.createElement("div", {
    className: "px-4 mt-4"
  }, React.createElement(SetBlock, {
    n: "01",
    title: "\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u043E\u0446\u0435\u043D\u043A\u0438 \u0434\u043D\u044F",
    icon: Clock
  }, React.createElement("span", {
    className: "lbl"
  }, "\u0412\u0435\u0447\u0435\u0440\u043D\u0435\u0435 \u043E\u043A\u043D\u043E \u043E\u0446\u0435\u043D\u043A\u0438"), React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, React.createElement("div", null, React.createElement("div", {
    className: "text-[11px] text-white/45 mb-1"
  }, "\u041D\u0430\u0447\u0430\u043B\u043E"), React.createElement("input", {
    type: "time",
    className: "inp",
    value: s.winStart,
    onChange: e => e.target.value && set({
      winStart: e.target.value
    })
  })), React.createElement("div", null, React.createElement("div", {
    className: "text-[11px] text-white/45 mb-1"
  }, "\u041A\u043E\u043D\u0435\u0446"), React.createElement("input", {
    type: "time",
    className: "inp",
    value: s.winEnd,
    onChange: e => e.target.value && set({
      winEnd: e.target.value
    })
  }))), React.createElement("div", {
    className: "f-mono text-[11px] tracking-wider mt-2",
    style: {
      color: winActive ? '#59FF00' : 'rgba(255,255,255,.45)'
    }
  }, "\u25CF \u041E\u041A\u041D\u041E ", s.winStart, "\u2013", s.winEnd, " \xB7 \u0421\u0415\u0419\u0427\u0410\u0421 ", winActive ? 'АКТИВНО' : 'НЕАКТИВНО'), React.createElement("div", {
    className: "text-[12px] text-white/45 f-read mt-1 leading-snug"
  }, "\u041F\u0440\u0438 \u0432\u0445\u043E\u0434\u0435 \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0432 \u044D\u0442\u043E \u0432\u0440\u0435\u043C\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u043E\u0446\u0435\u043D\u043A\u0430, \u0435\u0441\u043B\u0438 \u0434\u0435\u043D\u044C \u0435\u0449\u0451 \u043D\u0435 \u043E\u0446\u0435\u043D\u0451\u043D."), React.createElement("div", {
    className: "mt-3",
    style: {
      borderTop: '1px solid rgba(255,255,255,.07)'
    }
  }, React.createElement(Toggle, {
    on: s.retro,
    onChange: v => set({
      retro: v
    }),
    label: "\u0420\u0435\u0442\u0440\u043E\u0441\u043F\u0435\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043D\u044B\u0445 \u0434\u043D\u0435\u0439",
    hint: "\u0415\u0441\u043B\u0438 \u0432\u0447\u0435\u0440\u0430\u0448\u043D\u0438\u0439 \u0434\u0435\u043D\u044C \u043D\u0435 \u043E\u0446\u0435\u043D\u0451\u043D \u2014 \u043F\u0440\u0438 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u0432\u0445\u043E\u0434\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0438\u0442\u044C \u043E\u0446\u0435\u043D\u0438\u0442\u044C \u0435\u0433\u043E"
  })), React.createElement("span", {
    className: "lbl mt-3"
  }, "\u041F\u0435\u0440\u0432\u044B\u0439 \u0434\u0435\u043D\u044C \u043D\u0435\u0434\u0435\u043B\u0438"), React.createElement(Segmented, {
    value: s.weekStart,
    onChange: v => set({
      weekStart: v
    }),
    accent: "var(--alt)",
    options: [{
      v: 1,
      l: 'Понедельник'
    }, {
      v: 0,
      l: 'Воскресенье'
    }]
  }), React.createElement("span", {
    className: "lbl mt-4"
  }, "\u041F\u043E\u0440\u043E\u0433\u0438 \u0446\u0432\u0435\u0442\u0430 \u043A\u043E\u043B\u0435\u0446 \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044F"), React.createElement("div", {
    className: "grid grid-cols-3 gap-2"
  }, [['g', '#59FF00', 'Зелёный'], ['l', '#B8FF00', 'Лайм'], ['y', '#FFD600', 'Жёлтый']].map(([k, c, name]) => React.createElement("div", {
    key: k
  }, React.createElement("div", {
    className: "flex items-center gap-1.5 text-[11px] text-white/55 mb-1"
  }, React.createElement("i", {
    className: "w-2 h-2 rounded-full inline-block",
    style: {
      background: c,
      boxShadow: `0 0 6px ${c}`
    }
  }), name, " \u043E\u0442"), React.createElement("select", {
    className: "inp text-center",
    value: s.thr[k],
    onChange: e => set({
      thr: {
        ...s.thr,
        [k]: parseFloat(e.target.value)
      }
    })
  }, THR_OPTIONS.map(v => React.createElement("option", {
    key: v,
    value: v
  }, v.toFixed(1))))))), React.createElement("div", {
    className: "text-[11px] text-white/40 f-read mt-1.5"
  }, "\u041D\u0438\u0436\u0435 \u0436\u0451\u043B\u0442\u043E\u0433\u043E \u043F\u043E\u0440\u043E\u0433\u0430 \u2014 \u043E\u0440\u0430\u043D\u0436\u0435\u0432\u043E-\u043A\u0440\u0430\u0441\u043D\u044B\u0439."), React.createElement("span", {
    className: "lbl mt-4"
  }, "\u0411\u044B\u0441\u0442\u0440\u043E\u0435 \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"), React.createElement("div", {
    className: "grid gap-2"
  }, React.createElement(Btn, {
    variant: "ghost",
    small: true,
    icon: Play,
    onClick: forceEvening
  }, "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0432\u0435\u0447\u0435\u0440\u043D\u044E\u044E \u043E\u0446\u0435\u043D\u043A\u0443 \u043F\u0440\u0438\u043D\u0443\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E"), React.createElement(Btn, {
    variant: "ghost",
    small: true,
    icon: SkipForward,
    onClick: simulateSkip
  }, "\u0421\u0438\u043C\u0443\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u043F\u0443\u0441\u043A \u0432\u0447\u0435\u0440\u0430\u0448\u043D\u0435\u0433\u043E \u0434\u043D\u044F"))), React.createElement(SetBlock, {
    n: "02",
    title: UI.mono ? 'Внешний вид' : 'Персонализация и FX',
    icon: Palette
  }, React.createElement("span", {
    className: "lbl"
  }, "\u0421\u0442\u0438\u043B\u044C \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430"), React.createElement("div", {
    className: "grid grid-cols-2 gap-2 mb-4"
  }, UI_STYLES.map(st => {
    const on = (s.ui || 'cyber') === st.id,
      mono = st.id === 'mono';
    return React.createElement("button", {
      key: st.id,
      type: "button",
      onClick: () => {
        if (!on) {
          sfx('save');
          set({
            ui: st.id
          });
        }
      },
      className: "cut relative flex flex-col items-center text-center px-2 pt-3 pb-2.5",
      style: {
        '--cut': '10px',
        background: mono ? 'linear-gradient(180deg,#0F3B52,#000 75%)' : 'linear-gradient(135deg,#18080C,#0A0A0F)',
        boxShadow: on ? 'inset 0 0 0 2px var(--alt)' : 'inset 0 0 0 1px rgba(255,255,255,.15)',
        borderRadius: mono ? 18 : undefined
      }
    }, mono ? React.createElement(Sticker, {
      icon: "st:sleep",
      color: "#4DB6FF",
      frame: "oct",
      size: 46,
      toon: true
    }) : React.createElement(Sticker, {
      icon: "st:bolt",
      color: "#FF4655",
      frame: "hex",
      size: 46,
      toon: false
    }), React.createElement("div", {
      className: "mt-2 leading-tight",
      style: mono ? {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: 16,
        color: '#fff'
      } : {
        fontFamily: 'Rajdhani, sans-serif',
        fontWeight: 700,
        fontSize: 16,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: '#FF4655',
        textShadow: '0 0 8px rgba(255,70,85,.6)'
      }
    }, st.name), React.createElement("div", {
      className: "text-[11px] text-white/50 mt-0.5 leading-tight",
      style: {
        fontFamily: mono ? 'Inter, sans-serif' : "'Exo 2', sans-serif"
      }
    }, st.sub), on && React.createElement(Check, {
      size: 15,
      className: "absolute top-2 right-2.5",
      style: {
        color: 'var(--alt)'
      }
    }));
  })), React.createElement("span", {
    className: "lbl"
  }, "\u0410\u0432\u0430\u0442\u0430\u0440 \u043D\u0430 \u044D\u043A\u0440\u0430\u043D\u0435 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0438"), React.createElement("div", {
    className: "flex items-center gap-4 mb-4"
  }, React.createElement(AvatarSlot, {
    size: 64,
    onClick: () => setAvEdit(true)
  }), React.createElement("div", {
    className: "min-w-0 flex-1"
  }, React.createElement("div", {
    className: "text-[13px] text-white/55 f-read leading-snug mb-2"
  }, "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u0430\u044F \u044D\u043C\u0431\u043B\u0435\u043C\u0430 \u0438\u043B\u0438 \u0441\u0432\u043E\u0451 \u0444\u043E\u0442\u043E \u0432\u043C\u0435\u0441\u0442\u043E \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u0430."), React.createElement(Btn, {
    small: true,
    variant: "ghost",
    icon: Pencil,
    onClick: () => setAvEdit(true)
  }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0430\u0432\u0430\u0442\u0430\u0440"))), UI.mono ? React.createElement(React.Fragment, null, React.createElement("span", {
    className: "lbl"
  }, "\u0410\u043A\u0446\u0435\u043D\u0442\u043D\u044B\u0439 \u0446\u0432\u0435\u0442"), React.createElement("div", {
    className: "grid grid-cols-3 gap-2"
  }, MONO_ACCENTS.map(a => React.createElement("button", {
    key: a.id,
    type: "button",
    onClick: () => {
      sfx('tab');
      set({
        monoAccent: a.id
      });
    },
    className: "flex items-center gap-2 px-3 py-2.5 rounded-xl text-left",
    style: {
      background: '#1C1C1E',
      boxShadow: s.monoAccent === a.id ? `inset 0 0 0 2px ${a.c}` : 'none'
    }
  }, React.createElement("i", {
    className: "w-4 h-4 rounded-full shrink-0",
    style: {
      background: a.c
    }
  }), React.createElement("span", {
    className: "text-[13px] font-semibold text-white/90 truncate"
  }, a.name))))) : React.createElement(React.Fragment, null, React.createElement("span", {
    className: "lbl"
  }, "\u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430"), React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, Object.entries(THEMES).map(([k, th]) => React.createElement("button", {
    key: k,
    type: "button",
    onClick: () => {
      sfx('tab');
      set({
        theme: k
      });
    },
    className: "cut text-left p-3 relative",
    style: {
      '--cut': '10px',
      background: `linear-gradient(135deg, ${th.bg1}, ${th.bg2})`,
      boxShadow: s.theme === k ? `inset 0 0 0 2px ${th.alt}` : 'inset 0 0 0 1px rgba(255,255,255,.15)'
    }
  }, React.createElement("div", {
    className: "flex gap-1 mb-2"
  }, [th.main, th.alt, th.warn].map((c, i) => React.createElement("i", {
    key: i,
    className: "w-5 h-2 block",
    style: {
      background: c,
      boxShadow: `0 0 6px ${c}`
    }
  }))), React.createElement("div", {
    className: "text-[14px] font-bold leading-tight",
    style: {
      color: th.main
    }
  }, th.name), React.createElement("div", {
    className: "f-mono text-[9px] tracking-wider text-white/50 uppercase mt-0.5"
  }, th.sub), s.theme === k && React.createElement(Check, {
    size: 16,
    className: "absolute top-2 right-3",
    style: {
      color: th.alt
    }
  })))), React.createElement("div", {
    className: "mt-3",
    style: {
      borderTop: '1px solid rgba(255,255,255,.07)'
    }
  }, React.createElement(Toggle, {
    on: s.scanlines,
    onChange: v => set({
      scanlines: v
    }),
    label: "\u0421\u043A\u0430\u043D\u043B\u0430\u0439\u043D\u044B",
    hint: "\u0422\u043E\u043D\u043A\u0438\u0435 \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u043E\u0441\u044B \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0430 \u043F\u043E\u0432\u0435\u0440\u0445 \u044D\u043A\u0440\u0430\u043D\u0430"
  }), React.createElement(Toggle, {
    on: s.crt,
    onChange: v => set({
      crt: v
    }),
    label: "\u042D\u0444\u0444\u0435\u043A\u0442 \u042D\u041B\u0422-\u044D\u043A\u0440\u0430\u043D\u0430",
    hint: "\u041C\u0435\u0440\u0446\u0430\u043D\u0438\u0435 \u0438 \u0437\u0430\u0442\u0435\u043C\u043D\u0435\u043D\u0438\u0435 \u043F\u043E \u043A\u0440\u0430\u044F\u043C. \u0412\u044B\u043A\u043B\u044E\u0447\u0438, \u0435\u0441\u043B\u0438 \u0443\u0441\u0442\u0430\u044E\u0442 \u0433\u043B\u0430\u0437\u0430"
  }), React.createElement(Toggle, {
    on: s.glitch,
    onChange: v => set({
      glitch: v
    }),
    label: "\u0410\u043D\u0438\u043C\u0430\u0446\u0438\u044F \u0433\u043B\u0438\u0442\u0447\u0430",
    hint: "\u041F\u0435\u0440\u0438\u043E\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u0431\u043E\u0438 \u043D\u0430 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430\u0445"
  }))), React.createElement("div", {
    className: UI.mono ? 'mt-3' : '',
    style: UI.mono ? {
      borderTop: '1px solid rgba(255,255,255,.07)'
    } : undefined
  }, React.createElement(Toggle, {
    on: s.sound,
    onChange: v => {
      SFX.on = v;
      set({
        sound: v
      });
    },
    label: "\u0417\u0432\u0443\u043A\u043E\u0432\u043E\u0439 \u043E\u0442\u043A\u043B\u0438\u043A \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430",
    hint: UI.mono ? 'Мягкие щелчки при нажатиях' : 'Синтезированные sci-fi клики (Web Audio API)'
  })), s.sound && React.createElement(Btn, {
    small: true,
    variant: "dark",
    icon: Volume2,
    className: "mt-1",
    onClick: () => setTimeout(() => sfx('save'), 60),
    snd: "check"
  }, "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0437\u0432\u0443\u043A"), React.createElement("div", {
    className: "mt-1"
  }, React.createElement(Toggle, {
    on: s.haptics,
    onChange: v => {
      SFX.vib = v;
      set({
        haptics: v
      });
      if (v) sfx('save');
    },
    label: "\u0412\u0438\u0431\u0440\u0430\u0446\u0438\u044F",
    hint: "\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043E\u0442\u043A\u043B\u0438\u043A \u043D\u0430 \u043D\u0430\u0436\u0430\u0442\u0438\u044F, \u043E\u0446\u0435\u043D\u043A\u0438 \u0438 \u043E\u0442\u043C\u0435\u0442\u043A\u0438 \u0446\u0435\u043B\u0435\u0439 (Android)"
  }))), React.createElement(SetBlock, {
    n: "03",
    title: "\u0421\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0438",
    icon: Layers
  }, React.createElement("span", {
    className: "lbl"
  }, "\u0420\u0430\u0437\u0434\u0435\u043B\u044B \u043C\u0438\u0441\u0441\u0438\u0439"), data.sections.map((sec, i) => React.createElement("div", {
    key: sec.id,
    className: "flex items-center gap-1.5 py-2",
    style: {
      borderBottom: '1px solid rgba(255,255,255,.06)'
    }
  }, React.createElement("div", {
    className: "flex-1 min-w-0"
  }, React.createElement("div", {
    className: "text-[15px] font-semibold txt-main truncate uppercase tracking-wide"
  }, nice(sec.name)), React.createElement("div", {
    className: "f-mono text-[10px] text-white/40"
  }, secCount[sec.id] || 0, " \xB7 \u041C\u0418\u0421\u0421\u0418\u0419")), React.createElement(IconBtn, {
    sm: true,
    icon: ArrowUp,
    title: "\u0412\u044B\u0448\u0435",
    onClick: () => i > 0 && ops.moveSection(sec.id, -1)
  }), React.createElement(IconBtn, {
    sm: true,
    icon: ArrowDown,
    title: "\u041D\u0438\u0436\u0435",
    onClick: () => i < data.sections.length - 1 && ops.moveSection(sec.id, 1)
  }), React.createElement(IconBtn, {
    sm: true,
    icon: Pencil,
    title: "\u041F\u0435\u0440\u0435\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u0442\u044C",
    onClick: () => ops.renameSection(sec.id)
  }), React.createElement(IconBtn, {
    sm: true,
    red: true,
    icon: Trash2,
    title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
    onClick: () => ops.deleteSection(sec.id)
  }))), React.createElement(Btn, {
    small: true,
    variant: "ghost",
    icon: Plus,
    className: "w-full mt-2",
    onClick: ops.addSection
  }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0437\u0434\u0435\u043B"), React.createElement("span", {
    className: "lbl mt-5"
  }, "\u0422\u0435\u0433\u0438 \u0434\u043D\u0435\u0432\u043D\u0438\u043A\u0430 (\u0447\u0438\u043F\u043E\u0432 \u0434\u0430\u043D\u043D\u044B\u0445)"), data.tags.map(t => React.createElement("div", {
    key: t.id,
    className: "flex items-center gap-2 py-2",
    style: {
      borderBottom: '1px solid rgba(255,255,255,.06)'
    }
  }, React.createElement("label", {
    className: "relative w-7 h-7 shrink-0 cut",
    style: {
      '--cut': '5px',
      background: t.color,
      boxShadow: `0 0 8px ${t.color}`
    },
    title: "\u0426\u0432\u0435\u0442"
  }, React.createElement("input", {
    type: "color",
    value: /^#[0-9a-f]{6}$/i.test(t.color) ? t.color : '#ffffff',
    onChange: e => ops.recolorTag(t.id, e.target.value),
    className: "absolute inset-0 opacity-0"
  })), React.createElement("div", {
    className: "flex-1 min-w-0"
  }, React.createElement("div", {
    className: "text-[15px] font-semibold truncate",
    style: {
      color: t.color
    }
  }, "#", t.name), React.createElement("div", {
    className: "f-mono text-[10px] text-white/40"
  }, tagCount[t.id] || 0, " \xB7 \u0417\u0410\u041F\u0418\u0421\u0415\u0419")), React.createElement(IconBtn, {
    sm: true,
    icon: Pencil,
    title: "\u041F\u0435\u0440\u0435\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u0442\u044C",
    onClick: () => ops.renameTag(t.id)
  }), React.createElement(IconBtn, {
    sm: true,
    red: true,
    icon: Trash2,
    title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
    onClick: () => ops.deleteTag(t.id)
  }))), React.createElement(Btn, {
    small: true,
    variant: "ghost",
    icon: Tag,
    className: "w-full mt-2",
    onClick: ops.addTag
  }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u0435\u0433")), React.createElement(SetBlock, {
    n: "04",
    title: "\u0414\u0430\u043D\u043D\u044B\u0435 \u0438 \u0440\u0435\u0437\u0435\u0440\u0432\u043D\u044B\u0435 \u043A\u043E\u043F\u0438\u0438",
    icon: Database
  }, React.createElement("div", {
    className: "grid grid-cols-3 gap-2 mb-4"
  }, [['Миссии', data.missions.length], ['Чипы', data.shards.length], ['Дни', Object.keys(data.ratings).length], ['Таймеры', data.timers.length], ['Карточки', data.cards.length], ['Объём', `${sizeKB} КБ`]].map(([l, v]) => React.createElement("div", {
    key: l,
    className: "stat-cell cut"
  }, React.createElement("div", {
    className: "f-orb text-[18px] font-bold txt-alt glow-alt leading-none"
  }, v), React.createElement("div", {
    className: "f-mono text-[9px] tracking-widest text-white/50 uppercase mt-1.5"
  }, l)))), BETA && React.createElement("div", {
    className: "mb-3 p-3 text-[12.5px] leading-snug f-read",
    style: {
      color: 'var(--warn)',
      boxShadow: 'inset 0 0 0 1px rgba(var(--warn-rgb),.4)'
    }
  }, "\u0422\u0435\u0441\u0442\u043E\u0432\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F. \u0415\u0451 \u0434\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E \u043E\u0442 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F: \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0437\u0434\u0435\u0441\u044C \u0442\u0443\u0434\u0430 \u043D\u0435 \u043F\u043E\u043F\u0430\u0434\u0443\u0442."), React.createElement("div", {
    className: "f-mono text-[11px] tracking-wider mb-1",
    style: {
      color: cloudOn ? '#59FF00' : 'rgba(255,255,255,.5)'
    }
  }, "\u25CF ", cloudOn ? 'ОБЛАЧНАЯ КОПИЯ: ВКЛЮЧЕНА' : 'ХРАНИЛИЩЕ: ТОЛЬКО ЭТОТ БРАУЗЕР'), React.createElement("div", {
    className: "text-[12px] text-white/45 f-read mb-3 leading-snug"
  }, cloudOn ? 'Данные хранятся в этом браузере и в твоём личном разделе Claude: их видишь только ты, они синхронизируются между устройствами.' : 'Данные хранятся только в памяти этого браузера (localStorage). Регулярно делай экспорт, чтобы не потерять записи при очистке браузера.'), persisted !== null && React.createElement("div", {
    className: "f-mono text-[11px] tracking-wider mb-1",
    style: {
      color: persisted ? '#59FF00' : 'var(--warn)'
    }
  }, "\u25CF \u0417\u0410\u0429\u0418\u0422\u0410 \u041E\u0422 \u0410\u0412\u0422\u041E\u041E\u0427\u0418\u0421\u0422\u041A\u0418: ", persisted ? 'ВКЛЮЧЕНА' : 'НЕ ВКЛЮЧЕНА'), persisted === false && React.createElement("div", {
    className: "text-[12px] text-white/45 f-read mb-2 leading-snug"
  }, "\u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u043C\u043E\u0436\u0435\u0442 \u0441\u0442\u0435\u0440\u0435\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435, \u0435\u0441\u043B\u0438 \u043D\u0430 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435 \u043A\u043E\u043D\u0447\u0438\u0442\u0441\u044F \u043C\u0435\u0441\u0442\u043E. Chrome \u0432\u043A\u043B\u044E\u0447\u0430\u0435\u0442 \u0437\u0430\u0449\u0438\u0442\u0443 \u0441\u0430\u043C \u0434\u043B\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0447\u0430\u0441\u0442\u043E \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u043C\u043E\u0433\u043E \u0441\u0430\u0439\u0442\u0430.", React.createElement("button", {
    type: "button",
    className: "txt-alt underline ml-1",
    onClick: async () => {
      const p = await storagePersisted(true);
      setPersisted(p);
      toast(p ? 'Защита включена' : 'Браузер пока отказал');
    }
  }, "\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C")), photoStat && React.createElement("div", {
    className: "f-mono text-[11px] tracking-wider mb-1",
    style: {
      color: 'rgba(var(--alt-rgb),.85)'
    }
  }, "\u25CF \u0424\u041E\u0422\u041E: ", photoStat.n, " \xB7 ", photoStat.mb < 0.1 ? '<0.1' : photoStat.mb.toFixed(1), " \u041C\u0411 \xB7 \u041E\u0422\u0414\u0415\u041B\u042C\u041D\u041E\u0415 \u0425\u0420\u0410\u041D\u0418\u041B\u0418\u0429\u0415"), (() => {
    const last = data.meta.lastBackupAt,
      age = daysSince(last);
    const fresh = last && (!s.backupDays || age < s.backupDays);
    return React.createElement("div", {
      className: "f-mono text-[11px] tracking-wider mb-3",
      style: {
        color: fresh ? '#59FF00' : 'var(--warn)'
      }
    }, "\u25CF \u041F\u041E\u0421\u041B\u0415\u0414\u041D\u0418\u0419 \u0411\u042D\u041A\u0410\u041F: ", !last ? 'НИКОГДА' : age === 0 ? 'СЕГОДНЯ' : `${age} ${plural(age, 'ДЕНЬ', 'ДНЯ', 'ДНЕЙ')} НАЗАД`);
  })(), !cloudOn && React.createElement(React.Fragment, null, React.createElement("span", {
    className: "lbl"
  }, "\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u0442\u044C \u043E\u0431 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0435"), React.createElement(Segmented, {
    value: s.backupDays,
    onChange: v => set({
      backupDays: v
    }),
    accent: "var(--alt)",
    className: "mb-4",
    options: [{
      v: 0,
      l: 'Выкл'
    }, {
      v: 7,
      l: '7 дн'
    }, {
      v: 14,
      l: '14 дн'
    }, {
      v: 30,
      l: '30 дн'
    }]
  })), React.createElement("div", {
    className: "grid gap-2"
  }, shareOK && React.createElement(Btn, {
    icon: Share2,
    onClick: () => exportJSON(true),
    snd: "none"
  }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0431\u044D\u043A\u0430\u043F \xB7 Telegram, \u0414\u0438\u0441\u043A\u2026"), React.createElement(Btn, {
    variant: shareOK ? 'ghost' : 'main',
    icon: Download,
    onClick: () => exportJSON(false),
    snd: "none"
  }, "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 (.json)"), React.createElement(Btn, {
    variant: "ghost",
    icon: Upload,
    onClick: () => fileRef.current && fileRef.current.click()
  }, "\u0418\u043C\u043F\u043E\u0440\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 (.json, .txt)"), shareOK && React.createElement("div", {
    className: "text-[12px] text-white/40 f-read leading-snug -mt-0.5"
  }, "\xAB\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C\xBB \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u043C\u0435\u043D\u044E \xAB\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F\xBB: \u0443\u0434\u043E\u0431\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u0431\u044D\u043A\u0430\u043F \u0432 Telegram \xAB\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435\xBB \u0438\u043B\u0438 \u043D\u0430 Google \u0414\u0438\u0441\u043A. \u0424\u0430\u0439\u043B \u0443\u0445\u043E\u0434\u0438\u0442 \u043A\u0430\u043A .txt \u2014 \u0438\u043C\u043F\u043E\u0440\u0442 \u0435\u0433\u043E \u043F\u043E\u043D\u0438\u043C\u0430\u0435\u0442."), React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: "application/json,.json,text/plain,.txt",
    hidden: true,
    onChange: e => {
      const f = e.target.files && e.target.files[0];
      if (f) importFile(f);
      e.target.value = '';
    }
  }), BETA && React.createElement(Btn, {
    variant: "dark",
    icon: FolderInput,
    onClick: pullMain
  }, "\u0412\u0437\u044F\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u0437 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438"), React.createElement(Btn, {
    variant: "dark",
    icon: RotateCcw,
    onClick: resetDemo
  }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0434\u043E \u0434\u0435\u043C\u043E-\u0434\u0430\u043D\u043D\u044B\u0445"), React.createElement(Btn, {
    variant: "dangerGhost",
    icon: Eraser,
    onClick: clearAll
  }, "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0432\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435"))), React.createElement("div", {
    className: "micro text-center mt-6 mb-2"
  }, UI.mono ? 'CYBERJOURNAL' : 'CYBER//JOURNAL 2077', " \xB7 v", APP_VERSION, " \xB7 BUILD ", window.CJ_BUILD || 'DEV', " \xB7 ", cloudOn ? 'LOCAL + CLOUD SYNC' : 'LOCAL STORAGE')), avEdit && React.createElement(AvatarEditor, {
    onClose: () => setAvEdit(false)
  }));
}
function revealBlocks(main) {
  const box = main.getBoundingClientRect(),
    items = [];
  const walk = (el, depth) => {
    const r = el.getBoundingClientRect();
    if (!r.height || r.top >= box.bottom || r.bottom <= box.top) return;
    if (depth < 6 && r.height > 260 && getComputedStyle(el).display !== 'grid') {
      if (el.children.length === 1) {
        walk(el.children[0], depth);
        return;
      }
      if (el.children.length > 1) {
        Array.from(el.children).forEach(c => walk(c, depth + 1));
        return;
      }
    }
    items.push(el);
  };
  Array.from(main.children).forEach(c => walk(c, 1));
  const step = Math.min(40, 420 / Math.max(1, items.length));
  items.forEach((el, i) => {
    const delay = Math.round(i * step);
    let timer = null;
    const end = e => {
      if (e && e.target !== el) return;
      clearTimeout(timer);
      el.classList.remove('cj-rise');
      el.style.animationDelay = '';
      el.removeEventListener('animationend', end);
    };
    el.style.animationDelay = `${delay}ms`;
    el.classList.add('cj-rise');
    el.addEventListener('animationend', end);
    timer = setTimeout(end, delay + 600);
  });
}
const TABS = [{
  id: 'missions',
  label: 'МИССИИ',
  sub: 'И ЧИПЫ',
  icon: Crosshair,
  mLabel: 'Миссии',
  mIcon: ListChecks
}, {
  id: 'stats',
  label: 'СТАТИСТИКА',
  sub: 'ДНЯ',
  icon: Activity,
  mLabel: 'Итоги',
  mIcon: CalendarDays
}, {
  id: 'focus',
  label: 'ФОКУС',
  sub: 'НЕЙРОЛИНК',
  icon: Brain,
  mLabel: 'Фокус',
  mIcon: Target
}, {
  id: 'timer',
  label: 'ОТСЧЁТ',
  sub: 'ВРЕМЕНИ',
  icon: Hourglass,
  mLabel: 'Отсчёт',
  mIcon: Timer
}, {
  id: 'system',
  label: 'СИСТЕМА',
  sub: 'НАСТРОЙКИ',
  icon: Terminal,
  mLabel: 'Система',
  mIcon: Settings
}];
const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Exo+2:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Orbitron:wght@500;700;900&family=Oswald:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&family=Unbounded:wght@500;700&display=swap';
function App() {
  const [data, setData] = useState(loadState);
  const [tab, setTabRaw] = useState(() => {
    try {
      return localStorage.getItem(`${LS_KEY}.tab`) || 'missions';
    } catch (e) {
      return 'missions';
    }
  });
  const [dialog, setDialog] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const [rate, setRate] = useState(null);
  const [focusSetup, setFocusSetup] = useState(null);
  const openFocus = useCallback(missionId => setFocusSetup({
    missionId: missionId || ''
  }), []);
  const dataRef = useRef(data);
  dataRef.current = data;
  const uiRef = useRef({});
  uiRef.current = {
    dialog,
    rate
  };
  const session = useRef({
    retroAsked: false,
    eveningShown: null,
    hiddenAt: 0
  });
  const toastTimer = useRef(null);
  SFX.on = !!data.settings.sound;
  SFX.vib = !!data.settings.haptics;
  const mono = data.settings.ui === 'mono';
  UI.mono = mono;
  SFX.soft = mono;
  const th = THEMES[data.settings.theme] || THEMES.classic;
  const acc = (MONO_ACCENTS.find(a => a.id === data.settings.monoAccent) || MONO_ACCENTS[0]).c;
  const pageBg = mono ? '#000000' : th.bg2;
  const switched = useRef(false);
  const mainRef = useRef(null);
  const setTab = t => {
    if (t === tab) return;
    sfx('tab');
    switched.current = true;
    setTabRaw(t);
    try {
      localStorage.setItem(`${LS_KEY}.tab`, t);
    } catch (e) {}
  };
  useLayoutEffect(() => {
    const main = mainRef.current;
    if (!switched.current || !main) return undefined;
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    } catch (e) {}
    const raf = requestAnimationFrame(() => revealBlocks(main));
    return () => cancelAnimationFrame(raf);
  }, [tab]);
  const toast = useCallback((msg, action) => {
    setToastMsg({
      msg,
      action,
      k: Date.now()
    });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), action ? 6000 : 2400);
  }, []);
  const up = useCallback((key, fn) => setData(d => ({
    ...d,
    [key]: typeof fn === 'function' ? fn(d[key]) : fn
  })), []);
  const ask = useCallback(opts => new Promise(res => setDialog({
    ...opts,
    res,
    k: Date.now()
  })), []);
  const replaceAll = useCallback(d => {
    setRate(null);
    setData(normalize(d));
  }, []);
  const undoable = useCallback((msg, keys, fn) => {
    const snap = dataRef.current;
    fn();
    toast(msg, {
      label: 'Отменить',
      run: () => {
        setRate(null);
        setData(d => {
          const o = {
            ...d
          };
          (keys || Object.keys(snap)).forEach(k => {
            o[k] = snap[k];
          });
          return o;
        });
        sfx('save');
        toast('Удаление отменено');
      }
    });
  }, [toast]);
  const markBackup = useCallback(() => up('meta', m => ({
    ...m,
    lastBackupAt: new Date().toISOString()
  })), [up]);
  useEffect(() => {
    storagePersisted(true);
  }, []);
  useEffect(() => {
    if (document.getElementById('cj-fonts')) return;
    const l = document.createElement('link');
    l.id = 'cj-fonts';
    l.rel = 'stylesheet';
    l.href = window.CJ_FONTS_URL || FONTS_URL;
    document.head.appendChild(l);
  }, []);
  const cloud = useRef({
    ready: false,
    saving: false,
    again: false,
    parts: [],
    n: 0
  });
  const cloudTimer = useRef(null);
  const skipStamp = useRef(true);
  const [cloudOn, setCloudOn] = useState(false);
  const cloudSave = useCallback(async () => {
    const c = cloud.current;
    if (!c.ready) return;
    if (c.saving) {
      c.again = true;
      return;
    }
    c.saving = true;
    try {
      do {
        c.again = false;
        const json = JSON.stringify(dataRef.current);
        const parts = [];
        for (let i = 0; i < json.length; i += CLOUD_CHUNK) parts.push(json.slice(i, i + CLOUD_CHUNK));
        for (let i = 0; i < parts.length; i++) if (parts[i] !== c.parts[i]) await c.db.doc(`${c.base}/c${i}`).set({
          p: parts[i]
        });
        const savedAt = getLocalAt() || new Date().toISOString();
        await c.db.doc(`${c.base}/meta`).set({
          n: parts.length,
          savedAt,
          v: 1
        });
        for (let i = parts.length; i < c.n; i++) await c.db.doc(`${c.base}/c${i}`).delete();
        c.parts = parts;
        c.n = parts.length;
      } while (c.again);
    } catch (e) {
      if (e && e.code === 'quota_exceeded') {
        sfx('error');
        toast('Облако заполнено — удали крупные фото');
      } else if (e && ['revoked', 'not_granted', 'invalid_argument', 'capability_disabled'].includes(e.code)) {
        c.ready = false;
        setCloudOn(false);
      }
    }
    c.saving = false;
  }, [toast]);
  const cloudSync = useCallback(async boot => {
    const c = cloud.current;
    try {
      if (!c.db) {
        const [db, user] = await Promise.all([claudeCap('db'), claudeCap('user')]);
        if (!db || !user) return;
        const id = await user.id();
        if (!id) return;
        c.db = db;
        c.base = `data/users/${id}`;
      }
      const remote = await cloudPull(c);
      const localAt = getLocalAt();
      if (remote) {
        c.parts = remote.parts;
        c.n = remote.n;
      }
      c.ready = true;
      setCloudOn(true);
      if (remote && remote.savedAt > localAt) {
        skipStamp.current = true;
        setLocalAt(remote.savedAt);
        setRate(null);
        setData(normalize(remote.data));
        if (!boot) toast('Данные обновлены из облака');
      } else if (!remote || localAt > remote.savedAt) cloudSave();
    } catch (e) {}
  }, [cloudSave, toast]);
  useEffect(() => {
    cloudSync(true);
  }, [cloudSync]);
  useEffect(() => {
    const stamp = !skipStamp.current;
    skipStamp.current = false;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      } catch (e) {
        if (e && (e.name === 'QuotaExceededError' || e.code === 22)) {
          sfx('error');
          toast('Память переполнена — удали крупные фото');
        } else if (!session.current.storageWarned && !cloud.current.ready) {
          session.current.storageWarned = true;
          toast('Хранилище недоступно — данные не сохранятся');
        }
      }
      if (stamp) {
        setLocalAt(new Date().toISOString());
        clearTimeout(cloudTimer.current);
        cloudTimer.current = setTimeout(cloudSave, 1200);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [data, toast, cloudSave]);
  const migrating = useRef(false);
  useEffect(() => {
    if (migrating.current || IMG.broken) return;
    const inline = [...new Set(listImages(data).filter(isInline))];
    if (!inline.length) return;
    migrating.current = true;
    (async () => {
      const map = new Map();
      for (const u of inline) {
        try {
          map.set(u, await storeInlineImage(u));
        } catch (e) {
          IMG.broken = true;
          break;
        }
      }
      if (map.size) setData(d => mapImages(d, v => map.get(v)));
      migrating.current = false;
    })();
  }, [data]);
  const bootData = useRef(data);
  useEffect(() => {
    if (BETA) return undefined;
    const t = setTimeout(async () => {
      if (migrating.current) return;
      try {
        let beta = [];
        try {
          const b = localStorage.getItem(BETA_KEY);
          if (b) beta = listImages(normalize(JSON.parse(b)));
        } catch (e) {}
        const used = new Set([...listImages(bootData.current), ...listImages(dataRef.current), ...beta].filter(isIdb).map(v => v.slice(4)));
        const old = Date.now() - 3 * 864e5;
        const dead = (await imgList()).filter(r => !used.has(String(r.id).replace(/\.t$/, '')) && r.at < old).map(r => r.id);
        if (dead.length) await imgDel(dead);
      } catch (e) {}
    }, 8000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    document.body.style.background = pageBg;
    document.documentElement.style.background = pageBg;
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', pageBg);
  }, [pageBg]);
  const askRetro = useCallback(async y => {
    const ans = await ask({
      title: 'Протокол: пропуск',
      code: 'RETRO.CHECK // MISSED DAY',
      text: `Не подведены итоги за вчерашний день (${fmtDay(y)}). Провести оценку сейчас?`,
      ok: 'Оценить',
      cancel: 'Позже',
      extra: 'Не оценивать'
    });
    if (ans === true) {
      setRate({
        date: y,
        source: 'retro'
      });
      return true;
    }
    if (ans === 'extra') up('meta', m => ({
      ...m,
      retroIgnored: [...m.retroIgnored.filter(x => x !== y), y].slice(-90)
    }));
    return false;
  }, [ask, up]);
  const runChecks = useCallback(async () => {
    if (uiRef.current.dialog || uiRef.current.rate || dataRef.current.focus.active) return;
    const now = new Date();
    let d = dataRef.current;
    if (d.settings.retro && !session.current.retroAsked) {
      session.current.retroAsked = true;
      const y = dKey(addDays(now, -1));
      if (!d.ratings[y] && !d.meta.retroIgnored.includes(y) && activeCards(d.cards, y).length) {
        if (await askRetro(y)) return;
      }
    }
    d = dataRef.current;
    const s = d.settings;
    if (inWindow(now, s.winStart, s.winEnd)) {
      const k = windowDate(now, s.winStart, s.winEnd);
      if (!d.ratings[k] && session.current.eveningShown !== k && activeCards(d.cards, k).length) {
        session.current.eveningShown = k;
        setRate({
          date: k,
          source: 'evening'
        });
        return;
      }
    }
    const today = dKey(now);
    if (s.backupDays > 0 && !window.claude && !BETA && d.meta.backupAskedOn !== today && hasContent(d)) {
      const last = d.meta.lastBackupAt;
      const age = daysSince(last || d.meta.since);
      if (age >= (last ? s.backupDays : 1)) {
        up('meta', m => ({
          ...m,
          backupAskedOn: today
        }));
        const share = canShareFiles();
        const ans = await ask({
          title: 'Пора сделать бэкап',
          code: 'SYS // BACKUP.CHECK',
          text: `${last ? `Последний экспорт был ${age} ${plural(age, 'день', 'дня', 'дней')} назад.` : 'Экспорта данных ещё не было.'}\n\nВсе записи хранятся только в памяти этого браузера. ${share ? 'Отправь бэкап в надёжное место: Telegram «Избранное» или Google Диск' : 'Сохрани файл .json в надёжное место (например, на Google Диск)'}, чтобы не потерять их.`,
          ok: share ? 'Отправить' : 'Экспорт сейчас',
          cancel: 'Позже'
        });
        if (ans === true) {
          const res = share ? await sendBackup(dataRef.current, ask) : await exportBackup(dataRef.current);
          if (res === 'saved') {
            markBackup();
            sfx('save');
            toast(share ? 'Бэкап отправлен' : 'Бэкап выгружен в .json');
          } else if (res !== 'declined') {
            sfx('error');
            toast('Не удалось сохранить файл');
          }
        }
      }
    }
  }, [askRetro, ask, up, toast, markBackup]);
  useEffect(() => {
    const t0 = setTimeout(runChecks, 900);
    const iv = setInterval(runChecks, 60000);
    const onVis = () => {
      if (document.visibilityState === 'hidden') {
        session.current.hiddenAt = Date.now();
        return;
      }
      const away = session.current.hiddenAt ? Date.now() - session.current.hiddenAt : 0;
      if (away > 30 * 60e3) {
        session.current.retroAsked = false;
        session.current.eveningShown = null;
      }
      if (away > 20e3 && cloud.current.ready) cloudSync(false);
      runChecks();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      clearTimeout(t0);
      clearInterval(iv);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [runChecks, cloudSync]);
  const forceEvening = () => {
    const s = data.settings,
      now = new Date();
    setRate({
      date: inWindow(now, s.winStart, s.winEnd) ? windowDate(now, s.winStart, s.winEnd) : dKey(now),
      source: 'evening'
    });
  };
  const simulateSkip = async () => {
    const y = dKey(addDays(new Date(), -1));
    if (!activeCards(data.cards, y).length) {
      sfx('error');
      toast('На вчера нет активных карточек');
      return;
    }
    if (data.ratings[y]) {
      const ok = await ask({
        title: 'Симуляция пропуска',
        code: 'SYS // TEST',
        text: `Оценка за ${fmtDay(y)} будет удалена, чтобы проверить сценарий ретроспективной оценки. Продолжить?`,
        ok: 'Удалить и проверить',
        danger: true
      });
      if (ok !== true) return;
    }
    setData(d => {
      const r = {
        ...d.ratings
      };
      delete r[y];
      return {
        ...d,
        ratings: r,
        meta: {
          ...d.meta,
          retroIgnored: d.meta.retroIgnored.filter(x => x !== y)
        }
      };
    });
    setTimeout(() => askRetro(y), 350);
  };
  const vars = mono ? {
    '--main': '#F2F2F7',
    '--alt': acc,
    '--warn': '#FFD60A',
    '--bg1': '#000000',
    '--bg2': '#000000',
    '--sel1': '#1C1C1E',
    '--sel2': '#1C1C1E',
    '--sel-fg': '#FFFFFF',
    '--sel-shadow': 'none',
    '--main-rgb': hexRgb('#F2F2F7'),
    '--alt-rgb': hexRgb(acc),
    '--warn-rgb': hexRgb('#FFD60A')
  } : {
    '--main': th.main,
    '--alt': th.alt,
    '--warn': th.warn,
    '--bg1': th.bg1,
    '--bg2': th.bg2,
    '--sel1': th.sel[0],
    '--sel2': th.sel[1],
    '--sel-fg': th.selFg,
    '--sel-sub': th.selSub,
    '--sel-shadow': th.selFg ? 'none' : '0 1px 3px rgba(0,0,0,.55)',
    '--main-rgb': hexRgb(th.main),
    '--alt-rgb': hexRgb(th.alt),
    '--warn-rgb': hexRgb(th.warn)
  };
  const ctx = useMemo(() => ({
    data,
    up,
    ask,
    toast,
    replaceAll,
    undoable,
    markBackup,
    cloudOn,
    openFocus
  }), [data, up, ask, toast, replaceAll, undoable, markBackup, cloudOn, openFocus]);
  return React.createElement(AppCtx.Provider, {
    value: ctx
  }, React.createElement("div", {
    className: `cj-root ${mono ? 'ui-mono' : `${data.settings.glitch ? 'fx-glitch' : ''} ${data.settings.crt ? 'crt-on' : ''}`}`,
    style: vars
  }, React.createElement("style", null, mono ? CSS + MONO_CSS : CSS), React.createElement("div", {
    className: "mx-auto max-w-[480px] h-full flex flex-col relative"
  }, React.createElement("main", {
    key: tab,
    ref: mainRef,
    className: `flex-1 min-h-0 relative ${tab === 'timer' ? 'overflow-hidden' : 'overflow-y-auto overscroll-contain'}`
  }, tab === 'missions' && React.createElement(MissionsScreen, null), tab === 'stats' && React.createElement(StatsScreen, {
    openRate: (date, source) => setRate({
      date,
      source
    })
  }), tab === 'focus' && React.createElement(FocusScreen, null), tab === 'timer' && React.createElement(CountdownScreen, null), tab === 'system' && React.createElement(SettingsScreen, {
    forceEvening: forceEvening,
    simulateSkip: simulateSkip
  })), React.createElement("nav", {
    className: "nav"
  }, TABS.map(t => React.createElement("button", {
    key: t.id,
    type: "button",
    onClick: () => setTab(t.id),
    className: `nav-b ${tab === t.id ? 'on' : ''}`
  }, mono ? React.createElement(t.mIcon, {
    size: 22,
    strokeWidth: 2
  }) : React.createElement(t.icon, {
    size: 20,
    strokeWidth: 2
  }), React.createElement("span", {
    className: "nl"
  }, mono ? t.mLabel : t.label), !mono && React.createElement("span", {
    className: "ns"
  }, t.sub))))), rate && React.createElement(RateModal, {
    key: `${rate.date}-${rate.source}`,
    date: rate.date,
    source: rate.source,
    onClose: () => setRate(null)
  }), focusSetup && !data.focus.active && React.createElement(FocusSetup, {
    missionId: focusSetup.missionId,
    onClose: () => setFocusSetup(null)
  }), data.focus.active && React.createElement(FocusSession, {
    key: data.focus.active.id
  }), dialog && React.createElement(Dialog, {
    key: dialog.k,
    d: dialog,
    close: () => setDialog(null)
  }), toastMsg && React.createElement("div", {
    key: toastMsg.k,
    className: `toast cut ${toastMsg.action ? 'toast-act' : ''}`
  }, toastMsg.action ? React.createElement("span", {
    className: "toast-msg"
  }, toastMsg.msg) : toastMsg.msg, toastMsg.action && React.createElement("button", {
    type: "button",
    className: "toast-btn cut",
    onClick: () => {
      const a = toastMsg.action;
      clearTimeout(toastTimer.current);
      setToastMsg(null);
      a.run();
    }
  }, React.createElement(Undo2, {
    size: 14
  }), toastMsg.action.label)), !mono && data.settings.crt && React.createElement("div", {
    className: "crt"
  }), !mono && data.settings.scanlines && React.createElement("div", {
    className: "scan"
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));