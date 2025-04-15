using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Internship
    {
        public int InternshipId { get; set; }  // Unique identifier for the internship position

        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }       // Title of the internship (e.g., "Software Developer Intern")

        [Required(ErrorMessage = "Company name is required")]
        public string CompanyName { get; set; }     // Name of the company offering the internship

        [Required(ErrorMessage = "Location is required")]
        public string Location { get; set; }    // Location of the internship (e.g., "Remote", "New York")

        [Required(ErrorMessage = "Duration is required")]
        public int DurationInMonths { get; set; }  // Duration of the internship in months

        [Required(ErrorMessage = "Stipend is required")]
        public decimal Stipend { get; set; }    // Monthly stipend offered for the internship

        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; } // Description of the internship role and responsibilities

        [Required(ErrorMessage = "Skills required are required")]
        public string SkillsRequired { get; set; } // Required skills for the internship (e.g., "C#, .NET, React")

        [Required(ErrorMessage = "Application deadline is required")]
        public string ApplicationDeadline { get; set; } // Last date to apply for the internship
    }
}
