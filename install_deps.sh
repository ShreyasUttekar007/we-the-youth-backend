#!/bin/bash
# Get the directory of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$DIR"

echo "Installing dependencies in $(pwd)"

npm install express mongoose cors dotenv
npm install -D typescript ts-node nodemon @types/express @types/node @types/cors
