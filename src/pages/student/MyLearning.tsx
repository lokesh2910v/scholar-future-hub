
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, CheckCircle, ArrowRight, Eye } from 'lucide-react';
import { mockCourses, mockEnrollments } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyLearning = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock enrolled courses for current user
  const enrolledCourses = mockEnrollments.map(enrollment => {
    const course = mockCourses.find(c => c.id === enrollment.courseId);
    return { ...course, ...enrollment };
  });

  const currentCourses = enrolledCourses.filter(course => !course.completed);
  const completedCourses = enrolledCourses.filter(course => course.completed);

  const handleContinueLearning = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleReviewCourse = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleViewDetails = (courseId: string) => {
    navigate(`/course-details/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Learning</h1>
          <p className="text-gray-600">Track your progress and continue learning</p>
        </div>

        {/* Current Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
            Current Courses ({currentCourses.length})
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-blue-500">
                    In Progress
                  </Badge>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <p className="text-sm text-gray-600">by {course.instructor}</p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleContinueLearning(course.courseId || course.id)}
                      >
                        Continue Learning
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => handleViewDetails(course.courseId || course.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {currentCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No current courses</h3>
              <p className="text-gray-600 mb-4">Start learning by enrolling in a course</p>
              <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
            </div>
          )}
        </div>

        {/* Completed Courses */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
            Completed Courses ({completedCourses.length})
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500">
                    Completed
                  </Badge>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <p className="text-sm text-gray-600">by {course.instructor}</p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        100%
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleReviewCourse(course.courseId || course.id)}
                      >
                        Review Course
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => handleViewDetails(course.courseId || course.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLearning;
