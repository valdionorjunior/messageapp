import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensageDto } from './dto/create-mensage-dto';
import { MensagesService } from './mensages.service';
import { response } from 'express';

@Controller('mensages')
export class MensagesController {
    
    constructor( 
        private mensageService: MensagesService 
        ){}

    @Post()
    create (@Body() createMensageDto: CreateMensageDto, @Res() response){
        this.mensageService.createMensage(createMensageDto)
        .then(mensage => {
            return response.status(HttpStatus.CREATED).json(mensage);
            
        }).catch( () => {
            return response.status(HttpStatus.FORBIDDEN).json({mensage: 'Error ao criar a mensagem'})
        });
    }

    @Get()
    getAll(@Res() response){
        this.mensageService.getAll()
        .then(mensagesList => {
            return response.status(HttpStatus.OK).json(mensagesList);
            
        }).catch( () => {
            return response.status(HttpStatus.FORBIDDEN).json({mensage: 'Error ao trazer as mensagens'})
        });
    }

    @Put(':id')
    update(@Body() updateMensageDto: CreateMensageDto, @Res() response, @Param('id') id){
        this.mensageService.updateMensage(id, updateMensageDto)
        .then(mensage => {
            return response.status(HttpStatus.OK).json(mensage);
            
        }).catch( () => {
            return response.status(HttpStatus.FORBIDDEN).json({mensage: 'Error ao atualizar a mensagem'})
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') id){
        this.mensageService.deleteMensage(id)
        .then(mensage => {
            return response.status(HttpStatus.OK).json(mensage);
            
        }).catch( () => {
            return response.status(HttpStatus.FORBIDDEN).json({mensage: 'Error ao deletar a mensagem'})
        });
    }
}

