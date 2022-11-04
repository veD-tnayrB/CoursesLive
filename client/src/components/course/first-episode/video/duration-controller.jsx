import * as React from 'react';
import { useVideoContext } from './context';
import EpisodeDurationIndicator from './duration-indicator';

export default function EpisodeDurationController() {
    const { videoRef } = useVideoContext();
    const [played, setPlayed] = React.useState(0);
    const maxDuration = React.useMemo(() => videoRef.current?.duration, [videoRef.current]);

    React.useEffect(() => {
        if (played >= maxDuration) return;

        const newTime = .1;

        setInterval(() => {
            setPlayed(videoRef?.current?.currentTime);
        }, newTime);
    }, []);

    function onChange(event) {
        const newValue = event.target.value;
        setPlayed(Number(newValue));
        videoRef.current.currentTime = newValue;
    }

    return (
        <div className="duration-controller">
                <input
                    onChange={onChange}
                    type="range"
                    max={videoRef?.current?.duration}
                    value={played}
                />

            <EpisodeDurationIndicator played={played} maxDuration={maxDuration} />
        </div>
    )
}