from flask_cors import CORS
from flask import Flask, render_template, request, redirect
import sqlite3
from datetime import datetime
import json


# Create a Flask app
app = Flask(__name__, template_folder="/Users/garghe/PycharmProjects/holidays/templates")
CORS(app)

# Define a route for adding holidays
@app.route("/add_holiday", methods=["POST"])
def post_holiday():

    name = request.form.get("name")
    date = request.form.get("date")


    # Add the holiday to the database
    with sqlite3.connect("holidays.db") as db:
        cursor = db.cursor()
        cursor.execute("INSERT INTO my_table (name, date) VALUES (?, ?)", (name, date))
        db.commit()

    # Redirect the user back to the homepage
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


# Define a route for the calendar view
@app.route("/get_holidays", methods=["GET"])
def get_holidays():

    args = request.args
    year = int(args.get("year"))
    month = int(args.get("month"))

    # Get a list of all the holidays for the current month
    with sqlite3.connect("holidays.db") as db:
        cursor = db.cursor()
        holidays = cursor.execute("select SUBSTR(date,9,2) as day ,GROUP_CONCAT(name) as names FROM my_table WHERE date >= ? AND date < ? GROUP BY date ORDER BY date", (datetime(year, month, 1), datetime(year, month + 1, 1))).fetchall()


    return json.dumps(dict(holidays)), 200, {'ContentType': 'application/json'}


# Run the application
if __name__ == "__main__":
    app.run(debug=True, port=8080)