/**
 *  Guick Generate class: https://github.com/wdavilaneto/guick
 *  Author: service-wdavilaneto@redhat.com
 *  This source is free under The Apache Software License, Version 2.0
 *  license url http://www.apache.org/licenses/LICENSE-2.0.txt
 */
package com.mprj.eventos.security;

import com.mprj.eventos.security.provider.SecurityAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.Resource;


/**
 * Application Security Configuration
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {


    @Resource
    private Http401UnauthorizedEntryPoint authenticationEntryPoint;

    @Resource
    SecurityAuthenticationProvider securityAuthenticationProvider;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(securityAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
      http
        .httpBasic()
            .and()
            .exceptionHandling()
            .authenticationEntryPoint(authenticationEntryPoint)
            .and()
        .authorizeRequests()
              .antMatchers("/", "/login").permitAll()
              .anyRequest().authenticated()
//            .and()
//        .logout()
//        .logoutUrl("/api/logout")
//        .logoutSuccessHandler(ajaxLogoutSuccessHandler)
//        .deleteCookies("JSESSIONID")
//        .permitAll()
        .and()
        .csrf()
        .disable()
        .headers()
        .frameOptions()
        .disable();


    }
}
