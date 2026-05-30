export class ApiResponse<T> {

    statusCode: number
    message: string
    data: T
    success: boolean

    constructor(
        statusCode: number,
        data: T,
        message: string,
        success: boolean
    ){

        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = success

    }
}