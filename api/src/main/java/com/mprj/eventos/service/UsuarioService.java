package com.mprj.eventos.service;

import com.mprj.eventos.model.Usuario;
import com.mprj.eventos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by philippe.silva on 26/05/2017.
 */

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public Usuario loginUsuario(Usuario usuario){

        return usuarioRepository.loginUsuario(usuario);
    }

}
