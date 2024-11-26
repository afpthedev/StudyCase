package com.example.studycase.Controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class HelloController {

    @Operation(summary = "GET Endpoint", description = "Örnek bir GET endpoint'i")
    @GetMapping("/hello")
    public String exampleEndpoint() {
        return "Hello, Swagger!";
    }
}
