
import ReactPlayer from 'react-player';
import React, { useState, useEffect, useRef } from 'react';
import "./Landing_page.css"
import { Button, Box, CardActionArea, CardActions } from '@mui/material';
import Drag_btn from './Drag_btn';
import incidents from './IncidentData';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const Landing_page = () => {

  const [processing, setProcessing] = useState(false);
  const [incident, setIncident] = useState([]);
  const [videoUrl, setVideoUrl] = useState("Video_cctv.mp4");
  const videoRef = useRef(null);
  const [timestamp, setTimestamp] = useState(0);
  // useEffect(() => {
  //   // When the component mounts or when a new video is selected, play the video
  //   videoRef.current.play();
  // }, [videoUrl]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  const handle_reset = () => {
    setIncident([]);
    setVideoUrl("Video_cctv.mp4");
  }

  const handleExamine = () => {
    setProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      setProcessing(false);
      setIncident(incidents)
    }, 6000); // Simulated processing time of 3 seconds
  };

  const handleDrop = (file, e) => {
    console.log(file, "testing")
    const file2 = file
    console.log(file2)
    if (!file2) return;

    const blob_url = URL.createObjectURL(file);
    console.log(blob_url)
    let parts = blob_url.split(":")
    let url = blob_url.substring(5, blob_url.length)
    for (let i = 1; i < parts.length; i++) { url += parts[i] }
    setVideoUrl(blob_url);

  };
  console.log(videoUrl + "url")
  console.log(incident)
  // Function to reset the selected video and play the original video

  const handleTimestampChange = (event) => {
    const newTimestamp = parseInt(event.target.value, 10);
    setTimestamp(newTimestamp);
  };
  const seekToTimestamp = (sec) => {
    if (videoRef.current) {
      videoRef.current.seekTo(sec, 'seconds');
      videoRef.current.autoPlay;
    }
  };
  return (
    <>
      <div className="landing_page_container">
        <div className="landing_page_navbar">
          <div className="logo_name">VideoAnalytics</div>
          <Button variant="contained">Get Started</Button>
        </div>
        <div className="landing_page_hero">
          <div className="sidebar">
            <h2 className="sidebar-heading">ByteIQ Analytics</h2>
            <ul className="sidebar-options">
              <Box display="flex" flexDirection="column" gap="2vw" paddingTop={"5vw"}>
                <Drag_btn onDrop={handleDrop} />
                {/* <div className="drop_down_custom">
                  <img src="./drag.jpg" className="drag_drop_image"/>
                  <div>or</div>
                  <div className="drag_button">
                    <div className="drag_text">Upload</div>
                     <CloudUploadIcon /> 
                  </div>
                </div> */}
              
                <Button variant="outlined" sx={{ width: '100%' }} onClick={handleExamine}>Examine</Button>
                <Button variant="outlined" sx={{ width: '100%' }} onClick={handle_reset}>Reset</Button>


              </Box>
            </ul>
          </div>
          <div className="video_container_wrapper">
            <div className="video_container">
              <div className="video_container_image_wrapper">
                {processing && (
                  <div className="loader-overlay">
                    <div className="loader">
                      <div className="loader-inner">
                        <div className="loader-line-wrap">
                          <div className="loader-line"></div>
                        </div>
                        <div className="loader-line-wrap">
                          <div className="loader-line"></div>
                        </div>
                        <div className="loader-line-wrap">
                          <div className="loader-line"></div>
                        </div>
                        <div className="loader-line-wrap">
                          <div className="loader-line"></div>
                        </div>
                        <div className="loader-line-wrap">
                          <div className="loader-line"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* <video ref={videoRef} className="video_container_image" autoPlay loop muted controlsList="nodownload">
          
            <source src={videoUrl} type="video/mp4" />
          
          Your browser does not support the video tag.
        </video> */}

                <ReactPlayer
                  ref={videoRef}
                  className="video_container_image"
                  url={videoUrl}

                  width="100%"
                  height="auto"
                  controlsList="nodownload"
                  autoPlay
                  loop
                  muted
                  controls

                />
              </div>
              <div className="video_container_button">
                <label htmlFor="upload-video" style={{ display: 'inline-block' }}>
                  <input
                    id="upload-video"
                    type="file"
                    accept="video/*"
                    style={{ display: 'none' }}
                  />


                </label>
              </div>

            </div>

            <div style={{ overflowY: 'scroll', maxHeight: '100px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className="footage_process">
              {incident.map((incident, index) => (
                <div key={index} className="incident_list" onClick={() => { seekToTimestamp(Object.values(incident)) }}>

                  <span className="event_heading">{Object.keys(incident)}</span>  <span className="event_time" onClick={() => { seekToTimestamp(Object.values(incident)) }}>
                    {formatTime(Object.values(incident))}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Landing_page;
