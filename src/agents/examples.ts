/**
 * Example Usage of Code Agents
 * Shows how to integrate agents into your workflow
 */

import { codeAgent } from './index';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Example 1: Analyze a single file
 */
export function analyzeFile(filePath: string): void {
  const code = fs.readFileSync(filePath, 'utf-8');
  const report = codeAgent.analyzeCode(code, filePath);

  console.log(codeAgent.generateFullReport(report));
}

/**
 * Example 2: Analyze entire directory
 */
export function analyzeDirectory(dirPath: string): void {
  const files = fs.readdirSync(dirPath, { recursive: true });

  const tsFiles = files.filter((file) =>
    (file as string).endsWith('.ts') || (file as string).endsWith('.tsx'),
  );

  console.log(`\n📁 Analyzing ${tsFiles.length} TypeScript files...\n`);

  let totalIssues = 0;
  let totalErrors = 0;

  tsFiles.forEach((file) => {
    const filePath = path.join(dirPath, file as string);

    if (!fs.statSync(filePath).isFile()) return;

    const code = fs.readFileSync(filePath, 'utf-8');
    const report = codeAgent.analyzeCode(code, filePath);

    totalIssues += report.analysis.issues.length;
    totalErrors += report.errors.totalErrors;

    if (report.analysis.issues.length > 0 || report.errors.totalErrors > 0) {
      console.log(codeAgent.generateFullReport(report));
    }
  });

  console.log('\n' + '═'.repeat(60));
  console.log('📊 DIRECTORY ANALYSIS SUMMARY');
  console.log('═'.repeat(60));
  console.log(`Files Analyzed: ${tsFiles.length}`);
  console.log(`Total Issues: ${totalIssues}`);
  console.log(`Total Errors: ${totalErrors}`);
  console.log('═'.repeat(60) + '\n');
}

/**
 * Example 3: Watch mode - analyze files on save
 */
export function watchDirectory(dirPath: string): void {
  console.log(`👀 Watching ${dirPath} for changes...\n`);

  fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
    if (
      filename &&
      ((filename as string).endsWith('.ts') ||
        (filename as string).endsWith('.tsx'))
    ) {
      const filePath = path.join(dirPath, filename as string);

      // Small delay to ensure file is written
      setTimeout(() => {
        try {
          const code = fs.readFileSync(filePath, 'utf-8');
          const report = codeAgent.analyzeCode(code, filePath);

          console.clear();
          console.log(
            `\n✏️  File changed: ${filename}\n`,
          );
          console.log(codeAgent.generateFullReport(report));
        } catch (error) {
          // File might be in transition
        }
      }, 100);
    }
  });
}

/**
 * Example 4: Generate quick report
 */
export function quickReport(code: string, filePath: string = 'code'): void {
  const report = codeAgent.analyzeCode(code, filePath);

  // Show only critical/major issues
  const criticalIssues = report.errors.errors.filter(
    (e) => e.severity === 'critical' || e.severity === 'major',
  );

  if (criticalIssues.length > 0) {
    console.log('\n🚨 ISSUES FOUND:\n');
    criticalIssues.forEach((issue) => {
      console.log(`  [${issue.severity.toUpperCase()}] ${issue.message}`);
      console.log(`  Fix: ${issue.solution}\n`);
    });
  } else if (report.analysis.issues.length > 0) {
    console.log('\n💡 SUGGESTIONS:\n');
    report.analysis.issues.slice(0, 3).forEach((issue) => {
      console.log(`  • ${issue.message}`);
      if (issue.suggestion) console.log(`    → ${issue.suggestion}`);
    });
  } else {
    console.log('\n✅ No issues detected!\n');
  }
}

// Export for use in other modules
export { codeAgent };
