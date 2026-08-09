import tensorflow as tf
import numpy as np
import json
import os

MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ml_models", "asl_model.tflite")
CLASSES_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ml_models", "asl_classes.json")

interpreter = None
classes = []
input_details = None
output_details = None


def load_model():
    global interpreter, classes, input_details, output_details

    if not os.path.exists(MODEL_PATH):
        print(f"Model not found at {MODEL_PATH}")
        return False

    interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
    interpreter.allocate_tensors()
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    with open(CLASSES_PATH, "r") as f:
        classes = json.load(f)

    print(f"ASL model loaded. Classes: {classes}")
    print(f"Input shape: {input_details[0]['shape']}")
    return True


def predict_from_landmarks(landmarks):
    if interpreter is None:
        return {"sign": "MODEL NOT LOADED", "confidence": 0}

    if not landmarks or len(landmarks) == 0:
        return {"sign": "", "confidence": 0}

    wrist = landmarks[0]
    features = []
    for lm in landmarks:
        features.append(lm["x"] - wrist["x"])
        features.append(lm["y"] - wrist["y"])
        features.append(lm["z"] - wrist["z"])

    input_data = np.array([features], dtype=np.float32)

    interpreter.set_tensor(input_details[0]["index"], input_data)
    interpreter.invoke()
    output = interpreter.get_tensor(output_details[0]["index"])[0]

    max_idx = int(np.argmax(output))
    confidence = float(output[max_idx])

    return {
        "sign": classes[max_idx],
        "confidence": confidence,
    }