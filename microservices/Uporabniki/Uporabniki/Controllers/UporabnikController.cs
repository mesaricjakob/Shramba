using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Uporabniki.Models;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
namespace Uporabniki.Controllers
{
    [ApiController]
    [Route("/Uporabniki")]
    public class UporabnikController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public MongoClient mongoClient;
        public IMongoCollection<Uporabnik> collection;

        public UporabnikController(IConfiguration configuration)
        {
            _configuration = configuration;
            mongoClient = new MongoClient(_configuration.GetConnectionString("MongoPovezava"));
            collection = mongoClient.GetDatabase("ITA").GetCollection<Uporabnik>("Uporabniki");
        }

        // Pridobi vse uporabnike
        [Route("/api/getAllUsers")]
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            System.Diagnostics.Debug.WriteLine("Klican getAllUsers api endpoint");
            var odg = collection.AsQueryable();
            return new JsonResult(odg);
        }

        // Registracija
        [Route("/api/register")]
        [HttpPost]
        public string Register([FromBody] Uporabnik uporabnik)
        {
            System.Diagnostics.Debug.WriteLine("Klican register api endpoint");
            uporabnik._id = null;
            collection.InsertOne(uporabnik);

            return "Uporabnik registriran";
        }

        // Prijava
        [Route("/api/login/{email}:{geslo}")]
        [HttpGet]
        public string GetLogin(string email, string geslo)
        {
            System.Diagnostics.Debug.WriteLine("Klican login api endpoint");
            List<Uporabnik> vsi = collection.AsQueryable().ToList();
            List<Uporabnik> iskani = new List<Uporabnik>();
            Uporabnik iskan = new Uporabnik();

            foreach (Uporabnik uporabnik in vsi)
            {
                if (uporabnik.email.ToUpper() == email.ToUpper() && uporabnik.geslo == geslo)
                {
                    iskan = uporabnik;
                    return "Prijava OK";
                }
            }

            return "Napačen mail ali geslo";
        }


        // Izbriši uporabnika
        [Route("/api/delete/{id}")]
        [HttpDelete]
        public string DeleteUser(string id)
        {
            System.Diagnostics.Debug.WriteLine("Klican delete api endpoint");
            var filter = Builders<Uporabnik>.Filter.Eq("_id", id);
            collection.DeleteOne(filter);

            return "Uporabnik izbrisan";
        }

    }
}

