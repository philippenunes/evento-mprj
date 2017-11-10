package com.mprj.eventos.controller;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Status {

    EM_ANDAMENTO("AN", "Em andamento"),
    AGENDADO("AG", "Agendado"),
    ENCAMINHADO("EN", "Encaminhado"),
    PENDENTE_DOCUMENTACAO("PD", "Pendente documentação");

    private String textoStatus;

    private String sigla;


    Status(String sigla, String textoStatus) {

        this.sigla = sigla;
        this.textoStatus = textoStatus;
    }

    public String getSigla() {
        return sigla;
    }

    public String getTextoStatus() {
        return textoStatus;
    }

    Status(String status) {
        this.sigla = status;
    }

    @JsonCreator
    static Status from(String statusParam) {

        for(Status status: Status.values()) {
            if(status.sigla.equals(statusParam)) {
                return status;
            }
        }
        return null;
    }

}