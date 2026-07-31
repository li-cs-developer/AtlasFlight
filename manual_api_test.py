#!/usr/bin/env python
"""
Manual API Test Script for AtlasFlight Backend
Run this to test all API endpoints manually
Usage: python tests/manual_api_test.py
"""

import requests
import json
import time
from typing import Dict, Any

# Configuration
BASE_URL = "http://localhost:8000"
API_PREFIX = "/api"
TIMEOUT = 10

# Colors for output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def print_header(text: str):
    print(f"\n{Colors.BOLD}{Colors.CYAN}{'='*60}{Colors.RESET}")
    print(f"{Colors.BOLD}{Colors.CYAN}{text}{Colors.RESET}")
    print(f"{Colors.BOLD}{Colors.CYAN}{'='*60}{Colors.RESET}")

def print_success(text: str):
    print(f"{Colors.GREEN}✅ {text}{Colors.RESET}")

def print_error(text: str):
    print(f"{Colors.RED}❌ {text}{Colors.RESET}")

def print_info(text: str):
    print(f"{Colors.BLUE}ℹ️ {text}{Colors.RESET}")

def print_warning(text: str):
    print(f"{Colors.YELLOW}⚠️ {text}{Colors.RESET}")

def test_endpoint(method: str, url: str, expected_status: int = 200, data: Dict = None, params: Dict = None) -> bool:
    """Test a single endpoint and return True if successful"""
    full_url = f"{BASE_URL}{url}"
    
    try:
        print_info(f"{method} {url}")
        
        if method.upper() == "GET":
            response = requests.get(full_url, params=params, timeout=TIMEOUT)
        elif method.upper() == "POST":
            response = requests.post(full_url, json=data, timeout=TIMEOUT)
        elif method.upper() == "PUT":
            response = requests.put(full_url, json=data, timeout=TIMEOUT)
        elif method.upper() == "DELETE":
            response = requests.delete(full_url, timeout=TIMEOUT)
        else:
            print_error(f"Unsupported method: {method}")
            return False
        
        if response.status_code == expected_status:
            print_success(f"Status: {response.status_code} (Expected: {expected_status})")
            if response.text:
                try:
                    json_data = response.json()
                    if isinstance(json_data, dict):
                        # Show first few items if it's a list
                        if "items" in json_data and isinstance(json_data["items"], list):
                            print_info(f"  Total items: {len(json_data['items'])}")
                            if len(json_data['items']) > 0:
                                print_info(f"  First item: {json.dumps(json_data['items'][0], indent=2)[:200]}...")
                        else:
                            print_info(f"  Response: {json.dumps(json_data, indent=2)[:500]}")
                except:
                    print_info(f"  Response: {response.text[:200]}")
            return True
        else:
            print_error(f"Status: {response.status_code} (Expected: {expected_status})")
            print_error(f"Response: {response.text[:200]}")
            return False
            
    except requests.exceptions.ConnectionError:
        print_error(f"Connection refused! Is the server running on {BASE_URL}?")
        return False
    except requests.exceptions.Timeout:
        print_error(f"Request timed out after {TIMEOUT}s")
        return False
    except Exception as e:
        print_error(f"Error: {str(e)}")
        return False

def test_root_endpoint():
    """Test the root endpoint"""
    print_header("TESTING ROOT ENDPOINT")
    return test_endpoint("GET", "/")

def test_dashboard_endpoints():
    """Test all dashboard endpoints"""
    print_header("TESTING DASHBOARD ENDPOINTS")
    
    results = []
    results.append(test_endpoint("GET", f"{API_PREFIX}/dashboard"))
    results.append(test_endpoint("GET", f"{API_PREFIX}/dashboard/top-airlines"))
    
    return all(results)

def test_airports_endpoints():
    """Test all airports endpoints"""
    print_header("TESTING AIRPORTS ENDPOINTS")
    
    results = []
    # Get all airports
    results.append(test_endpoint("GET", f"{API_PREFIX}/airports"))
    
    # Get with limit
    results.append(test_endpoint("GET", f"{API_PREFIX}/airports", params={"limit": 2}))
    
    # Get with limit and offset
    results.append(test_endpoint("GET", f"{API_PREFIX}/airports", params={"limit": 1, "offset": 1}))
    
    # Search by name
    results.append(test_endpoint("GET", f"{API_PREFIX}/airports", params={"search": "Atlanta"}))
    
    # Search by IATA
    results.append(test_endpoint("GET", f"{API_PREFIX}/airports", params={"search": "ATL"}))
    
    # Filter by country
    results.append(test_endpoint("GET", f"{API_PREFIX}/airports", params={"country": "US"}))
    
    # Combined search and filter
    results.append(test_endpoint("GET", f"{API_PREFIX}/airports", params={"search": "ATL", "country": "US"}))
    
    # Get countries
    results.append(test_endpoint("GET", f"{API_PREFIX}/airports/countries"))
    
    return all(results)

