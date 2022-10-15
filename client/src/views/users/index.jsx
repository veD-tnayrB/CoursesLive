import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from 'src/contexts/user/user.context';
import { UsersContext } from 'src/contexts/users/users.context';
import { getAllUsers } from 'src/services/user';
import UserSection from 'src/components/user/section';
import Header from 'src/components/common/header';
import SearchUsers from 'src/components/user/search';

export default function Users() {
    const { user } = useUserContext();
    if (user.role !== 'admin') return <Navigate to="/" />;

    const [users, setUsers] = React.useState([]);
    const [search, setSearch] = React.useState({ selectedFilter: '', value: '' });
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        
        setIsLoading(true);

        getAllUsers(signal, search.value, search.selectedFilter)
            .then(response => {
                setUsers(response);
                setIsLoading(false);
            })

        return () => controller.abort();
    }, [search]);

    const userContext = {
        users,
        setUsers,
        search, 
        setSearch,
        isLoading, 
        setIsLoading
    };
    return (
        <UsersContext.Provider value={userContext}>
            <div className="users-page page">
                <Header className="subtitle">
                    <h2>Users</h2>
                </Header>
                <SearchUsers />
                <UserSection />
            </div>
        </UsersContext.Provider>
    )
}