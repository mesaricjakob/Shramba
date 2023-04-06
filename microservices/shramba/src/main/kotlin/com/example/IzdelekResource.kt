package com.example

import io.quarkus.mongodb.panache.kotlin.reactive.ReactivePanacheMongoRepository
import io.smallrye.mutiny.Uni
import org.bson.types.ObjectId
import javax.inject.Singleton
import javax.ws.rs.*
import javax.ws.rs.core.MediaType

@Path("/shramba")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class IzdelekResource(private val izdelekRepository: IzdelekRepository) {

    @GET
    fun getAll(): Uni<List<Izdelek>> {
        return izdelekRepository.listAll()
    }

    @POST
    fun create(izdelek: Izdelek): Uni<Izdelek> {
        return izdelekRepository.persist(izdelek)
    }

    @PUT
    @Path("{id}")
    fun update(@PathParam("id") id: String, izdelek: Izdelek): Uni<Izdelek> {
        return izdelekRepository.findById(ObjectId(id))
            .onItem().transform { existingIzdelek ->
                existingIzdelek?.naziv = izdelek.naziv
                existingIzdelek?.kolicina = izdelek.kolicina
                existingIzdelek?.enota = izdelek.enota
                existingIzdelek?.lokacija = izdelek.lokacija
                existingIzdelek ?: throw NotFoundException("Izdelek with id $id not found") // throw an exception if the existingIzdelek is null
            }
            .flatMap { izdelekRepository.update(it) }
    }

    @DELETE
    @Path("{id}")
    fun delete(@PathParam("id") id: String): Uni<Boolean> {
        return izdelekRepository.deleteById(ObjectId(id))
    }
}

@Singleton
class IzdelekRepository : ReactivePanacheMongoRepository<Izdelek>
