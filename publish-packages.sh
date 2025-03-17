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

# Default values
DRY_RUN=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      echo "Usage: $0 [--dry-run]"
      exit 1
      ;;
  esac
done

if [ "$DRY_RUN" = true ]; then
  echo -e "${YELLOW}DRY RUN MODE: No changes will be published${NC}"
fi

echo -e "${GREEN}Starting package publishing process...${NC}"

# Check if user is logged in to npm (skip in dry run mode)
if [ "$DRY_RUN" = false ]; then
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
fi

# Function to update package.json using jq
update_with_jq() {
  local pkg_dir=$1
  local pkg_name=$2
  local version=$3
  local tmp_file=$(mktemp)
  
  # Update name, version, and publishConfig
  jq --arg name "@profullstack/sans-$pkg_name" --arg version "$version" '
    .name = $name | 
    .version = $version |
    .publishConfig = {"access": "public"}
  ' "$pkg_dir/package.json" > "$tmp_file"
  
  if [ "$DRY_RUN" = false ]; then
    mv "$tmp_file" "$pkg_dir/package.json"
  else
    echo -e "${YELLOW}Would update $pkg_dir/package.json:${NC}"
    cat "$tmp_file" | grep -E '"name"|"version"|"publishConfig"' | sed 's/^/  /'
    rm "$tmp_file"
  fi
}

# Function to update package.json using Node.js
update_with_node() {
  local pkg_dir=$1
  local pkg_name=$2
  local version=$3
  
  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}Would update $pkg_dir/package.json with:${NC}"
    echo "  \"name\": \"@profullstack/sans-$pkg_name\""
    echo "  \"version\": \"$version\""
    echo "  \"publishConfig\": { \"access\": \"public\" }"
    return
  fi
  
  # Update name, version, and publishConfig
  node -e "
    const fs = require('fs');
    const packagePath = '$pkg_dir/package.json';
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Update package name and version
    pkg.name = '@profullstack/sans-$pkg_name';
    pkg.version = '$version';
    
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

# Function to get current version from package.json
get_current_version() {
  local pkg_dir=$1
  if command -v jq &> /dev/null; then
    jq -r '.version' "$pkg_dir/package.json"
  else
    node -e "
      const fs = require('fs');
      const packagePath = '$pkg_dir/package.json';
      const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      console.log(pkg.version);
    "
  fi
}

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
  
  # Get current version
  current_version=$(get_current_version "$pkg_dir")
  echo -e "${GREEN}Current version: $current_version${NC}"
  
  # Ask for new version
  if [ "$DRY_RUN" = false ]; then
    read -p "Enter version for @profullstack/sans-$pkg_name [$current_version]: " version
    # Use current version if no input provided
    version=${version:-$current_version}
  else
    # In dry run mode, just use the current version for display
    version=$current_version
    echo -e "${YELLOW}Would prompt for version (using current version for demonstration)${NC}"
  fi
  
  # Validate version format
  if ! [[ $version =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9\.]+)?$ ]]; then
    echo -e "${RED}Invalid version format: $version${NC}"
    echo "Version must be in the format x.x.x or x.x.x-suffix"
    continue
  fi
  
  # Check for .npmrc file and handle it
  if [ -f "$pkg_dir/.npmrc" ]; then
    echo -e "${YELLOW}Found .npmrc file in $pkg_name, removing GitHub registry configuration...${NC}"
    
    if [ "$DRY_RUN" = true ]; then
      echo -e "${YELLOW}Would remove GitHub registry configuration from $pkg_dir/.npmrc${NC}"
    else
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
  fi
  
  # Update package.json with correct name, version, and publishConfig
  $UPDATE_FUNC "$pkg_dir" "$pkg_name" "$version"
  
  echo -e "${GREEN}Updated package name to @profullstack/sans-$pkg_name${NC}"
  echo -e "${GREEN}Updated package version to $version${NC}"
  
  # Navigate to package directory and publish
  if [ "$DRY_RUN" = false ]; then
    (
      cd "$pkg_dir"
      echo -e "${GREEN}Publishing @profullstack/sans-$pkg_name@$version...${NC}"
      
      # Ensure we're using the npm registry for this publish command
      pnpm publish --no-git-checks --registry https://registry.npmjs.org/
      
      echo -e "${GREEN}Successfully published @profullstack/sans-$pkg_name@$version${NC}"
    )
  else
    echo -e "${YELLOW}Would publish @profullstack/sans-$pkg_name@$version to npm registry${NC}"
  fi
done

if [ "$DRY_RUN" = true ]; then
  echo -e "${YELLOW}DRY RUN COMPLETED: No changes were made${NC}"
else
  echo -e "${GREEN}All packages processed successfully!${NC}"
fi