package com.example

import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.databind.annotation.JsonNaming
import io.quarkus.mongodb.panache.common.MongoEntity
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId

@MongoEntity(collection = "Izdelki")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class Izdelek(
    @BsonId
    var id: ObjectId = ObjectId.get(),
    var naziv: String = "",
    var kolicina: String = "",
    var enota: String = "",
    var lokacija: String = ""
)
