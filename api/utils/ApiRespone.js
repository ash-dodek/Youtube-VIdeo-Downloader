class ApiResponse{
    constructor(statusCode, message, data = null, success = null){
        this.statusCode = statusCode
        this.message = message
        this.data = data 
        this.success = success ?? (statusCode >= 200 && statusCode < 300)
    }

    convertJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
            success: this.success,
        };
    }

    static success(message = "Success", data = null, statusCode = 200){
        return res.status(this.statusCode).json()
    }
    
}