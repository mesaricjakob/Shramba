using NUnit.Framework;
using System;
using Uporabniki.Controllers;
using Uporabniki.Models;

namespace Uporabniki.Tests
{
	[TestFixture]
	public class UporabnikiTests
    {
        private UporabnikController _uporabnikController;

        [SetUp]
        public void Setup()
        {
            // Priprava instance kontrolerja
            _uporabnikController = new UporabnikController();
        }

        [Test]
        public void TestAddUser()
        {
            // Priprava testnega uporabnika
            var uporabnik = new Uporabnik
            {
                ime = "TestnoIme",
                priimek = "TestniPriimek",
                email = "testni.uporabnik@example.com",
                geslo = "testnoGeslo"
            };

            // Klic metode za dodajanje uporabnika
            var rezultat = _uporabnikController.AddUser(uporabnik);

            // Preverjanje, če je bil uporabnik uspešno dodan
            Assert.AreEqual("Uporabnik dodan", rezultat);
        }
    }
}
