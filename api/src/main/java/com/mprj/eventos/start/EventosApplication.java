package com.mprj.eventos.start;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@EnableAutoConfiguration()
@ComponentScan(basePackages = {"com.mprj.eventos"})
@EntityScan(basePackages = {"com.mprj.eventos.model"})
@EnableJpaRepositories({"com.mprj.eventos.repository"})
@EnableGlobalMethodSecurity(securedEnabled = true)
//@EnableWebSecurity
@EnableWebMvc
@SpringBootApplication
@Configuration
public class EventosApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventosApplication.class, args);
	}
}
