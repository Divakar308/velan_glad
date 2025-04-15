using dotnetapp.Exceptions;
using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Linq;
using System.Reflection;
using dotnetapp.Services;
using System;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;

namespace dotnetapp.Tests
{
    [TestFixture]
    public class Tests
    {

        private ApplicationDbContext _context; 
        private HttpClient _httpClient;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseInMemoryDatabase(databaseName: "TestDatabase").Options;
            _context = new ApplicationDbContext(options);
           
             _httpClient = new HttpClient();
             _httpClient.BaseAddress = new Uri("http://localhost:8080");

        }

        [TearDown]
        public void TearDown()
        {
             _context.Dispose();
        }

   [Test, Order(1)]
    public async Task Backend_Test_Post_Method_Register_Admin_Returns_HttpStatusCode_OK()
    {
        ClearDatabase();
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Admin\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        Console.WriteLine(response.StatusCode);
        string responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseString);
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }
  
   [Test, Order(2)]
    public async Task Backend_Test_Post_Method_Login_Admin_Returns_HttpStatusCode_OK()
    {
        ClearDatabase();

        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Admin\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
    }


   [Test, Order(3)]
    public async Task Backend_Test_Post_Internship_With_Token_By_Admin_Returns_HttpStatusCode_OK()
    {
        ClearDatabase();
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";

        string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Admin\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        // Print registration response
        string registerResponseBody = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Registration Response: " + registerResponseBody);

        // Login with the registered user
        string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

        // Print login response
        string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
        Console.WriteLine("Login Response: " + loginResponseBody);

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);

        string uniquecompanyname = Guid.NewGuid().ToString();

        // Use a dynamic and unique userName for admin (appending timestamp)
        string uniqueinternship = $"internship_{uniquecompanyname}";

        string internshipjson = $"{{\"Title\":\"Software Developer Intern\",\"CompanyName\":\"{uniqueinternship}\",\"Location\":\"Remote\",\"DurationInMonths\":6,\"Stipend\":1500.00,\"Description\":\"Develop and maintain web applications.\",\"SkillsRequired\":\"C#, .NET, React\",\"ApplicationDeadline\":\"2025-03-31\"}}";
        

        Console.WriteLine("Token: " + token);
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage internshipresponse = await _httpClient.PostAsync("/api/internship",
        new StringContent(internshipjson, Encoding.UTF8, "application/json"));

       Console.WriteLine("internshipresponse"+internshipresponse);

        Assert.AreEqual(HttpStatusCode.OK, internshipresponse.StatusCode);
    }


    [Test, Order(4)]

    public async Task Backend_Test_Post_Internship_Without_Token_By_Admin_Returns_HttpStatusCode_Unauthorized()
    {
            ClearDatabase();
            string uniqueId = Guid.NewGuid().ToString();

            // Generate a unique userName based on a timestamp
            string uniqueUsername = $"abcd_{uniqueId}";
            string uniqueEmail = $"abcd{uniqueId}@gmail.com";

            string requestBody = $"{{\"Username\": \"{uniqueUsername}\", \"Password\": \"abc@123A\", \"Email\": \"{uniqueEmail}\", \"MobileNumber\": \"1234567890\", \"UserRole\": \"Admin\"}}";
            HttpResponseMessage response = await _httpClient.PostAsync("/api/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

            // Print registration response
            string registerResponseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine("Registration Response: " + registerResponseBody);

            // Login with the registered user
            string loginRequestBody = $"{{\"Email\" : \"{uniqueEmail}\",\"Password\" : \"abc@123A\"}}"; // Updated variable names
            HttpResponseMessage loginResponse = await _httpClient.PostAsync("/api/login", new StringContent(loginRequestBody, Encoding.UTF8, "application/json"));

            // Print login response
            string loginResponseBody = await loginResponse.Content.ReadAsStringAsync();
            Console.WriteLine("Login Response: " + loginResponseBody);

            Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
    
            string uniquecompanyname = Guid.NewGuid().ToString();

            // Use a dynamic and unique userName for admin (appending timestamp)
            string uniqueinternship = $"internship_{uniquecompanyname}";

            string internshipjson = $"{{\"Title\":\"Software Developer Intern\",\"CompanyName\":\"{uniqueinternship}\",\"Location\":\"Remote\",\"DurationInMonths\":6,\"Stipend\":1500.00,\"Description\":\"Develop and maintain web applications.\",\"SkillsRequired\":\"C#, .NET, React\",\"ApplicationDeadline\":\"2025-03-31\"}}";

            HttpResponseMessage internshipresponse = await _httpClient.PostAsync("/api/internship",
            new StringContent(internshipjson, Encoding.UTF8, "application/json"));

            Console.WriteLine("internshipresponse"+internshipresponse);

            Assert.AreEqual(HttpStatusCode.Unauthorized, internshipresponse.StatusCode);
    }


    [Test, Order(5)]
    public async Task Backend_Test_Get_Method_Get_InternshipById_In_Internship_Service_Fetches_Internship_Successfully()
    {
        ClearDatabase();


    var internshipData = new Dictionary<string, object>
    {
        { "InternshipId", 20 }, // Unique identifier for the internship position
        { "Title", "Sustainable Agriculture Internship" }, // Title of the internship
        { "CompanyName", "GreenFuture Inc." }, // Name of the company offering the internship
        { "Location", "Remote" }, // Location of the internship
        { "DurationInMonths", 24 }, // Duration of the internship in months
        { "Stipend", 1500.00m }, // Monthly stipend offered
        { "Description", "A hands-on internship focused on sustainable farming practices and agricultural innovations." }, // Description of the internship
        { "SkillsRequired", "Agriculture knowledge, sustainability practices, data analysis" }, // Required skills for the internship
        { "ApplicationDeadline", "2025-03-31" } // Last date to apply
    };



        var internship = new Internship();
        foreach (var kvp in internshipData)
        {
            var propertyInfo = typeof(Internship).GetProperty(kvp.Key);
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(internship, kvp.Value);
            }
        }
        _context.Internships.Add(internship);
        _context.SaveChanges();

        string assemblyName = "dotnetapp";
        Assembly assembly = Assembly.Load(assemblyName);
        string ServiceName = "dotnetapp.Services.InternshipService";
        string typeName = "dotnetapp.Models.Internship";

        Type serviceType = assembly.GetType(ServiceName);
        Type modelType = assembly.GetType(typeName);


        MethodInfo getInternshipMethod = serviceType.GetMethod("GetInternshipById");
    

        if (getInternshipMethod != null)
        {
            var service = Activator.CreateInstance(serviceType, _context);
            var retrievedInternship = (Task<Internship>)getInternshipMethod.Invoke(service, new object[] { 20 });

            Assert.IsNotNull(retrievedInternship);
            Assert.AreEqual(internship.CompanyName, retrievedInternship.Result.CompanyName);
        }
        else
        {
            Assert.Fail();
        }

    }

    [Test, Order(6)]
    public async Task Backend_Test_Put_Method_UpdateInternship_In_Internship_Service_Updates_Internship_Successfully()
    {
        ClearDatabase();

    var internshipData = new Dictionary<string, object>
    {
        { "InternshipId", 20 }, // Unique identifier for the internship position
        { "Title", "Sustainable Agriculture Internship" }, // Title of the internship
        { "CompanyName", "GreenFuture Inc." }, // Name of the company offering the internship
        { "Location", "Remote" }, // Location of the internship
        { "DurationInMonths", 24 }, // Duration of the internship in months
        { "Stipend", 1500.00m }, // Monthly stipend offered
        { "Description", "A hands-on internship focused on sustainable farming practices and agricultural innovations." }, // Description of the internship
        { "SkillsRequired", "Agriculture knowledge, sustainability practices, data analysis" }, // Required skills for the internship
        { "ApplicationDeadline", "2025-03-31" } // Last date to apply
    };


        var internship = new Internship();
        foreach (var kvp in internshipData)
        {
            var propertyInfo = typeof(Internship).GetProperty(kvp.Key);
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(internship, kvp.Value);
            }
        }
        _context.Internships.Add(internship);
        _context.SaveChanges();

        string assemblyName = "dotnetapp";
        Assembly assembly = Assembly.Load(assemblyName);
        string ServiceName = "dotnetapp.Services.InternshipService";
        string typeName = "dotnetapp.Models.Internship";

        Type serviceType = assembly.GetType(ServiceName);
        Type modelType = assembly.GetType(typeName);


        MethodInfo updatemethod = serviceType.GetMethod("UpdateInternship", new[] { typeof(int), modelType });


        if (updatemethod != null)
        {
            var service = Activator.CreateInstance(serviceType, _context);
            // Update the internship

            var updatedInternshipData = new Dictionary<string, object>
        {
        { "InternshipId", 20 }, // Unique identifier for the internship position
        { "Title", "Sustainable Agriculture Internship" }, // Title of the internship
        { "CompanyName", "FocusR" }, // Name of the company offering the internship
        { "Location", "Remote" }, // Location of the internship
        { "DurationInMonths", 24 }, // Duration of the internship in months
        { "Stipend", 1500.00m }, // Monthly stipend offered
        { "Description", "A hands-on internship focused on sustainable farming practices and agricultural innovations." }, // Description of the internship
        { "SkillsRequired", "Agriculture knowledge, sustainability practices, data analysis" }, // Required skills for the internship
        { "ApplicationDeadline", "2025-03-31" } // Last date to apply
    };


            var updatedInternship = Activator.CreateInstance(modelType);
            foreach (var kvp in updatedInternshipData)
            {
                var propertyInfo = modelType.GetProperty(kvp.Key);
                if (propertyInfo != null)
                {
                    propertyInfo.SetValue(updatedInternship, kvp.Value);
                }
            }

            var updateResult = (Task<bool>)updatemethod.Invoke(service, new object[] { 20, updatedInternship });

            var updatedInternshipFromDb = await _context.Internships.FindAsync(20);
            Assert.IsNotNull(updatedInternshipFromDb);
            Assert.AreEqual("FocusR", updatedInternshipFromDb.CompanyName);

        }
        else
        {
            Assert.Fail();
        }   
    }

    [Test, Order(7)]
    public async Task Backend_Test_Delete_Method_DeleteInternship_In_Internship_Service_Deletes_Internship_Successfully()
    {
        ClearDatabase();
        // Add internship
        var internshipData = new Dictionary<string, object>
    {
        { "InternshipId", 4 }, // Unique identifier for the internship position
        { "Title", "Sustainable Agriculture Internship" }, // Title of the internship
        { "CompanyName", "GreenFuture Inc." }, // Name of the company offering the internship
        { "Location", "Remote" }, // Location of the internship
        { "DurationInMonths", 24 }, // Duration of the internship in months
        { "Stipend", 1500.00m }, // Monthly stipend offered
        { "Description", "A hands-on internship focused on sustainable farming practices and agricultural innovations." }, // Description of the internship
        { "SkillsRequired", "Agriculture knowledge, sustainability practices, data analysis" }, // Required skills for the internship
        { "ApplicationDeadline", "2025-03-31" } // Last date to apply
    };


        var internship = new Internship();
        foreach (var kvp in internshipData)
        {
            var propertyInfo = typeof(Internship).GetProperty(kvp.Key);
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(internship, kvp.Value);
            }
        }

        _context.Internships.Add(internship);
        _context.SaveChanges();

        string assemblyName = "dotnetapp";
        Assembly assembly = Assembly.Load(assemblyName);
        string ServiceName = "dotnetapp.Services.InternshipService";
        string typeName = "dotnetapp.Models.Internship";

        Type serviceType = assembly.GetType(ServiceName);
        Type modelType = assembly.GetType(typeName);

        MethodInfo deletemethod = serviceType.GetMethod("DeleteInternship", new[] { typeof(int) });

        if (deletemethod != null)
        {
            var service = Activator.CreateInstance(serviceType, _context);
            var deleteResult = (Task<bool>)deletemethod.Invoke(service, new object[] { 4 });

            var deletedInternshipFromDb = await _context.Internships.FindAsync(4);
            Assert.IsNull(deletedInternshipFromDb);
        }
        else
        {
            Assert.Fail();
        }
    }

    [Test, Order(8)]
    public async Task Backend_Test_Post_Method_AddInternshipApplication_In_InternshipApplication_Service_Posts_Successfully()
    {
        ClearDatabase();

        // Add user
        var userData = new Dictionary<string, object>
        {
            { "UserId", 400 },
            { "Username", "testuser" },
            { "Password", "testpassword" },
            { "Email", "test@example.com" },
            { "MobileNumber", "1234567890" },
            { "UserRole", "User" }
        };

        var user = new User();
        foreach (var kvp in userData)
        {
            var propertyInfo = typeof(User).GetProperty(kvp.Key);
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(user, kvp.Value);
            }
        }
        _context.Users.Add(user);
        _context.SaveChanges();

    
        var internshipData = new Dictionary<string, object>
    {
           { "InternshipId", 100 }, // Unique identifier for the internship position
            { "Title", "Sustainable Agriculture Internship" }, // Title of the internship
            { "CompanyName", "GreenFuture Inc." }, // Name of the company offering the internship
            { "Location", "Remote" }, // Location of the internship
            { "DurationInMonths", 24 }, // Duration of the internship in months
            { "Stipend", 1500.00m }, // Monthly stipend offered
            { "Description", "A hands-on internship focused on sustainable farming practices and agricultural innovations." }, // Description of the internship
            { "SkillsRequired", "Agriculture knowledge, sustainability practices, data analysis" }, // Required skills for the internship
            { "ApplicationDeadline", "2025-03-31" } // Last date to apply
    };


        var internship = new Internship();
        foreach (var kvp in internshipData)
        {
            var propertyInfo = typeof(Internship).GetProperty(kvp.Key);
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(internship, kvp.Value);
            }
        }
        _context.Internships.Add(internship);
        _context.SaveChanges();

        // Add internship application
        string assemblyName = "dotnetapp";
        Assembly assembly = Assembly.Load(assemblyName);
        string ServiceName = "dotnetapp.Services.InternshipApplicationService";
        string typeName = "dotnetapp.Models.InternshipApplication";

        Type serviceType = assembly.GetType(ServiceName);
        Type modelType = assembly.GetType(typeName);

        MethodInfo method = serviceType.GetMethod("AddInternshipApplication", new[] { modelType });

        if (method != null)
        {
    

    var internshipApplicationData = new Dictionary<string, object>
    {
        { "InternshipApplicationId", 200 }, // Unique identifier for the internship application
        { "UserId", 400 }, // User ID for the applicant
        { "InternshipId", 100 }, // Internship ID for the selected internship
        { "UniversityName", "Greenfield University" }, // University Name for the internship
        { "DegreeProgram", "Sustainable Agriculture" }, // Degree program or major
        { "Resume", "internship_resume.pdf" }, // Uploaded resume file
        { "LinkedInProfile", "https://www.linkedin.com/in/username" }, // LinkedIn profile link (optional)
        { "ApplicationStatus", "Pending" }, // Status of the application
        { "ApplicationDate", DateTime.Now } // Date when the application was submitted
    };

            var internshipApplication = Activator.CreateInstance(modelType);
            foreach (var kvp in internshipApplicationData)
            {
                var propertyInfo = modelType.GetProperty(kvp.Key);
                if (propertyInfo != null)
                {
                    propertyInfo.SetValue(internshipApplication, kvp.Value);
                }
            }
            var service = Activator.CreateInstance(serviceType, _context);
            var result = (Task<bool>)method.Invoke(service, new object[] { internshipApplication });
        
            var addedInternshipApplication = await _context.InternshipApplications.FindAsync(200);
            Assert.IsNotNull(addedInternshipApplication);
            Assert.AreEqual("internship_resume.pdf",addedInternshipApplication.Resume);

        }
        else{
            Assert.Fail();
        }
    }

    [Test, Order(9)]
    public async Task Backend_Test_Get_Method_GetInternshipApplicationByUserId_In_InternshipApplication_Fetches_Successfully()
    {
        // Add user
        ClearDatabase();

        var userData = new Dictionary<string, object>
        {
            { "UserId", 400 },
            { "Username", "testuser" },
            { "Password", "testpassword" },
            { "Email", "test@example.com" },
            { "MobileNumber", "1234567890" },
            { "UserRole", "User" }
        };

        var user = new User();
        foreach (var kvp in userData)
        {
            var propertyInfo = typeof(User).GetProperty(kvp.Key);
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(user, kvp.Value);
            }
        }
        _context.Users.Add(user);
        _context.SaveChanges();


        var internshipData = new Dictionary<string, object>
        {
            { "InternshipId", 100 }, // Unique identifier for the internship position
            { "Title", "Sustainable Agriculture Internship" }, // Title of the internship
            { "CompanyName", "GreenFuture Inc." }, // Name of the company offering the internship
            { "Location", "Remote" }, // Location of the internship
            { "DurationInMonths", 24 }, // Duration of the internship in months
            { "Stipend", 1500.00m }, // Monthly stipend offered
            { "Description", "A hands-on internship focused on sustainable farming practices and agricultural innovations." }, // Description of the internship
            { "SkillsRequired", "Agriculture knowledge, sustainability practices, data analysis" }, // Required skills for the internship
            { "ApplicationDeadline", "2025-03-31" } // Last date to apply
        };

        var internship = new Internship();
        foreach (var kvp in internshipData)
        {
            var propertyInfo = typeof(Internship).GetProperty(kvp.Key);
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(internship, kvp.Value);
            }
        }
        _context.Internships.Add(internship);
        _context.SaveChanges();

        var internshipApplicationData = new Dictionary<string, object>
        {
           { "InternshipApplicationId", 200 }, // Unique identifier for the internship application
            { "UserId", 400 }, // User ID for the applicant
            { "InternshipId", 100 }, // Internship ID for the selected internship
            { "UniversityName", "Greenfield University" }, // University Name for the internship
            { "DegreeProgram", "Sustainable Agriculture" }, // Degree program or major
            { "Resume", "internship_resume.pdf" }, // Uploaded resume file
            { "LinkedInProfile", "https://www.linkedin.com/in/username" }, // LinkedIn profile link (optional)
            { "ApplicationStatus", "Pending" }, // Status of the application
            { "ApplicationDate", DateTime.Now } // Date when the application was submitted
        };

        var internshipApplication = new InternshipApplication();
        foreach (var kvp in internshipApplicationData)
        {
            var propertyInfo = typeof(InternshipApplication).GetProperty(kvp.Key);
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(internshipApplication, kvp.Value);
            }
        }
        _context.InternshipApplications.Add(internshipApplication);
        _context.SaveChanges();

        // Add internship application
        string assemblyName = "dotnetapp";
        Assembly assembly = Assembly.Load(assemblyName);
        string ServiceName = "dotnetapp.Services.InternshipApplicationService";
        string typeName = "dotnetapp.Models.InternshipApplication";

        Type serviceType = assembly.GetType(ServiceName);
        Type modelType = assembly.GetType(typeName);

        MethodInfo method = serviceType.GetMethod("GetInternshipApplicationsByUserId");

        if (method != null)
        {
            var service = Activator.CreateInstance(serviceType, _context);
            var result = (Task<IEnumerable<InternshipApplication>>)method.Invoke(service, new object[] { 400 });
            Assert.IsNotNull(result);

            bool check = true;
            foreach (var item in result.Result)
            {
                Assert.AreEqual("Sustainable Agriculture", item.DegreeProgram);
                check = false;
            }

            if (check)
            {
                Assert.Fail();
            }
        }
        else
        {
            Assert.Fail();
        }
    }


