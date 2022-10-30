import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useVideoContext } from "./context";

export default function PlayButton() {
    const { videoRef, isVideoPlaying, setIsVideoPlaying } = useVideoContext();

    function playToggle() {
        if (!isVideoPlaying) {
            videoRef.current.play();
            setIsVideoPlaying(true);
            return;
        };
        
        videoRef.current.pause();
        setIsVideoPlaying(false);
    }

    const playingIcon = isVideoPlaying ? <PauseIcon className="icon" /> : <PlayArrowIcon className="icon" />;

    return (
        <button
            onClick={playToggle}
            className="play-btn"
        >
            {playingIcon}
        </button>
    )
}