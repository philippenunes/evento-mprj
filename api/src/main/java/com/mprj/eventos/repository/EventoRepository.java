package com.mprj.eventos.repository;

import com.mprj.eventos.model.Evento;
import com.mprj.eventos.model.Status;
import org.apache.ibatis.annotations.Param;

import java.util.Collection;
import java.util.Date;

/**
 * Created by philippe.silva on 02/06/2017.
 */
public interface EventoRepository {

    void cadastroEvento(@Param(value="evento") Evento evento);

    void alteraEvento(@Param(value="evento") Evento evento);

    Evento retornaEventoPorId(@Param(value = "id") Integer id);

    Collection<Evento> retornaListaPorParametro(@Param(value="registro") Integer registro,
                                                @Param(value="status") Status status,
                                                @Param(value="data") Date data);

    Collection<Evento> retornaListaDeEventos();

    void removeEvento(Integer id);

}