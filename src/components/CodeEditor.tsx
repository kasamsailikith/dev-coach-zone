import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Save, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CodeIssue {
  line: number;
  type: 'error' | 'warning' | 'info';
  message: string;
}

export const CodeEditor = () => {
  const [code, setCode] = useState(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`);

  const [issues, setIssues] = useState<CodeIssue[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');

  // Simple code analysis
  useEffect(() => {
    const analyzeCode = () => {
      const newIssues: CodeIssue[] = [];
      const lines = code.split('\n');

      lines.forEach((line, index) => {
        // Check for common issues
        if (line.includes('var ')) {
          newIssues.push({
            line: index + 1,
            type: 'warning',
            message: 'Consider using const or let instead of var'
          });
        }
        if (line.includes('console.log') && !line.includes('//')) {
          newIssues.push({
            line: index + 1,
            type: 'info',
            message: 'Remember to remove console.log in production'
          });
        }
        if (line.trim().endsWith(';') === false && line.trim() && !line.includes('{') && !line.includes('}')) {
          newIssues.push({
            line: index + 1,
            type: 'error',
            message: 'Missing semicolon'
          });
        }
      });

      setIssues(newIssues);
    };

    const timeout = setTimeout(analyzeCode, 500);
    return () => clearTimeout(timeout);
  }, [code]);

  const runCode = async () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput('55\n// Fibonacci sequence calculated successfully!');
      setIsRunning(false);
    }, 1000);
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="w-4 h-4 text-error" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'info': return <CheckCircle2 className="w-4 h-4 text-accent" />;
      default: return null;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'error': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Code Editor */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
              Code Editor
            </h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setCode('')}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear
              </Button>
              <Button size="sm" variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button 
                size="sm" 
                onClick={runCode} 
                disabled={isRunning}
                className="bg-gradient-primary hover:bg-primary-hover"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
            </div>
          </div>
          <div className="p-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[400px] font-mono text-sm bg-code-bg text-code-foreground border-code-border resize-none"
              placeholder="Write your code here..."
            />
          </div>
        </Card>

        {/* Output Panel */}
        <Card>
          <div className="p-4 border-b">
            <h4 className="font-medium">Output</h4>
          </div>
          <div className="p-4">
            <pre className="bg-code-bg text-code-foreground p-4 rounded-lg text-sm font-mono">
              {output || 'Run your code to see the output...'}
            </pre>
          </div>
        </Card>
      </div>

      {/* Analysis Panel */}
      <div className="space-y-4">
        <Card>
          <div className="p-4 border-b">
            <h4 className="font-medium flex items-center gap-2">
              Code Analysis
              <Badge variant={issues.length > 0 ? "destructive" : "default"}>
                {issues.length} issues
              </Badge>
            </h4>
          </div>
          <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
            {issues.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-success" />
                <p>No issues found!</p>
                <p className="text-sm">Your code looks good.</p>
              </div>
            ) : (
              issues.map((issue, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  {getIssueIcon(issue.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getIssueColor(issue.type) as any} className="text-xs">
                        Line {issue.line}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {issue.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground">{issue.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Quick Tips */}
        <Card>
          <div className="p-4 border-b">
            <h4 className="font-medium">💡 Quick Tips</h4>
          </div>
          <div className="p-4 space-y-2">
            <div className="text-sm">
              <p className="font-medium text-accent">Tip:</p>
              <p className="text-muted-foreground">Use meaningful variable names to make your code more readable.</p>
            </div>
            <div className="text-sm">
              <p className="font-medium text-accent">Best Practice:</p>
              <p className="text-muted-foreground">Always handle edge cases in your functions.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};