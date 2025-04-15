using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [Route("api/internship-application")]
    [ApiController]
    public class InternshipApplicationController : ControllerBase
    {
        private readonly InternshipApplicationService _internshipApplicationService;

        public InternshipApplicationController(InternshipApplicationService internshipApplicationService)
        {
            _internshipApplicationService = internshipApplicationService;
        }
        
     [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InternshipApplication>>> GetAllInternshipApplications()
        {
            var internshipApplications = await _internshipApplicationService.GetAllInternshipApplications();
            return Ok(internshipApplications);
        }

        [Authorize(Roles = "User")]

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<InternshipApplication>> GetInternshipApplicationByUserId(int userId)
        {
            var internshipApplications = await _internshipApplicationService.GetInternshipApplicationsByUserId(userId);

            if (internshipApplications == null)
            {
                return NotFound(new { message = "Cannot find any internship application" });
            }

            return Ok(internshipApplications);
        }

     [Authorize(Roles = "User")]

        [HttpPost]
        public async Task<ActionResult> AddInternshipApplication([FromBody] InternshipApplication internshipApplication)
        {
            try
            {
                await _internshipApplicationService.AddInternshipApplication(internshipApplication);

                return Ok(new { message = "Internship application added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

       [Authorize(Roles = "Admin")]

        [HttpPut("{internshipApplicationId}")]
        public async Task<ActionResult> UpdateInternshipApplication(int internshipApplicationId, [FromBody] InternshipApplication internshipApplication)
        {
            try
            {
                var success = await _internshipApplicationService.UpdateInternshipApplication(internshipApplicationId, internshipApplication);

                if (success)
                {
                    return Ok(new { message = "Internship application updated successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find any internship application" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
       [Authorize(Roles = "User")]

        [HttpDelete("{internshipApplicationId}")]
        public async Task<ActionResult> DeleteInternshipApplication(int internshipApplicationId)
        {
            try
            {
                var success = await _internshipApplicationService.DeleteInternshipApplication(internshipApplicationId);

                if (success)
                {
                    return Ok(new { message = "Internship application deleted successfully" });
                }
                else
                {
                    return NotFound(new { message = "Cannot find any internship application" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
