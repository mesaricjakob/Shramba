package com.example.demo

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "Izdelki")
class Product(
    @Id var _id: String,
    var naziv: String,
    var kolicina: Double,
    var enota_kolicine: String,
    var lokacija: String
)
