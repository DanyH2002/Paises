using Distribuidos.Api.Models;

namespace Distribuidos.Api.Services
{
    public interface IPipedreamService
    {
        Task<bool> SendWelcome(WelcomeModel body);
    }
}