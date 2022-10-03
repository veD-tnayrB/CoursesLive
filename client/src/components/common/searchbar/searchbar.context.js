import * as React from 'react';

const SearchbarContext = React.createContext();
const useSearchContext = () => React.useContext(SearchbarContext);

export { SearchbarContext, useSearchContext};