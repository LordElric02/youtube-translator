'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'


export default function TranslatePage({ params }) {
  const [targetLanguage, setTargetLanguage] = useState('')
  const [videoId, setVideoId] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

 useEffect(() => {
    setVideoId(params);

}, []); // Dependency array (optional) 

  const handleTranslate = async () => {
    if (!videoId || !targetLanguage) {
      setErrorMessage("Please provide a video ID and select a language.");
      return;
    }
    
    setIsTranslating(true);
    setErrorMessage('');
    try {
      // Call your API to handle the translation process
      // await translateVideo(videoId, targetLanguage);
    } catch (error) {
      setErrorMessage("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  }

  const handleUpload = async () => {
    if (!videoId || !targetLanguage) {
      setErrorMessage("Please provide a video ID and select a language.");
      return;
    }
    
    setIsUploading(true);
    setErrorMessage('');
    try {
      // Call your API to handle the upload process
      // await uploadToYouTube(videoId);
    } catch (error) {
      setErrorMessage("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Translate Video</h1>
      <input
        type="text"
        placeholder="Enter YouTube Video ID"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
        className="mb-4"
      />
      <div className="mb-4">
      <select
     value={targetLanguage}
     onChange={(e) => setTargetLanguage(e.target.value)}
     className="mb-4"
   >
     <option value="">Select target language</option>
     <option value="es">Spanish</option>
     <option value="fro">French</option>
     <option value="de">German</option>
   </select>
   
      </div>
      <Button 
        onClick={handleTranslate} 
        disabled={!targetLanguage || !videoId || isTranslating}
        className="mr-4"
      >
        {isTranslating ? 'Translating...' : 'Translate'}
      </Button>
      <Button 
        onClick={handleUpload} 
        disabled={!targetLanguage || !videoId || isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload to YouTube'}
      </Button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  )
}
