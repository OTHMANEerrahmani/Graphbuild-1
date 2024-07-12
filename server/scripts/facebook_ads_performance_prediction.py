import json
import sys
import requests
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error


ACCESS_TOKEN = sys.argv[1]
AD_ACCOUNT_ID = sys.argv[2]

# ACCESS_TOKEN = "EAA0uVOwHYggBOxakP1DlExkkV8iEQY1fU6nuZA1FmeXTZB6sExNkTIBCqaCyyakiiNeu0WhPoITRz6MZARfxjR00XZBReIzaRpvm7GePHl2cPo0M4fjZBUyHCtvVufjerK4aTMnZClPZBUEvkAs7i1ux51trwk8bRJl2FAN7AzO7ZCgVNu0Vs6zyo7cY"
# AD_ACCOUNT_ID = "1294879851171424"

# Step 1: Fetch Historical Ad Data
def fetch_ad_data():
    url = f"https://graph.facebook.com/v17.0/act_{AD_ACCOUNT_ID}/insights"
    params = {
        'access_token': ACCESS_TOKEN,
        'level': 'ad',
        'fields': 'ad_id,clicks,impressions,spend,actions,date_start,date_stop'
    }

    response = requests.get(url, params=params)
    data = response.json()

    if 'data' in data:
        df = pd.DataFrame(data['data'])
        return df
    else:
        print('Error fetching data:', data)
        return None

ad_data = fetch_ad_data()

# Step 2: Preprocess Data
def preprocess_data(df):
    df = df.dropna()  # Drop rows with missing values

    # Convert data types
    df['clicks'] = df['clicks'].astype(int)
    df['impressions'] = df['impressions'].astype(int)
    df['spend'] = df['spend'].astype(float)

    # Define features and target variable
    features = df[['clicks', 'impressions']]
    target = df['spend']

    return features, target

if ad_data is not None:
    features, target = preprocess_data(ad_data)

# Step 3: Train a Machine Learning Model
def train_model(features, target):
    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

    model = LinearRegression()
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)

    return model

if ad_data is not None:
    model = train_model(features, target)

# Step 4: Make Predictions
def predict_performance(model, new_data):
    predictions = model.predict(new_data)

    output_data = {
        "Predictions for new data": predictions.tolist()
    }

    prediction_details = []

    for i, pred in enumerate(predictions):
        prediction_detail = {
            "clicks": str(new_data.loc[i, 'clicks']),
            "impressions": str(new_data.loc[i, 'impressions']),
            "predicted_spend": f"{pred:.2f}"
        }
        prediction_details.append(prediction_detail)

    output_data["Predictions"] = prediction_details

    total_predicted_spend = predictions.sum()

    # Calculate estimated ROI
    # conversion_rate = 0.05  # Example conversion rate
    # revenue_per_conversion = 50  # Example revenue per conversion
    # total_revenue = sum(new_data["clicks"]) * conversion_rate * revenue_per_conversion
    # roi = (total_revenue - total_predicted_spend) / total_predicted_spend * 100
    # output_data["Estimated ROI"] = f"{roi:.2f}%"

    output_json = json.dumps(output_data)

    return output_json 

if ad_data is not None:

    new_data = pd.DataFrame({
        'clicks': [50, 60, 70],
        'impressions': [1000, 1200, 1400]
    })

    predictions = predict_performance(model, new_data)
    print(predictions , end='') 