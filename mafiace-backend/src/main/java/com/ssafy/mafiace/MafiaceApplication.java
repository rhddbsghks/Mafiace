package com.ssafy.mafiace;

import java.nio.charset.StandardCharsets;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.filter.CharacterEncodingFilter;

@SpringBootApplication
public class MafiaceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MafiaceApplication.class, args);
	}

}
