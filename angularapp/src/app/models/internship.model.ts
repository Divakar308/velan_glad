export interface Internship {
    InternshipId?: number;      // Unique identifier for the internship (optional for new records)
    Title: string;              // Title of the internship (e.g., "Software Developer Intern")
    CompanyName: string;        // Name of the company offering the internship
    Location: string;           // Location of the internship (e.g., "Remote", "New York")
    DurationInMonths: number;   // Duration of the internship in months
    Stipend: number;            // Monthly stipend offered for the internship
    Description: string;        // Description of the internship role and responsibilities
    SkillsRequired: string;     // Required skills for the internship (e.g., "C#, .NET, React")
    ApplicationDeadline: string; // Last date to apply for the internship
}
