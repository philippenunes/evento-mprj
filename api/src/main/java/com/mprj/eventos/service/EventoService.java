package com.mprj.eventos.service;

import com.mprj.eventos.model.Evento;
import com.mprj.eventos.model.ExportaExcel;
import com.mprj.eventos.repository.EventoRepository;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by evento.cnmp on 19/05/2017.
 */

@Service
public class EventoService {

    @Autowired
    EventoRepository eventoRepository;

    public void inserir(Evento evento){
        eventoRepository.cadastroEvento(evento);
    }

    public Collection<Evento> listaEventos(){
        return eventoRepository.retornaListaDeEventos();
    }

    public Evento buscaPorId(int id){
        return eventoRepository.retornaEventoPorId(id);
    }

    public void removeEvento(Integer id){
        eventoRepository.removeEvento(id);
    }

    public void alteraEvento(Evento evento){
        eventoRepository.alteraEvento(evento);
    }

    public byte[] exportaLista() throws IOException {

        Collection<Evento> collection = eventoRepository.retornaListaDeEventos();
        List<Evento> lista = new ArrayList<Evento>();
        lista.addAll(collection);

        ExportaExcel exporta = new ExportaExcel();

        Workbook workbook = exporta.montaPlanilha(lista);

        ByteArrayOutputStream bos = new ByteArrayOutputStream();

        workbook.write(bos);

        byte[] bytes = bos.toByteArray();

        return bytes;
    }

}
