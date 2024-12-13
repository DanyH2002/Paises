using Distribuidos.Api.Services;

var builder = WebApplication.CreateBuilder(args);
// Agregar configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Permitir tu frontend de Angular
              .AllowAnyHeader() // Permitir cualquier encabezado
              .AllowAnyMethod(); // Permitir cualquier método (GET, POST, etc.)
    });
});

builder.Services.AddControllers();
builder.Services.AddSingleton<IPipedreamService, PipedreamService>();


var app = builder.Build();

// Usar CORS
app.UseCors("AllowAngularApp");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
