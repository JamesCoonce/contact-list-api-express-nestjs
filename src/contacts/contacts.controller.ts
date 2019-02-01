import {
  Controller,
  Get,
  Response,
  HttpStatus,
  Param,
  Body,
  Post,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { IContact } from './interfaces/IContact';
import { CreateContactDTO } from './dto/createContact.dto';

@ApiUseTags('contacts')
@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactssService: ContactsService) { }

    @Get()
    public async getTodos(@Response() res) {
        const todos = await this.contactssService.findAll();
        return res.status(HttpStatus.OK).json(todos);
    }

    @Get('/:id')
    public async getTodo(@Response() res, @Param() param) {
        const todos = await this.contactssService.findById(param.id);
        return res.status(HttpStatus.OK).json(todos);
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createTodo(
        @Response() res,
        @Body() createTodoDTO: CreateContactDTO,
    ) {
        const todo = await this.contactssService.create(createTodoDTO);
        return res.status(HttpStatus.OK).json(todo);
    }

    @Patch('/:id')
    public async updateTodo(@Param() param, @Response() res, @Body() body) {
        const todo = await this.contactssService.update(param.id, body);
        return res.status(HttpStatus.OK).json(todo);
    }

    @Delete('/:id')
    public async deleteTodo(@Param() param, @Response() res) {
        const todo = await this.contactssService.delete(param.id);
        return res.status(HttpStatus.OK).json(todo);
    }
}
