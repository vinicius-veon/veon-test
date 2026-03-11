import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Prisma } from '../../generated/prisma/client'

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientUnknownRequestError,
)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(_exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json({
      statusCode: status,
      message: 'Erro interno no banco de dados',
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
