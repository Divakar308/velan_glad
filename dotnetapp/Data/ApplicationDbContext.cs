using dotnetapp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Data    
{
public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
        public DbSet<Internship> Internships { get; set; }
        public DbSet<InternshipApplication> InternshipApplications { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
         public  DbSet<User> Users { get; set; }
         
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

    }

}
}