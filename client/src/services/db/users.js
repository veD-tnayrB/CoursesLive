export function Users() {

    let items = [
        {
            "role": "admin",
            "isLogged": false,
            "name": "Jida",
            "lastName": "Desarrollos",
            "mail": "desarrollos@jida.arg",
            "password": "Jida_emailna",
            "age": "7",
            "courses": [],
            "busyDays": []
        },

        {
            "role": "student",
            "isLogged": false,
            "name": "Julio",
            "lastName": "Rodriguez",
            "mail": "julio@emailna.co",
            "password": "Julio_123",
            "age": "30",
            "courses": [
                "13354dfa", "s2d2aa5s"
            ],
            "busyDays": [
                ["Monday", "Wednesday"],
                ["Monday", "Friday"]
            ]
        },

        {
            "role": "student",
            "isLogged": false,
            "name": "Felix",
            "lastName": "Tovar",
            "mail": "felix@emailna.co",
            "password": "Felix_123",
            "age": "30",
            "courses": [
                "13354dfa", "4d4a1d1a"
            ],
            "busyDays": [
                ["Monday", "Wednesday"],
                ["Tuesday", "Friday"]
            ]
        },

        {
            "role": "student",
            "isLogged": false,
            "name": "Rosmy", 
            "lastName": "Rodriguez",
            "mail": "rosmy@emailna.co",
            "password": "Rosmy_123", 
            "age": "30",
            "courses": [,
                "d5de135e", "s4ad1a4f"
            ],
            "busyDays": [
                ["Tuesday", "Thursday"],
                ["Saturday"]
            ]
        },
        
        {
            "role": "student",
            "isLogged": false,
            "name": "Jean", 
            "lastName": "Contreras",
            "mail": "jean@emailna.co", 
            "password": "Jean_123",
            "age": "30",
            "courses": [
                "4d4a1d1a", "13354dfa"
            ],
            "busyDays": [
                ["Tuesday", "Friday"],
                ["Monday", "Wednesday"]
            ]
        },

        {
            "role": "student",
            "isLogged": false,
            "name": "Elon",
            "lastName": "Musk",
            "mail": "ilovethemoney@twitter.com",
            "password": "i_also_love_the_capitalism",
            "age": "40",
            "courses": [],
            "busyDays": []
        },

        {
            "role": "student",
            "isLogged": false,
            "name": "Jeff",
            "lastName": "Bezos",
            "mail": "besitos@bezos.com",
            "password": "bezos_y_besitos",
            "age": "55",
            "courses": [],
            "busyDays": []
        },

        {
            "role": "student",
            "isLogged": false,
            "name": "Donald",
            "lastName": "Trump",
            "mail": "ilovethewalls@wall.com",
            "password": "pato_donald_paredes",
            "age": "50",
            "courses": [],
            "busyDays": []
        },

        {
            "role": "admin",
            "isLogged": false,
            "name": "Bryant",
            "lastName": "Caballero",
            "mail": "ilovethecoffe@yahoo.com",
            "password": "baila_tu_cuerpo_alegria_macarena",
            "age": "17",
            "courses": [],
            "busyDays": []
        },

        {
            "role": "student",
            "isLogged": false,
            "name": "Obama",
            "lastName": "Vinladen",
            "mail": "wherearemytowers@gmail.com",
            "password": "trump_caca_pedo_pis",
            "age": "80",
            "courses": [],
            "busyDays": []
        },

        {
            "role": "student",
            "isLogged": false,
            "name": "Will",
            "lastName": "Smith",
            "mail": "ihatemyson@smith.arg",
            "password": "i_love_the_cachetadas",
            "age": "22",
            "courses": [],
            "busyDays": []
        },

        {
            "role": "student",
            "isLogged": false,
            "name": "Alva",
            "lastName": "Majo",
            "mail": "losbatidosjimmyjoy@mayorariato.esp",
            "password": "make_good_games_is_my_shit.",
            "age": "33",
            "courses": [],
            "busyDays": []
        }

    ];

    Object.defineProperty(this, 'items', {'get': () => items});
}

export default Users;