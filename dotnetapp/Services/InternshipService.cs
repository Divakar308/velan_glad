using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Exceptions;


namespace dotnetapp.Services
{
    public class InternshipService
    {
        private readonly ApplicationDbContext _context;

        public InternshipService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Internship>> GetAllInternships()
        {
            return await _context.Internships.ToListAsync();
        }

        public async Task<Internship> GetInternshipById(int internshipId)
        {
            return await _context.Internships.FirstOrDefaultAsync(l => l.InternshipId == internshipId);
        }

        public async Task<bool> AddInternship(Internship internship)
        {
           
                if (_context.Internships.Any(l => l.CompanyName == internship.CompanyName))
                {
                    throw new InternshipException("Company with the same name already exists");
                }
                _context.Internships.Add(internship);
                await _context.SaveChangesAsync();
                return true;
         
        }

        public async Task<bool> UpdateInternship(int internshipId, Internship internship)
        {
         
                var existingInternship = await _context.Internships.FirstOrDefaultAsync(l => l.InternshipId == internshipId);

                if (existingInternship == null)
                    return false;
    if (_context.Internships.Any(l => l.CompanyName == internship.CompanyName && l.InternshipId != internshipId))
    {
        throw new InternshipException("Company with the same name already exists");
    }
                internship.InternshipId = internshipId;
                _context.Entry(existingInternship).CurrentValues.SetValues(internship);
                await _context.SaveChangesAsync();

                return true;
          
        }

        public async Task<bool> DeleteInternship(int internshipId)
        {
            
                var internship = await _context.Internships.FirstOrDefaultAsync(l => l.InternshipId == internshipId);
                if (internship == null)
                    return false;
                if (_context.InternshipApplications.Any(l => l.InternshipId == internship.InternshipId))  
                {
                    throw new InternshipException("Internship cannot be deleted, it is referenced in internshipapplication");
                }
                
                _context.Internships.Remove(internship);
                await _context.SaveChangesAsync();
                return true;
          
        }
    }
}
