import { useState } from "react";
import { Header } from "@/components/Header";
import { CodeEditor } from "@/components/CodeEditor";
import { ExerciseLibrary } from "@/components/ExerciseLibrary";
import { Tutorial } from "@/components/Tutorial";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'editor':
        return <CodeEditor />;
      case 'exercises':
        return <ExerciseLibrary />;
      case 'tutorials':
        return <Tutorial />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
