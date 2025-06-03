
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, PlayCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockCourses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const CoursePlayer = () => {
  const { courseId, videoId } = useParams();
  const { toast } = useToast();
  const [watchedVideos, setWatchedVideos] = useState<string[]>(['v1']);
  
  const course = mockCourses.find(c => c.id === courseId);
  
  if (!course) {
    return <div>Course not found</div>;
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
    return <div>Video not found</div>;
  }

  const handleMarkAsWatched = () => {
    if (!watchedVideos.includes(currentVideo.id)) {
      setWatchedVideos([...watchedVideos, currentVideo.id]);
      toast({
        title: "Video marked as watched!",
        description: "Great job! Keep up the learning momentum.",
      });
    }
  };

  const isWatched = watchedVideos.includes(currentVideo.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-black rounded-t-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideo.youtubeUrl.split('v=')[1]}`}
                    className="w-full h-full rounded-t-lg"
                    allowFullScreen
                    title={currentVideo.title}
                  />
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
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    
                    <Button 
                      disabled={!nextVideo}
                      className="flex items-center"
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
