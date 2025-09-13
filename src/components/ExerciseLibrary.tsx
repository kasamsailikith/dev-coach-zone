import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Star, CheckCircle2, ArrowRight, Filter } from "lucide-react";

interface Exercise {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  description: string;
  estimatedTime: string;
  rating: number;
  completed: boolean;
  progress: number;
}

export const ExerciseLibrary = () => {
  const exercises: Exercise[] = [
    {
      id: '1',
      title: 'Two Sum Problem',
      difficulty: 'beginner',
      category: 'Arrays',
      description: 'Find two numbers in an array that add up to a target sum.',
      estimatedTime: '15 min',
      rating: 4.5,
      completed: true,
      progress: 100
    },
    {
      id: '2',
      title: 'Binary Tree Traversal',
      difficulty: 'intermediate',
      category: 'Trees',
      description: 'Implement in-order, pre-order, and post-order tree traversal.',
      estimatedTime: '30 min',
      rating: 4.2,
      completed: false,
      progress: 60
    },
    {
      id: '3',
      title: 'Dynamic Programming: Fibonacci',
      difficulty: 'intermediate',
      category: 'Dynamic Programming',
      description: 'Optimize the fibonacci sequence using dynamic programming.',
      estimatedTime: '25 min',
      rating: 4.8,
      completed: false,
      progress: 0
    },
    {
      id: '4',
      title: 'Graph Algorithms: DFS & BFS',
      difficulty: 'advanced',
      category: 'Graphs',
      description: 'Implement depth-first and breadth-first search algorithms.',
      estimatedTime: '45 min',
      rating: 4.7,
      completed: false,
      progress: 0
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success text-success-foreground';
      case 'intermediate': return 'bg-warning text-warning-foreground';
      case 'advanced': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const categories = [...new Set(exercises.map(ex => ex.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Exercise Library</h2>
          <p className="text-muted-foreground">Practice coding with curated challenges</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="default" className="cursor-pointer">All</Badge>
        {categories.map(category => (
          <Badge key={category} variant="outline" className="cursor-pointer hover:bg-accent">
            {category}
          </Badge>
        ))}
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="group hover:shadow-lg transition-smooth cursor-pointer">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                      {exercise.difficulty}
                    </Badge>
                    {exercise.completed && (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{exercise.title}</h3>
                  <Badge variant="outline" className="text-xs mb-3">
                    {exercise.category}
                  </Badge>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {exercise.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {exercise.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{exercise.rating}</span>
                  </div>
                </div>

                {exercise.progress > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{exercise.progress}%</span>
                    </div>
                    <Progress value={exercise.progress} className="h-2" />
                  </div>
                )}

                <Button 
                  className="w-full group-hover:bg-gradient-primary transition-smooth"
                  variant={exercise.completed ? "outline" : "default"}
                >
                  {exercise.completed ? 'Review' : exercise.progress > 0 ? 'Continue' : 'Start'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Exercises
        </Button>
      </div>
    </div>
  );
};