using ApiOnLamda;
using ApiOnLamda.Services;
using ApiOnLamda.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.OpenApi.Models;
using Amazon.S3;
using Amazon.Lambda.AspNetCoreServer;
using Amazon.Extensions.NETCore.Setup;

var builder = WebApplication.CreateBuilder(args);

// AWS & S3
builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
//builder.Services.AddAWSLambdaHosting(LambdaEventSource.RestApi);
//builder.Services.AddAWSService<IAmazonS3>();
//builder.Services.AddScoped<S3Service>();

// Logging
builder.Logging.AddConsole();

// Connection String (from environment or fallback)
var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
    ?? builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connectionString))
    throw new InvalidOperationException("Database connection string not found.");

builder.Services.AddScoped<DatabaseHelper>(_ => new DatabaseHelper(connectionString));

// Authentication (Google + Cookie)
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddCookie()
.AddGoogle(options =>
{
    options.ClientId = builder.Configuration["Google:ClientId"];
    options.ClientSecret = builder.Configuration["Google:ClientSecret"];
    options.Scope.Add("email");
    options.SaveTokens = true;
});

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
    c.OperationFilter<SwaggerFileOperationFilter>();
});

// CORS Configuration for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/users", () => "Hello User");
app.MapFallback(() => Results.NotFound("Route not found. Check API paths."));

app.Run();


//using ApiOnLamda;
//using Microsoft.AspNetCore.Authentication.Cookies;
//using Microsoft.AspNetCore.Authentication.Google;
//using ApiOnLamda.Services;
//using ApiOnLamda.Data;
//using ApiOnLamda.Model;
//using Microsoft.Extensions.FileProviders;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;
//using Microsoft.AspNetCore.Hosting;
//using Amazon.S3;
//using Amazon.S3.Transfer;
////using PdfSharp.Charting;
//using Amazon.Lambda.AspNetCoreServer;
//using Amazon.Lambda.APIGatewayEvents;
//using PdfSharpCore.Fonts;
//using Amazon.Extensions.NETCore.Setup;


//var builder = WebApplication.CreateBuilder(args);

//// Add AWS Options and Lambda Hosting
//builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
////builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);
//builder.Services.AddAWSLambdaHosting(LambdaEventSource.RestApi);
//builder.Services.AddAWSService<IAmazonS3>();
//builder.Services.AddAWSService<AmazonS3Client>();

//builder.Services.AddScoped<S3Service>();

//builder.Logging.AddConsole();

//// Read the connection string from environment variable (recommended for AWS Lambda)
//var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");

//if (string.IsNullOrEmpty(connectionString))
//{
//    // Fallback to reading from appsettings.json if not found in environment variables
//    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//}

//// Throw an exception if the connection string is still not set
//if (string.IsNullOrEmpty(connectionString))
//{
//    throw new InvalidOperationException("Connection string not found in environment variables or appsettings.json.");
//}

//// Register DatabaseHelper for ADO.NET operations (no EF required)
//builder.Services.AddScoped<DatabaseHelper>(serviceProvider => new DatabaseHelper(connectionString));
//// Set up Google OAuth authentication (commented out, but remains in your code)
//builder.Services.AddAuthentication(options =>
//{
//   options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
//   options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
//})
//.AddCookie()
//.AddGoogle(options =>
//{
//   options.ClientId = builder.Configuration["Google:ClientId"];
//   options.ClientSecret = builder.Configuration["Google:ClientSecret"];
//   options.Scope.Add("email");
//   options.SaveTokens = true;
//});

////// Register custom Google authentication service (commented out, but remains in your code)
////builder.Services.AddScoped<IGoogleAuthService, GoogleAuthService>();
////builder.Services.Configure<GoogleAuthConfig>(builder.Configuration.GetSection("Google"));

////builder.Services.AddAuthentication(options =>
////{
////    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
////    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
////})
////.AddCookie()
////.AddGoogle(options =>
////{
////    // Try to read Google ClientId and ClientSecret from environment variables
////    string clientId = Environment.GetEnvironmentVariable("Google__ClientId");
////    string clientSecret = Environment.GetEnvironmentVariable("Google__ClientSecret");

////    // If not found in environment variables, fall back to appsettings.json
////    if (string.IsNullOrEmpty(clientId))
////    {
////        clientId = builder.Configuration["Google:ClientId"];
////    }

////    if (string.IsNullOrEmpty(clientSecret))
////    {
////        clientSecret = builder.Configuration["Google:ClientSecret"];
////    }

////    // Check if both clientId and clientSecret are found
////    if (string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret))
////    {
////        throw new InvalidOperationException("Google authentication credentials are missing.");
////    }

////    // Set the ClientId and ClientSecret
////    options.ClientId = clientId;
////    options.ClientSecret = clientSecret;

////    options.Scope.Add("email");
////    options.SaveTokens = true;
////});

////// Register custom Google authentication service (if needed)
////builder.Services.AddScoped<IGoogleAuthService, GoogleAuthService>();

////// Configure GoogleAuthConfig from either environment variables or appsettings.json
////builder.Services.Configure<GoogleAuthConfig>(config =>
////{
////    string clientId = Environment.GetEnvironmentVariable("Google__ClientId");
////    string clientSecret = Environment.GetEnvironmentVariable("Google__ClientSecret");

////    if (string.IsNullOrEmpty(clientId))
////    {
////        clientId = builder.Configuration["Google:ClientId"];
////    }

////    if (string.IsNullOrEmpty(clientSecret))
////    {
////        clientSecret = builder.Configuration["Google:ClientSecret"];
////    }

////    if (string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret))
////    {
////        throw new InvalidOperationException("Google authentication credentials are missing.");
////    }

////    config.ClientId = clientId;
////    config.ClientSecret = clientSecret;
////});



//// Add controllers
//builder.Services.AddControllers();

//// Swagger/OpenAPI configuration
//builder.Services.AddSwaggerGen(c =>
//{
//    c.OperationFilter<SwaggerFileOperationFilter>();
//});

//// Configure CORS (optional, if you want to allow frontend app access)
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowSpecificOrigin", policy =>
//    {
//        //policy.WithOrigins("http://anika.fashion.s3-website-us-east-1.amazonaws.com/")
//        policy.WithOrigins("http://localhost:3000/")
//              .AllowAnyMethod()
//              .AllowAnyHeader()
//              .AllowCredentials();
//    });
//});

//var app = builder.Build();

//// Enable Swagger for development
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();
//app.UseCors("AllowSpecificOrigin");
//app.UseAuthentication();
//app.UseAuthorization();

//// Define a test route
//app.MapGet("/users", () => "Hello User");

//// Enable controllers
//app.MapControllers();

//// Fallback route for unrecognized paths
//app.MapFallback(() => Results.NotFound("Route not found. Check API paths."));

//// Run the application
//app.Run();
