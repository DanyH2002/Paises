using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Distribuidos.Api.Services;
using Distribuidos.Api.Models;

namespace Distribuidos.Api.Controllers
{
    [Route("api/pipedream")]
    [ApiController]
    public class PipedreamCrontroller : Controller
    {
        private readonly IPipedreamService _pipedreamService;
        public PipedreamCrontroller(IPipedreamService pipedreamService)
        {
            _pipedreamService = pipedreamService;
        }

        [HttpPost("welcome")]
        public async Task<IActionResult> WelcomeEmail([FromBody] WelcomeModel body)
        {
            try
            {
                bool result = await _pipedreamService.SendWelcome(body);
                return Ok(new
                {
                    error = false,
                    msj = result
                });
            }
            catch (Exception e)
            {
                return BadRequest(new
                {
                    error = true,
                    msj = e.Message
                });
            }
        }

    }
}
