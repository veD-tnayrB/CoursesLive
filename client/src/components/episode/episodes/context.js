import * as React from 'react';

export const EpisodesContext = React.createContext();
export const useEpisodesContext = () => React.useContext(EpisodesContext);
