import UserSection from 'src/components/user/section';
import Header from 'src/components/common/header';

export default function Users() {

    return (
        <div className="users-page">
            <Header className="subtitle">
                <h2>Users</h2>
            </Header>
            <UserSection />
        </div>
    )
}