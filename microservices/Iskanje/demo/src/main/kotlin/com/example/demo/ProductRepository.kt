package com.example.demo

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ProductRepository : MongoRepository<Product, String> {
    @Query("{ 'naziv' : ?0 }")
    fun findByName(naziv: String): List<Product>
    @Query("{ 'lokacija' : ?0 }")
    fun findByLocation(lokacija: String): List<Product>
}
