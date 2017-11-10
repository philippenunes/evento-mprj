package com.mprj.eventos.configuration;

import com.mprj.eventos.controller.StringStatusConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.ConverterRegistry;

import javax.annotation.PostConstruct;

@Configuration
public class WebConfig {

    @Autowired
    private ConverterRegistry converterRegistry;

    @PostConstruct
    public void init() {
        registerConverters();
    }

    private void registerConverters() {
        converterRegistry.addConverter(new StringStatusConverter());
    }
}