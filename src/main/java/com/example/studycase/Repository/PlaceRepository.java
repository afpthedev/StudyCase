package com.example.studycase.Repository;

import com.example.studycase.Entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByLatitudeAndLongitudeAndRadius(String latitude, String longitude, int radius);

}
