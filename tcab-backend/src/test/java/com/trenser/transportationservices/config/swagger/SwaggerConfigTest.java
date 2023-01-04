package com.trenser.transportationservices.config.swagger;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import springfox.documentation.spring.web.plugins.Docket;

public class SwaggerConfigTest {

    @Test
    public void swaggerConfigurationTest(){
        SwaggerConfig swaggerConfig = new SwaggerConfig();
        Docket docket = swaggerConfig.swaggerConfiguration();
        assertEquals("T-Cab v1", docket.getGroupName());
        assertEquals("2.0",docket.getDocumentationType().getVersion());
        assertEquals("swagger",docket.getDocumentationType().getName());
    }
    
}
