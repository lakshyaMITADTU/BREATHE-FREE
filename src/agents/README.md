# Custom Code Agents Documentation

Your custom code agent system is designed to help you write better code, find errors early, and maintain code quality. Here's how to use it.

## Overview

The agent system consists of three main components:

### 1. **Code Analyzer Agent** (`codeAnalyzer.ts`)
- Detects unused variables
- Identifies missing type annotations
- Spots console statements for production
- Checks async/await patterns

### 2. **Error Detection Agent** (`errorDetector.ts`)
- Identifies Next.js specific errors
- Detects React-specific issues (missing keys, hooks problems)
- Catches TypeScript errors
- Finds unhandled promises

### 3. **Agent Coordinator** (`index.ts`)
- Orchestrates all agents
- Generates comprehensive reports
- Provides personalized recommendations

---

## Quick Start

### Basic Usage

```typescript
import { codeAgent } from '@/agents';

// Analyze code
const report = codeAgent.analyzeCode(codeString, 'path/to/file.tsx');

// Generate full report
console.log(codeAgent.generateFullReport(report));
```

### Analyze a File

```typescript
import { analyzeFile } from '@/agents/examples';

analyzeFile('src/components/MyComponent.tsx');
```

### Analyze Entire Directory

```typescript
import { analyzeDirectory } from '@/agents/examples';

analyzeDirectory('src/components');
```

### Watch Mode (Real-time Analysis)

```typescript
import { watchDirectory } from '@/agents/examples';

watchDirectory('src');
```

---

## Integration Examples

### 1. In Next.js API Route

```typescript
// app/api/analyze/route.ts
import { codeAgent } from '@/agents';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { code, filePath } = await request.json();

  const report = codeAgent.analyzeCode(code, filePath);

  return NextResponse.json({
    success: true,
    report: codeAgent.generateFullReport(report),
  });
}
```

### 2. In React Component

```typescript
// components/CodeAnalyzer.tsx
'use client';

import { codeAgent } from '@/agents';
import { useState } from 'react';

export function CodeAnalyzer() {
  const [code, setCode] = useState('');
  const [report, setReport] = useState('');

  const handleAnalyze = () => {
    const result = codeAgent.analyzeCode(code, 'inline-code');
    setReport(codeAgent.generateFullReport(result));
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
      />
      <button onClick={handleAnalyze}>Analyze</button>
      <pre>{report}</pre>
    </div>
  );
}
```

### 3. CLI Tool

```typescript
// scripts/analyze.ts
import { analyzeDirectory } from '@/agents/examples';

const dirPath = process.argv[2] || 'src';
analyzeDirectory(dirPath);
```

Run with:
```bash
npx ts-node scripts/analyze.ts src/components
```

---

## Understanding Reports

Reports contain:

### 📈 Code Quality Section
- Summary of issues found
- Suggestions for improvement

### 🔍 Error Detection Section
- Critical errors (must fix)
- Major issues (should fix)
- Minor issues (nice to fix)
- Error solutions and documentation links

### 💡 Recommendations
- Personalized suggestions based on your code
- Best practices reminders
- Next steps to improve quality

---

## Agent Capabilities

### Detects

✅ Unused variables and imports  
✅ Missing type annotations  
✅ Console statements (for cleanup)  
✅ Async/await issues  
✅ Missing "use client" directive in Next.js  
✅ localStorage usage errors  
✅ Missing React keys  
✅ Unhandled promises  
✅ "Any" type usage  
✅ Missing error handlers  

### Provides

✅ Specific error messages  
✅ Clear solutions  
✅ Documentation links  
✅ Priority levels (critical/major/minor)  
✅ Categorized issues  
✅ Actionable recommendations  

---

## Configuration

To customize agent behavior, edit the detection methods in:
- `src/agents/codeAnalyzer.ts`
- `src/agents/errorDetector.ts`

Example: Adding a new check

```typescript
// In codeAnalyzer.ts
private checkMyCustomRule(code: string): void {
  if (somePattern.test(code)) {
    this.issues.push({
      type: 'warning',
      message: 'Your custom message',
      suggestion: 'How to fix it',
    });
  }
}

// Call in analyzeTypeScript()
private analyzeTypeScript(code: string, filePath: string) {
  this.issues = [];
  // ... other checks ...
  this.checkMyCustomRule(code);  // Add your check
  return { /* ... */ };
}
```

---

## Best Practices

1. **Regular Analysis**: Run agent analysis after major changes
2. **Fix Critical Issues First**: Prioritize errors by severity
3. **Use Recommendations**: Follow the agent's suggestions
4. **Watch Mode**: Enable during development for continuous feedback
5. **Pre-commit Hooks**: Integrate with git hooks to catch issues before commits

---

## Troubleshooting

**No issues found, but code seems wrong?**
- Agents use pattern matching; complex patterns may not be detected
- Run manual code review in addition
- Add custom checks for your specific needs

**Too many false positives?**
- Adjust detection patterns in the agent files
- Disable specific checks if not relevant

**Want different analysis?**
- Modify `generateRecommendations()` in `index.ts`
- Add new agent classes following the same pattern

---

## Next Steps

1. ✅ Import agents in your components
2. ✅ Set up analysis in your workflow
3. ✅ Configure custom checks if needed
4. ✅ Integrate into CI/CD pipeline

Happy coding! 🚀
