import { VIDEOS_ROUTES } from "src/services/config"

export default function Video({ episode }) {

    return (
        <video 
            className="video"
            src={`${VIDEOS_ROUTES}${episode.video}`} 
            controls
        />
    )
}