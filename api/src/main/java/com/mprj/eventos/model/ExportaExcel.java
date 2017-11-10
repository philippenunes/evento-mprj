package com.mprj.eventos.model;

import com.mprj.eventos.service.EventoService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellUtil;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.*;
import java.util.List;


/**
 * Created by evento.cnmp on 21/07/2017.
 */
public class ExportaExcel {


    @Autowired
    EventoService eventoService;

    private int indiceLinha = 6;
    private int indiceColuna = 0;




    private static String fileName = "C:/users/nunes/novo.xls";

    private static final String getFileName() {
        return fileName;
    }




    public Workbook montaPlanilha(List<Evento> listaEventos) throws IOException {

        Workbook wb = new XSSFWorkbook();
        int tamLista = listaEventos.size() + 7;

        wb = criaAba(wb, listaEventos, tamLista);

        return wb;
    }



    private Workbook criaAba(Workbook wb, List<Evento> listaEventos, int tamLista) throws IOException {

        Sheet sheetAba = wb.createSheet("relatorio-eventos");

        sheetAba.setColumnWidth(0, 8000);
        sheetAba.setColumnWidth(1, 8000);
        sheetAba.setColumnWidth(2, 8000);
        sheetAba.setColumnWidth(3, 8000);
        sheetAba.setColumnWidth(4, 6000);
        sheetAba.setColumnWidth(5, 8000);
        sheetAba.setColumnWidth(6, 8000);
        sheetAba.setColumnWidth(7, 8000);
        sheetAba.setColumnWidth(8, 8000);
        sheetAba.setColumnWidth(9, 8000);
        sheetAba.setColumnWidth(10, 8000);


        //Logo
        InputStream logo = getClass().getResourceAsStream("/com/mprj/eventos/reports/logo-mp-pb.jpg");

        int logoBytes = wb.addPicture(streamToByteArray(logo), Workbook.PICTURE_TYPE_JPEG);
        Drawing drawing = sheetAba.createDrawingPatriarch();
        CreationHelper helper = wb.getCreationHelper();

        ClientAnchor anchor = helper.createClientAnchor();
        anchor.setAnchorType(ClientAnchor.AnchorType.DONT_MOVE_AND_RESIZE);

        Picture pict = drawing.createPicture(anchor, logoBytes);
        pict.resize();


        //principal

        Row linhaCabecalho = sheetAba.createRow(incrementaIndiceLinha());

        CellUtil.createCell(linhaCabecalho, incrementaIndiceColuna(), "Solicitante");
        CellUtil.createCell(linhaCabecalho, incrementaIndiceColuna(), "Contato");
        CellUtil.createCell(linhaCabecalho, incrementaIndiceColuna(), "Título");
        CellUtil.createCell(linhaCabecalho, incrementaIndiceColuna(), "Data");
        CellUtil.createCell(linhaCabecalho, incrementaIndiceColuna(), "Local");
        CellUtil.createCell(linhaCabecalho, incrementaIndiceColuna(), "Início");
        CellUtil.createCell(linhaCabecalho, incrementaIndiceColuna(), "Término");
        CellUtil.createCell(linhaCabecalho, incrementaIndiceColuna(), "Presença do técnico\t");
        CellUtil.createCell(linhaCabecalho, incrementaIndiceColuna(), "Status");
        CellUtil.createCell(linhaCabecalho, incrementaIndiceColuna(), "Registro");
        CellUtil.createCell(linhaCabecalho, incrementaIndiceColuna(), "Observação");


        for(int i = 0 ; i < listaEventos.size() ; i++) {


            Row linha = sheetAba.createRow(incrementaIndiceLinha());
            reiniciaIndiceColuna();

            CellUtil.createCell(linha, incrementaIndiceColuna(), listaEventos.get(i).getSolicitante());
            CellUtil.createCell(linha, incrementaIndiceColuna(), listaEventos.get(i).getContato());
            CellUtil.createCell(linha, incrementaIndiceColuna(), listaEventos.get(i).getTitulo());
            CellUtil.createCell(linha, incrementaIndiceColuna(), String.valueOf(listaEventos.get(i).getData()));
            CellUtil.createCell(linha, incrementaIndiceColuna(), listaEventos.get(i).getLocal());
            CellUtil.createCell(linha, incrementaIndiceColuna(), listaEventos.get(i).getInicio());
            CellUtil.createCell(linha, incrementaIndiceColuna(), listaEventos.get(i).getTermino());
            CellUtil.createCell(linha, incrementaIndiceColuna(), listaEventos.get(i).getPresencaTecnico());
            CellUtil.createCell(linha, incrementaIndiceColuna(), listaEventos.get(i).getStatusString());
            CellUtil.createCell(linha, incrementaIndiceColuna(), String.valueOf(listaEventos.get(i).getRegistro()));
            CellUtil.createCell(linha, incrementaIndiceColuna(), listaEventos.get(i).getObservacao());

        }

//        try {
//            FileOutputStream out =
//                    new FileOutputStream(new File(ExportaExcel.getFileName()));
//            wb.write(out);
//            out.close();
//            System.out.println("Arquivo Excel criado com sucesso!");
//
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//            System.out.println("Arquivo não encontrado!");
//        } catch (IOException e) {
//            e.printStackTrace();
//            System.out.println("Erro na edição do arquivo!");
//        }


        return wb;
    }

    private int incrementaIndiceLinha() {
        return indiceLinha++;
    }

    private int incrementaIndiceColuna() {
        return indiceColuna++;
    }

    private void reiniciaIndiceColuna () {
        indiceColuna = 0;
    }

    private void reiniciaIndiceLinha () {
        indiceLinha = 0;
    }


    // Método que retorna Byte a partir de uma ImputStream
    public byte[] streamToByteArray(InputStream stream) throws IOException {

        try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {

            byte[] buffer = new byte[1024];

            int line = 0;
            // read bytes from stream, and store them in buffer
            while ((line = stream.read(buffer)) != -1) {
                // Writes bytes from byte array (buffer) into output stream.
                os.write(buffer, 0, line);
            }
            stream.close();
            os.flush();

            return os.toByteArray();

        }
    }
}
