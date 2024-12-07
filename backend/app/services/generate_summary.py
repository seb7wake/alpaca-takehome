from app.models import Session
import os
from app.services.openai_client import OpenAIClient

class GenerateSummary:
    def __init__(self, notes: str, patient_name: str, start_date: str, end_date: str):
        self.notes = notes
        self.patient_name = patient_name
        self.start_date = start_date
        self.end_date = end_date

    def prompt(self):
        return f"""
        Instructions:
        I have the following session observations in raw form (non-professional, unstructured notes). 
        Please refine them into a professionally written, clinically accurate note suitable for a clinical record. 
        Use appropriate clinical terminology and maintain factual accuracy based on the provided content. 

        Raw Notes:
        {self.notes}

        Session Information:
            PatientName: {self.patient_name}
            Session Date: {self.start_date} - {self.end_date}

        Example structure:
            Client Name: ...
            Session Date: ... 
            Time: ...
            Location: ...
            Therapist: ...

            ---

            Session Objectives and Goals
            - Long-Term Goal: Improve communication skills to express needs effectively.
            - Short-Term Objective: Increase use of functional phrases from 2 to 5 per session.

            Interventions and Strategies Implemented
            - Discrete Trial Training (DTT): Introduced new phrases related to requesting toys.
            - Natural Environment Teaching (NET): Incorporated language practice during playtime.

            Data Collection and Progress Monitoring
            - Functional Requests: 3 phrases used successfully.
            - Prompt Level: Reduced from full physical prompts to verbal prompts.

            Client Responses and Behavioral Observations
            - Engagement: High participation during DTT sessions.
            - Challenging Behaviors: No incidents observed.
            - Emotional State: Calm and focused throughout the session.

            Assessment and Analysis
            - Progress Evaluation: Achieved 60% of the short-term objective.
            - Intervention Effectiveness: DTT is effective; NET needs slight adjustments to better capture spontaneous language use.

            Recommendations and Next Steps
            - Adjust Goals: Continue targeting functional phrases with increased complexity.
            - Intervention Changes: Introduce modeling techniques during NET.
            - Caregiver Strategies: Encourage use of targeted phrases during daily routines.

            Summary and Conclusion
            John demonstrated significant progress in using functional communication phrases. Continued focus on reducing prompts and increasing spontaneous use is recommended.

        
        Requirements:
        - Maintain clinical accuracy and factual details. Be concise.
        - Transform informal language into professional, well-structured clinical documentation.
        - Output should be plain text and look like a clinical note.
        - Do not fabricate details that are not present in the raw notes.
        - Do not include recommendations or advice not mentioned in the raw notes.
        - Align with the example structure as closely as possible given the information present in the raw notes.
        """

    async def generate(self):
        client = OpenAIClient().client
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "system", "content": self.prompt()}, {"role": "user", "content": self.notes}],
        )
        return response.choices[0].message.content
