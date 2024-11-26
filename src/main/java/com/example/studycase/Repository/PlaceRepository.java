package com.example.studycase.Repository;

import com.example.studycase.Entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    @Query("SELECT p FROM Place p WHERE p.latitude = :latitude AND p.longitude = :longitude AND p.radius = :radius")
    List<Place> findByLatitudeAndLongitudeAndRadius(@Param("latitude") String latitude, @Param("longitude") String longitude, @Param("radius") int radius);
}
