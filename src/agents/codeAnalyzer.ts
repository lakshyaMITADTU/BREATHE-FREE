/**
 * Code Analyzer Agent
 * Helps analyze, debug, and improve code quality
 */

export interface CodeIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  line?: number;
  suggestion?: string;
}

export interface AnalysisResult {
  file: string;
  issues: CodeIssue[];
  summary: string;
}

/**
 * Analyzes TypeScript/React code for common issues
 */
export class CodeAnalyzerAgent {
  private issues: CodeIssue[] = [];

  /**
   * Check for common TypeScript issues
   */
  analyzeTypeScript(code: string, filePath: string): AnalysisResult {
    this.issues = [];

    // Check for unused variables
    this.checkUnusedVariables(code);

    // Check for missing type annotations
    this.checkMissingTypes(code);

    // Check for console logs (dev only)
    this.checkConsoleLogs(code);

    // Check for async/await issues
    this.checkAsyncAwait(code);

    return {
      file: filePath,
      issues: this.issues,
      summary: this.generateSummary(),
    };
  }

  /**
   * Check for unused variables
   */
  private checkUnusedVariables(code: string): void {
    const unusedPattern = /const\s+(\w+)\s*=.*?;(?![\s\S]*\1)/gm;
    const matches = code.matchAll(unusedPattern);

    for (const match of matches) {
      this.issues.push({
        type: 'warning',
        message: `Variable '${match[1]}' appears to be unused`,
        suggestion: `Remove unused variable or use it in the code`,
      });
    }
  }

  /**
   * Check for missing type annotations
   */
  private checkMissingTypes(code: string): void {
    // Look for function parameters without types
    const funcPattern = /function\s+\w+\s*\(\s*(\w+)(?:\s*,\s*(\w+))*\s*\)/g;
    if (funcPattern.test(code)) {
      this.issues.push({
        type: 'info',
        message: 'Function parameters should have explicit type annotations',
        suggestion: `Use: function name(param: Type) { ... }`,
      });
    }
  }

  /**
   * Check for console.log statements
   */
  private checkConsoleLogs(code: string): void {
    const consolePattern = /console\.(log|warn|error)\s*\(/g;
    const matches = code.match(consolePattern);

    if (matches) {
      this.issues.push({
        type: 'warning',
        message: `Found ${matches.length} console statement(s) - remove before production`,
        suggestion: `Use proper logging library or remove debug statements`,
      });
    }
  }

  /**
   * Check for async/await issues
   */
  private checkAsyncAwait(code: string): void {
    // Check for async without try-catch
    const asyncPattern = /async\s*\(\s*\).*?\{(?![\s\S]*try)/;
    if (asyncPattern.test(code)) {
      this.issues.push({
        type: 'info',
        message: 'Async functions should handle errors with try-catch or .catch()',
        suggestion: `Wrap async operations in try-catch blocks`,
      });
    }
  }

  /**
   * Generate a summary of all issues found
   */
  private generateSummary(): string {
    if (this.issues.length === 0) {
      return '✓ No issues found';
    }

    const errors = this.issues.filter((i) => i.type === 'error').length;
    const warnings = this.issues.filter((i) => i.type === 'warning').length;
    const infos = this.issues.filter((i) => i.type === 'info').length;

    return `Found: ${errors} error(s), ${warnings} warning(s), ${infos} info(s)`;
  }

  /**
   * Get formatted report
   */
  getReport(): string {
    let report = '📋 Code Analysis Report\n';
    report += '='.repeat(40) + '\n\n';

    if (this.issues.length === 0) {
      report += '✅ All checks passed!\n';
    } else {
      this.issues.forEach((issue, index) => {
        const icon =
          issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️';
        report += `${icon} [${issue.type.toUpperCase()}] ${issue.message}\n`;

        if (issue.suggestion) {
          report += `   💡 ${issue.suggestion}\n`;
        }
        report += '\n';
      });
    }

    return report;
  }
}

// Export singleton instance
export const codeAnalyzer = new CodeAnalyzerAgent();
