let backendAddress = 'http://localhost:4000';

let apiAccess = {
    addCustomer: (email, password) => {
        console.log('here');
        return fetch(`${backendAddress}/register`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            });

    },
    login: (email, password) => {
        return fetch(`${backendAddress}/login`, {
            method: 'Post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ email, password })
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            });
    },

    logout: (email, password) => {
        return fetch(`${backendAddress}/logout`, {
            method: 'Post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            });
    },

    getCategory: () => {
        return fetch(`${backendAddress}/category/`, {
            method: 'Get',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true
            },
        })
            .then(x => x.json())
            .then(x => {

                return x;
            });
    },

    addCategory: (name) => {
        return fetch(`${backendAddress}/category`, {
            method: 'Post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ name })
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            });
    },

    addPlace: (name, category_id, latitude, longitude, description) => {
        return fetch(`${backendAddress}/place`, {
            method: 'Post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ name, category_id, latitude, longitude, description })
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            });

    }

    ,
    saveImage: (formData) => {
        console.log(formData)
        return fetch(`${backendAddress}/photo`, {
            method: 'POST',
            body: formData
        })
            .then(x => x.json());
    },

    updateImage: (formData) => {
        console.log(formData.get('file'))
        return fetch(`${backendAddress}/photo`, {
            method: 'put',
            credentials: 'include',
            body: formData
        })
            .then(x => x.json());
    },

    search:(search_term, user_location, radius_filter, maximum_results, category_filter, sort)=>{
        return fetch(`${backendAddress}/search/${search_term}/${user_location}/${radius_filter}/${maximum_results}/${category_filter}/${sort}`, {
            method: 'Get',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true
            },
         })
        .then(x => x.json())
        .then(x => {
            console.log(x);
            
            return x.result;
        });
    },

    updatePlace:(place_id, name, category_id, latitude, longitude, description)=>{
        return fetch(`${backendAddress}/place`, {
            method: 'Put',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({place_id, name, category_id, latitude, longitude, description})
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            });

        

    },

    deletePlace:(place_id)=>{
        return fetch(`${backendAddress}/place/${place_id}`, {
            method: 'delete',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
        })
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return x;
            });

        

    }



};


export default apiAccess;