package com.mprj.eventos.controller;

import com.mprj.eventos.filter.EventoFilter;
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
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

/**
 * Created by philippe.silva on 19/05/2017.
 */

@RestController
@ComponentScan({"com.mprj.eventos.service"})
public class EventoController {

    @Autowired
    EventoService eventoService;

    /**
     * Insere evento
     */
    @RequestMapping(method = RequestMethod.POST, value = "/eventos",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Evento> castrarEvento(@RequestBody Evento evento){

        Evento eventoExiste = null;

        eventoExiste = eventoService.buscaPorRegistro(evento.getRegistro());
        if(eventoExiste == null) {
            eventoService.inserir(evento);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    /**
     * Lista eventos
     */
    @RequestMapping(method = RequestMethod.GET, value = "/eventos",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<Evento>> listaEventos(){

        Collection<Evento> lista =  eventoService.listaEventos();
        return new ResponseEntity<Collection<Evento>>(lista, HttpStatus.OK);
    }

    /**
     * Lista evento por filtro
     */
    @RequestMapping(value = "/eventos/lista", method = RequestMethod.GET)
    public ResponseEntity<Collection<Evento>> retornaListaEventos(EventoFilter filter) throws ParseException {

         Date data = null;

         if(filter.getData() != null) {
             DateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd");
             String inputData = String.valueOf(filter.getData());
             data = inputFormat.parse(inputData);
         }

         Collection<Evento> lista = eventoService.listaPorParametro(filter.getRegistro(), filter.getStatus(), data);
         return new ResponseEntity<Collection<Evento>>(lista, HttpStatus.OK);
    }


    /**
     * Busca por registro
     */
    @RequestMapping(method = RequestMethod.GET, value = "/eventos/{registro}",
            produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Evento> buscaEventoPorRegistro(@PathVariable int registro){

        Evento evento = eventoService.buscaPorRegistro(registro);

        if(evento == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<Evento>(evento, HttpStatus.OK);
        }
    }

    /**
     * Remove evento
     */
    @RequestMapping(method = RequestMethod.DELETE, value = "/eventos/{registro}")
    public ResponseEntity<Evento> removeEvento(@PathVariable int registro){

        Evento eventoEncontrado = eventoService.buscaPorRegistro(registro);

        if(eventoEncontrado == null){
            return new ResponseEntity<Evento>(HttpStatus.NOT_FOUND);
        }else {
            eventoService.removeEvento(eventoEncontrado.getId());
            return new ResponseEntity<Evento>(HttpStatus.OK);
        }
    }

    /**
     * Altera evento
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/eventos",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void alteraEvento(@Valid @RequestBody Evento evento){

        eventoService.alteraEvento(evento);
    }

    /**
     * Exporta planilha excel
     */
    @RequestMapping(method = RequestMethod.GET, value = "/exportaexcel",
            produces = "application/vnd.ms-excel")
    public ResponseEntity<byte[]> exportaExcel() throws IOException {

        byte[] bytes = eventoService.exportaListaExcel();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application","vnd.ms-excel"));
        headers.setContentLength(bytes.length);
        headers.setContentDispositionFormData("attachment","relatorio-eventos.xlsx");
        return new ResponseEntity<byte[]>(bytes, headers, HttpStatus.ACCEPTED);
    }

    /**
     * Exporta arquivo pdf
     */
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