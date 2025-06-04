import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, PlayCircle, Clock, Users, Star, Edit, Trash2 } from 'lucide-react';
import { mockCourses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h2>
          <Button onClick={() => navigate('/educator/courses')}>Back to My Courses</Button>
        </div>
      </div>
    );
  }

  const handleDeleteModule = (moduleId: string) => {
    toast({
      title: "Module deleted",
      description: "The module has been removed from the course.",
    });
  };

  const handleDeleteVideo = (videoId: string) => {
    toast({
      title: "Video deleted", 
      description: "The video has been removed from the module.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-start space-x-6">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-64 h-40 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="outline">{course.duration}</Badge>
                <Badge variant="outline">${course.price}</Badge>
                <Badge className={course.approved ? "bg-green-500" : "bg-yellow-500"}>
                  {course.approved ? 'Approved' : 'Pending Review'}
                </Badge>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {course.students} students
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={() => navigate(`/educator/courses/${courseId}/add-module`)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
                <Button variant="outline" onClick={() => navigate(`/educator/courses/${courseId}/edit`)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Course
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div className="space-y-6">
          {course.modules.length > 0 ? course.modules.map((module, moduleIndex) => (
            <Card key={module.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Module {moduleIndex + 1}: {module.title}</CardTitle>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => navigate(`/educator/courses/${courseId}/modules/${module.id}/add-video`)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Video
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/educator/courses/${courseId}/modules/${module.id}/edit`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteModule(module.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600">{module.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {module.videos.length > 0 ? module.videos.map((video, videoIndex) => (
                    <div 
                      key={video.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-white"
                    >
                      <div className="flex items-center space-x-3">
                        <PlayCircle className="w-6 h-6 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{video.title}</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {video.duration}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteVideo(video.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )) : (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <PlayCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No videos yet</h3>
                      <p className="text-gray-600 mb-4">Add your first video to this module</p>
                      <Button onClick={() => navigate(`/educator/courses/${courseId}/modules/${module.id}/add-video`)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Video
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )) : (
            <Card>
              <CardContent className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Plus className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No modules yet</h3>
                <p className="text-gray-600 mb-6">Start building your course by adding the first module</p>
                <Button onClick={() => navigate(`/educator/courses/${courseId}/add-module`)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Module
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
