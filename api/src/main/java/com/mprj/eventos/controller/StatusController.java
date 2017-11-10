package com.mprj.eventos.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

/**
 * Created by evento.cnmp on 10/11/2017.
 */

@RestController
public class StatusController {

    @GetMapping( value = "/status")
    private List<Status> getStatus() {

        return Arrays.asList(Status.values());
    }
}
