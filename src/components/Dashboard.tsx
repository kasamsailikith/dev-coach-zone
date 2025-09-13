import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Code, 
  Calendar, 
  Award,
  Clock,
  Brain
} from "lucide-react";

export const Dashboard = () => {
  const stats = {
    exercisesCompleted: 12,
    totalExercises: 50,
    tutorialsFinished: 3,
    totalTutorials: 15,
    streakDays: 7,
    codeLines: 1247,
    skillLevel: "Intermediate",
    weeklyGoal: 5,
    weeklyProgress: 3
  };

  const recentActivity = [
    { type: 'exercise', title: 'Two Sum Problem', time: '2 hours ago', status: 'completed' },
    { type: 'tutorial', title: 'JavaScript Functions', time: '1 day ago', status: 'completed' },
    { type: 'exercise', title: 'Binary Tree Traversal', time: '2 days ago', status: 'in-progress' },
    { type: 'tutorial', title: 'Array Methods', time: '3 days ago', status: 'completed' },
  ];

  const achievements = [
    { title: 'First Steps', description: 'Complete your first exercise', earned: true },
    { title: 'Week Warrior', description: '7-day coding streak', earned: true },
    { title: 'Problem Solver', description: 'Complete 10 exercises', earned: true },
    { title: 'Code Master', description: 'Complete 50 exercises', earned: false },
  ];

  const skillProgress = [
    { skill: 'JavaScript', progress: 75, level: 'Advanced' },
    { skill: 'Algorithms', progress: 60, level: 'Intermediate' },
    { skill: 'Data Structures', progress: 45, level: 'Beginner' },
    { skill: 'Problem Solving', progress: 80, level: 'Advanced' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Welcome back! 👋</h2>
          <p className="text-muted-foreground">Ready to continue your coding journey?</p>
        </div>
        <Badge className="bg-gradient-primary text-primary-foreground">
          {stats.skillLevel} Level
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-success-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.exercisesCompleted}</div>
              <div className="text-sm text-muted-foreground">Exercises Completed</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.tutorialsFinished}</div>
              <div className="text-sm text-muted-foreground">Tutorials Finished</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-warning-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.streakDays}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.codeLines}</div>
              <div className="text-sm text-muted-foreground">Lines of Code</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress */}
        <Card className="lg:col-span-2">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Weekly Progress
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Weekly Goal</div>
                <div className="text-sm text-muted-foreground">
                  {stats.weeklyProgress} of {stats.weeklyGoal} exercises completed
                </div>
              </div>
              <Badge variant="outline">
                {Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}%
              </Badge>
            </div>
            <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="h-3" />
            
            <div className="pt-4 space-y-3">
              <h4 className="font-medium">Skill Progress</h4>
              {skillProgress.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{skill.skill}</span>
                    <Badge variant="outline" className="text-xs">
                      {skill.level}
                    </Badge>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card>
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <Award className="w-5 h-5" />
              Achievements
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  achievement.earned ? 'bg-success/10' : 'bg-muted/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement.earned ? 'bg-success text-success-foreground' : 'bg-muted'
                }`}>
                  <Award className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{achievement.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {achievement.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="p-4 border-b">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </h3>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  {activity.type === 'exercise' ? (
                    <Target className="w-4 h-4 text-primary" />
                  ) : (
                    <BookOpen className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{activity.title}</div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
                <Badge 
                  variant={activity.status === 'completed' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {activity.status === 'completed' ? 'Completed' : 'In Progress'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <div className="p-4 border-b">
          <h3 className="font-semibold">Continue Learning</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex-col gap-2">
              <Brain className="w-6 h-6" />
              <div className="text-center">
                <div className="font-medium">Practice Exercise</div>
                <div className="text-xs opacity-75">Continue where you left off</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <BookOpen className="w-6 h-6" />
              <div className="text-center">
                <div className="font-medium">Start Tutorial</div>
                <div className="text-xs opacity-75">Learn something new</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Code className="w-6 h-6" />
              <div className="text-center">
                <div className="font-medium">Open Editor</div>
                <div className="text-xs opacity-75">Start coding now</div>
              </div>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};