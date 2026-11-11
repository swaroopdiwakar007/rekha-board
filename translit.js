// Phonetic (Roman → native script) transliteration.
// Brahmic scripts share a parallel Unicode layout, so we transliterate into
// Devanagari once and then shift code points into the target script's block.
(function () {
  const VIRAMA = '्';
  const OFFSET = { deva: 0, beng: 0x80, gujr: 0x180, taml: 0x280, telu: 0x300, knda: 0x380 };
  const DRAVIDIAN = new Set(['taml', 'telu', 'knda']);

  const VOWELS = {
    a: ['अ', ''], aa: ['आ', 'ा'], A: ['आ', 'ा'],
    i: ['इ', 'ि'], ii: ['ई', 'ी'], ee: ['ई', 'ी'], I: ['ई', 'ी'],
    u: ['उ', 'ु'], uu: ['ऊ', 'ू'], oo: ['ऊ', 'ू'], U: ['ऊ', 'ू'],
    R: ['ऋ', 'ृ'],
    e: ['ए', 'े'], ai: ['ऐ', 'ै'], o: ['ओ', 'ो'], au: ['औ', 'ौ'], ou: ['औ', 'ौ'],
  };
  // Dravidian scripts distinguish short/long e and o: e/o short, E/O long.
  const DRAV_VOWELS = { e: ['ऎ', 'ॆ'], E: ['ए', 'े'], o: ['ऒ', 'ॊ'], O: ['ओ', 'ो'] };

  const CONS = {
    k: 'क', kh: 'ख', K: 'ख', g: 'ग', gh: 'घ', G: 'घ', Ng: 'ङ',
    c: 'च', ch: 'च', chh: 'छ', Ch: 'छ', j: 'ज', jh: 'झ', J: 'झ', ny: 'ञ',
    T: 'ट', Th: 'ठ', D: 'ड', Dh: 'ढ', N: 'ण',
    t: 'त', th: 'थ', d: 'द', dh: 'ध', n: 'न',
    p: 'प', ph: 'फ', f: 'फ', P: 'फ', b: 'ब', bh: 'भ', B: 'भ', m: 'म',
    y: 'य', r: 'र', l: 'ल', v: 'व', w: 'व', sh: 'श', Sh: 'ष', s: 'स', h: 'ह',
    L: 'ळ', x: 'क्ष', GY: 'ज्ञ', z: 'ज', q: 'क',
  };
  // Tamil-only letters: zh → ழ, R → ற, nn → ன (via their Devanagari twins).
  const TAMIL_CONS = { zh: 'ऴ', R: 'ऱ', nn: 'ऩ' };

  const SIGNS = { M: 'ं', H: 'ः', '~': 'ँ', '|': '।', '||': '॥' };

  // Tamil has one letter per articulation place; collapse aspirates/voiced.
  const TAMIL_COLLAPSE = {
    'ख': 'क', 'ग': 'क', 'घ': 'क', 'छ': 'च', 'झ': 'च', 'ठ': 'ट', 'ड': 'ट', 'ढ': 'ट',
    'थ': 'त', 'द': 'त', 'ध': 'त', 'फ': 'प', 'ब': 'प', 'भ': 'प',
    'ं': 'म्', 'ँ': 'म्', 'ऋ': 'रु', 'ृ': 'ु',
  };

  function tokens(table) {
    return Object.keys(table).sort((a, b) => b.length - a.length);
  }

  function matchAt(str, i, table, keys) {
    for (const k of keys) if (str.startsWith(k, i)) return k;
    return null;
  }

  function brahmic(input, script) {
    const vowels = DRAVIDIAN.has(script) ? { ...VOWELS, ...DRAV_VOWELS } : { ...VOWELS };
    const cons = { ...CONS };
    if (script === 'taml') { Object.assign(cons, TAMIL_CONS); delete vowels.R; }
    const vk = tokens(vowels), ck = tokens(cons), sk = tokens(SIGNS);
    const explicitA = script === 'taml'; // Tamil: bare consonant gets a pulli

    let out = '', pending = false, i = 0;
    while (i < input.length) {
      const c = matchAt(input, i, cons, ck);
      const v = matchAt(input, i, vowels, vk);
      const s = matchAt(input, i, SIGNS, sk);
      const best = [c, v, s].reduce((a, b) => (b && (!a || b.length > a.length) ? b : a), null);
      if (best && best === c) {
        if (pending) out += VIRAMA;
        out += cons[c]; pending = true; i += c.length;
      } else if (best && best === v) {
        out += pending ? vowels[v][1] : vowels[v][0];
        pending = false; i += v.length;
      } else if (best && best === s) {
        if (pending && explicitA && s !== 'M' && s !== 'H' && s !== '~') out += VIRAMA;
        out += SIGNS[s]; pending = false; i += s.length;
      } else {
        if (pending && explicitA) out += VIRAMA;
        out += input[i]; pending = false; i += 1;
      }
    }
    if (pending && explicitA) out += VIRAMA;
    return toScript(out, script);
  }

  function toScript(deva, script) {
    if (script === 'deva') return deva;
    let s = deva;
    if (script === 'taml') s = [...s].map((ch) => TAMIL_COLLAPSE[ch] || ch).join('');
    if (script === 'beng') s = s.replace(/व/g, 'ब').replace(/ळ/g, 'ल');
    if (script === 'knda') s = s.replace(/ँ/g, 'ं');
    const off = OFFSET[script];
    let res = '';
    for (const ch of s) {
      const cp = ch.codePointAt(0);
      if (cp >= 0x0900 && cp <= 0x097f && cp !== 0x0964 && cp !== 0x0965) {
        res += String.fromCodePoint(cp + off);
      } else res += ch;
    }
    return res;
  }

  // ---- Urdu (abjad: short vowels are mostly omitted) ----
  const UR_CONS = {
    b: 'ب', bh: 'بھ', p: 'پ', ph: 'پھ', f: 'ف', t: 'ت', th: 'تھ', T: 'ٹ', Th: 'ٹھ',
    j: 'ج', jh: 'جھ', c: 'چ', ch: 'چ', chh: 'چھ', kh: 'خ', Kh: 'کھ', k: 'ک', gh: 'غ', Gh: 'گھ', g: 'گ',
    d: 'د', dh: 'دھ', D: 'ڈ', Dh: 'ڈھ', r: 'ر', R: 'ڑ', z: 'ز', s: 'س', sh: 'ش', S: 'ص',
    Z: 'ض', H: 'ح', h: 'ہ', q: 'ق', l: 'ل', m: 'م', n: 'ن', N: 'ں', v: 'و', w: 'و', y: 'ی', x: 'کس',
  };
  //            start   middle  end
  const UR_VOW = {
    a:  ['ا',  '',   'ا'], aa: ['آ', 'ا', 'ا'], A: ['آ', 'ا', 'ا'],
    i:  ['ا',  '',   'ی'], ii: ['ای', 'ی', 'ی'], ee: ['ای', 'ی', 'ی'], I: ['ای', 'ی', 'ی'],
    u:  ['ا',  '',   'و'], uu: ['او', 'و', 'و'], oo: ['او', 'و', 'و'], U: ['او', 'و', 'و'],
    e:  ['ای', 'ی',  'ے'], ai: ['اے', 'ی', 'ے'],
    o:  ['او', 'و',  'و'], au: ['او', 'و', 'و'], ou: ['او', 'و', 'و'],
  };
  const UR_PUNCT = { '?': '؟', ',': '،' };

  function urdu(input) {
    const ck = tokens(UR_CONS), vk = tokens(UR_VOW);
    const toks = [];
    let i = 0;
    while (i < input.length) {
      const c = matchAt(input, i, UR_CONS, ck), v = matchAt(input, i, UR_VOW, vk);
      if (c && (!v || c.length >= v.length)) { toks.push(['c', c]); i += c.length; }
      else if (v) { toks.push(['v', v]); i += v.length; }
      else { toks.push(['o', input[i]]); i += 1; }
    }
    let out = '';
    toks.forEach(([kind, val], idx) => {
      const prev = toks[idx - 1], next = toks[idx + 1];
      if (kind === 'c') out += UR_CONS[val];
      else if (kind === 'v') {
        const atStart = !prev || prev[0] === 'o';
        const atEnd = !next || next[0] === 'o';
        out += UR_VOW[val][atStart ? 0 : atEnd ? 2 : 1];
      } else out += UR_PUNCT[val] || val;
    });
    return out;
  }

  window.transliterate = function (input, script) {
    if (!input) return '';
    if (script === 'arab') return urdu(input);
    if (script in OFFSET) return brahmic(input, script);
    return input;
  };
  window.PHONETIC_KEY = /^[A-Za-z~|]$/;
})();
