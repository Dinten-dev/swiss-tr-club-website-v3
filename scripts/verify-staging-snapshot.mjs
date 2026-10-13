import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(readFileSync(resolve(root, 'deployment/staging/manifest.json'), 'utf8'));
const sha256 = data => createHash('sha256').update(data).digest('hex');

for (const file of manifest.files) {
  const actual = readFileSync(resolve(root, file.path));
  if (actual.length !== file.bytes || sha256(actual) !== file.sha256) {
    throw new Error(`Staging snapshot mismatch: ${file.path}`);
  }
}

console.log(`Staging snapshot: PASS (${manifest.files.length} files, ${manifest.capturedOn})`);
