package com.mprj.eventos.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthenticationController {

    //private static final Logger logger = LoggerFactory.getLogger(AuthenticationController);

    private static final String USERNAME = "username";


    @RequestMapping(value = "/authenticate", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public HttpEntity<Map> isAuthenticated(HttpServletRequest request) {

        String username = request.getRemoteUser();

        if (username == null) {
            return new ResponseEntity<Map>(HttpStatus.UNAUTHORIZED);
        }

        Map<String, String> result = new HashMap<String, String>();
        result.put(USERNAME, request.getRemoteUser());

        return new HttpEntity(result);
    }

}
