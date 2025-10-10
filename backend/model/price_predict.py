# import pandas as pd
# from sklearn.linear_model import LinearRegression
# import pickle

# # Load your historical prices CSV with columns: productId, price, date (datetime)
# data = pd.read_csv('price_history.csv', parse_dates=['date'])
# data = data.sort_values('date')

# # Example feature: previous price
# data['prev_price'] = data['price'].shift(1)
# data = data.dropna()

# X = data[['prev_price']]
# y = data['price']

# model = LinearRegression().fit(X, y)

# # Save model for reuse
# pickle.dump(model, open('price_model.pkl', 'wb'))

# # Predict next price example
# last_price = X.iloc[-1]['prev_price']
# predicted = model.predict([[last_price]])
# print(f"Predicted next price: {predicted[0]}")


import sys
import json
import pandas as pd
from sklearn.linear_model import LinearRegression

# Dummy training example
def train_model():
    data = pd.DataFrame({'prev_price': [1000, 1100, 1050, 1200, 1150], 'price': [1100, 1050, 1200, 1150, 1300]})
    X = data[['prev_price']]
    y = data['price']
    model = LinearRegression().fit(X, y)
    return model

model = train_model()

if __name__ == "__main__":
    input_json = json.loads(sys.argv[1])  # receive input JSON as first argument
    prev_price = input_json.get('prev_price', 0)
    prediction = model.predict([[prev_price]])
    print(json.dumps({'predicted_price': prediction[0]}))
