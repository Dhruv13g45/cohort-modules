import bcrypt from "bcrypt"


export const generateHashedPassword = async (password:string) =>{
    
    const saltRounds = 8

    try{
        const hashPassword: string = await bcrypt.hash(password,saltRounds)
        return hashPassword 
    }
    catch(error){
        console.log(error)
        return null
    }

}