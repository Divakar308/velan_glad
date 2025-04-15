using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [Route("api/internship")]
    [ApiController]
    public class InternshipController : ControllerBase
    {
        private readonly InternshipService _internshipService;

        public InternshipController(InternshipService internshipService)
        {
            _internshipService = internshipService;
        }

     [Authorize]

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Internship>>> GetAllInternships()
        {
            var internships = await _internshipService.GetAllInternships();
            return Ok(internships);
        }
        
     [Authorize(Roles = "Admin")]

        [HttpGet("{internshipId}")]
        public async Task<ActionResult<Internship>> GetInternshipById(int internshipId)
        {
            var internship = await _internshipService.GetInternshipById(internshipId);

            if (internship == null)
                return NotFound(new { message = "Cannot find any internship" });

            return Ok(internship);
        }

     [Authorize(Roles = "Admin")]

        [HttpPost]
        public async Task<ActionResult> AddInternship([FromBody] Internship internship)
        {
            try
            {
                var success = await _internshipService.AddInternship(internship);
                if (success)
                    return Ok(new { message = "Internship added successfully" });
                else
                    return StatusCode(500, new { message = "Failed to add internship" });
            }
            catch (Exception ex)
            {
                // Console.WriteLine("ex"+ex);
                return StatusCode(500, new { message = ex.Message });
            }
        }

     [Authorize(Roles = "Admin")]

        [HttpPut("{internshipId}")]
        public async Task<ActionResult> UpdateInternship(int internshipId, [FromBody] Internship internship)
        {
            try
            {
                var success = await _internshipService.UpdateInternship(internshipId, internship);

                if (success)
                    return Ok(new { message = "Internship updated successfully" });
                else
                    return NotFound(new { message = "Cannot find any internship" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

     [Authorize(Roles = "Admin")]

        [HttpDelete("{internshipId}")]
        public async Task<ActionResult> DeleteInternship(int internshipId)
        {
            try
            {
                var success = await _internshipService.DeleteInternship(internshipId);

                if (success)
                    return Ok(new { message = "Internship deleted successfully" });
                else
                    return NotFound(new { message = "Cannot find any internship" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
