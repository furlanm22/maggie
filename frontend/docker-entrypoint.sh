#!/bin/bash
set -e

# Wait for MongoDB to start
until mongo --host mongo --eval "print(\"waited for connection\")"; do
    sleep 1
done

# Start frontend
npm start
