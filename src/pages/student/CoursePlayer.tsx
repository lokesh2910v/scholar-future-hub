
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, PlayCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockCourses, mockEnrollments } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const CoursePlayer = () => {
  const { courseId, videoId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const course = mockCourses.find(c => c.id === courseId);
  const enrollment = mockEnrollments.find(e => e.courseId === courseId);
  
  const [watchedVideos, setWatchedVideos] = useState<string[]>(enrollment?.watchedVideos || []);
  
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

  // Get all videos in order
  const allVideos = course.modules.flatMap(module => 
    module.videos.map(video => ({ ...video, moduleTitle: module.title }))
  );
  
  const currentVideoIndex = allVideos.findIndex(v => v.id === videoId);
  const currentVideo = allVideos[currentVideoIndex];
  const nextVideo = allVideos[currentVideoIndex + 1];
  const prevVideo = allVideos[currentVideoIndex - 1];

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Video not found</h2>
          <Button onClick={() => navigate(`/course/${courseId}`)}>Back to Course</Button>
        </div>
      </div>
    );
  }

  const handleMarkAsWatched = () => {
    if (!watchedVideos.includes(currentVideo.id)) {
      const newWatchedVideos = [...watchedVideos, currentVideo.id];
      setWatchedVideos(newWatchedVideos);
      toast({
        title: "Video marked as watched!",
        description: "Great job! Keep up the learning momentum.",
      });
    }
  };

  const handleNavigation = (video: any) => {
    if (video) {
      navigate(`/course/${courseId}/video/${video.id}`);
    }
  };

  const handleVideoClick = (video: any) => {
    navigate(`/course/${courseId}/video/${video.id}`);
  };

  const isWatched = watchedVideos.includes(currentVideo.id);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeVideoId = getYouTubeVideoId(currentVideo.youtubeUrl);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-black rounded-t-lg">
                  {youtubeVideoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                      className="w-full h-full rounded-t-lg"
                      allowFullScreen
                      title={currentVideo.title}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <p>Invalid video URL</p>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">{currentVideo.title}</h1>
                    {isWatched && (
                      <Badge className="bg-green-500">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Watched
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4">Module: {currentVideo.moduleTitle}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {currentVideo.duration}
                    </div>
                    
                    <Button 
                      onClick={handleMarkAsWatched}
                      disabled={isWatched}
                      className={isWatched ? "bg-green-500" : ""}
                    >
                      {isWatched ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Watched
                        </>
                      ) : (
                        'Mark as Watched'
                      )}
                    </Button>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between mt-6 pt-6 border-t">
                    <Button 
                      variant="outline" 
                      disabled={!prevVideo}
                      className="flex items-center"
                      onClick={() => handleNavigation(prevVideo)}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    
                    <Button 
                      disabled={!nextVideo}
                      className="flex items-center"
                      onClick={() => handleNavigation(nextVideo)}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video List Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {course.modules.map((module) => (
                    <div key={module.id} className="border-b last:border-b-0">
                      <div className="p-4 bg-gray-50">
                        <h4 className="font-medium text-gray-900">{module.title}</h4>
                      </div>
                      {module.videos.map((video) => {
                        const isCurrentVideo = video.id === videoId;
                        const isVideoWatched = watchedVideos.includes(video.id);
                        
                        return (
                          <div
                            key={video.id}
                            className={`p-4 cursor-pointer transition-colors ${
                              isCurrentVideo ? 'bg-blue-50 border-r-4 border-blue-500' : 'hover:bg-gray-50'
                            }`}
                            onClick={() => handleVideoClick(video)}
                          >
                            <div className="flex items-center space-x-3">
                              {isVideoWatched ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <PlayCircle className="w-5 h-5 text-gray-400" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${
                                  isCurrentVideo ? 'text-blue-600' : 'text-gray-900'
                                }`}>
                                  {video.title}
                                </p>
                                <p className="text-xs text-gray-500">{video.duration}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
