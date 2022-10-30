import * as React from 'react';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useVideoContext } from "./context"

const VOLUME_INDICATOR = {
    mute: VolumeOffIcon,
    minimun: VolumeMuteIcon,
    down: VolumeDownIcon,
    up: VolumeUpIcon
}

export default function EpisodeVolumeController() {
    const { videoRef } = useVideoContext();
    const [showBar, setShowBar] = React.useState(false);
    const [videoVolume, setVideoVolume] = React.useState(.5);
    
    const volumePercentage = videoVolume * 100;
    const isMuted =  volumePercentage === 0;
    const isMinimun = volumePercentage >= 1 && volumePercentage < 50;
    const isDown = volumePercentage >= 50 && volumePercentage < 80;
    const volumeLevel = isMuted ? 'mute' : isMinimun ? 'minimun' : isDown ? 'down' : 'up' 

    function toggleMute() {
        if (videoVolume) {
            setVideoVolume(0);
            videoRef.current.volume = 0;
            return;
        }

        setVideoVolume(1);
        videoRef.current.volume = 1;
    }

    function onChange(event) {
        const newValue = event.target.value / 100;
        setVideoVolume(newValue);
        videoRef.current.volume = newValue;
    }

    function toggleBar() {
        setShowBar(!showBar);
    }

    const Icon = VOLUME_INDICATOR[volumeLevel];

    return (
        <div 
            onMouseEnter={toggleBar} 
            onMouseLeave={toggleBar}
            className="volume-bar"
        >
            <button>
                <Icon className="icon" onClick={toggleMute} />
            </button>

            {
                showBar &&
                <input 
                    onChange={onChange}
                    type="range" 
                    className="volume"
                    value={volumePercentage} 
                />
            }
        </div>
    )
}