const express=require('express');
const fs=require('fs');

const app=express();
app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');


// using callback
/* function getUsers(callaback){
    fs.readFile('data.json', 'utf-8', (err, data)=>{
        if(err) callaback(err);
        else {
            console.log(data);
            const users=JSON.parse(data)
            callaback(null, users);
        }
    })
}

app.get('/', (req, res)=>{
    getUsers((err, userList)=>{
        if(err){
            res.render('error', {error:err})
        } 
        else{
            res.render('index',{users:userList.users});
        }
        
    });
}) */

/* using PROMISE */
/* function getUsers(){
    return new Promise((resolve, reject)=>{
        fs.readFile('data.json', 'utf-8', (err, data)=>{
            if(err) reject(err)
            else{
                const users=JSON.parse(data);
                resolve(users);
            }
        })
    });
}

app.get('/', (req, res)=>{
    getUsers()
    .then((users)=>{
        throw new Error('No it is wrong')
        // res.render('index', {users:users.users})
       
    })
    .catch((err)=>{
        res.render('error', {error:err})
    })
    
}) */

/* Usin async await */
/* function getUsers(){
    return new Promise((resolve, reject)=>{
        fs.readFile('data.json', 'utf-8', (err, data)=>{
            if(err) reject(err)
            else{
                const users=JSON.parse(data);
                resolve(users);
            }
        })
    });
} */
/* benefit of async await is easier to debug which line have error in case of chain of then we hardly 
find where it is exact error
when any line have await getUsers() -> means wait until getUsers() not resolve/reject
then move to execute new line of code
 */
/* app.get('/', async(req, res)=>{
    try{
    const users=await getUsers();
    res.render('index', {users:users.users})
    }catch(err){
        res.render('error', {error:err})
    }
    
}) */


/* Error handling in async await */
function getUsers(){
    return new Promise((resolve, reject)=>{
        fs.readFile('data.json', 'utf-8', (err, data)=>{
            if(err) reject(err)
            else{
                const users=JSON.parse(data);
                resolve(users);
            }
        })
    });
}
function asyncHandler(cb){
   return async (req, res, next)=>{
    try{
       await cb(req, res);
    }catch(err){
        res.render('error', {error:err})
    }
   }
}

app.get('/', asyncHandler(
    // callback
    async (req, res)=>{
        const users=await getUsers();
        throw new Error('It is broke')
        res.render('index', {users:users.users})
    }
))

app.listen(4444, ()=>{
    console.log(`Server started on http://localhost:4444`);
})