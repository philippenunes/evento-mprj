package com.mprj.eventos.controller;

import org.springframework.core.convert.converter.Converter;

public class StringStatusConverter
        implements Converter<String, Status> {


    @Override
    public Status convert(String source) {
        return Status.from(source);
    }
}
