
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { mockCourses } from '@/data/mockData';

const AddVideo = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [videoData, setVideoData] = useState({
    title: '',
    youtubeUrl: '',
    duration: ''
  });

  const course = mockCourses.find(c => c.id === courseId);
  const module = course?.modules.find(m => m.id === moduleId);

  if (!course || !module) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course or Module not found</h2>
          <Button onClick={() => navigate('/educator/courses')}>Back to My Courses</Button>
        </div>
      </div>
    );
  }

  const validateYouTubeUrl = (url: string) => {
    const regex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return regex.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoData.title.trim()) {
      toast({
        title: "Error",
        description: "Video title is required.",
        variant: "destructive"
      });
      return;
    }

    if (!videoData.youtubeUrl.trim()) {
      toast({
        title: "Error",
        description: "YouTube URL is required.",
        variant: "destructive"
      });
      return;
    }

    if (!validateYouTubeUrl(videoData.youtubeUrl)) {
      toast({
        title: "Error",
        description: "Please enter a valid YouTube URL.",
        variant: "destructive"
      });
      return;
    }

    if (!videoData.duration.trim()) {
      toast({
        title: "Error",
        description: "Video duration is required.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically submit to backend
    console.log('Creating video:', videoData);
    
    toast({
      title: "Video added!",
      description: "Your video has been added to the module.",
    });
    
    navigate(`/educator/courses/${courseId}`);
  };

  const handleChange = (field: string, value: string) => {
    setVideoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Add Video</h1>
          <p className="text-gray-600">Add a new video to "{module.title}" in "{course.title}"</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Video Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Video Title *</Label>
                <Input
                  id="title"
                  value={videoData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter video title"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="youtubeUrl">YouTube URL *</Label>
                <Input
                  id="youtubeUrl"
                  type="url"
                  value={videoData.youtubeUrl}
                  onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter the complete YouTube video URL
                </p>
              </div>

              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={videoData.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                  placeholder="e.g., 10:30"
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Format: MM:SS (e.g., 10:30 for 10 minutes 30 seconds)
                </p>
              </div>

              {videoData.youtubeUrl && validateYouTubeUrl(videoData.youtubeUrl) && (
                <div>
                  <Label>Preview</Label>
                  <div className="mt-2 aspect-video w-full max-w-md">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoData.youtubeUrl.split('v=')[1]?.split('&')[0]}`}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                      title="Video preview"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(`/educator/courses/${courseId}`)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Add Video
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddVideo;
