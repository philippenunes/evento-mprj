package com.mprj.eventos.model;

import javax.persistence.*;

/**
 * Created by philippe.silva on 11/05/2017.
 */
@Entity
@Table(name="equipamento")
public class Equipamento {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int notebook;
    private int impressora;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNotebook() {
        return notebook;
    }

    public void setNotebook(int notebook) {
        this.notebook = notebook;
    }

    public int getImpressora() {
        return impressora;
    }

    public void setImpressora(int impressora) {
        this.impressora = impressora;
    }
}
