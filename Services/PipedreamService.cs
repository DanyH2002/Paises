using System.Text;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Distribuidos.Api.Models;

namespace Distribuidos.Api.Services
{
    public class PipedreamService : IPipedreamService
    {
        public async Task<bool> SendWelcome(WelcomeModel body)
        {
            string url = "https://eo4ez95qssnrxi0.m.pipedream.net";
            var client = new HttpClient();
            var bytedata = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(new { user_name = body.UserName, email = body.Email }));
            using (var content = new ByteArrayContent(bytedata))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                var response = await client.PostAsync(url, content);
                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
                return false;
            }
        }
    }
}