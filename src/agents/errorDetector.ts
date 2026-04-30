/**
 * Error Detection Agent
 * Identifies and categorizes runtime and build errors
 */

export interface ErrorDetails {
  id: string;
  severity: 'critical' | 'major' | 'minor';
  category: string;
  message: string;
  location?: {
    file: string;
    line: number;
  };
  solution: string;
  relatedDocs?: string[];
}

export interface ErrorReport {
  timestamp: Date;
  totalErrors: number;
  errors: ErrorDetails[];
}

export class ErrorDetectionAgent {
  private errors: ErrorDetails[] = [];

  /**
   * Analyze code for potential runtime errors
   */
  detectErrors(code: string, filePath: string): ErrorReport {
    this.errors = [];

    // Detect common Next.js errors
    this.detectNextJsErrors(code, filePath);

    // Detect React errors
    this.detectReactErrors(code, filePath);

    // Detect TypeScript errors
    this.detectTypeScriptErrors(code, filePath);

    // Detect async errors
    this.detectAsyncErrors(code, filePath);

    return {
      timestamp: new Date(),
      totalErrors: this.errors.length,
      errors: this.errors,
    };
  }

  /**
   * Detect Next.js specific errors
   */
  private detectNextJsErrors(code: string, filePath: string): void {
    // Check for missing 'use client' in client components
    if (
      filePath.includes('components') &&
      !code.includes("'use client'") &&
      code.includes('useState')
    ) {
      this.errors.push({
        id: 'nextjs-001',
        severity: 'critical',
        category: 'Next.js',
        message:
          "Component uses 'useState' but is missing 'use client' directive",
        location: { file: filePath, line: 1 },
        solution: "Add 'use client'; at the top of the file",
        relatedDocs: [
          'https://nextjs.org/docs/getting-started/react-essentials',
        ],
      });
    }

    // Check for SSR data fetch issues
    if (code.includes('localStorage') && !code.includes('useEffect')) {
      this.errors.push({
        id: 'nextjs-002',
        severity: 'major',
        category: 'Next.js',
        message: 'localStorage used outside of useEffect or without "use client"',
        location: { file: filePath, line: 1 },
        solution:
          'Wrap localStorage access in useEffect or add "use client" directive',
      });
    }
  }

  /**
   * Detect React specific errors
   */
  private detectReactErrors(code: string, filePath: string): void {
    // Check for missing key in lists
    if (code.includes('.map(') && !code.includes('key=')) {
      this.errors.push({
        id: 'react-001',
        severity: 'major',
        category: 'React',
        message: 'Missing "key" prop in list rendering',
        location: { file: filePath, line: 1 },
        solution: 'Add unique "key" prop to each element in .map()',
        relatedDocs: ['https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key'],
      });
    }

    // Check for missing hooks dependencies
    if (
      code.includes('useEffect') &&
      !code.includes('useEffect(') + '\\s*\\([^,]*,[^\\]]*\\]'
    ) {
      this.errors.push({
        id: 'react-002',
        severity: 'major',
        category: 'React',
        message: 'useEffect missing dependency array',
        location: { file: filePath, line: 1 },
        solution: 'Add dependency array as second argument to useEffect',
      });
    }
  }

  /**
   * Detect TypeScript errors
   */
  private detectTypeScriptErrors(code: string, filePath: string): void {
    // Check for 'any' type usage
    if (code.includes(': any')) {
      this.errors.push({
        id: 'ts-001',
        severity: 'minor',
        category: 'TypeScript',
        message: 'Type "any" detected - consider using specific types',
        location: { file: filePath, line: 1 },
        solution: 'Replace "any" with specific type definitions',
      });
    }

    // Check for missing return type
    if (code.includes('async function') && !code.includes('Promise')) {
      this.errors.push({
        id: 'ts-002',
        severity: 'minor',
        category: 'TypeScript',
        message: 'Async function missing explicit return type annotation',
        location: { file: filePath, line: 1 },
        solution: 'Add return type: async function name(): Promise<Type> {}',
      });
    }
  }

  /**
   * Detect async/await errors
   */
  private detectAsyncErrors(code: string, filePath: string): void {
    // Check for unhandled promises
    if (code.includes('.then(') && !code.includes('.catch(')) {
      this.errors.push({
        id: 'async-001',
        severity: 'major',
        category: 'Async',
        message: 'Promise chain missing .catch() error handler',
        location: { file: filePath, line: 1 },
        solution: 'Add .catch() handler or use try-catch with async-await',
      });
    }
  }

  /**
   * Format errors for display
   */
  formatErrors(): string {
    let output = '🔍 Error Detection Report\n';
    output += '='.repeat(50) + '\n\n';

    if (this.errors.length === 0) {
      output += '✅ No errors detected!\n';
      return output;
    }

    // Group by severity
    const bySeverity = {
      critical: this.errors.filter((e) => e.severity === 'critical'),
      major: this.errors.filter((e) => e.severity === 'major'),
      minor: this.errors.filter((e) => e.severity === 'minor'),
    };

    if (bySeverity.critical.length > 0) {
      output += '🚨 CRITICAL ERRORS\n';
      bySeverity.critical.forEach((e) => {
        output += `  • ${e.message}\n    Fix: ${e.solution}\n\n`;
      });
    }

    if (bySeverity.major.length > 0) {
      output += '⚠️  MAJOR ISSUES\n';
      bySeverity.major.forEach((e) => {
        output += `  • ${e.message}\n    Fix: ${e.solution}\n\n`;
      });
    }

    if (bySeverity.minor.length > 0) {
      output += '💡 Minor Issues\n';
      bySeverity.minor.forEach((e) => {
        output += `  • ${e.message}\n    Fix: ${e.solution}\n\n`;
      });
    }

    return output;
  }
}

export const errorDetector = new ErrorDetectionAgent();
