package com.example.studycase.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class PlaceDTO {

    @JsonProperty("results")
    private List<Result> results;

    @JsonProperty("status")
    private String status;



    @JsonIgnoreProperties(ignoreUnknown = true)
    @Getter
    @Setter
    public static class Result {
        @JsonProperty("name")
        private String name;

        @JsonProperty("vicinity")
        private String vicinity;

        @JsonProperty("geometry")
        private Geometry geometry;
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Geometry {
        @JsonProperty("location")
        private Location location;

    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Location {
        @JsonProperty("lat")
        private double lat;

        @JsonProperty("lng")
        private double lng;

    }
}
