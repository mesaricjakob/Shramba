using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MongoDB.Driver;
using Uporabniki.Controllers;
using Uporabniki.Models;

namespace UporabnikiTest;

[TestClass]
public class UnitTest1
{
    private UporabnikController _controller;

    [TestInitialize]
    public void Setup()
    {
        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();
        var connectionString = config.GetConnectionString("MongoPovezava");
        var client = new MongoClient(connectionString);
        var database = client.GetDatabase("ITA");
        var collection = database.GetCollection<Uporabnik>("Uporabniki");

        _controller = new UporabnikController(config)
        {
            collection = collection
        };
    }

    [TestMethod]
    public void TestAddUser()
    {
        // Arrange
        var user = new Uporabnik
        {
            ime = "Test",
            priimek = "Test",
            email = "test@example.com",
            geslo = "test123"
        };

        // Act
        var result = _controller.Register(user);

        // Assert
        Assert.AreEqual("Uporabnik registriran", result);
    }
}