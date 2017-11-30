package com.mprj.eventos.service;

import com.mprj.eventos.model.Evento;
import com.mprj.eventos.repository.EventoRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Collection;

import static org.mockito.Mockito.*;

/**
 * Created by philippe.silva on 19/05/2017.
 */

public class EventoServiceTest {

    @Mock
    EventoRepository eventoRepository;

    @InjectMocks
    EventoService eventoService;

    @Before
    public void init(){
        MockitoAnnotations.initMocks(this);
    }

    //INSERE
    @Test
    public void deveCadastrarEvento() {

        Evento evento = new Evento();
        evento.setSolicitante("João");

        eventoService.inserir(evento);

        verify(eventoRepository, times(1)).cadastroEvento(evento);
    }

    @Test
    public void deveListarEventos() {

        Collection<Evento> lista = new ArrayList<>();
        Evento evento = new Evento();
        evento.setId(1);
        lista.add(evento);

        when(eventoRepository.retornaListaDeEventos()).thenReturn(lista);
        Collection<Evento> retorno = eventoService.listaEventos();

        Assert.assertEquals(lista, retorno);

    }

    @Test
    public void deveRetornarEventoPorId() {

        Evento evento = new Evento();
        evento.setId(1);

        when(eventoRepository.retornaEventoPorRegistro(anyInt())).thenReturn(evento);


    }


    //LISTA

//
//    //BUSCA POR ID
//    @RequestMapping(method = RequestMethod.GET, value = "/eventos/{id}",
//            produces= MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<Evento> buscaEventoPorRegistro(@PathVariable Integer id){
//
//        Evento evento = eventoService.buscaPorRegistro(id);
//        return new ResponseEntity<Evento>(evento, HttpStatus.OK);
//    }
//
//    //REMOVE
//    @RequestMapping(method = RequestMethod.DELETE, value = "/eventos/{id}")
//    public ResponseEntity<Evento> removeEvento(@PathVariable int id){
//
//        Evento eventoEncontrado = eventoService.buscaPorRegistro(id);
//
//        if(eventoEncontrado == null){
//            return new ResponseEntity<Evento>(HttpStatus.NOT_FOUND);
//        }else {
//            eventoService.removeEvento(eventoEncontrado.getId());
//            return new ResponseEntity<Evento>(HttpStatus.OK);
//        }
//    }
//
//    //ALTERA
//    @RequestMapping(method = RequestMethod.PUT, value = "/eventos",
//            consumes = MediaType.APPLICATION_JSON_VALUE)
//    public void alteraEvento(@Valid @RequestBody Evento evento){
//
//        eventoService.alteraEvento(evento);
//    }
//
//    // @RequestMapping(method = RequestMethod.GET, value = "/eventos")
//    //  public void olaMundo(){
//    //     System.out.println("Ola Mundo!");
//    //  }

}
