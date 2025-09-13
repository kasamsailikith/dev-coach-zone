import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  code?: string;
  completed: boolean;
}

export const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const tutorial = {
    title: "JavaScript Fundamentals: Functions & Scope",
    description: "Learn the basics of functions, parameters, and variable scope in JavaScript",
    totalSteps: 5,
    estimatedTime: "20 min"
  };

  const steps: TutorialStep[] = [
    {
      id: '1',
      title: 'What are Functions?',
      content: 'Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.',
      code: `function greet(name) {
  return "Hello, " + name + "!";
}`,
      completed: true
    },
    {
      id: '2',
      title: 'Function Parameters',
      content: 'Parameters are variables that accept values when the function is called. They make functions flexible and reusable.',
      code: `function add(a, b) {
  return a + b;
}

console.log(add(5, 3)); // Output: 8`,
      completed: true
    },
    {
      id: '3',
      title: 'Return Values',
      content: 'Functions can return values using the return statement. This allows functions to produce output that can be used elsewhere.',
      code: `function multiply(x, y) {
  return x * y;
}

const result = multiply(4, 6);
console.log(result); // Output: 24`,
      completed: false
    },
    {
      id: '4',
      title: 'Variable Scope',
      content: 'Scope determines where variables can be accessed in your code. Variables declared inside functions have local scope.',
      code: `let globalVar = "I'm global";

function scopeExample() {
  let localVar = "I'm local";
  console.log(globalVar); // ✓ Accessible
  console.log(localVar);  // ✓ Accessible
}`,
      completed: false
    },
    {
      id: '5',
      title: 'Practice Exercise',
      content: 'Now it\'s your turn! Create a function that calculates the area of a rectangle.',
      code: `// Your task: Complete this function
function calculateArea(length, width) {
  // Write your code here
  
}

// Test your function
console.log(calculateArea(5, 10)); // Should output: 50`,
      completed: false
    }
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const markComplete = () => {
    steps[currentStep].completed = true;
    // In a real app, this would update the state properly
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Tutorial Header */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{tutorial.title}</h2>
              <p className="opacity-90">{tutorial.description}</p>
            </div>
            <Badge variant="secondary" className="text-primary">
              {tutorial.estimatedTime}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm opacity-90">
              <span>Progress: {completedSteps}/{tutorial.totalSteps} completed</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-primary-foreground/20" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Step Navigation */}
        <Card className="lg:col-span-1">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Tutorial Steps</h3>
          </div>
          <div className="p-4 space-y-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-smooth ${
                  currentStep === index 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
              >
                {step.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
                <div>
                  <div className="font-medium text-sm">Step {index + 1}</div>
                  <div className="text-xs opacity-75">{step.title}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Step {currentStep + 1}: {steps[currentStep].title}
                  </h3>
                  <Badge variant="outline">
                    {currentStep + 1} of {steps.length}
                  </Badge>
                </div>
                {!steps[currentStep].completed && (
                  <Button onClick={markComplete} variant="outline" size="sm">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Mark Complete
                  </Button>
                )}
              </div>

              <div className="prose prose-sm max-w-none mb-6">
                <p className="text-muted-foreground leading-relaxed">
                  {steps[currentStep].content}
                </p>
              </div>

              {steps[currentStep].code && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Code Example:</h4>
                    <Button variant="outline" size="sm">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Try it
                    </Button>
                  </div>
                  <pre className="bg-code-bg text-code-foreground p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm font-mono">{steps[currentStep].code}</code>
                  </pre>
                </div>
              )}
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              onClick={prevStep} 
              disabled={currentStep === 0}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button 
              onClick={nextStep} 
              disabled={currentStep === steps.length - 1}
              className="bg-gradient-primary hover:bg-primary-hover"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};