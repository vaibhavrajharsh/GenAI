const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/resumeReport.model");

/**
*@description: Generate new interview report on the basis of user self description, resume pdf and job description.
@access: private
 */
async function generateInterviewReportController(req, res) {
  try {
    const resumeContent = await new pdfParse.PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAI = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interviewReportByAI,
    });
    res.status(201).json({
      message: "Interview report generated successfully",
      data: interviewReport,
    });
  } catch (err) {
    console.error("Error generating interview report:", err);
    res.status(500).json({
      message: err.message || "Failed to generate interview report",
    });
  }
}


/**
 *@description: Get interview report by interview id.
 *@access: private
 */
async function getInterviewReportByIdController(req, res) {
  try {
    const { interviewId } = req.params;
    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });
    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found",
      });
    }
    res.status(200).json({
      message: "Interview report fetched successfully",
      data: interviewReport,
    });
  } catch (err) {
    console.error("Error fetching interview report:", err);
    res.status(500).json({
      message: err.message || "Failed to fetch interview report",
    });
  }
}


/**
 *@description: Get all interview reports.
 *@access: private
 */
async function getAllInterviewReportsController(req, res) {
  try {
    const interviewReports = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
      );
    res.status(200).json({
      message: "interview reports fetched successfully",
      interviewReports,
    });
  } catch (err) {
    console.error("Error fetching interview reports:", err);
    res.status(500).json({
      message: err.message || "Failed to fetch interview reports",
    });
  }
}


module.exports = {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
};
