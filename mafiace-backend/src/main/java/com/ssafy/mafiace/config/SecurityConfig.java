package com.ssafy.mafiace.config;

import com.ssafy.mafiace.api.service.UserService;
import com.ssafy.mafiace.common.auth.JwtAuthenticationFilter;
import com.ssafy.mafiace.common.auth.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;

    private final JwtTokenProvider jwtTokenProvider;

    // 암호화에 필요한 PasswordEncoder를 Bean 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // authenticationManager를 Bean 등록
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .httpBasic().disable() // rest api 만을 고려하여 기본 설정은 해제
            .csrf().disable() // csrf 보안 토큰 disable처리.
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 역시 사용 X
            .and()
            .authorizeRequests() // 요청에 대한 사용권한 체크
            .antMatchers(HttpMethod.PATCH, "/api/user").authenticated()
            .antMatchers("/api/session/**").authenticated()
            .antMatchers("/api/game/**").authenticated()
            .anyRequest().permitAll() // 그외 나머지 요청은 누구나 접근 가능
            .and()
            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                UsernamePasswordAuthenticationFilter.class);
            // JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 전에 삽입
    }
}