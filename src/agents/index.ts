/**
 * Main Agent Coordinator
 * Orchestrates all code analysis and error detection agents
 */

import { CodeAnalyzerAgent } from './codeAnalyzer';
import { ErrorDetectionAgent } from './errorDetector';

export interface AgentReport {
  file: string;
  analysis: ReturnType<CodeAnalyzerAgent['analyzeTypeScript']>;
  errors: ReturnType<ErrorDetectionAgent['detectErrors']>;
  recommendations: string[];
}

export class CodeAgentCoordinator {
  private analyzer: CodeAnalyzerAgent;
  private errorDetector: ErrorDetectionAgent;

  constructor() {
    this.analyzer = new CodeAnalyzerAgent();
    this.errorDetector = new ErrorDetectionAgent();
  }

  /**
   * Run full analysis on code
   */
  analyzeCode(code: string, filePath: string): AgentReport {
    const analysis = this.analyzer.analyzeTypeScript(code, filePath);
    const errors = this.errorDetector.detectErrors(code, filePath);
    const recommendations = this.generateRecommendations(analysis, errors);

    return {
      file: filePath,
      analysis,
      errors,
      recommendations,
    };
  }

  /**
   * Generate recommendations based on analysis
   */
  private generateRecommendations(
    analysis: ReturnType<CodeAnalyzerAgent['analyzeTypeScript']>,
    errors: ReturnType<ErrorDetectionAgent['detectErrors']>,
  ): string[] {
    const recommendations: string[] = [];

    // Add recommendations based on critical errors
    const criticalErrors = errors.errors.filter((e) => e.severity === 'critical');
    if (criticalErrors.length > 0) {
      recommendations.push(
        `🚨 Address ${criticalErrors.length} critical error(s) before deployment`,
      );
    }

    // Add recommendations for code quality
    if (analysis.issues.length > 5) {
      recommendations.push('Consider refactoring to improve code quality');
    }

    // Type checking recommendation
    if (analysis.issues.some((i) => i.message.includes('type'))) {
      recommendations.push(
        'Enable stricter TypeScript checking in tsconfig.json',
      );
    }

    // Testing recommendation
    if (errors.errors.length > 0) {
      recommendations.push('Add unit tests to catch these issues early');
    }

    return recommendations.length > 0
      ? recommendations
      : ["✅ Code looks good! Keep up the quality"];
  }

  /**
   * Generate full report
   */
  generateFullReport(report: AgentReport): string {
    let output = '\n';
    output += '═'.repeat(60) + '\n';
    output += `📊 CODE ANALYSIS REPORT: ${report.file}\n`;
    output += '═'.repeat(60) + '\n\n';

    // Analysis summary
    output += '📈 CODE QUALITY\n';
    output += '─'.repeat(60) + '\n';
    output += `${report.analysis.summary}\n\n`;

    // Issues found
    if (report.analysis.issues.length > 0) {
      output += 'Issues Detected:\n';
      report.analysis.issues.slice(0, 5).forEach((issue) => {
        output += `  • ${issue.message}\n`;
        if (issue.suggestion) {
          output += `    → ${issue.suggestion}\n`;
        }
      });
      if (report.analysis.issues.length > 5) {
        output += `  ... and ${report.analysis.issues.length - 5} more\n`;
      }
      output += '\n';
    }

    // Errors summary
    output += '🔍 ERROR DETECTION\n';
    output += '─'.repeat(60) + '\n';
    output += `Total Errors Found: ${report.errors.totalErrors}\n`;

    if (report.errors.totalErrors > 0) {
      const bySeverity = {
        critical: report.errors.errors.filter((e) => e.severity === 'critical')
          .length,
        major: report.errors.errors.filter((e) => e.severity === 'major').length,
        minor: report.errors.errors.filter((e) => e.severity === 'minor').length,
      };
      output += `  🚨 Critical: ${bySeverity.critical}\n`;
      output += `  ⚠️  Major: ${bySeverity.major}\n`;
      output += `  💡 Minor: ${bySeverity.minor}\n\n`;

      output += 'Top Issues:\n';
      report.errors.errors.slice(0, 3).forEach((error) => {
        const icon =
          error.severity === 'critical'
            ? '🚨'
            : error.severity === 'major'
              ? '⚠️ '
              : '💡';
        output += `  ${icon} [${error.category}] ${error.message}\n`;
        output += `    ${error.solution}\n`;
      });
      output += '\n';
    }

    // Recommendations
    output += '💡 RECOMMENDATIONS\n';
    output += '─'.repeat(60) + '\n';
    report.recommendations.forEach((rec) => {
      output += `  • ${rec}\n`;
    });

    output += '\n' + '═'.repeat(60) + '\n\n';

    return output;
  }
}

// Export singleton instance
export const codeAgent = new CodeAgentCoordinator();

export default codeAgent;
