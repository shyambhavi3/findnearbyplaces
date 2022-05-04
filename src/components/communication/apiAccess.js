let backendAddress = 'http://localhost:4000';

let apiAccess ={
    addCustomer:(email, password)=>{
        console.log('here');
        return fetch(`${backendAddress}/register`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password}) 
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
          body: JSON.stringify({email, password}) 
       })
       .then(x => x.json())
       .then(x => {
           console.log(x);
           return x;
       });
   },

   logout:(email,password) =>{
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
   }
};


   export default apiAccess;