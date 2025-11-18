import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config();

let buildDate = 'unknown';

try {
  buildDate = execSync('git log -1 --format=%cd').toString().trim();
} catch (e) {
  console.warn('Could not read git commit date:', e);
}

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
});
