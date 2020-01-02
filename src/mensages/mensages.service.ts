import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensage } from './entities/mensage.entity';
import { Repository } from 'typeorm';
import { CreateMensageDto } from './dto/create-mensage-dto';

@Injectable()
export class MensagesService {
    constructor(
        @InjectRepository(Mensage)
        private readonly mensageRepository: Repository<Mensage>,
    ){}
    
    async getAll(): Promise<Mensage[]> {
        return await this.mensageRepository.find();
    }

    async createMensage(mensageNova: CreateMensageDto): Promise<Mensage>{
        const nova = new Mensage();
        nova.mensage = mensageNova.mensage;
        nova.nick = mensageNova.nick;

        return this.mensageRepository.save(nova); //salvando no banco
    }

    async updateMensage(id: number, atualizarMensage: CreateMensageDto): Promise<Mensage>{
        const mensageAtualizada = await this.mensageRepository.findOne(id);
        mensageAtualizada.nick = atualizarMensage.nick;
        mensageAtualizada.mensage = atualizarMensage.mensage;

        return this.mensageRepository.save(mensageAtualizada);
    }
    
    async deleteMensage(id: number): Promise<any>{
        return await this.mensageRepository.delete(id);
    }
}
