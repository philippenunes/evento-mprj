package com.mprj.eventos.service;

import com.mprj.eventos.model.Evento;
import com.mprj.eventos.model.ExportaExcel;
import com.mprj.eventos.repository.EventoRepository;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * Created by evento.cnmp on 19/05/2017.
 */

@Service
public class EventoService {

    @Autowired
    EventoRepository eventoRepository;

    public void inserir(Evento evento) {
        eventoRepository.cadastroEvento(evento);
    }

    public Collection<Evento> listaEventos() {
        return eventoRepository.retornaListaDeEventos();
    }

    public Evento buscaPorId(int id) {
        return eventoRepository.retornaEventoPorId(id);
    }

    public void removeEvento(Integer id) {
        eventoRepository.removeEvento(id);
    }

    public void alteraEvento(Evento evento) {
        eventoRepository.alteraEvento(evento);
    }

    public byte[] exportaListaExcel() throws IOException {

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

    public byte[] exportaListaPdf() throws JRException, IOException {

        Collection<Evento> collection = eventoRepository.retornaListaDeEventos();
        List<Evento> lista = new ArrayList<>();
        lista.addAll(collection);

        InputStream imagem = getClass().getResourceAsStream("/com/mprj/eventos/reports/logo-mp-pb.jpg");

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("LOGO", imagem);
        parameters.put("REPORT_LOCALE", new Locale("pt", "BR"));

        InputStream jasperStream = getClass().getResourceAsStream("/com/mprj/eventos/reports/relatorio-eventos-pdf.jasper");
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperStream, parameters, new JRBeanCollectionDataSource(lista));
        return JasperExportManager.exportReportToPdf(jasperPrint);

    }

}