def test_airlines_endpoints():
    """Test all airlines endpoints"""
    print_header("TESTING AIRLINES ENDPOINTS")
    
    results = []
    results.append(test_endpoint("GET", f"{API_PREFIX}/airlines"))
    results.append(test_endpoint("GET", f"{API_PREFIX}/airlines", params={"limit": 2}))
    results.append(test_endpoint("GET", f"{API_PREFIX}/airlines", params={"limit": 1, "offset": 1}))
    
    return all(results)

def test_routes_endpoints():
    """Test all routes endpoints"""
    print_header("TESTING ROUTES ENDPOINTS")
    
    results = []
    results.append(test_endpoint("GET", f"{API_PREFIX}/routes"))
    results.append(test_endpoint("GET", f"{API_PREFIX}/routes", params={"limit": 2}))
    results.append(test_endpoint("GET", f"{API_PREFIX}/routes", params={"limit": 1, "offset": 1}))
    
    # Find routes between airports
    results.append(test_endpoint("GET", f"{API_PREFIX}/routes/find", params={"from": "ATL", "to": "LAX"}))
    results.append(test_endpoint("GET", f"{API_PREFIX}/routes/find", params={"from": "ATL", "to": "LHR"}))
    
    # Test invalid airports (should return empty list)
    results.append(test_endpoint("GET", f"{API_PREFIX}/routes/find", params={"from": "XYZ", "to": "ABC"}))
    
    return all(results)

def test_fleet_endpoints():
    """Test fleet endpoints"""
    print_header("TESTING FLEET ENDPOINTS")
    return test_endpoint("GET", f"{API_PREFIX}/fleet")

def test_health_check():
    """Check if the server is running"""
    print_header("HEALTH CHECK")
    try:
        response = requests.get(f"{BASE_URL}/docs", timeout=5)
        if response.status_code == 200:
            print_success("Server is running and healthy")
            return True
        else:
            print_warning(f"Server responded with status {response.status_code}")
            return False
    except:
        print_error("Server is not running!")
        return False

def main():
    """Run all tests"""
    print_header("🚀 ATLASFLIGHT API MANUAL TEST SUITE 🚀")
    print_info(f"Base URL: {BASE_URL}")
    print_info(f"API Prefix: {API_PREFIX}")
    print_info(f"Timeout: {TIMEOUT}s")
    
    # Check if server is running first
    if not test_health_check():
        print_error("\n❌ Please start the server first with:")
        print_error("   cd C:\\Users\\tonko\\Documents\\AtlasFlight\\backend")
        print_error("   .\\venv\\Scripts\\Activate.ps1")
        print_error("   uvicorn main:app --reload")
        return
    
    # Run all test suites
    results = {
        "Root": test_root_endpoint(),
        "Dashboard": test_dashboard_endpoints(),
        "Airports": test_airports_endpoints(),
        "Airlines": test_airlines_endpoints(),
        "Routes": test_routes_endpoints(),
        "Fleet": test_fleet_endpoints(),
    }
    
    # Summary
    print_header("📊 TEST SUMMARY")
    total = len(results)
    passed = sum(1 for v in results.values() if v)
    failed = total - passed
    
    for name, status in results.items():
        if status:
            print_success(f"{name}: PASSED")
        else:
            print_error(f"{name}: FAILED")
    
    print(f"\n{Colors.BOLD}Total: {total} | Passed: {Colors.GREEN}{passed}{Colors.RESET} | Failed: {Colors.RED}{failed}{Colors.RESET}")
    
    if failed == 0:
        print(f"\n{Colors.GREEN}{Colors.BOLD}🎉 ALL TESTS PASSED! 🎉{Colors.RESET}")
    else:
        print(f"\n{Colors.RED}{Colors.BOLD}⚠️ SOME TESTS FAILED ⚠️{Colors.RESET}")

if __name__ == "__main__":
    main()