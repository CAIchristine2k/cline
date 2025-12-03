#!/usr/bin/env node

/**
 * Post-build cleanup script
 *
 * Removes development files from the build output that should not be deployed.
 * Specifically removes .dev.vars which contains local development environment variables
 * that conflict with production Cloudflare Workers environment variables.
 */

import { unlink, access } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filesToRemove = [
  'dist/server/.dev.vars',
  'dist/server/.env',
];

async function cleanBuild() {
  console.log('🧹 Cleaning build output...');

  let removedCount = 0;

  for (const file of filesToRemove) {
    const filePath = join(__dirname, '..', file);

    try {
      // Check if file exists
      await access(filePath);

      // Remove file
      await unlink(filePath);
      console.log(`  ✅ Removed: ${file}`);
      removedCount++;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.warn(`  ⚠️  Could not remove ${file}:`, error.message);
      }
      // File doesn't exist - that's fine, nothing to do
    }
  }

  if (removedCount === 0) {
    console.log('  ℹ️  No development files found in build output (already clean)');
  } else {
    console.log(`  ✨ Build cleanup complete! Removed ${removedCount} file(s)`);
  }
}

cleanBuild().catch((error) => {
  console.error('❌ Build cleanup failed:', error);
  process.exit(1);
});
