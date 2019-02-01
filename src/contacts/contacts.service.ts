import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Contact } from './contact.entity';
import { IContact } from './interfaces/IContact';
import { CreateContactDTO } from './dto/createContact.dto';
@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  public async findAll(): Promise<Contact[]> {
    return await this.contactRepository.find();
  }

  public async findOne(options: object): Promise<Contact | null> {
    return await this.contactRepository.findOne(options);
  }

  public async findById(ID): Promise<Contact | null> {
    return await this.contactRepository.findOneOrFail(ID);
  }

  public async create(todo: CreateContactDTO): Promise<Contact> {
    return await this.contactRepository.save(todo);
  }

  public async update(id: number, newValue: IContact): Promise<Contact | {}> {
    const todo = await this.contactRepository.findOneOrFail(id);
    try {

        await this.contactRepository.update(id, newValue);
        return await this.contactRepository.findOne(id);
    } catch {
        return { message: 'Invalid User'};
    }
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.contactRepository.delete(id);
  }
}
