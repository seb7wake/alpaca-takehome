import os
from openai import OpenAI
from dotenv import load_dotenv

class OpenAIClient:
    def __init__(self):
        load_dotenv()
        try:
            self.api_key = os.environ["OPENAI_API_KEY"]
        except KeyError:
            raise KeyError("OPENAI_API_KEY environment variable not found. Please ensure it is set in your .env file.")
        self.client = self._client()
    
    def _client(self):
        return OpenAI(api_key=self.api_key)
