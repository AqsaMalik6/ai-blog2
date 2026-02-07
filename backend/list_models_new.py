import google.generativeai as genai
import os

api_key = "AIzaSyBeqCW-0PlBeBh_Ncus5BeFxYM88bjM_PE"
genai.configure(api_key=api_key)

print("Listing available models for this specific key:")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"Name: {m.name}, Display: {m.display_name}")
except Exception as e:
    print(f"Error listing models: {e}")
