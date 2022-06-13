export function Courses() {

    let courses = [
        {
            "id": "13354dfa",
            "name": "JavaScript", 
            "days": ["Monday", "Wednesday"],
            "creator": "desarrollos@jida.arg",
            "episodes": []
        },

        {
            "id": "141sa4sd",
            "name": "TypeScript",
            "days": ["Tuesday", "Thursday"],
            "creator": "desarrollos@jida.arg",
            "episodes": []
        },

        {
            "id": "a4s2wac2",
            "name": "NodeJS",
            "days": ["Saturday", "Friday"],
            "creator": "desarrollos@jida.arg",
            "episodes": []
        },

        {
            "id": "d5de135e",
            "name": "PHP Advanced Topics", 
            "days": ["Tuesday", "Thursday"],
            "creator": "desarrollos@jida.arg",
            "episodes": []
        },

        {
            "id": "s2d2aa5s",
            "name": "NoSQL", 
            "days": ["Monday", "Friday"],
            "creator": "desarrollos@jida.arg",
            "episodes": []
        },

        {
            "id": "4d4a1d1a",
            "name": "UX Experts", 
            "days": ["Tuesday", "Friday"],
            "creator": "desarrollos@jida.arg",
            "episodes": []
        },

        {
            "id": "s4ad1a4f",
            "name": "Design patterns", 
            "days": ["Saturday"],
            "creator": "desarrollos@jida.arg",
            "episodes": []
        },

        {
            "id": "a4s5a2wd",
            "name": "React",
            "days": ["Monday"],
            "creator": "ilovethecoffe@yahoo.com",
            "episodes": []
        },

        {
            "id": "24s21dsa",
            "name": "Redux",
            "days": ["Tuesday"],
            "creator": "desarrollos@jida.arg",
            "episodes": []
        },

        {
            "id": "A5s2a1f2",
            "name": "Beyond",
            "days": ["Monday", "Sunday"],
            "creator": "desarrollos@jida.arg",
            "episodes": []
        },

        {
            "id": "a4sA5s1w",
            "name": "Angular",
            "days": ["Friday"],
            "creator": "desarrollos@jida.arg",
            "episodes": []
        },  

        {
            "id": "a4sW4s1d",
            "name": "jQuery",
            "days": ["Thursday"],
            "creator": "desarrollos@jida.arg",
            "episodes": []
        }
    ];

    Object.defineProperty(this, 'items', {'get': () => courses});
}