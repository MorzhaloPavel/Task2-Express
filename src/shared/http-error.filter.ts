import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import * as fs from 'fs';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest()
        const response = ctx.getResponse()
        const status = exception.getStatus()

        const errorResponse = {
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception.message
        }
        fs.appendFileSync('src/loggerFile/error.log', JSON.stringify(errorResponse) + '\n')
        Logger.error(`method: ${request.method}, URL: ${request.url}, statusCode: ${status}, massege: ${exception.message}`)
        
        response.status(status).json(errorResponse)
    }
}