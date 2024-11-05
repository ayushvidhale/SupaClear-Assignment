import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { topic, description, difficulty, numQuestions } =
      await request.json();

    // Updated prompt to emphasize providing an explanation
    const prompt = `Generate ${numQuestions} coding multiple-choice test questions for the topic "${topic}". The test should focus on relevant coding technologies, languages, or tools mentioned in the topic or description: "${description}". Ensure the questions are real-world coding challenges and include code snippets where applicable. Each question should have four options (A, B, C, D), the correct answer, and a detailed explanation of why that answer is correct. Format the response as follows:\n\nQuestion: [Question Text]\nA. [Option A]\nB. [Option B]\nC. [Option C]\nD. [Option D]\nAnswer: [Correct Option]\nExplanation: [Explanation]\n;`;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content!;
    const questions = parseQuestions(content);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Helper to parse questions with robust explanation extraction
function parseQuestions(content: string): any[] {
  return content
    ?.split("\n\n") // Split questions by double line breaks
    .filter(Boolean)
    .map((q) => {
      const [question, ...options] = q.split("\n"); // Split question and options by line breaks
      const [answerLine, explanationLine] = options.splice(-2); // Extract the last two lines for answer and explanation

      // Parsing options into a key-value object
      const optionsObj = options.reduce(
        (obj, option) => {
          const [key, value] = option.split(". ", 2);
          obj[key] = value;
          return obj;
        },
        {} as Record<string, string>
      );

      // Extracting the answer
      const answer = answerLine?.split("Answer: ")[1];

      // Extracting the explanation (with error handling)
      const explanation = explanationLine?.startsWith("Explanation: ")
        ? explanationLine.split("Explanation: ")[1]
        : "No explanation provided.";

      return {
        question: question.replace("Question: ", ""),
        options: optionsObj,
        answer: answer || "N/A",
        explanation: explanation,
      };
    });
}

//   import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request: Request) {
//   try {
//     const { topic, description, difficulty, numQuestions } = await request.json();

//     // Updated prompt to emphasize providing an explanation
//     const prompt = `Generate ${numQuestions} coding multiple-choice test questions for the topic "${topic}". The test should focus on relevant coding technologies, languages, or tools mentioned in the topic or description: "${description}". Ensure the questions are real-world coding challenges and include code snippets where applicable. Each question should have four options (A, B, C, D), the correct answer, and a detailed explanation of why that answer is correct. Format the response as follows:\n\nQuestion: [Question Text]\nA. [Option A]\nB. [Option B]\nC. [Option C]\nD. [Option D]\nAnswer: [Correct Option]\nExplanation: [Explanation]\n\n`

//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: prompt }],
//     });

//     const content = response.choices[0]?.message?.content || '';
//     const questions = parseQuestions(content);

//     return NextResponse.json({ questions });
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// // Helper to parse questions with robust explanation extraction
// function parseQuestions(content: string): any[] {
//   const questions: any[] = [];

//   // Split questions by double line breaks
//   const questionBlocks = content.split('\n\n').filter(Boolean);

//   questionBlocks.forEach(block => {
//     const lines = block.split('\n').filter(Boolean);

//     if (lines.length < 6) return; // Skip if the block doesn't contain enough lines

//     const questionLine = lines[0];
//     const options: Record<string, string> = {};
//     let answerLine = '';
//     let explanationLine = '';

//     // Extract options
//     lines.slice(1, -2).forEach(optionLine => {
//       const [key, ...value] = optionLine.split('. ');
//       if (key && value.length) {
//         options[key] = value.join('. ');
//       }
//     });

//     // Extract answer and explanation
//     if (lines.length >= 2) {
//       answerLine = lines[lines.length - 2];
//       explanationLine = lines[lines.length - 1];
//     }

//     const answer = answerLine?.startsWith('Answer: ') ? answerLine.split('Answer: ')[1].trim() : 'N/A';
//     const explanation = explanationLine?.startsWith('Explanation: ')
//       ? explanationLine.split('Explanation: ')[1].trim()
//       : 'No explanation provided.';

//     questions.push({
//       question: questionLine.replace('Question: ', '').trim(),
//       options,
//       answer,
//       explanation,
//     });
//   });

//   return questions;
// }
