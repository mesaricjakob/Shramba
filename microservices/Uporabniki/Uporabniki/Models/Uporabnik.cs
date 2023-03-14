using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Uporabniki.Models
{
	public class Uporabnik
	{
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        [BsonElement("email")]
        public string email { get; set; }

        [BsonElement("ime")]
        public string ime { get; set; }

        [BsonElement("priimek")]
        public string priimek { get; set; }

        [BsonElement("geslo")]
        public string geslo { get; set; }

        public Uporabnik(string _id, string email, string ime, string priimek, string geslo)
		{
            this._id = _id;
            this.email = email;
            this.ime = ime;
            this.priimek = priimek;
            this.geslo = geslo;
		}

        public Uporabnik()
        { }
	}
}