[Test, Order(10)]

public async Task Backend_Test_Put_Method_Update_In_InternshipApplication_Service_Updates_Successfully()
{
     ClearDatabase();

    var userData = new Dictionary<string, object>
    {
        { "UserId", 400 },
        { "Username", "testuser" },
        { "Password", "testpassword" },
        { "Email", "test@example.com" },
        { "MobileNumber", "1234567890" },
        { "UserRole", "User" }
    };

    var user = new User();
    foreach (var kvp in userData)
    {
        var propertyInfo = typeof(User).GetProperty(kvp.Key);
        if (propertyInfo != null)
        {
            propertyInfo.SetValue(user, kvp.Value);
        }
    }
    _context.Users.Add(user);
    _context.SaveChanges();


   

var internshipData = new Dictionary<string, object>
{
    { "InternshipId", 100 }, // Unique identifier for the internship position
    { "Title", "Sustainable Agriculture Internship" }, // Title of the internship
    { "CompanyName", "GreenFuture Inc." }, // Name of the company offering the internship
    { "Location", "Remote" }, // Location of the internship
    { "DurationInMonths", 24 }, // Duration of the internship in months
    { "Stipend", 1500.00m }, // Monthly stipend offered
    { "Description", "A hands-on internship focused on sustainable farming practices and agricultural innovations." }, // Description of the internship
    { "SkillsRequired", "Agriculture knowledge, sustainability practices, data analysis" }, // Required skills for the internship
    { "ApplicationDeadline", "2025-03-31" } // Last date to apply
};

    var internship = new Internship();
    foreach (var kvp in internshipData)
    {
        var propertyInfo = typeof(Internship).GetProperty(kvp.Key);
        if (propertyInfo != null)
        {
            propertyInfo.SetValue(internship, kvp.Value);
        }
    }
    _context.Internships.Add(internship);
    _context.SaveChanges();



var internshipApplicationData = new Dictionary<string, object>
{
    { "InternshipApplicationId", 200 }, // Unique identifier for the internship application
    { "UserId", 400 }, // User ID for the applicant
    { "InternshipId", 100 }, // Internship ID for the selected internship
    { "UniversityName", "Greenfield University" }, // University Name for the internship
    { "DegreeProgram", "Sustainable Agriculture" }, // Degree program or major
    { "Resume", "internship_resume.pdf" }, // Uploaded resume file
    { "LinkedInProfile", "https://www.linkedin.com/in/username" }, // LinkedIn profile link (optional)
    { "ApplicationStatus", "Pending" }, // Status of the application
    { "ApplicationDate", DateTime.Now } // Date when the application was submitted
};



    var internshipApplication = new InternshipApplication();
     foreach (var kvp in internshipApplicationData)
    {
        var propertyInfo = typeof(InternshipApplication).GetProperty(kvp.Key);
        if (propertyInfo != null)
        {
            propertyInfo.SetValue(internshipApplication, kvp.Value);
        }
    }
    _context.InternshipApplications.Add(internshipApplication);
    _context.SaveChanges();

    // Add internship application
    string assemblyName = "dotnetapp";
    Assembly assembly = Assembly.Load(assemblyName);
    string ServiceName = "dotnetapp.Services.InternshipApplicationService";
    string typeName = "dotnetapp.Models.InternshipApplication";

    Type serviceType = assembly.GetType(ServiceName);
    Type modelType = assembly.GetType(typeName);

    MethodInfo method = serviceType.GetMethod("UpdateInternshipApplication",new[] { typeof(int), modelType });

    if (method != null)
    {


        var updatedInternshipApplicationData = new Dictionary<string, object>
{
    { "UserId", 400 }, // User ID for the applicant
    { "InternshipId", 100 }, // Internship ID for the selected internship
    { "UniversityName", "Greenfield University" }, // University name for the internship
    { "DegreeProgram", "Computer Science" }, // Degree program or major
    { "Resume", "internship_application.pdf" }, // Uploaded resume file
    { "LinkedInProfile", "https://www.linkedin.com/in/username" }, // LinkedIn profile link
    { "ApplicationStatus", "Approved" }, // Status of the application
    { "ApplicationDate", DateTime.Now } // Date when the application was submitted

};

    var updatedInternshipApplication = new InternshipApplication();
    foreach (var kvp in updatedInternshipApplicationData)
    {
        var propertyInfo = typeof(InternshipApplication).GetProperty(kvp.Key);
        if (propertyInfo != null)
        {
            propertyInfo.SetValue(updatedInternshipApplication, kvp.Value);
        }
    }

        var service = Activator.CreateInstance(serviceType, _context);
        var updateResult = (Task<bool>)method.Invoke(service, new object[] { 200, updatedInternshipApplication });
        var updatedInternshipFromDb = await _context.InternshipApplications.FindAsync(200);
        Assert.IsNotNull(updatedInternshipFromDb);
        Assert.AreEqual("Approved", updatedInternshipFromDb.ApplicationStatus);   
    }
    else{
        Assert.Fail();
    }
}

