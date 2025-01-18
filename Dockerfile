# Use an official Python image as a base
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy Flask application code
COPY backend/ /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy React build files into the static folder of Flask
COPY react_app/dist/ /app/static/

# Expose the application's port
EXPOSE 8000

# Command to run the application using Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "wsgi:app"]