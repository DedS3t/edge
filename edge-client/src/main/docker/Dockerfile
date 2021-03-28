FROM python:3.7-alpine
WORKDIR /code
RUN apk add --no-cache gcc musl-dev linux-headers
COPY src/requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
CMD ["python3", "src/app.py"]

