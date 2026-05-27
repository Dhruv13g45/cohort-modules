type UserId = string 

interface User{
    id: UserId,
    fname?: string,
    lname?: string,
    contact?:{
        mobile?: string,
    },
    address?:{
        city?: string,
        street?: string,
    }
}

class DemoClass{
    private _db: Map<string, User> 

    constructor(){
        this._db = new Map()
    }



    public insertRecord(data: User): UserId{

        if (this._db.has(data.id)){
            throw new Error("This id already exists")
        }

        this._db.set(data.id, data)
        return data.id
    }


    public updataRecord(id: UserId, remainingData: Omit<User, "id">): string{

        if (this._db.has(id)){
            this._db.set(id, {...remainingData, id})
            return "Sucessfully updated"
        }
        throw new Error("This id does not exists")
    }


    public deleteRecord(id: UserId): string{

        if(this._db.has(id)){
            this._db.delete(id)
            return "Record deleted successfully"
        }
        throw new Error("This id cannnot be deleted")
    }

    public showRecords(): Map<string>{
        if (this._db.entries.length == 0) {
            throw new Error("Map has no records")
        } else {
            return this._db.entries
        }
    }
}




const myDb = new DemoClass()

myDb.insertRecord({
    id: "1",
    fname: "Dhruv",
    lname: "Goradia",
    contact:{
        mobile: "9999999",
    },
    address:{
        city: "Mumbai",
        street: "Chembur Colony"
    }
})