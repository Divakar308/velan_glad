using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class InternshipApplicationService
    {
        private readonly ApplicationDbContext _context;

        public InternshipApplicationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<InternshipApplication>> GetAllInternshipApplications()
        {
            return await _context.InternshipApplications.Include(r => r.Internship).Include(r => r.User).ToListAsync();
        }

        public async Task<IEnumerable<InternshipApplication>> GetInternshipApplicationsByUserId(int userId)
        {
            return await _context.InternshipApplications.Include(r => r.Internship).Where(la => la.UserId == userId).ToListAsync();
        }

        public async Task<bool> AddInternshipApplication(InternshipApplication internshipApplication)
        {
                if ( _context.InternshipApplications.Any(l => l.InternshipId == internshipApplication.InternshipId && l.UserId == internshipApplication.UserId))  
                {
                    throw new InternshipException("User already applied for this internship");
                }
                
                    _context.InternshipApplications.Add(internshipApplication);
                await _context.SaveChangesAsync();
                return true;
            
                

        }

        public async Task<bool> UpdateInternshipApplication(int internshipApplicationId, InternshipApplication internshipApplication)
        {
            
                var existingInternshipApplication = await _context.InternshipApplications.FindAsync(internshipApplicationId);

                if (existingInternshipApplication == null)
                {
                    return false;
                }

                internshipApplication.InternshipApplicationId = internshipApplicationId;

                _context.Entry(existingInternshipApplication).CurrentValues.SetValues(internshipApplication);
                await _context.SaveChangesAsync();

                return true;
           
        }

        public async Task<bool> DeleteInternshipApplication(int internshipApplicationId)
        {
            var internshipApplication = await _context.InternshipApplications.FindAsync(internshipApplicationId);

                if (internshipApplication == null)
                {
                    return false;
                }

                _context.InternshipApplications.Remove(internshipApplication);
                await _context.SaveChangesAsync();

                return true;
          
        }
    }
}
