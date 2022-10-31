import * as React from 'react';

export const FirstEpisodeContext = React.createContext();
export const useFirstEpisodeContext = () => React.useContext(FirstEpisodeContext);