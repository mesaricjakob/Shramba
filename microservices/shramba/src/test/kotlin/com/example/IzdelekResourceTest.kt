package com.example

import io.quarkus.test.junit.QuarkusTest
import io.restassured.RestAssured
import io.smallrye.mutiny.Uni
import io.smallrye.mutiny.helpers.test.UniAssertSubscriber
import org.bson.types.ObjectId
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test
import javax.inject.Inject
import javax.ws.rs.core.MediaType


@QuarkusTest
class IzdelekResourceTest {

    @Inject
    lateinit var izdelekRepository: IzdelekRepository

    private val createdObjectIds = mutableListOf<ObjectId>()

    @AfterEach
    fun afterEach() {
        createdObjectIds.forEach { objectId ->
            izdelekRepository.deleteById(objectId).await().indefinitely()
        }
        createdObjectIds.clear()
    }

    @Test
    fun testGetAll() {
        RestAssured.given()
            .contentType(MediaType.APPLICATION_JSON)
            .`when`().get("/shramba") // Replace with your endpoint's path
            .then()
            .statusCode(200)
    }

    @Test
    fun testCreate() {
        val resource = IzdelekResource(izdelekRepository)

        val izdelek = Izdelek(ObjectId("64212e0574240a73b6e04854"), "Testni izdelek", "10", "test", "shramba")
        val result: Uni<Izdelek> = resource.create(izdelek)

        val createdIzdelek = result.subscribe().withSubscriber(UniAssertSubscriber.create())
            .await()
            .assertCompleted()
            .item

        assertNotNull(createdIzdelek.id)
        assertEquals(izdelek.naziv, createdIzdelek.naziv)
        assertEquals(izdelek.kolicina, createdIzdelek.kolicina)
        assertEquals(izdelek.enota, createdIzdelek.enota)
        assertEquals(izdelek.lokacija, createdIzdelek.lokacija)

        // Add the created ObjectId to the list for cleanup
        createdObjectIds.add(createdIzdelek.id)
    }
}
