export class ApiError extends Error{
    statusCode: number
    data: null
    message: string
    error: any[]
    
    constructor(
        statusCode: number,
        data: null,
        message:string,
        error: any[]
    ){
        super(message)
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.error = error 

        Error.captureStackTrace(this, this.constructor);
    }
}