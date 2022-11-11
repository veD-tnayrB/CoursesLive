import * as React from 'react';

export const EpisodesContext = React.createContext();
export const useEpisodeContext = () => React.useContext(EpisodesContext);