[Test, Order(11)]
public async Task Backend_Test_Delete_Method_DeleteInternshipApplication_Service_Deletes_InternshipApplication_Successfully()
{
     ClearDatabase();

    var userData = new Dictionary<string, object>
    {
        { "UserId", 32 },
        { "Username", "testuser" },
        { "Password", "testpassword" },
        { "Email", "test@example.com" },
        { "MobileNumber", "1234567890" },
        { "UserRole", "User" }
    };

    var user = new User();
    foreach (var kvp in userData)
    {
        var propertyInfo = typeof(User).GetProperty(kvp.Key);
        if (propertyInfo != null)
        {
            propertyInfo.SetValue(user, kvp.Value);
        }
    }
    _context.Users.Add(user);
    _context.SaveChanges();




    var internshipData = new Dictionary<string, object>
{
    { "InternshipId", 33 }, // Unique identifier for the internship position
    { "Title", "Sustainable Agriculture Internship" }, // Title of the internship
    { "CompanyName", "GreenFuture Inc." }, // Name of the company offering the internship
    { "Location", "Remote" }, // Location of the internship
    { "DurationInMonths", 24 }, // Duration of the internship in months
    { "Stipend", 1500.00m }, // Monthly stipend offered
    { "Description", "A hands-on internship focused on sustainable farming practices and agricultural innovations." }, // Description of the internship
    { "SkillsRequired", "Agriculture knowledge, sustainability practices, data analysis" }, // Required skills for the internship
    { "ApplicationDeadline", "2025-03-31" } // Last date to apply
};


    var internship = new Internship();
    foreach (var kvp in internshipData)
    {
        var propertyInfo = typeof(Internship).GetProperty(kvp.Key);
        if (propertyInfo != null)
        {
            propertyInfo.SetValue(internship, kvp.Value);
        }
    }
    _context.Internships.Add(internship);
    _context.SaveChanges();


   var internshipApplicationData = new Dictionary<string, object>
{
    { "InternshipApplicationId", 20 }, // Unique identifier for the internship application
    { "UserId", 32 }, // User ID for the applicant
    { "InternshipId", 33 }, // Internship ID for the selected internship
    { "UniversityName", "Greenfield University" }, // University Name for the internship
    { "DegreeProgram", "Sustainable Agriculture" }, // Degree program or major
    { "Resume", "internship_resume.pdf" }, // Uploaded resume file
    { "LinkedInProfile", "https://www.linkedin.com/in/username" }, // LinkedIn profile link (optional)
    { "ApplicationStatus", "Pending" }, // Status of the application
    { "ApplicationDate", DateTime.Now } // Date when the application was submitted
};

    var internshipApplication = new InternshipApplication();
     foreach (var kvp in internshipApplicationData)
    {
        var propertyInfo = typeof(InternshipApplication).GetProperty(kvp.Key);
        if (propertyInfo != null)
        {
            propertyInfo.SetValue(internshipApplication, kvp.Value);
        }
    }
    _context.InternshipApplications.Add(internshipApplication);
    _context.SaveChanges();


    string assemblyName = "dotnetapp";
    Assembly assembly = Assembly.Load(assemblyName);
    string ServiceName = "dotnetapp.Services.InternshipApplicationService";
    string typeName = "dotnetapp.Models.InternshipApplication";

    Type serviceType = assembly.GetType(ServiceName);
    Type modelType = assembly.GetType(typeName);

    MethodInfo deletemethod = serviceType.GetMethod("DeleteInternshipApplication", new[] { typeof(int) });

    if (deletemethod != null)
    {
        var service = Activator.CreateInstance(serviceType, _context);
        var deleteResult = (Task<bool>)deletemethod.Invoke(service, new object[] { 20 });

        var deletedInternshipFromDb = await _context.InternshipApplications.FindAsync(20);
        Assert.IsNull(deletedInternshipFromDb);
    }
    else
    {
        Assert.Fail();
    }
     ClearDatabase();
}

