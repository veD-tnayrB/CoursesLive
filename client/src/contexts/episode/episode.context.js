import * as React from 'react';

export const EpisodeContext = React.createContext();
export const useEpisodeContext = () => React.useContext(EpisodeContext);
