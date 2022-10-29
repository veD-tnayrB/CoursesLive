import * as React from 'react';

export const VideoContext = React.createContext();
export const useVideoContext = () => React.useContext(VideoContext);