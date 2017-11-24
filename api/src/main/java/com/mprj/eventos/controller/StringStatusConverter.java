package com.mprj.eventos.controller;

import com.mprj.eventos.model.Status;
import org.springframework.core.convert.converter.Converter;

public class StringStatusConverter
        implements Converter<String, Status> {


    @Override
    public Status convert(String source) {
        return Status.from(source);
    }
}
