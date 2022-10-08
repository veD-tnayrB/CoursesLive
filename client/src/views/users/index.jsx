import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from 'src/contexts/user/user.context';
import UserSection from 'src/components/user/section';
import Header from 'src/components/common/header';
import SearchUsers from 'src/components/user/search';

export default function Users() {
    const { user } = useUserContext();
    const [users, setUsers] = React.useState([]);

    if (user.role !== 'admin') return <Navigate to="/" />;

    return (
        <div className="users-page page">
            <Header className="subtitle">
                <h2>Users</h2>
            </Header>
            <SearchUsers />
            <UserSection users={users} setUsers={setUsers} />
        </div>
    )
}