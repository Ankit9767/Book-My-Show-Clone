package com.example.BookMyShow.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BookMyShow.Domain.City;
import com.example.BookMyShow.Repository.CityRepository;

@Service
public class CityService {

    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public City addCity(City city) {
        return cityRepository.save(city);
    }
    
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

}

