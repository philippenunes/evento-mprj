package com.mprj.eventos.start;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@EnableAutoConfiguration()
@ComponentScan(basePackages = {"com.mprj.eventos"})
//@EntityScan(basePackages = {"com.mprj.eventos.model"})
@EnableJpaRepositories({"com.mprj.eventos.repository"})
@EnableGlobalMethodSecurity(securedEnabled = true)
@EnableWebSecurity
@SpringBootApplication
public class EventosApplicationTests {

	public static void main(String[] args) {
		SpringApplication.run(EventosApplicationTests.class, args);
	}
}
