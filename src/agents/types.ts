/**
 * Type definitions for Code Agents
 */

export type SeverityLevel = 'critical' | 'major' | 'minor';
export type IssueType = 'error' | 'warning' | 'info';
export type CategoryType =
  | 'Next.js'
  | 'React'
  | 'TypeScript'
  | 'Async'
  | 'General';

export interface CodeIssue {
  type: IssueType;
  message: string;
  line?: number;
  suggestion?: string;
}

export interface AnalysisResult {
  file: string;
  issues: CodeIssue[];
  summary: string;
}

export interface ErrorDetails {
  id: string;
  severity: SeverityLevel;
  category: CategoryType;
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

export interface AgentReport {
  file: string;
  analysis: AnalysisResult;
  errors: ErrorReport;
  recommendations: string[];
}

export interface AgentConfig {
  enableTypeChecks: boolean;
  enableReactChecks: boolean;
  enableNextJsChecks: boolean;
  enableAsyncChecks: boolean;
  strictMode: boolean;
  customRules?: Array<{
    name: string;
    pattern: RegExp;
    message: string;
    suggestion?: string;
  }>;
}

export interface AgentCallback {
  onIssueFound?: (issue: CodeIssue | ErrorDetails) => void;
  onAnalysisComplete?: (report: AgentReport) => void;
  onError?: (error: Error) => void;
}
