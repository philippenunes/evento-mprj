package com.mprj.eventos.controller;

import com.mprj.eventos.model.Evento;
import com.mprj.eventos.service.EventoService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Collection;

/**
 * Created by philippe.silva on 19/05/2017.
 */

@RestController
@ComponentScan({"com.mprj.eventos.service"})
public class EventoController {

    @Autowired
    EventoService eventoService;

    //INSERE
    @RequestMapping(method = RequestMethod.POST, value = "/eventos",
    consumes = MediaType.APPLICATION_JSON_VALUE)
    public void castrarEvento(@RequestBody Evento evento){

         eventoService.inserir(evento);
    }

    //LISTA
    @RequestMapping(method = RequestMethod.GET, value = "/eventos",
    produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<Evento>> listaEventos(){

        Collection<Evento> lista =  eventoService.listaEventos();
        return new ResponseEntity<Collection<Evento>>(lista, HttpStatus.OK);
    }

    //BUSCA POR ID
    @RequestMapping(method = RequestMethod.GET, value = "/eventos/{id}",
    produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Evento> buscaEventoPorId(@PathVariable Integer id){

        Evento evento = eventoService.buscaPorId(id);
        return new ResponseEntity<Evento>(evento, HttpStatus.OK);
    }

    //REMOVE
    @RequestMapping(method = RequestMethod.DELETE, value = "/eventos/{id}")
    public ResponseEntity<Evento> removeEvento(@PathVariable int id){

        Evento eventoEncontrado = eventoService.buscaPorId(id);

        if(eventoEncontrado == null){
            return new ResponseEntity<Evento>(HttpStatus.NOT_FOUND);
        }else {
            eventoService.removeEvento(eventoEncontrado.getId());
            return new ResponseEntity<Evento>(HttpStatus.OK);
        }
    }

    //ALTERA
    @RequestMapping(method = RequestMethod.PUT, value = "/eventos",
    consumes = MediaType.APPLICATION_JSON_VALUE)
    public void alteraEvento(@Valid @RequestBody Evento evento){

        eventoService.alteraEvento(evento);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/exportaeventos",
    produces = "application/vnd.ms-excel")
    public ResponseEntity<byte[]> exportaExcel() throws IOException {

        byte[] bytes = eventoService.exportaListaExcel();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application","vnd.ms-excel"));
        headers.setContentLength(bytes.length);
        headers.setContentDispositionFormData("attachment","relatorio-eventos.xlsx");
        return new ResponseEntity<byte[]>(bytes, headers, HttpStatus.ACCEPTED);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/exportapdf",
            produces = "application/pdf")
    public ResponseEntity<byte[]> exportaPDF() throws IOException, JRException {

        byte[] bytes = eventoService.exportaListaPdf();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application","pdf"));
        headers.setContentLength(bytes.length);
        headers.setContentDispositionFormData("attachment","relatorio-eventos.pdf");
        return new ResponseEntity<byte[]>(bytes, headers, HttpStatus.ACCEPTED);
    }

}