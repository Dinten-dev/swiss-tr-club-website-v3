import { readFileSync, writeFileSync, mkdtempSync, readdirSync, cpSync, rmSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const frontend = resolve(root, 'frontend');
const output = resolve(root, 'wordpress/wp-content/themes/strc-app/build');
// The staging delta is only needed while bundle adjustments exist outside the source.
const deltaPath = resolve(root, 'deployment/staging/app.bundle.delta.json');
const delta = existsSync(deltaPath) ? JSON.parse(readFileSync(deltaPath, 'utf8')) : null;
const manifestPath = resolve(root, 'deployment/staging/manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const sha256 = data => createHash('sha256').update(data).digest('hex');
const temporary = mkdtempSync(join(tmpdir(), 'strc-staging-build-'));

try {
  execFileSync(process.execPath, [resolve(frontend, 'node_modules/vite/bin/vite.js'), 'build', '--config', 'vite.wordpress.config.ts'], {
    cwd: frontend,
    env: { ...process.env, STRC_BUILD_DIR: temporary },
    stdio: 'inherit',
  });
  if (delta) {
    const entry = resolve(temporary, 'app.js');
    const base = readFileSync(entry, 'utf8');
    if (sha256(base) !== delta.baseSha256) {
      throw new Error('Source build changed. Integrate the recorded staging delta into the source before replacing the staging snapshot.');
    }
    const lines = base.match(/[^\n]*\n|[^\n]+$/g) || [];
    for (const change of [...delta.changes].reverse()) {
      lines.splice(change.start, change.remove, ...change.insert);
    }
    const restored = lines.join('');
    if (sha256(restored) !== delta.targetSha256) throw new Error('Staging delta failed its checksum check.');
    writeFileSync(entry, restored);
    // Validate compiled entries before touching the retained deployment snapshot.
    for (const name of readdirSync(temporary).filter(name => /\.(js|css)$/.test(name))) {
      const record = manifest.files.find(file => file.path === `wordpress/wp-content/themes/strc-app/build/${name}`);
      if (!record || sha256(readFileSync(resolve(temporary, name))) !== record.sha256) {
        throw new Error(`Compiled asset differs from staging: ${name}`);
      }
    }
  } else {
    // All staging adjustments live in the source: record the new compiled assets in the manifest.
    for (const name of readdirSync(temporary).filter(name => /\.(js|css)$/.test(name))) {
      const data = readFileSync(resolve(temporary, name));
      const path = `wordpress/wp-content/themes/strc-app/build/${name}`;
      const record = { path, bytes: data.length, sha256: sha256(data) };
      const index = manifest.files.findIndex(file => file.path === path);
      if (index >= 0) manifest.files[index] = record; else manifest.files.push(record);
    }
    manifest.files.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  }
  // Keep older chunks present on staging; every retained file is checksummed.
  cpSync(temporary, output, { recursive: true });
  execFileSync(process.execPath, [resolve(root, 'scripts/verify-staging-snapshot.mjs')], { stdio: 'inherit' });
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