[Test, Order(12)]
public async Task Backend_Test_Post_Method_AddFeedback_In_Feedback_Service_Posts_Successfully()
{
        ClearDatabase();

    // Add user
    var userData = new Dictionary<string, object>
    {
        { "UserId",42 },
        { "Username", "testuser" },
        { "Password", "testpassword" },
        { "Email", "test@example.com" },
        { "MobileNumber", "1234567890" },
        { "UserRole", "User" }
    };

    var user = new User();
    foreach (var kvp in userData)
    {
        var propertyInfo = typeof(User).GetProperty(kvp.Key);
        if (propertyInfo != null)
        {
            propertyInfo.SetValue(user, kvp.Value);
        }
    }
    _context.Users.Add(user);
    _context.SaveChanges();
    // Add internship application
    string assemblyName = "dotnetapp";
    Assembly assembly = Assembly.Load(assemblyName);
    string ServiceName = "dotnetapp.Services.FeedbackService";
    string typeName = "dotnetapp.Models.Feedback";

    Type serviceType = assembly.GetType(ServiceName);
    Type modelType = assembly.GetType(typeName);

    MethodInfo method = serviceType.GetMethod("AddFeedback", new[] { modelType });

    if (method != null)
    {
           var feedbackData = new Dictionary<string, object>
            {
                { "FeedbackId", 11 },
                { "UserId", 42 },
                { "FeedbackText", "Great experience!" },
                { "Date", DateTime.Now }
            };
        var feedback = new Feedback();
        foreach (var kvp in feedbackData)
        {
            var propertyInfo = typeof(Feedback).GetProperty(kvp.Key);
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(feedback, kvp.Value);
            }
        }
        var service = Activator.CreateInstance(serviceType, _context);
        var result = (Task<bool>)method.Invoke(service, new object[] { feedback });
    
        var addedFeedback= await _context.Feedbacks.FindAsync(11);
        Assert.IsNotNull(addedFeedback);
        Assert.AreEqual("Great experience!",addedFeedback.FeedbackText);

    }
    else{
        Assert.Fail();
    }
}

