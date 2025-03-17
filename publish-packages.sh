#!/bin/bash

# Script to publish packages to npm under the @profullstack organization
# Author: chovy

# Set error handling
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting package publishing process...${NC}"

# Check if user is logged in to npm
if ! npm whoami &> /dev/null; then
  echo -e "${YELLOW}You are not logged in to npm. Please login:${NC}"
  npm login --scope=@profullstack
fi

# Verify the logged-in user
CURRENT_USER=$(npm whoami)
if [ "$CURRENT_USER" != "chovy" ]; then
  echo -e "${RED}Warning: You are logged in as '$CURRENT_USER', not 'chovy'${NC}"
  read -p "Do you want to continue? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Publishing aborted.${NC}"
    exit 1
  fi
fi

# Function to update package.json using jq
update_with_jq() {
  local pkg_dir=$1
  local pkg_name=$2
  local tmp_file=$(mktemp)
  
  # Completely replace publishConfig and update the name
  jq --arg name "@profullstack/sans-$pkg_name" '
    .name = $name | 
    .publishConfig = {"access": "public"}
  ' "$pkg_dir/package.json" > "$tmp_file"
  
  mv "$tmp_file" "$pkg_dir/package.json"
}

# Function to update package.json using Node.js
update_with_node() {
  local pkg_dir=$1
  local pkg_name=$2
  
  node -e "
    const fs = require('fs');
    const packagePath = '$pkg_dir/package.json';
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Update package name
    pkg.name = '@profullstack/sans-$pkg_name';
    
    // Completely replace publishConfig
    pkg.publishConfig = {
      'access': 'public'
    };
    
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
  "
}

# Check if jq is available
if command -v jq &> /dev/null; then
  UPDATE_FUNC="update_with_jq"
  echo -e "${GREEN}Using jq to update package.json files${NC}"
else
  UPDATE_FUNC="update_with_node"
  echo -e "${YELLOW}jq not found, using Node.js to update package.json files${NC}"
  
  # Check if Node.js is available
  if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Neither jq nor Node.js is available. Please install one of them.${NC}"
    exit 1
  fi
fi

# Loop through each package in the packages directory
for pkg_dir in ./packages/*; do
  # Skip if not a directory
  if [ ! -d "$pkg_dir" ]; then
    continue
  fi
  
  # Get package name from directory
  pkg_name=$(basename "$pkg_dir")
  
  # Skip ui.deprecated
  if [ "$pkg_name" == "ui.deprecated" ]; then
    echo -e "${YELLOW}Skipping deprecated package: $pkg_name${NC}"
    continue
  fi
  
  echo -e "${GREEN}Processing package: $pkg_name${NC}"
  
  # Check if package.json exists
  if [ ! -f "$pkg_dir/package.json" ]; then
    echo -e "${YELLOW}No package.json found in $pkg_name, skipping...${NC}"
    continue
  fi
  
  # Check for .npmrc file and handle it
  if [ -f "$pkg_dir/.npmrc" ]; then
    echo -e "${YELLOW}Found .npmrc file in $pkg_name, removing GitHub registry configuration...${NC}"
    # Create a temporary file without the GitHub registry line
    grep -v "@profullstack:registry=https://npm.pkg.github.com" "$pkg_dir/.npmrc" > "$pkg_dir/.npmrc.tmp" || true
    # Replace the original .npmrc with the filtered one
    mv "$pkg_dir/.npmrc.tmp" "$pkg_dir/.npmrc"
    # If the file is empty, remove it
    if [ ! -s "$pkg_dir/.npmrc" ]; then
      rm "$pkg_dir/.npmrc"
      echo -e "${YELLOW}Removed empty .npmrc file${NC}"
    fi
  fi
  
  # Update package.json with correct name and publishConfig
  $UPDATE_FUNC "$pkg_dir" "$pkg_name"
  
  echo -e "${GREEN}Updated package name to @profullstack/sans-$pkg_name${NC}"
  
  # Navigate to package directory and publish
  (
    cd "$pkg_dir"
    echo -e "${GREEN}Publishing @profullstack/sans-$pkg_name...${NC}"
    
    # Ensure we're using the npm registry for this publish command
    pnpm publish --no-git-checks --registry https://registry.npmjs.org/
    
    echo -e "${GREEN}Successfully published @profullstack/sans-$pkg_name${NC}"
  )
done

echo -e "${GREEN}All packages processed successfully!${NC}"