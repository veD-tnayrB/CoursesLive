import * as React from 'react';
import { getAllUsers } from 'src/services/user';
import PreloadList from 'src/components/common/card/preload/list';
import List from 'src/components/common/list';
import User from './user';
import './section.scss';

export default function UserSection({ users, setUsers, searchResults }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const usersToDisplay = searchResults.length > 0 ? searchResults : users;

    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        setIsLoading(true);

        getAllUsers(signal)
            .then(response => {
                setUsers(response);
                setIsLoading(false);
            })

        return () => controller.abort();
    }, []);

    if (isLoading) return <PreloadList />

    const userElements = usersToDisplay.map(user => (
        <User key={user.id} user={user} />
    ))

    return (
        <div className="users-section">
            <List>
                {userElements}
            </List>
        </div>
    )
}