[Test, Order(13)]
public async Task Backend_Test_Delete_Method_Feedback_In_Feeback_Service_Deletes_Successfully()
{
    // Add user
     ClearDatabase();

    var userData = new Dictionary<string, object>
    {
        { "UserId",42 },
        { "Username", "testuser" },
        { "Password", "testpassword" },
        { "Email", "test@example.com" },
        { "MobileNumber", "1234567890" },
        { "UserRole", "User" }
    };

    var user = new User();
    foreach (var kvp in userData)
    {
        var propertyInfo = typeof(User).GetProperty(kvp.Key);
        if (propertyInfo != null)
        {
            propertyInfo.SetValue(user, kvp.Value);
        }
    }
    _context.Users.Add(user);
    _context.SaveChanges();

           var feedbackData = new Dictionary<string, object>
            {
                { "FeedbackId", 11 },
                { "UserId", 42 },
                { "FeedbackText", "Great experience!" },
                { "Date", DateTime.Now }
            };
        var feedback = new Feedback();
        foreach (var kvp in feedbackData)
        {
            var propertyInfo = typeof(Feedback).GetProperty(kvp.Key);
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(feedback, kvp.Value);
            }
        }
     _context.Feedbacks.Add(feedback);
    _context.SaveChanges();
    // Add internship application
    string assemblyName = "dotnetapp";
    Assembly assembly = Assembly.Load(assemblyName);
    string ServiceName = "dotnetapp.Services.FeedbackService";
    string typeName = "dotnetapp.Models.Feedback";

    Type serviceType = assembly.GetType(ServiceName);
    Type modelType = assembly.GetType(typeName);

  
    MethodInfo deletemethod = serviceType.GetMethod("DeleteFeedback", new[] { typeof(int) });

    if (deletemethod != null)
    {
        var service = Activator.CreateInstance(serviceType, _context);
        var deleteResult = (Task<bool>)deletemethod.Invoke(service, new object[] { 11 });

        var deletedFeedbackFromDb = await _context.Feedbacks.FindAsync(11);
        Assert.IsNull(deletedFeedbackFromDb);
    }
    else
    {
        Assert.Fail();
    }
}

