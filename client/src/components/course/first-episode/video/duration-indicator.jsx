import * as React from 'react';

export default function EpisodeDurationIndicator({ played, maxDuration }) {
    maxDuration = (maxDuration / 60).toFixed(2).split('.').join(':');
    played = (played / 60).toFixed(2).split('.').join(':');

    return (
        <div className="volume-indicator">
            <div><span>{played}</span> / <span>{maxDuration}</span></div>
        </div>
    )
}