For englisch Version see branch https://github.com/samply/EpiSelector/tree/englishversion  

Quick Start:

Clone the repository
git clone https://<unsergithublink>.git
cd EpiSelector

Build the Docker image

docker build -t episelector .

Run the container
docker run -d -p 8080:80 --name episelector episelector

Once started, the application will be accessible at:
http://localhost:8080

Stop the container
docker stop episelector

Remove the container
docker rm episelector