[Test, Order(14)]
public async Task Backend_Test_Get_Method_GetFeedbacksByUserId_In_Feedback_Service_Fetches_Successfully()
{
    ClearDatabase();

    // Add user
    var userData = new Dictionary<string, object>
    {
        { "UserId", 330 },
        { "Username", "testuser" },
        { "Password", "testpassword" },
        { "Email", "test@example.com" },
        { "MobileNumber", "1234567890" },
        { "UserRole", "User" }
    };

    var user = new User();
    foreach (var kvp in userData)
    {
        var propertyInfo = typeof(User).GetProperty(kvp.Key);
        if (propertyInfo != null)
        {
            propertyInfo.SetValue(user, kvp.Value);
        }
    }
    _context.Users.Add(user);
    _context.SaveChanges();

    var feedbackData= new Dictionary<string, object>
    {
        { "FeedbackId", 13 },
        { "UserId", 330 },
        { "FeedbackText", "Great experience!" },
        { "Date", DateTime.Now }
    };

    var feedback = new Feedback();
    foreach (var kvp in feedbackData)
    {
        var propertyInfo = typeof(Feedback).GetProperty(kvp.Key);
        if (propertyInfo != null)
        {
            propertyInfo.SetValue(feedback, kvp.Value);
        }
    }
    _context.Feedbacks.Add(feedback);
    _context.SaveChanges();

    // Add internship application
    string assemblyName = "dotnetapp";
    Assembly assembly = Assembly.Load(assemblyName);
    string ServiceName = "dotnetapp.Services.FeedbackService";
    string typeName = "dotnetapp.Models.Feedback";

    Type serviceType = assembly.GetType(ServiceName);
    Type modelType = assembly.GetType(typeName);

    MethodInfo method = serviceType.GetMethod("GetFeedbacksByUserId");

    if (method != null)
    {
        var service = Activator.CreateInstance(serviceType, _context);
        var result = ( Task<IEnumerable<Feedback>>)method.Invoke(service, new object[] {330});
        Assert.IsNotNull(result);
         var check=true;
        foreach (var item in result.Result)
        {
            check=false;
            Assert.AreEqual("Great experience!", item.FeedbackText);
   
        }
        if(check==true)
        {
            Assert.Fail();

        }
    }
    else{
        Assert.Fail();
    }
}

