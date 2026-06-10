const { Hono } = require('hono');
const { cors } = require('hono/cors');
const app = new Hono();

app.use('/*', cors());

// Chatbot API
app.post('/api/chatbot', async (c) => {
    const { question } = await c.req.json();
    let answer = "📚 म एउटा स्थानीय शैक्षिक सहायक हुँ।";
    if (question.includes('राजधानी')) answer = "🏙️ नेपालको राजधानी काठमाडौं हो।";
    return c.json({ success: true, response: answer });
});

// Lesson Plan API
app.post('/api/lesson-plan', async (c) => {
    const { grade, subject, topic } = await c.req.json();
    return c.json({ success: true, plan: `📖 पाठयोजना: ${topic} (कक्षा ${grade})` });
});

export default app;