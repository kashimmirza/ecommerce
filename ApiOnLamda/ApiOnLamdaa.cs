//using Amazon.Lambda.APIGatewayEvents;
//using Amazon.Lambda.Core;
//using System.Collections.Generic;
//using Amazon.Lambda.Annotations;
//using System.Text.Json.Serialization;
//using Amazon.Lambda.Serialization.SystemTextJson;
//using System.Text.Json;

//namespace ApiOnLamda
//{
//    using Amazon.Lambda.APIGatewayEvents;
//    using Amazon.Lambda.Core;
//    using System.Collections.Generic;
//    using System.Text.Json;

//    public class ApiOnLamdaa
//    {
//        public APIGatewayProxyResponse Get(APIGatewayProxyRequest request, ILambdaContext context)
//        {
//            context.Logger.LogInformation("Processing request...");

//            if (request == null || context == null)
//            {
//                return new APIGatewayProxyResponse
//                {
//                    StatusCode = 400,
//                    Body = "Invalid request",
//                    Headers = new Dictionary<string, string> { { "Content-Type", "text/plain" } }
//                };
//            }

//            return new APIGatewayProxyResponse
//            {
//                StatusCode = 200,
//                Body = "Hello AWS Lambda with .NET 6!",
//                Headers = new Dictionary<string, string> { { "Content-Type", "text/plain" } }
//            };
//        }
//    }
//}
