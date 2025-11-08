#!/usr/bin/env node

/**
 * Script de vérification pré-déploiement pour Cloudflare Workers
 * Vérifie que tout est configuré correctement avant de déployer
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

console.log('\n🔍 Cloudflare Workers Pre-Deployment Check\n');
console.log('═══════════════════════════════════════════\n');

// Check 1: wrangler.jsonc exists
console.log('📄 Checking wrangler.jsonc...');
const wranglerPath = join(__dirname, 'wrangler.jsonc');
if (existsSync(wranglerPath)) {
  console.log('   ✅ wrangler.jsonc found');
  checks.passed++;

  const wranglerContent = readFileSync(wranglerPath, 'utf-8');

  // Check account_id
  if (wranglerContent.includes('"account_id": ""')) {
    console.log('   ❌ account_id is not set in wrangler.jsonc');
    console.log('   ➡️  Run: npm run cf-whoami');
    console.log('   ➡️  Then add your Account ID to wrangler.jsonc\n');
    checks.failed++;
  } else {
    console.log('   ✅ account_id is configured');
    checks.passed++;
  }
} else {
  console.log('   ❌ wrangler.jsonc not found');
  checks.failed++;
}

// Check 2: .env file
console.log('\n🔑 Checking environment variables...');
const envPath = join(__dirname, '.env');
if (existsSync(envPath)) {
  console.log('   ✅ .env file found');
  checks.passed++;

  const envContent = readFileSync(envPath, 'utf-8');
  const requiredVars = [
    'PRIVATE_STOREFRONT_API_TOKEN',
    'PUBLIC_STOREFRONT_API_TOKEN',
    'PUBLIC_STORE_DOMAIN',
    'SESSION_SECRET'
  ];

  let missingVars = [];
  requiredVars.forEach(varName => {
    if (!envContent.includes(varName)) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    console.log('   ⚠️  Missing required variables:');
    missingVars.forEach(v => console.log(`      - ${v}`));
    checks.warnings++;
  } else {
    console.log('   ✅ All required variables present');
    checks.passed++;
  }
} else {
  console.log('   ❌ .env file not found');
  console.log('   ➡️  Copy .env.example to .env and fill in your values\n');
  checks.failed++;
}

// Check 3: Package dependencies
console.log('\n📦 Checking dependencies...');
const packagePath = join(__dirname, 'package.json');
if (existsSync(packagePath)) {
  const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'));

  if (pkg.devDependencies && pkg.devDependencies.wrangler) {
    console.log('   ✅ Wrangler is installed');
    checks.passed++;
  } else {
    console.log('   ❌ Wrangler not found in dependencies');
    console.log('   ➡️  Run: npm install\n');
    checks.failed++;
  }
}

// Check 4: Build output
console.log('\n🏗️  Checking build output...');
const distPath = join(__dirname, 'dist');
if (existsSync(distPath)) {
  console.log('   ✅ dist/ directory exists (previous build found)');
  checks.passed++;
} else {
  console.log('   ⚠️  No dist/ directory found');
  console.log('   ℹ️  Run: npm run build (before deploying)\n');
  checks.warnings++;
}

// Summary
console.log('\n═══════════════════════════════════════════');
console.log('\n📊 Summary:\n');
console.log(`   ✅ Passed:   ${checks.passed}`);
console.log(`   ⚠️  Warnings: ${checks.warnings}`);
console.log(`   ❌ Failed:   ${checks.failed}`);
console.log('');

if (checks.failed > 0) {
  console.log('❌ Pre-deployment check FAILED');
  console.log('   Please fix the issues above before deploying.\n');
  process.exit(1);
} else if (checks.warnings > 0) {
  console.log('⚠️  Pre-deployment check passed with warnings');
  console.log('   You can proceed, but review warnings above.\n');
  process.exit(0);
} else {
  console.log('✅ All checks passed! Ready to deploy.');
  console.log('   Run: npm run deploy\n');
  process.exit(0);
}
