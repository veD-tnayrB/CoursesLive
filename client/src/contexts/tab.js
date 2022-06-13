import { useState, createContext } from 'react';

const TabContext = createContext();

const TabProvider = ({ children }) => {
    const [isTabOpen, setIsTabOpen] = useState(false);

    const toggleIsTabOpen = (event) => {
        const { className } = event.target;

        if (className !== 'profile-button' || className !== 'profile-icon') {
            setIsTabOpen(false);

        } else {
            setIsTabOpen(true);
        }
    }

    return (
        <TabContext.Provider value={{ isTabOpen, toggleIsTabOpen }}>
            {children}
        </TabContext.Provider>

    )
}

export { TabContext, TabProvider };