using System;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class InternshipApplication
    {
        public int InternshipApplicationId { get; set; }  // Unique identifier for the internship application

        [Required(ErrorMessage = "User ID is required")]
        public int UserId { get; set; }  
        public User? User { get; set; }

        [Required(ErrorMessage = "Internship ID is required")]
        public int InternshipId { get; set; }
        public Internship? Internship { get; set; }

        [Required(ErrorMessage = "University name is required")]
        public string UniversityName { get; set; }  

        [Required(ErrorMessage = "Degree program is required")]
        public string DegreeProgram { get; set; }  // The degree program or major (e.g., "Computer Science")
        
        [Required(ErrorMessage = "Resume file is required")]
        public string Resume { get; set; }  // Uploaded resume file (e.g., PDF format)

        public string? LinkedInProfile { get; set; } 

        [Required(ErrorMessage = "Application status is required")]
        public string ApplicationStatus { get; set; }  // Status of the application ("Pending", "Approved", "Rejected")

        [Required(ErrorMessage = "Application date is required")]
        public DateTime ApplicationDate { get; set; }  // Date when the application was submitted

    }
}
