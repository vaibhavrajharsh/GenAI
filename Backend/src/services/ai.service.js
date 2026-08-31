const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// Define the schema directly using Gemini's native schema format
const interviewReportSchema = {
  type: Type.OBJECT,
  properties: {
    matchScore: {
      type: Type.NUMBER,
      description:
        "A score between 0 and 100 indicating how well the candidate's profile matches the job description",
    },
    technicalQuestions: {
      type: Type.ARRAY,
      description:
        "Technical questions that can be asked in the interview along with their intention and how to answer them",
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "The technical question that can be asked in the interview",
          },
          intention: {
            type: Type.STRING,
            description: "The intention of the interviewer behind asking this question",
          },
          answer: {
            type: Type.STRING,
            description:
              "How to answer this question, what points to cover, what approach to take etc.",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: Type.ARRAY,
      description:
        "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "The behavioral question that can be asked in the interview",
          },
          intention: {
            type: Type.STRING,
            description: "The intention of the interviewer behind asking this question",
          },
          answer: {
            type: Type.STRING,
            description:
              "How to answer this question, what points to cover, what approach to take etc.",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: Type.ARRAY,
      description:
        "List of skill gaps in the candidate's profile along with their severity",
      items: {
        type: Type.OBJECT,
        properties: {
          skill: {
            type: Type.STRING,
            description: "The skill which the candidate is lacking",
          },
          severity: {
            type: Type.STRING,
            enum: ["low", "medium", "high"],
            description:
              "The severity of this skill gap, i.e. how important is this skill for the job",
          },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: Type.ARRAY,
      description:
        "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
      items: {
        type: Type.OBJECT,
        properties: {
          day: {
            type: Type.NUMBER,
            description: "The day number in the preparation plan, starting from 1",
          },
          focus: {
            type: Type.STRING,
            description:
              "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          },
          tasks: {
            type: Type.ARRAY,
            description:
              "List of tasks to be done on this day to follow the preparation plan",
            items: {
              type: Type.STRING,
            },
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
    title: {
      type: Type.STRING,
      description:
        "The title of the job for which the interview report is generated",
    },
  },
  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
    "title",
  ],
};

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `You are an expert interview coach. Analyze the candidate's resume, self-description, and the job description provided below. Generate a structured interview preparation report with the following:

1. **matchScore**: A number between 0 and 100 indicating how well the candidate matches the job.
2. **technicalQuestions**: An array of technical questions that could be asked, each with the question text, the interviewer's intention behind it, and a detailed answer guide.
3. **behavioralQuestions**: An array of behavioral questions that could be asked, each with the question text, the interviewer's intention behind it, and a detailed answer guide.
4. **skillGaps**: An array of skills the candidate is lacking, each with the skill name and severity ("low", "medium", or "high").
5. **preparationPlan**: A day-wise preparation plan, each entry with a day number, focus area, and list of tasks.
6. **title**: The job title for which this report is generated.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}

Respond ONLY with the JSON matching the required schema. Do not include any extra fields.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportSchema,
    },
  });

  return JSON.parse(response.text);
}

module.exports = generateInterviewReport;
