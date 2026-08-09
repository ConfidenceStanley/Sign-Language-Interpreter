# SignBridge - Sign Language Interpreter

A real-time AI-powered web application that interprets American Sign Language (ASL) 
into text and speech, built to bridge communication between deaf/hard-of-hearing 
individuals and the hearing world.

## What it does
- Detects hand gestures in real-time via webcam
- Interprets ASL signs using a custom trained deep learning model
- Converts interpreted signs to text and spoken audio instantly
- Stores session history for users to review past translations

## ML Model
- Trained on the ASL Alphabet Dataset from Kaggle
- Uses MediaPipe for hand landmark extraction
- Custom TensorFlow model classifies 26 ASL letters (A-Z)
- Deployed as TFLite for fast inference
- Located at: backend/app/ml_models/asl_model.tflite

## Sample Test Images
Sample ASL sign images (A-Z) are included in:
frontend/public/sample-signs/

Users can test the system on the Analyze Image page by clicking any letter
to load a sample sign image automatically.

## Built With
React 19 · Tailwind CSS v4 · FastAPI · MongoDB · MediaPipe · TensorFlow

## HND Final Year Project - Software & Web Development