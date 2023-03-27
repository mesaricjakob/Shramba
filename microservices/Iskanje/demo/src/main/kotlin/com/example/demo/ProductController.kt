package com.example.demo

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/products")
class ProductController(private val productRepository: ProductRepository) {

    @GetMapping
    fun getAllProducts(): List<Product> {
        return productRepository.findAll()
    }

    @GetMapping("/name/{ime}")
    fun searchProducts(@PathVariable ime:String): List<Product> {
        return productRepository.findByName(ime)
    }

    @GetMapping("/location/{lokacija}")
    fun searchLocation(@PathVariable lokacija:String): List<Product> {
        return productRepository.findByLocation(lokacija)
    }
}
