package com.example.studycase.Controller;

import com.example.studycase.Entity.Place;
import com.example.studycase.Service.PlaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
public class PlaceController {
    private final PlaceService service;

    public PlaceController(PlaceService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Place>> getPlaces(@RequestParam String longitude,
                                                 @RequestParam String latitude,
                                                 @RequestParam int radius) {
        return ResponseEntity.ok(service.getNearbyPlaces(longitude, latitude, radius));
    }
}
