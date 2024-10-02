This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To import this Docker project to another computer, follow these steps:

Transfer the project files:

Use version control (e.g., Git) if available:
git clone <repository-url>
Alternatively, compress the project folder and transfer it to the new computer (e.g., via USB drive or file transfer service).
Install Docker and Docker Compose on the new computer:

Download and install Docker Desktop (includes Docker Engine and Docker Compose) from the official Docker website: https://www.docker.com/products/docker-desktop
Follow the installation instructions for your operating system.
Navigate to the project directory on the new computer:

cd /path/to/folyo_lucia
Build and start the Docker containers:

docker-compose up --build
This command will build the images (if needed) and start the containers defined in the docker-compose.yml file.

Access the application:

Once the containers are up and running, you should be able to access the web application at http://localhost:3000 (based on the port mapping in the docker-compose.yml file).
Additional services:

MongoDB will be available on port 27017
MinIO (object storage) will be accessible on ports 9000 (API) and 9001 (Console)
To stop the containers, use:

docker-compose down
For subsequent runs, you can simply use:

docker-compose up
Important notes:

Ensure that the ports 3000, 27017, 9000, and 9001 are not in use on the new computer.
The project uses volumes for data persistence. If you need to start fresh, you may need to remove these volumes using docker volume rm.
Make sure any environment variables or secrets required by the application are properly set up on the new computer.
