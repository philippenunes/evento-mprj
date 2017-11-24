package com.mprj.eventos.model;

import java.util.Date;

/**
 * Created by philippe.silva on 11/05/2017.
 */
public class Evento {



    private int id;
    private String solicitante;
    private String contato;
    private String titulo;
    private Date data;
    private String local;
    private String inicio;
    private String termino;
    private String presencaTecnico;
    private Status status;
    private Integer registro;
    private String observacao;

    public int getId() {
        return id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(String solicitante) {
        this.solicitante = solicitante;
    }

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public String getInicio() {
        return inicio;
    }

    public void setInicio(String inicio) {
        this.inicio = inicio;
    }

    public String getTermino() {
        return termino;
    }

    public void setTermino(String termino) {
        this.termino = termino;
    }

    public String getPresencaTecnico() {
        return presencaTecnico;
    }

    public void setPresencaTecnico(String presencaTecnico) {
        this.presencaTecnico = presencaTecnico;
    }
    
    public Integer getRegistro() {
        return registro;
    }

    public void setRegistro(Integer registro) {
        this.registro = registro;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
}
