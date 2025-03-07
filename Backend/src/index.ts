import 'reflect-metadata'
import app from "./app.js"
import { AppDataSource } from "./shared/db/orm.js";



async function main(){

    try{
        await AppDataSource.initialize();
        console.log("Base de datos conectada");
        app.listen(3000,()=>{
        console.log('Server running on http://localhost:3000/');
    })
    }catch(err){
        if(err instanceof Error){
            console.log(err.message);
        }
    }
    
}

main();