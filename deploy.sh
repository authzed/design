#!/bin/bash

# Build the project
npm run build

# Create a zip file of the out directory
cd out
zip -r ../brand-guidelines-site.zip .

echo "Deployment package created: brand-guidelines-site.zip"
echo "You can now upload this file to your hosting provider"
