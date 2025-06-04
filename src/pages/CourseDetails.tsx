import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Clock, PlayCircle, CheckCircle, User } from 'lucide-react';
import { mockCourses, mockEnrollments } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const course = mockCourses.find(c => c.id === courseId);
  const isEnrolled = mockEnrollments.some(e => e.courseId === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h2>
          <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    toast({
      title: "Enrolled Successfully!",
      description: "You can now access the course content.",
    });
    // Directly navigate to course content
    navigate(`/course/${courseId}`);
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    toast({
      title: "Added to Cart",
      description: "Course has been added to your cart.",
    });
    // Navigate to cart
    navigate('/cart');
  };

  const totalVideos = course.modules.reduce((total, module) => total + module.videos.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-4 right-4 bg-blue-600">
                  {course.category}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-lg font-semibold">{course.rating}</span>
                      <span className="text-gray-500 ml-2">({course.students} students)</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    ${course.price}
                  </div>
                </div>
                
                <CardTitle className="text-3xl text-gray-900">{course.title}</CardTitle>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>by {course.instructor}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {course.description}
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <Clock className="w-6 h-6 mx-auto text-gray-600 mb-2" />
                    <div className="font-semibold">{course.duration}</div>
                    <div className="text-sm text-gray-600">Total Duration</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <PlayCircle className="w-6 h-6 mx-auto text-gray-600 mb-2" />
                    <div className="font-semibold">{totalVideos}</div>
                    <div className="text-sm text-gray-600">Videos</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 mx-auto text-gray-600 mb-2" />
                    <div className="font-semibold">{course.modules.length}</div>
                    <div className="text-sm text-gray-600">Modules</div>
                  </div>
                </div>

                {isEnrolled ? (
                  <Button 
                    onClick={() => navigate(`/course/${courseId}`)} 
                    className="flex-1" 
                    size="lg"
                  >
                    Continue Learning
                  </Button>
                ) : (user?.role === 'student' || !user) ? (
                  <div className="flex space-x-4">
                    <Button onClick={handleEnroll} className="flex-1" size="lg">
                      Enroll Now
                    </Button>
                    <Button onClick={handleAddToCart} variant="outline" size="lg">
                      Add to Cart
                    </Button>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <div key={module.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        Module {index + 1}: {module.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{module.description}</p>
                      
                      <div className="space-y-2">
                        {module.videos.map((video, videoIndex) => (
                          <div key={video.id} className="flex items-center space-x-3 py-2">
                            <PlayCircle className="w-5 h-5 text-gray-400" />
                            <span className="flex-1">{video.title}</span>
                            <span className="text-sm text-gray-500">{video.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Course Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Access on mobile and TV</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
