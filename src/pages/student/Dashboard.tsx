
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, Clock, TrendingUp, Eye } from 'lucide-react';
import { mockEnrollments, mockCourses } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const userEnrollments = mockEnrollments;
  const enrolledCourses = userEnrollments.map(enrollment => {
    const course = mockCourses.find(c => c.id === enrollment.courseId);
    return { ...course, ...enrollment };
  });

  const stats = {
    totalCourses: userEnrollments.length,
    completedCourses: userEnrollments.filter(e => e.completed).length,
    inProgress: userEnrollments.filter(e => !e.completed).length,
    totalHours: 25 // Mock data
  };

  const handleContinueLearning = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleViewDetails = (courseId: string) => {
    navigate(`/course-details/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your learning journey and achieve your goals.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">
                Enrolled courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedCourses}</div>
              <p className="text-xs text-muted-foreground">
                Courses completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground">
                Active courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHours}</div>
              <p className="text-xs text-muted-foreground">
                Hours this month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Continue Learning
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/my-learning">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {enrolledCourses.slice(0, 3).map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        by {course.instructor}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="mt-1" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {course.completed ? (
                        <div className="flex gap-2">
                          <Badge variant="secondary">Completed</Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewDetails(course.courseId || course.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleContinueLearning(course.courseId || course.id)}>
                            Continue
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewDetails(course.courseId || course.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {enrolledCourses.length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No courses yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start your learning journey by enrolling in a course.
                    </p>
                    <Button asChild>
                      <Link to="/courses">Browse Courses</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/courses">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Courses
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/my-learning">
                    <Clock className="w-4 h-4 mr-2" />
                    My Learning
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/student/profile">
                    <Trophy className="w-4 h-4 mr-2" />
                    View Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Achievement Badge */}
            <Card>
              <CardHeader>
                <CardTitle>Achievement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Learning Streak</h3>
                  <p className="text-sm text-gray-600">
                    You've been learning for 5 days in a row! Keep it up!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
