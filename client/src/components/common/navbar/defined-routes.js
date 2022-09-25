export const ROUTES = [
    {
        name: 'Home',
        route: '/',
        requireAdmin: false
    },

    {
        name: 'Courses',
        route: '/courses',
        requireAdmin: false
    },

    {
        name: 'Users',
        route: '/users',
        requireAdmin: true
    },
];