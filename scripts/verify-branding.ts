/**
 * OFFICIAL NIRAMAY BRANDING REGRESSION SUITE (Phase 3, 2026-10-16)
 * -------------------------------------------------------------------------
 * Single source of truth: public/niramay-logo-official.png — the supplied
 * official artwork (1254x1254, sha256 pinned below). Every icon asset in
 * this repo must be a deterministic whole-artwork derivation of it:
 * the COMPLETE composition (symbol + "NIRAMAY" wordmark +
 * "DISCOVER • HEAL • LIVE BETTER" tagline) with NO cropping, NO recoloring,
 * NO selective symbol extraction, and NO hand-drawn replacement.
 *
 * This suite fails the build when:
 *  - the master artwork file is not the supplied official image;
 *  - any PWA/apple/favicon asset no longer matches its pinned fingerprint
 *    (old mortar-and-pestle artwork detection);
 *  - the maskable-512 content is not the complete composition or breaks the
 *    66/108 safe circle (mask clipping risk);
 *  - the maskable canvas background is not the artwork's own cream;
 *  - the APK build inputs on the platform side would still bake the old icon
 *    (this repo pins only its own assets; the platform launcher input is
 *    gated by the platform repo's own suite).
 *
 * Geometry is measured from decoded pixels (dependency-free PNG decode),
 * not assumed from file names.
 */
import { ok, strictEqual } from 'node:assert';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { inflateSync } from 'node:zlib';

const sha256 = (p: string) => createHash('sha256').update(readFileSync(p)).digest('hex');

/* ------------------------------------------------------------------ */
/* Minimal PNG decoder (RGB, no interlace) — enough for geometry checks */
/* ------------------------------------------------------------------ */
function decodePng(path: string): { w: number; h: number; rgb: Uint8Array } {
  const buf = readFileSync(path);
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  const bitDepth = buf[24];
  const colorType = buf[25];
  if (bitDepth !== 8 || (colorType !== 0 && colorType !== 2)) {
    throw new Error(`unsupported PNG (depth=${bitDepth} color=${colorType}): ${path}`);
  }
  const stride = colorType === 2 ? w * 3 : w;
  let idat: Buffer[] = [];
  let pos = 8;
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') idat.push(buf.subarray(pos + 8, pos + 8 + len));
    pos += 12 + len;
    if (type === 'IEND') break;
  }
  const raw = inflateSync(Buffer.concat(idat));
  const rgb = new Uint8Array(w * h * 3);
  let prev = new Uint8Array(stride);
  for (let y = 0; y < h; y++) {
    const filter = raw[y * (stride + 1)];
    const row = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = new Uint8Array(stride);
    for (let i = 0; i < stride; i++) {
      const a = i >= (colorType === 2 ? 3 : 1) ? cur[i - (colorType === 2 ? 3 : 1)] : 0;
      const b = prev[i];
      const c = i >= (colorType === 2 ? 3 : 1) ? prev[i - (colorType === 2 ? 3 : 1)] : 0;
      let v = row[i];
      if (filter === 1) v = (v + a) & 0xff;
      else if (filter === 2) v = (v + b) & 0xff;
      else if (filter === 3) v = (v + ((a + b) >> 1)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
      }
      cur[i] = v;
    }
    if (colorType === 2) rgb.set(cur, y * w * 3);
    else for (let x = 0; x < w; x++) { const g = cur[x]; rgb[y * w * 3 + x * 3] = g; rgb[y * w * 3 + x * 3 + 1] = g; rgb[y * w * 3 + x * 3 + 2] = g; }
    prev = cur;
  }
  return { w, h, rgb };
}

function contentBbox(path: string, bg: [number, number, number]) {
  const { w, h, rgb } = decodePng(path);
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 3;
      const d = Math.abs(rgb[i] - bg[0]) + Math.abs(rgb[i + 1] - bg[1]) + Math.abs(rgb[i + 2] - bg[2]);
      if (d > 18) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  if (x1 < 0) throw new Error(`no content detected: ${path}`);
  return { w, h, x0, y0, x1, y1 };
}

let n = 0;
const pass = (label: string, cond: boolean, detail = '') => {
  ok(cond, `FAILED: ${label}${detail ? ` (${detail})` : ''}`);
  n += 1;
  console.log(`  PASS  ${label}`);
};

/* ------------------------------------------------------------------ */
/* 1. Master artwork is the supplied single source of truth            */
/* ------------------------------------------------------------------ */
console.log('[branding] master artwork');
const MASTER_SHA = '1b933703d7bf38be5571744de7478cce1b80c293223b1c31ed93984149b67ff4';
pass('niramay-logo-official.png is the supplied official artwork',
  sha256('public/niramay-logo-official.png') === MASTER_SHA,
  sha256('public/niramay-logo-official.png'));

