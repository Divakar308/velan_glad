export interface InternshipApplication {
    InternshipApplicationId?: number;  // Optional ID for the internship application
    UserId: number;                    // ID of the user applying for the internship
    InternshipId: number;              // ID of the associated internship
    UniversityName: string;            // University Name for the internship
    DegreeProgram: string;             // Degree program or major (e.g., "Computer Science")
    Resume: string;                    // Uploaded resume file (e.g., PDF format)
    LinkedInProfile?: string;          // Optional LinkedIn profile link
    ApplicationStatus: string;         // Status of the application ("Pending", "Approved", "Rejected")
    ApplicationDate: string;           // Date the application was submitted
}
