import { useContext } from 'react';
import { TabContext } from 'contexts/tab';

const useTab = () => {
    const { isTabOpen, toggleIsTabOpen } = useContext(TabContext);
    return { isTabOpen, toggleIsTabOpen };
}

export { useTab }