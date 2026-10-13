import { fileURLToPath } from 'node:url';
import { chmod, readdir, cp, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';

const outputDirectory = process.env.STRC_BUILD_DIR || fileURLToPath(new URL('../wordpress/wp-content/themes/strc-app/build', import.meta.url));

export default defineConfig({
  plugins: [react(), {
    name: 'readable-wordpress-assets',
    async closeBundle() {
      const pdfOutput = join(outputDirectory, 'pdfjs');
      await mkdir(pdfOutput, { recursive: true });
      const pdfSource = fileURLToPath(new URL('./node_modules/pdfjs-dist', import.meta.url));
      await cp(join(pdfSource, 'legacy/build/pdf.worker.min.mjs'), join(pdfOutput, 'pdf.worker.min.js'));
      for (const directory of ['cmaps', 'standard_fonts', 'wasm']) await cp(join(pdfSource, directory), join(pdfOutput, directory), { recursive: true });
      // Public source images can have macOS owner-only permissions.
      async function makeReadable(directory: string) {
        await chmod(directory, 0o755);
        for (const entry of await readdir(directory, { withFileTypes: true })) {
          const path = join(directory, entry.name);
          if (entry.isDirectory()) await makeReadable(path);
          else if (entry.isFile()) await chmod(path, 0o644);
        }
      }
      await makeReadable(outputDirectory);
    },
  }],
  css: { postcss: { plugins: [tailwindcss()] } },
  resolve: { preserveSymlinks: true, alias: { 'next/image': fileURLToPath(new URL('./wordpress/Image.tsx', import.meta.url)) } },
  define: {
    'process.env.NEXT_PUBLIC_WORDPRESS_URL': 'window.strcSettings.wordpressUrl',
    'process.env.NEXT_PUBLIC_SITE_URL': 'window.strcSettings.siteUrl',
    'process.env.NEXT_PUBLIC_ASSET_BASE': 'window.strcSettings.assetBase',
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: outputDirectory,
    emptyOutDir: true,
    copyPublicDir: true,
    lib: {
      entry: fileURLToPath(new URL('./wordpress/main.tsx', import.meta.url)),
      formats: ['es'],
      fileName: 'app',
      cssFileName: 'app',
    },
  },
});
