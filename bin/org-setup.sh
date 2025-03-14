#!/usr/bin/env bash

# org-setup.sh - Script to set up organization namespaces for npm, Deno, and Bun
# Created for Sans UI - A cross-platform native UI library

set -e

# ANSI color codes
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
BLUE="\033[0;34m"
MAGENTA="\033[0;35m"
CYAN="\033[0;36m"
NC="\033[0m" # No Color
BOLD="\033[1m"

# Configuration
ORG_NAME="profullstack"
ORG_DESCRIPTION="Professional Fullstack Development"
PKG_NAME="sans-ui"
FULL_PKG_NAME="@${ORG_NAME}/${PKG_NAME}"

# Helper functions
print_header() {
  echo -e "\n${BOLD}${BLUE}=== $1 ===${NC}\n"
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
}

print_info() {
  echo -e "${CYAN}ℹ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

print_manual_instructions() {
  echo -e "${MAGENTA}$1${NC}"
}

check_command() {
  if ! command -v $1 &> /dev/null; then
    print_error "$1 is not installed or not in PATH"
    return 1
  else
    return 0
  fi
}

# Main script
print_header "Sans UI Organization Setup"
print_info "This script will help you set up the '${ORG_NAME}' organization on various package registries."
print_info "Package name: ${FULL_PKG_NAME}"
echo ""

# Check for required tools
REQUIRED_TOOLS=("npm" "node")
MISSING_TOOLS=false

for tool in "${REQUIRED_TOOLS[@]}"; do
  if ! check_command $tool; then
    MISSING_TOOLS=true
  fi
done

if [ "$MISSING_TOOLS" = true ]; then
  print_error "Please install the missing tools and try again."
  exit 1
fi

# NPM Organization Setup
print_header "NPM Organization Setup"

if check_command "npm"; then
  # Check if user is logged in to npm
  if npm whoami &> /dev/null; then
    print_success "Logged in to npm as $(npm whoami)"
    
    # Try to create the organization
    print_info "Attempting to create npm organization '${ORG_NAME}'..."
    if npm org create "${ORG_NAME}" "${ORG_DESCRIPTION}" 2>/dev/null; then
      print_success "Successfully created npm organization '${ORG_NAME}'"
    else
      print_warning "Could not create npm organization via CLI. This might be because:"
      print_warning "- The organization already exists"
      print_warning "- You don't have permission"
      print_warning "- The CLI method is not supported"
      
      print_manual_instructions "\nManual instructions for npm:\n"
      print_manual_instructions "1. Go to https://www.npmjs.com/org/create"
      print_manual_instructions "2. Sign in with your npm account"
      print_manual_instructions "3. Enter '${ORG_NAME}' as the organization name"
      print_manual_instructions "4. Choose a plan (free tier is available)"
      print_manual_instructions "5. Complete the organization creation process"
    fi
    
    print_info "\nTo publish your package to npm after organization setup:"
    print_info "npm publish --access public"
  else
    print_error "Not logged in to npm"
    print_info "Please log in using: npm login"
  fi
fi

# Deno Organization Setup
print_header "Deno Organization Setup"
print_info "Deno requires manual organization setup via their website."

print_manual_instructions "Manual instructions for Deno:\n"
print_manual_instructions "1. Visit https://deno.land/"
print_manual_instructions "2. Sign in to your account"
print_manual_instructions "3. Go to your profile settings"
print_manual_instructions "4. Navigate to 'Organizations' and create the '${ORG_NAME}' organization"
print_manual_instructions "5. You may need to verify ownership of the namespace"
print_manual_instructions "   This usually involves adding a DNS TXT record to ${ORG_NAME}.com"

print_info "\nTo publish your package to Deno after organization setup:"
print_info "pnpm run publish:deno"

# Bun Organization Setup
print_header "Bun Organization Setup"
print_info "Bun uses npm's registry by default, so once you've created the organization on npm,"
print_info "you can publish using Bun without additional organization setup."

if check_command "bun"; then
  print_success "Bun is installed"
  print_info "To publish your package using Bun after npm organization setup:"
  print_info "bun publish"
else
  print_warning "Bun is not installed or not in PATH"
  print_info "If you want to use Bun, install it from: https://bun.sh/"
  print_info "After installation, you can publish using: bun publish"
fi

# Final instructions
print_header "Next Steps"
print_info "1. Make sure you've created the organizations as instructed above"
print_info "2. Commit any pending changes to your repository"
print_info "3. Run the appropriate publish commands for each registry"

print_success "Organization setup script completed!"
