package com.example.studycase.Service;

import com.example.studycase.DTO.PlaceDTO;
import com.example.studycase.Entity.Place;
import com.example.studycase.Repository.PlaceRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Getter
@Setter
public class PlaceService {
    private final PlaceRepository repository;

    @Value("${google.api.key}")
    private String apiKey;

    public PlaceService(PlaceRepository repository) {
        this.repository = repository;
    }


    public List<Place> getNearbyPlaces(String longitude, String latitude, int radius) {

        List<Place> cachedPlaces = repository.findByLatitudeAndLongitudeAndRadius(latitude, longitude, radius);
        if (!cachedPlaces.isEmpty()) {
            return cachedPlaces;
        }

        String url = String.format("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=%s,%s&radius=%d&key=%s",
                latitude, longitude, radius, apiKey);


        List<Place> fetchedPlaces = fetchPlacesFromApi(url);
        repository.saveAll(fetchedPlaces);
        return fetchedPlaces;
    }

    private List<Place> fetchPlacesFromApi(String url) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<PlaceDTO> response = restTemplate.getForEntity(url, PlaceDTO.class);


        PlaceDTO placeDTO = response.getBody();
        if (placeDTO == null || !"OK".equals(placeDTO.getStatus())) {
            return new ArrayList<>();
        }

        return placeDTO.getResults().stream().map(result -> {
            Place place = new Place();
            place.setName(result.getName());
            place.setAddress(result.getVicinity());
            place.setLatitude(String.valueOf(result.getGeometry().getLocation().getLat()));
            place.setLongitude(String.valueOf(result.getGeometry().getLocation().getLng()));
            return place;
        }).collect(Collectors.toList());
    }

}
