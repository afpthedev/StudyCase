package com.example.studycase.Repository;

import com.example.studycase.Entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    /**
     * Finds places by given latitude, longitude and radius. The query is optimized with an index.
     * @param latitude the latitude of the location
     * @param longitude the longitude of the location
     * @param radius the radius from the location
     * @return a list of places
     */
    @Query("SELECT p FROM Place p WHERE p.latitude = :latitude AND p.longitude = :longitude AND p.radius = :radius")
    List<Place> findByLatitudeAndLongitudeAndRadius(@Param("latitude") String latitude, @Param("longitude") String longitude, @Param("radius") int radius);
}