//Exception
[Test, Order(15)]
 
public async Task Backend_Test_Post_Method_AddInternship_In_InternshipService_Occurs_InternshipException_For_Duplicate_CompanyName()
{
    ClearDatabase();

    string assemblyName = "dotnetapp";
    Assembly assembly = Assembly.Load(assemblyName);
    string ServiceName = "dotnetapp.Services.InternshipService";
    string typeName = "dotnetapp.Models.Internship";
 
    Type serviceType = assembly.GetType(ServiceName);
    Type modelType = assembly.GetType(typeName);
 
    MethodInfo method = serviceType.GetMethod("AddInternship", new[] { modelType });
 
    if (method != null)
    {
    
        var internshipData = new Dictionary<string, object>
    {
   { "InternshipId", 2 }, // Unique identifier for the internship position
    { "Title", "Sustainable Agriculture Internship" }, // Title of the internship
    { "CompanyName", "GreenFuture Inc." }, // Name of the company offering the internship
    { "Location", "Remote" }, // Location of the internship
    { "DurationInMonths", 24 }, // Duration of the internship in months
    { "Stipend", 1500.00m }, // Monthly stipend offered
    { "Description", "A hands-on internship focused on sustainable farming practices and agricultural innovations." }, // Description of the internship
    { "SkillsRequired", "Agriculture knowledge, sustainability practices, data analysis" }, // Required skills for the internship
    { "ApplicationDeadline", "2025-03-31" } // Last date to apply
   };

 
        var internship = Activator.CreateInstance(modelType);
        foreach (var kvp in internshipData)
        {
            var propertyInfo = modelType.GetProperty(kvp.Key);
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(internship, kvp.Value);
            }
        }
 
        var service = Activator.CreateInstance(serviceType, _context);
        var result = (Task<bool>)method.Invoke(service, new object[] { internship });
        var addedInternship = await _context.Internships.FindAsync(2);
        Assert.IsNotNull(addedInternship);
   
        var internshipData1 = new Dictionary<string, object>
{
   { "InternshipId", 3 }, // Unique identifier for the internship position
    { "Title", "Sustainable Agriculture Internship" }, // Title of the internship
    { "CompanyName", "GreenFuture Inc." }, // Name of the company offering the internship
    { "Location", "Remote" }, // Location of the internship
    { "DurationInMonths", 24 }, // Duration of the internship in months
    { "Stipend", 1500.00m }, // Monthly stipend offered
    { "Description", "A hands-on internship focused on sustainable farming practices and agricultural innovations." }, // Description of the internship
    { "SkillsRequired", "Agriculture knowledge, sustainability practices, data analysis" }, // Required skills for the internship
    { "ApplicationDeadline", "2025-03-31" } // Last date to apply
};

 
        var internship1 = Activator.CreateInstance(modelType);
        foreach (var kvp in internshipData1)
        {
            var propertyInfo = modelType.GetProperty(kvp.Key);
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(internship1, kvp.Value);
            }
        }
 
        try
        {
            var result1 = (Task<bool>)method.Invoke(service, new object[] { internship1 });
            Console.WriteLine("res"+result1.Result); 
            Assert.Fail();

        }
        catch (Exception ex)
        {

            Assert.IsNotNull(ex.InnerException);
            Assert.IsTrue(ex.InnerException is InternshipException);
            Assert.AreEqual("Company with the same name already exists", ex.InnerException.Message);
    }
    }
    else
    {
        Assert.Fail();
    }
   }
 

private void ClearDatabase()
{
    _context.Database.EnsureDeleted();
    _context.Database.EnsureCreated();
}

}
}