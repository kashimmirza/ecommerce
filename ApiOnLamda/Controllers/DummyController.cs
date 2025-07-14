using Microsoft.AspNetCore.Mvc;
using System;

namespace ApiOnLambda.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DummyController : ControllerBase
    {
        public DummyController()
        {
            // Define an array of 10 countries
            string[] countries = new string[]
            {
                "United States", "Canada", "United Kingdom", "Germany", "France",
                "Australia", "Japan", "India", "Brazil", "South Africa"
            };

            // Print each country to the console when the app starts
            Console.WriteLine("List of 10 Countries:");
            foreach (var country in countries)
            {
                Console.WriteLine(country);
            }
        }

        [HttpGet("countries")]
        public IActionResult GetCountries()
        {
            string[] countries = new string[]
            {
                "United States", "Canada", "United Kingdom", "Germany", "France",
                "Australia", "Japan", "India", "Brazil", "South Africa"
            };

            return Ok(countries);
        }
    }
}

