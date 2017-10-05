package com.mprj.eventos.controller;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * Created by philippe.silva on 26/05/2017.
 */
@RestController
@ComponentScan({"com.mprj.eventos.service"})
public class UsuarioController {

    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }
}
