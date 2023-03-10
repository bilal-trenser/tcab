package com.trenser.transportationservices.config.swagger;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Class for Defining Swagger Configurations.
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    
    @Bean
    public Docket swaggerConfiguration() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("T-Cab v1")
                .select()
                .paths(PathSelectors.ant("/tcab/v1/**"))
                .apis(RequestHandlerSelectors.basePackage("com.trenser"))
                .build()
                .apiInfo(apiDetails());
    }

    private ApiInfo apiDetails() {
        return new ApiInfo(
                "T-Cab Application API",
                "API list for T-Cab application",
                "v1",
                "termsOfServiceUrl",
                new springfox.documentation.service.Contact("Trenser", "https://www.trenser.com/", "email"),
                "API License",
                "licenseUrl",
                Collections.emptyList());
    }
}
