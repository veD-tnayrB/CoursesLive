import CheckBox from 'src/components/common/form/checkbox';
import { rolesList } from './roles-list';
import './roles.scss';

export default function Roles({ selectedRole, setSelectedRole }) {

    function handleChange(event) {
        const { value } = event.target;
        setSelectedRole(value);
    }

    const rolesElements = rolesList.map(role => (
        <CheckBox 
            key={role.value}
            checkbox={role}
            handleChange={handleChange}
            selectedOption={selectedRole}
        />
    ))

    return (
        <div className="roles-container">
            {rolesElements}
        </div>
    )
}