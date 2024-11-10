from flask import Flask, request, jsonify, make_response, Response
import pandas as pd
import numpy as np
import joblib
from joblib import load
import json


app = Flask(__name__)
print('FLASK CALL')


def load_model():
    """Load the trained model from a file."""
    model = joblib.load("health_score_model.pkl")
    print("Model loaded successfully.")
    return model

def predict_health_score(model, age, bmi, calories_burned, gender, steps, systolic_bp, cholesterol, glucose):
    """Predict health score for a new person based on input features."""
    new_person = pd.DataFrame({
        'age': [age],
        'bmi': [bmi],
        'calories_burned': [calories_burned],
        'gender': [gender],
        'steps': [steps],
        'systolic_bp': [systolic_bp],
        'cholesterol': [cholesterol],
        'glucose': [glucose]
    })
    predicted_health_score = model.predict(new_person)[0]
    print(f"Predicted Health Score: {predicted_health_score:.2f}")
    return predicted_health_score


# Load the saved model
print('AI MODEL LOAD CALL')
model = load_model()

@app.route('/predict_health_score_endpoint', methods=['POST'])

def predict_health_score_endpoint():
    data_bytes = request.get_data()
    data = json.loads(data_bytes.decode("utf-8"))
    print("Go", data)
    # data = request.get_json()
    try:
        age = int(data['age'])
        bmi = float(data['bmi'])
        calories_burned = int(data['calories_burned'])
        gender = int(data['gender'])
        steps = int(data['steps'])
        systolic_bp = int(data['systolic_bp'])
        cholesterol = int(data['cholesterol'])
        glucose = int(data['glucose'])
    except (KeyError, ValueError) as e:
        print(str(e))
        return jsonify({'error': f'Missing or invalid input data: {str(e)}'}), 400

    
    print('age')
    # Make prediction
    #prediction = model.predict([[square_feet]])[0]

    # Predict health score for a new person
    predicted_health_score = predict_health_score(
        model, 
        age=age, 
        bmi=bmi, 
        calories_burned=calories_burned, 
        gender=gender,  # Assuming 1 for female
        steps=steps, 
        systolic_bp=systolic_bp, 
        cholesterol=cholesterol, 
        glucose=glucose
    )
    res = str(round(predicted_health_score, 2))
    print("Predicted value:", res)
    #response = make_response("This is plain text.")
    response = Response("Modified Response", mimetype="text/plain")
    response.headers["Custom-Header"] = "CustomValue"
    response.status_code = 200

    #response.headers["Content-Type"] = "text/plain"
    return res



if __name__ == '__main__':
    app.run(debug=True)

    '''
    {
    "age": 45,
    "bmi": 27,
    "systolic_bp": 130,
    "cholesterol": 200,
    "glucose": 85,
    "calories_burned": 4500,
    "gender":1,
    "steps":3000
}

'''