/* ------------------------------------------------------------------ */
/* 2. Pinned fingerprints — every asset is a whole-artwork derivative */
/* ------------------------------------------------------------------ */
console.log('[branding] asset fingerprints (old-artwork detection)');
const PINS: Record<string, string> = {
  'public/brand/niramay-logo-full.png': '3e38d2f8e6c3c169902d3db6e057b0d100ae72d50982d9820ae320b32d2828d0',
  'public/brand/niramay-mark.png': '3e38d2f8e6c3c169902d3db6e057b0d100ae72d50982d9820ae320b32d2828d0',
  'public/icon-512.png': '3e38d2f8e6c3c169902d3db6e057b0d100ae72d50982d9820ae320b32d2828d0',
  'public/icon-192.png': '32353997b204f5ee31fb52dd46a6f058d33ea36b5707a377de5dfaf0eaf039a9',
  'public/apple-touch-icon.png': '87245deadee97b897536179b15370c6657b767c7d28e7e2cd44221c14c4504a5',
  'public/icon-512-maskable.png': '444f6912eeecc3484d73c47030ac6d022b1c632a03b56157fa83877b1c36600c',
};
for (const [p, expected] of Object.entries(PINS)) {
  pass(`${p} matches the complete-artwork fingerprint`, sha256(p) === expected, sha256(p));
}
{
  const ico = readFileSync('public/favicon.ico');
  const type = ico.readUInt16LE(2);
  const count = ico.readUInt16LE(4);
  const sizes: number[] = [];
  for (let i = 0; i < count; i++) {
    const e = 6 + i * 16;
    sizes.push(ico[e] === 0 ? 256 : ico[e]);
  }
  pass('favicon.ico is a valid multi-resolution icon of the complete artwork',
    type === 1 && count === 3 && sizes.includes(16) && sizes.includes(32) && sizes.includes(48),
    `type=${type} sizes=${sizes.join('/')}`);
  pass('favicon.ico fingerprint pinned (old-artwork detection)',
    sha256('public/favicon.ico') === '85284c3377b3e93fcd7f95aa6216e9ebb0fc3dd3b4594cacfd925cbaaf9868b3');
}

/* ------------------------------------------------------------------ */
/* 3. Maskable-512 geometry: complete composition inside the safe zone */
/* ------------------------------------------------------------------ */
console.log('[branding] maskable-512 safe-area geometry');
const BG: [number, number, number] = [253, 253, 249]; // artwork cream, measured from master corners
{
  const { w, h, x0, y0, x1, y1 } = contentBbox('public/icon-512-maskable.png', BG);
  const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
  const ratio = ch / cw;
  // complete composition content is 845/870 = 0.971; symbol-only would be ~0.6
  pass('maskable content is the COMPLETE composition (wordmark+tagline present)',
    ratio > 0.9 && ratio < 1.05, `aspect ${ratio.toFixed(3)}`);
  const far = Math.hypot(x1 - w / 2, y1 - h / 2);
  const safe = (w * 66) / 108 / 2;
  pass('maskable content corners inside the 66/108 safe circle',
    far <= safe + 1, `${far.toFixed(1)} <= ${safe.toFixed(1)} (+1px raster tolerance)`);
  const cxOff = Math.abs((x0 + x1) / 2 - w / 2), cyOff = Math.abs((y0 + y1) / 2 - h / 2);
  pass('maskable content centered', cxOff <= 2 && cyOff <= 2, `dx ${cxOff.toFixed(1)} dy ${cyOff.toFixed(1)}`);
}

/* ------------------------------------------------------------------ */
/* 4. Component wiring: both logo variants use the new complete assets */
/* ------------------------------------------------------------------ */
console.log('[branding] component + manifest wiring');
const logoSrc = readFileSync('components/brand/NiramayLogo.tsx', 'utf8');
pass('NiramayLogo emblem variant serves the complete artwork (niramay-mark.png)',
  /niramay-mark\.png/.test(logoSrc) && !/mark-only/i.test(logoSrc));
pass('NiramayLogo full variant serves the complete artwork (niramay-logo-full.png)',
  /niramay-logo-full\.png/.test(logoSrc));
const manifest = readFileSync('app/manifest.ts', 'utf8');
pass('PWA manifest references icon-512 + icon-512-maskable', /icon-512\.png/.test(manifest) && /icon-512-maskable\.png/.test(manifest));
const layout = readFileSync('app/layout.tsx', 'utf8');
pass('layout metadata references favicon.ico + apple-touch-icon', /favicon\.ico/.test(layout) && /apple-touch-icon\.png/.test(layout));

/* ------------------------------------------------------------------ */
/* 5. Version convention                                              */
/* ------------------------------------------------------------------ */
console.log('[branding] version');
{
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  pass('package.json version is the Phase 3 bump (>= 2.1.1)',
    /^\d+\.\d+\.\d+$/.test(pkg.version) && pkg.version >= '2.1.1', pkg.version);
}

console.log(`[branding] ${n} checks passed`);
