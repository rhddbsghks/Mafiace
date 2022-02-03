package com.ssafy.mafiace.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Spring Data JPA 관련 추가 설정 정의.
 */
@Configuration
public class JpaConfig {
    @PersistenceContext
    EntityManager entityManager;

    @Bean
    public JPAQueryFactory jpaQueryFactory() {
        return new JPAQueryFactory(entityManager);
    }

//    @Bean
//    @Primary
//    public ObjectMapper objectMapper() {
//        JavaTimeModule timeModule = new JavaTimeModule();
//
//        timeModule.addDeserializer(LocalDate.class,
//            new LocalDateDeserializer(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
//
//        timeModule.addDeserializer(LocalDateTime.class,
//            new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS")));
//
//        timeModule.addSerializer(LocalDate.class,
//            new LocalDateSerializer(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
//
//        timeModule.addSerializer(LocalDateTime.class,
//            new LocalDateTimeSerializer(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS")));
//
//        return new ObjectMapper()
//            .configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false)
//            .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
//            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
//            .configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false)
//            .configure(DeserializationFeature.READ_DATE_TIMESTAMPS_AS_NANOSECONDS, false)
//            .registerModule(timeModule)
//            .registerModule(new ParameterNamesModule())
//            .registerModule(new Jdk8Module());
//
//    }
}
