import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators'
import * as fs from 'fs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()
    const res = context.switchToHttp().getResponse()

    const statusCode = res.statusCode
    const method = req.method
    const url = req.url
    const query = JSON.stringify(req.query)
    const body = JSON.stringify(req.body)


    fs.appendFileSync('src/loggerFile/info.log', `method: ${method}, URL: ${url}, query parameters: ${query}, request body: ${body}, statusCode: ${statusCode}\n`)

    return next
        .handle()
        .pipe(
            tap(() => Logger.log(`method: ${method}, URL: ${url}, query parameters: ${query}, request body: ${body}, statusCode: ${statusCode}`, context.getClass().name)),
        );
  }
}